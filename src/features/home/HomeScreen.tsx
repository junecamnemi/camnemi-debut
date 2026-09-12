import { MEMBERS } from '../../content/members';
import { PLAYER, CAREER } from '../../content/player';
import { Icon } from '../../components/Icon';
import { useI18n } from '../../i18n';

/** Home — 노래하는 아란 세로 영상 배경 + 하단 CTA */
export function HomeScreen({ onGo }: { onGo: (tab: 'train' | 'story' | 'cards' | 'my') => void }) {
  const { t, lang } = useI18n();
  const m = MEMBERS[PLAYER.memberId];
  const name = lang === 'ko' ? m.ko : m.en;

  return (
    <div className="home">
      {/* 배경: 노래하는 아란 (세로) */}
      <div className="home__bgwrap">
        <video
          className="home__bg"
          src="assets/carousel/aran_sing_v.mp4"
          poster="assets/carousel/aran_sing_v.jpg"
          autoPlay loop muted playsInline preload="auto"
        />
        <div className="home__scrim" />

        <div className="appbar appbar--abs">
          <span className="appbar__brand">GLOWSIS</span>
          <span className="appbar__right">🔥 {t('streak')(PLAYER.streakDays)}</span>
        </div>

        <div className="home__head">
          <span className="home__badge">{t('home_today')}</span>
          <h1 className="home__title">{t('home_hero_title')}</h1>
          <p className="home__sub">{t('home_hero_sub')}</p>
        </div>

        {/* Continue — 아래로 내림 */}
        <div className="home__cta">
          <button className="btn btn--primary" onClick={() => onGo('story')}>{t('continue')}</button>
        </div>
      </div>

      <div className="screen">
        <div className="block">
          <div className="block__h">{t('home_my_idol')}</div>
          <div className="profile profile--mini">
            <img className="profile__av" src={m.portrait} alt={PLAYER.stageName} />
            <div className="profile__txt">
              <div className="profile__name">{PLAYER.stageName}</div>
              <div className="profile__meta">
                {name} · {t(CAREER.find((c) => c.key === PLAYER.careerKey)!.labelKey)} · {PLAYER.careerPct}%
              </div>
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
    </div>
  );
}
