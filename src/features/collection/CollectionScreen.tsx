import { PLAYER } from '../../content/player';
import { Icon } from '../../components/Icon';
import { HeroCarousel } from '../../components/HeroCarousel';

/** 컬렉션 — 포토카드 그리드 */
export function CollectionScreen() {
  const owned = PLAYER.cards.filter((c) => c.owned).length;
  return (
    <>
      <div className="appbar"><span className="appbar__brand">컬렉션</span>
        <span style={{ marginLeft: 'auto', fontSize: 12, fontWeight: 800, color: 'var(--ink-3)' }}>
          {owned} / {PLAYER.cards.length}
        </span>
      </div>
      <HeroCarousel
        small
        badge={`${owned} / ${PLAYER.cards.length} 수집`}
        title="포토카드"
        subtitle="에피소드를 완료하면 카드가 열려요 (확정 해금)"
      />
      <div className="screen">
        <div className="cardgrid">
          {PLAYER.cards.map((c, i) => (
            <div key={c.id} className={`pcard${c.owned ? '' : ' is-locked'}`}>
              <img src={c.img} alt="" />
              {!c.owned && <div className="pcard__lock"><Icon name="lock" size={20} /></div>}
              <span className="pcard__tag">No.{String(i + 1).padStart(3, '0')}</span>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
