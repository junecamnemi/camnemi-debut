import { MEMBERS } from '../../content/members';
import { PLAYER } from '../../content/player';
import { Icon } from '../../components/Icon';
import { HeroCarousel } from '../../components/HeroCarousel';

/** 홈 — 히어로(무대 영상) + 오늘의 트레이닝 + 바로가기 */
export function HomeScreen({ onGo }: { onGo: (tab: 'train' | 'story' | 'cards' | 'my') => void }) {
  const m = MEMBERS[PLAYER.memberId];
  return (
    <>
      <div className="appbar">
        <span className="appbar__brand">GLOWSIS</span>
        <span style={{ marginLeft: 'auto', fontSize: 11.5, fontWeight: 800, color: 'var(--ink-2)' }}>
          🔥 {PLAYER.streakDays}일 연속
        </span>
      </div>

      <HeroCarousel
        badge="오늘의 트레이닝"
        title="아란과 자기소개를 배워요"
        subtitle="EP.2 · -이에요/예요 · 약 12분"
      />

      <div className="screen">
        <button className="btn btn--primary" onClick={() => onGo('story')}>이어서 하기</button>

        <div className="block">
          <span className="block__t">내 아이돌</span>
          <button className="profile" onClick={() => onGo('my')} style={{ textAlign: 'left' }}>
            <img className="profile__av" src={m.portrait} alt={PLAYER.stageName} />
            <div className="profile__meta">
              <div className="profile__name">‘{PLAYER.stageName}’</div>
              <div className="profile__role">{m.ko} · {m.role}</div>
              <span className="profile__stage">🎤 {PLAYER.careerStage} · {PLAYER.careerPct}%</span>
            </div>
            <Icon name="chev" size={18} />
          </button>
        </div>

        <div className="block">
          <span className="block__t">바로가기</span>
          <button className="tile" onClick={() => onGo('train')}>
            <span className="tile__ic"><Icon name="train" size={20} /></span>
            <span><span className="tile__t">문제풀이 연습</span><span className="tile__d">읽기 · 듣기 · 어휘</span></span>
            <Icon name="chev" size={18} />
          </button>
          <button className="tile" onClick={() => onGo('story')}>
            <span className="tile__ic"><Icon name="story" size={20} /></span>
            <span><span className="tile__t">스토리 · 에피소드</span><span className="tile__d">EP.1~16 데뷔까지</span></span>
            <Icon name="chev" size={18} />
          </button>
          <button className="tile" onClick={() => onGo('cards')}>
            <span className="tile__ic"><Icon name="cards" size={20} /></span>
            <span><span className="tile__t">포토카드 컬렉션</span><span className="tile__d">{PLAYER.cards.filter(c => c.owned).length} / {PLAYER.cards.length} 수집</span></span>
            <Icon name="chev" size={18} />
          </button>
        </div>
      </div>
    </>
  );
}
