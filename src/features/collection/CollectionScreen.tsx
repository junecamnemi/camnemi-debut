import { PLAYER } from '../../content/player';
import { Icon } from '../../components/Icon';
import { HeroCarousel } from '../../components/HeroCarousel';
import { useI18n } from '../../i18n';

/** Collection — photocard grid */
export function CollectionScreen() {
  const { t } = useI18n();
  const owned = PLAYER.cards.filter((c) => c.owned).length;

  return (
    <>
      <HeroCarousel small badge={t('collected')(owned, PLAYER.cards.length)}
                    title={t('collection_hero')} subtitle={t('collection_sub')} />

      <div className="appbar">
        <span className="appbar__brand">{t('collection')}</span>
        <span className="appbar__right">{owned} / {PLAYER.cards.length}</span>
      </div>

      <div className="screen">
        <div className="cardgrid">
          {PLAYER.cards.map((c, i) => (
            <div key={c.id} className={`pcard${c.owned ? '' : ' is-locked'}`}>
              <img src={c.img} alt={`photocard ${i + 1}`} loading="lazy" />
              {!c.owned && <div className="pcard__lock"><Icon name="lock" size={18} /></div>}
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
