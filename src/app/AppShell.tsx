import { useEffect, useState } from 'react';
import { TabBar, type TabKey } from '../components/TabBar';
import { useI18n } from '../i18n';
import { HomeScreen } from '../features/home/HomeScreen';
import { PracticeScreen } from '../features/practice/PracticeScreen';
import { StoryScreen } from '../features/story/StoryScreen';
import { CollectionScreen } from '../features/collection/CollectionScreen';
import { MyScreen } from '../features/my/MyScreen';
import { Episode1 } from '../features/episode1/Episode1';
import { LoginScreen } from '../features/auth/LoginScreen';
import { EPISODE1 } from '../content/episode1';
import { EPISODE2 } from '../content/episode2';
import { Episode2 } from '../features/episode2/Episode2';
import { EPISODE3 } from '../content/episode3';
import { Episode3 } from '../features/episode3/Episode3';
import { useAuth } from '../hooks/useAuth';
import { signOut } from '../services/auth';
import './shell.css';

const GUEST_KEY = 'camnemi_debut_guest';

/** 탭 + 에피소드 실행 상태 — History API state 로 저장/복원되는 라우트 */
interface Route { tab: TabKey; playing: 0 | 1 | 2 | 3 }

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
      : TITLE_BY_TAB[tab];
    document.title = `${label} · ${BRAND_TITLE}`;
  }, [tab, playing]);

  function navigate(next: Route) {
    setRoute(next);
    try { window.history.pushState(next, ''); } catch { /* noop */ }
  }
  function goTab(t: TabKey) { navigate({ tab: t, playing: 0 }); }
  function playEp(n: 1 | 2 | 3) { navigate({ tab: 'story', playing: n }); }

  // 로딩 스플래시
  if (loading && !guest) {
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
        {playing === 1
          ? <Episode1 ep={EPISODE1} userId={userId ?? undefined} />
          : playing === 2
            ? <Episode2 ep={EPISODE2} userId={userId ?? undefined} />
            : <Episode3 ep={EPISODE3} userId={userId ?? undefined} />}
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
      {tab === 'home' && <HomeScreen onGo={goTab} />}
      {tab === 'train' && <PracticeScreen userId={userId ?? undefined} />}
      {tab === 'story' && <StoryScreen onPlay={playEp} />}
      {tab === 'cards' && <CollectionScreen />}
      {tab === 'my' && <MyScreen onLogout={guest ? logout : logout} authed={!!userId} />}

      <TabBar active={tab} onTab={goTab} />
    </div>
  );
}
