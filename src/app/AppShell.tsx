import { useState } from 'react';
import { TabBar, type TabKey } from '../components/TabBar';
import { HomeScreen } from '../features/home/HomeScreen';
import { PracticeScreen } from '../features/practice/PracticeScreen';
import { StoryScreen } from '../features/story/StoryScreen';
import { CollectionScreen } from '../features/collection/CollectionScreen';
import { MyScreen } from '../features/my/MyScreen';
import { Episode1 } from '../features/episode1/Episode1';
import { LoginScreen } from '../features/auth/LoginScreen';
import { EPISODE1 } from '../content/episode1';
import { useAuth } from '../hooks/useAuth';
import { signOut } from '../services/auth';
import './shell.css';

const GUEST_KEY = 'camnemi_debut_guest';

/** 앱 메인 프레임 — 로그인(Supabase) + 탭 네비게이션 + 화면 + 에피소드 실행 */
export function AppShell() {
  const { userId, loading } = useAuth();
  const [guest, setGuest] = useState(() => {
    try { return localStorage.getItem(GUEST_KEY) === '1'; } catch { return false; }
  });
  const [tab, setTab] = useState<TabKey>('home');
  const [playing, setPlaying] = useState(false);

  const authed = !!userId || guest;

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
  if (playing) {
    return (
      <div className="shell">
        <div style={{ display: 'flex', alignItems: 'center', padding: '12px 16px 0' }}>
          <button className="btn btn--ghost" style={{ flex: '0 0 auto', padding: '10px 16px', fontSize: 13 }}
                  onClick={() => setPlaying(false)}>← 나가기</button>
        </div>
        <Episode1 ep={EPISODE1} userId={userId} />
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
      {tab === 'home' && <HomeScreen onGo={(t) => setTab(t)} />}
      {tab === 'train' && <PracticeScreen />}
      {tab === 'story' && (
        <>
          <StoryScreen />
          <div style={{ padding: '0 16px 16px' }}>
            <button className="btn btn--primary" onClick={() => setPlaying(true)}>EP.1 다시 보기 / 플레이 →</button>
          </div>
        </>
      )}
      {tab === 'cards' && <CollectionScreen />}
      {tab === 'my' && <MyScreen onLogout={guest ? logout : logout} authed={!!userId} />}

      <TabBar active={tab} onTab={setTab} />
    </div>
  );
}
