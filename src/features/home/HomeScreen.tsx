import { MEMBERS } from '../../content/members';
import { PLAYER, CAREER } from '../../content/player';
import { Icon } from '../../components/Icon';
import { useI18n } from '../../i18n';
import { useHearts, fmtNum } from '../../hooks/useHearts';

/** Home — 고정된 세로 배경(노래하는 아란) + 하단 CTA + 하트 카운터 */
export function HomeScreen({ onGo }: { onGo: (tab: 'train' | 'story' | 'cards' | 'my') => void }) {
  const { t, lang } = useI18n();
  const m = MEMBERS[PLAYER.memberId];
  const name = lang === 'ko' ? m.ko : m.en;
  const hearts = useHearts(PLAYER.hearts);

  return (
    <div className="home">
      {/* 배경: 노래하는 아란 (고정 프레임 — 움직임 없음) */}
      <div className="home__bgwrap">
        <img className="home__bg" src="assets/carousel/aran_profile_v.jpg" alt="" />
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
            <div className="hearts" title="fans sending love">
              <Icon name="heart" size={15} />
              <span className="hearts__n">{fmtNum(hearts)}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
