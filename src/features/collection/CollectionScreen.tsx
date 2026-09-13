import { PLAYER } from '../../content/player';
import { Icon } from '../../components/Icon';
import { ScreenBg } from '../../components/ScreenBg';
import { useI18n } from '../../i18n';

/** Collection — photocard grid (세로 영상 배경 위 콘텐츠) */
export function CollectionScreen() {
  const { t } = useI18n();
  const owned = PLAYER.cards.filter((c) => c.owned).length;

  return (
    <ScreenBg
      video="assets/bg/cards.mp4"
      poster="assets/bg/cards.jpg"
      appbar={
        <div className="appbar appbar--abs">
          <span className="appbar__brand">{t('collection')}</span>
          <span className="appbar__right">{owned} / {PLAYER.cards.length}</span>
        </div>
      }
      head={
        <>
          <span className="scr__badge">{t('collected')(owned, PLAYER.cards.length)}</span>
          <h1 className="scr__title">{t('collection_hero')}</h1>
          <p className="scr__sub">{t('collection_sub')}</p>
        </>
      }
    >
      <div className="screen">
        {PLAYER.cards.length === 0 ? (
          <div className="state">
            <span className="state__ic"><Icon name="cards" size={24} /></span>
            <span className="state__t">{t('collection_hero')}</span>
            <span className="state__d">{t('collection_sub')}</span>
          </div>
        ) : (
          <div className="cardgrid">
            {PLAYER.cards.map((c, i) => (
              <div key={c.id} className={`pcard${c.owned ? '' : ' is-locked'}`}>
                <img src={c.img} alt={`photocard ${i + 1}`} loading="lazy" />
                {!c.owned && <div className="pcard__lock"><Icon name="lock" size={18} /></div>}
              </div>
            ))}
          </div>
        )}
      </div>
    </ScreenBg>
  );
}
