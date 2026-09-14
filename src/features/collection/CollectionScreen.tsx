import { useEffect, useState } from 'react';
import { PLAYER } from '../../content/player';
import { Icon } from '../../components/Icon';
import { ScreenBg } from '../../components/ScreenBg';
import { useI18n } from '../../i18n';
import { loadUnlocks } from '../../services/game';
import { loadLocalProgress } from '../../services/localProgress';

/** 포토카드 소유 판정 — unlock item_id('pc0'·'photocard-00N')와 카드 id('pcN') 매칭 */
function isOwned(cardId: string, unlocked: Set<string>): boolean {
  if (unlocked.has(cardId)) return true;
  const m = /^pc(\d+)$/.exec(cardId);
  if (!m) return false;
  const n = m[1];
  return unlocked.has(`photocard-${String(parseInt(n, 10)).padStart(3, '0')}`) || unlocked.has(`photocard-${n}`);
}

/** Collection — photocard grid (세로 영상 배경 위 콘텐츠). 실제 저장된 해금 기준으로 표시 */
export function CollectionScreen({ userId }: { userId?: string }) {
  const { t } = useI18n();
  const [unlocked, setUnlocked] = useState<Set<string> | null>(null);

  useEffect(() => {
    let alive = true;
    (async () => {
      let ids: string[] = [];
      if (userId) {
        const rows = await loadUnlocks(userId);
        ids = rows.filter((r) => r.kind === 'photocard').map((r) => r.item_id);
      } else {
        ids = loadLocalProgress().unlocks;
      }
      if (alive) setUnlocked(new Set(ids));
    })();
    return () => { alive = false; };
  }, [userId]);

  const ownedCount = unlocked ? PLAYER.cards.filter((c) => isOwned(c.id, unlocked)).length : 0;

  return (
    <ScreenBg
      video="assets/bg/cards.mp4"
      poster="assets/bg/cards.jpg"
      appbar={
        <div className="appbar appbar--abs">
          <span className="appbar__brand">{t('collection')}</span>
          <span className="appbar__right">{ownedCount} / {PLAYER.cards.length}</span>
        </div>
      }
      head={
        <>
          <span className="scr__badge">{t('collected')(ownedCount, PLAYER.cards.length)}</span>
          <h1 className="scr__title">{t('collection_hero')}</h1>
          <p className="scr__sub">{t('collection_sub')}</p>
        </>
      }
    >
      <div className="screen">
        {!unlocked ? (
          <div className="screen-loading" role="status" aria-label="loading">
            <span className="screen-loading__spinner" />
          </div>
        ) : PLAYER.cards.length === 0 ? (
          <div className="state">
            <span className="state__ic"><Icon name="cards" size={24} /></span>
            <span className="state__t">{t('collection_hero')}</span>
            <span className="state__d">{t('collection_sub')}</span>
          </div>
        ) : (
          <div className="cardgrid">
            {PLAYER.cards.map((c, i) => {
              const owned = isOwned(c.id, unlocked);
              return (
                <div key={c.id} className={`pcard${owned ? '' : ' is-locked'}`}>
                  <img src={c.img} alt={`photocard ${i + 1}`} loading="lazy" />
                  {!owned && <div className="pcard__lock"><Icon name="lock" size={18} /></div>}
                </div>
              );
            })}
          </div>
        )}
      </div>
    </ScreenBg>
  );
}
