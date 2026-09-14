import { Suspense, lazy, useEffect, useState } from 'react';
import { TabBar, type TabKey } from '../components/TabBar';
import { useI18n } from '../i18n';
import { HomeScreen } from '../features/home/HomeScreen';
import { MyScreen } from '../features/my/MyScreen';
import { LoginScreen } from '../features/auth/LoginScreen';
import { EPISODE1 } from '../content/episode1';
import { EPISODE2 } from '../content/episode2';
import { EPISODE3 } from '../content/episode3';
import { EPISODE4 } from '../content/episode4';
import { EPISODE_LOADERS } from '../content/episodes';
import type { Episode, EpisodeNo } from '../types/game';
import { useAuth } from '../hooks/useAuth';
import { signOut } from '../services/auth';
import { loadGameState, setEpisodeDone, setStageName, setCareer, unlock } from '../services/game';
import { normalizeCareerKey } from '../content/player';
import { loadLocalProgress, clearLocalProgress } from '../services/localProgress';
import './shell.css';

// ── code-split: 무거운/드물게 쓰는 화면은 필요할 때만 로드 ──
// (named export → default 로 매핑해 React.lazy 에 맞춤)
const Episode1 = lazy(() => import('../features/episode1/Episode1').then((m) => ({ default: m.Episode1 })));
const Episode2 = lazy(() => import('../features/episode2/Episode2').then((m) => ({ default: m.Episode2 })));
const Episode3 = lazy(() => import('../features/episode3/Episode3').then((m) => ({ default: m.Episode3 })));
const Episode4 = lazy(() => import('../features/episode4/Episode4').then((m) => ({ default: m.Episode4 })));
const EpisodePlayer = lazy(() => import('../components/EpisodePlayer').then((m) => ({ default: m.EpisodePlayer })));
const PracticeScreen = lazy(() => import('../features/practice/PracticeScreen').then((m) => ({ default: m.PracticeScreen })));
const CollectionScreen = lazy(() => import('../features/collection/CollectionScreen').then((m) => ({ default: m.CollectionScreen })));
const StoryScreen = lazy(() => import('../features/story/StoryScreen').then((m) => ({ default: m.StoryScreen })));

/** 화면 로딩 중 공용 fallback (중앙 스피너) */
function ScreenFallback() {
  return (
    <div className="screen-loading" role="status" aria-label="loading">
      <span className="screen-loading__spinner" />
    </div>
  );
}

/** EP.5~16 공용 플레이어 로더 — 에피소드 데이터를 지연 로드해 EpisodePlayer 로 넘긴다 */
function EpisodeLoader({ no, userId }: { no: number; userId?: string }) {
  const [ep, setEp] = useState<Episode | null>(null);
  useEffect(() => {
    let alive = true;
    const load = EPISODE_LOADERS[no];
    if (load) void load().then((m) => { if (alive) setEp(m); });
    return () => { alive = false; };
  }, [no]);
  if (!ep) return <ScreenFallback />;
  return <EpisodePlayer ep={ep} userId={userId} />;
}

const GUEST_KEY = 'camnemi_debut_guest';

/** 탭 + 에피소드 실행 상태 — History API state 로 저장/복원되는 라우트 */
interface Route { tab: TabKey; playing: 0 | EpisodeNo }

const INITIAL_ROUTE: Route = { tab: 'home', playing: 0 };

const BRAND_TITLE = '글로시스: 데뷔 프로젝트';
const TITLE_BY_TAB: Record<TabKey, string> = {
  home: '홈', train: '훈련', story: '스토리', cards: '컬렉션', my: 'My',
};

