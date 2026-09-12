import { MEMBERS } from '../../content/members';
import { PLAYER, CAREER } from '../../content/player';
import { Icon } from '../../components/Icon';
import { HeroCarousel } from '../../components/HeroCarousel';
import { useI18n } from '../../i18n';

/** Home — my idol + today's training + quick tiles */
export function HomeScreen({ onGo }: { onGo: (tab: 'train' | 'story' | 'cards' | 'my') => void }) {
  const { t } = useI18n();
  const m = MEMBERS[PLAYER.memberId];

  return (
    <>
      <HeroCarousel badge={t('home_today')} title={t('home_hero_title')} subtitle={t('home_hero_sub')} />

      {/* 투명 헤더 — 히어로 위에 오버레이 */}
      <div className="appbar">
        <span className="appbar__brand">GLOWSIS</span>
        <span className="appbar__right">🔥 {t('streak')(PLAYER.streakDays)}</span>
      </div>

      <div className="screen">
        <button className="btn btn--primary" onClick={() => onGo('story')}>{t('continue')}</button>

        <div className="block">
          <div className="block__h">{t('home_my_idol')}</div>
          <div className="profile profile--mini">
            <img className="profile__av" src={m.portrait} alt={PLAYER.stageName} />
            <div className="profile__txt">
              <div className="profile__name">{PLAYER.stageName}</div>
              <div className="profile__meta">{m.ko} · {t(CAREER.find((c) => c.key === PLAYER.careerKey)!.labelKey)} · {PLAYER.careerPct}%</div>
            </div>
          </div>
        </div>

        <div className="block">
          <div className="block__h">{t('home_quick')}</div>
          <button className="tile" onClick={() => onGo('train')}>
            <span className="tile__ic"><Icon name="train" size={20} /></span>
            <span><span className="tile__t">{t('tile_practice')}</span>
              <span className="tile__d">{t('tile_practice_d')}</span></span>
            <Icon name="chev" size={18} />
          </button>
          <button className="tile" onClick={() => onGo('story')}>
            <span className="tile__ic"><Icon name="film" size={20} /></span>
            <span><span className="tile__t">{t('tile_story')}</span>
              <span className="tile__d">{t('tile_story_d')}</span></span>
            <Icon name="chev" size={18} />
          </button>
          <button className="tile" onClick={() => onGo('cards')}>
            <span className="tile__ic"><Icon name="cards" size={20} /></span>
            <span><span className="tile__t">{t('tile_cards')}</span>
              <span className="tile__d">{t('tile_cards_d')}</span></span>
            <Icon name="chev" size={18} />
          </button>
        </div>
      </div>
    </>
  );
}