/** 앱 메인 프레임 — 로그인(Supabase) + 탭 네비게이션 + 화면 + 에피소드 실행 */
export function AppShell() {
  const { t } = useI18n();
  const { userId, loading } = useAuth();
  const [guest, setGuest] = useState(() => {
    try { return localStorage.getItem(GUEST_KEY) === '1'; } catch { return false; }
  });
  const [route, setRoute] = useState<Route>(INITIAL_ROUTE);

  const authed = !!userId || guest;
  const { tab, playing } = route;

  // History API 통합 — 뒤로가기/앞으로가기 지원 + 첫 뒤로가기가 앱 밖으로 나가지 않도록 가드 엔트리
  useEffect(() => {
    try {
      window.history.replaceState(INITIAL_ROUTE, '');
      window.history.pushState(INITIAL_ROUTE, '');   // 가드 엔트리
    } catch { /* 샌드박스 등 pushState 불가 시 무시 */ }

    const onPop = (e: PopStateEvent) => {
      const s = e.state as Route | null;
      setRoute(s && typeof s === 'object' && 'tab' in s && 'playing' in s ? s : INITIAL_ROUTE);
    };
    window.addEventListener('popstate', onPop);
    return () => window.removeEventListener('popstate', onPop);
  }, []);

  // document.title — 활성 화면(탭/에피소드)에 맞춰 갱신
  useEffect(() => {
    const label =
      playing === 1 ? `EP.1 ${EPISODE1.title}`
      : playing === 2 ? `EP.2 ${EPISODE2.title}`
      : playing === 3 ? `EP.3 ${EPISODE3.title}`
      : playing === 4 ? `EP.4 ${EPISODE4.title}`
      : playing >= 5 ? `EP.${playing}`
      : TITLE_BY_TAB[tab];
    document.title = `${label} · ${BRAND_TITLE}`;
  }, [tab, playing]);

  // 게스트 → 계정 전환 시 로컬 진행을 계정으로 병합 (멱등).
  // 참고: 게스트가 로그인 화면으로 가는 경로(logout 타일)가 guest 플래그를 먼저 지우므로,
  // guest 여부 대신 "로그인 + 남아 있는 로컬 진행" 여부로 판단한다.
  useEffect(() => {
    if (!userId) return;
    const local = loadLocalProgress();
    const hasLocal =
      local.furthestEpisode > 1 ||
      !!local.stageName ||
      local.careerPct > 0 ||
      local.unlocks.length > 0;
    if (!hasLocal) return;

    let cancelled = false;
    (async () => {
      const st = await loadGameState(userId);
      if (cancelled || !st) return;
      if (local.furthestEpisode > (st.furthest_episode ?? 0)) {
        await setEpisodeDone(userId, local.furthestEpisode);
      }
      if (local.stageName && !st.stage_name) {
        await setStageName(userId, local.stageName);
      }
      if (local.careerPct > (st.career_pct ?? 0)) {
        await setCareer(userId, normalizeCareerKey(local.careerStage ?? st.career_stage), local.careerPct);
      }
      for (const id of local.unlocks) {
        await unlock(userId, id, 'photocard');
      }
      if (!cancelled) {
        clearLocalProgress();
        setGuest(false);
      }
    })();
    return () => { cancelled = true; };
  }, [userId]);

  function navigate(next: Route) {
    setRoute(next);
    try { window.history.pushState(next, ''); } catch { /* noop */ }
  }
  function goTab(t: TabKey) { navigate({ tab: t, playing: 0 }); }
  function playEp(n: EpisodeNo) { navigate({ tab: 'story', playing: n }); }

  // 로딩 스플래시 — 세션 확인 전까지 메인/로그인 화면 대신 스피너를 보여 깜빡임 방지
  if (loading) {
    return (
      <div className="splash">
        <div className="splash__brand">GLOWSIS</div>
        <div className="splash__dot" />
      </div>
    );
  }

  if (!authed) {
    return (
      <LoginScreen
        onGuest={() => { try { localStorage.setItem(GUEST_KEY, '1'); } catch { /* noop */ } setGuest(true); }}
      />
    );
  }

  // 에피소드 플레이 중 → 전체화면 (탭바 숨김)
  if (playing !== 0) {
    return (
      <div className="shell">
        <div style={{ display: 'flex', alignItems: 'center', padding: '12px 16px 0' }}>
          <button className="btn btn--ghost" style={{ flex: '0 0 auto', padding: '10px 16px', fontSize: 13 }}
                  onClick={() => goTab('story')}>← {t('back')}</button>
        </div>
        <Suspense fallback={<ScreenFallback />}>
          {playing === 1
            ? <Episode1 ep={EPISODE1} userId={userId ?? undefined} />
            : playing === 2
              ? <Episode2 ep={EPISODE2} userId={userId ?? undefined} />
              : playing === 3
                ? <Episode3 ep={EPISODE3} userId={userId ?? undefined} />
                : playing === 4
                  ? <Episode4 ep={EPISODE4} userId={userId ?? undefined} />
                  : <EpisodeLoader key={playing} no={playing} userId={userId ?? undefined} />}
        </Suspense>
      </div>
    );
  }

  async function logout() {
    await signOut();
    try { localStorage.removeItem(GUEST_KEY); } catch { /* noop */ }
    setGuest(false);
  }

  return (
    <div className="shell">
      <Suspense fallback={<ScreenFallback />}>
        {tab === 'home' && <HomeScreen onGo={goTab} userId={userId ?? undefined} />}
        {tab === 'train' && <PracticeScreen userId={userId ?? undefined} />}
        {tab === 'story' && <StoryScreen onPlay={playEp} userId={userId ?? undefined} />}
        {tab === 'cards' && <CollectionScreen userId={userId ?? undefined} />}
        {tab === 'my' && <MyScreen onLogout={logout} authed={!!userId} userId={userId ?? undefined} />}
      </Suspense>

      <TabBar active={tab} onTab={goTab} />
    </div>
  );
}
