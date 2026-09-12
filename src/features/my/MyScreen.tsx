import { MEMBERS } from '../../content/members';
import { PLAYER, STATE_KEY, CAREER } from '../../content/player';
import { Icon } from '../../components/Icon';
import { HeroCarousel } from '../../components/HeroCarousel';
import { useI18n, type Lang } from '../../i18n';

/** My — idol profile · career · stats · skills · language · account */
export function MyScreen({ onLogout, authed }: { onLogout?: () => void; authed?: boolean }) {
  const { t, lang, setLang } = useI18n();
  const m = MEMBERS[PLAYER.memberId];
  const name = (lang === 'ko' ? m.ko : m.en);
  const p = PLAYER;
  const curIdx = CAREER.findIndex((c) => c.key === p.careerKey);

  const LANGS: { id: Lang; label: string }[] = [
    { id: 'en', label: 'English' },
    { id: 'ko', label: '한국어' },
  ];

  return (
    <>
      <div className="appbar">
        <span className="appbar__brand">GLOWSIS</span>
        <span className="appbar__right"><Icon name="gear" size={19} /></span>
      </div>

      <HeroCarousel small badge={t('my_profile')} title={`‘${p.stageName}’`}
                    subtitle={`${name} · ${t(CAREER[curIdx].labelKey)}`} />

      

      <div className="screen">
        {/* profile */}
        <div className="profile">
          <img className="profile__av" src={m.portrait} alt={p.stageName} />
          <div className="profile__txt">
            <div className="profile__name">{p.stageName}</div>
            <div className="profile__meta">{name} · {m.roleEn ?? m.role}</div>
            <div className="profile__badge">{t(CAREER[curIdx].labelKey)}</div>
          </div>
        </div>

        {/* stats */}
        <div className="stats">
          <div className="stat"><b>{p.streakDays}</b><span>{t('stat_streak')}</span></div>
          <div className="stat"><b>{p.studyDays}</b><span>{t('stat_days')}</span></div>
          <div className="stat"><b>{p.mastered}</b><span>{t('stat_mastered')}</span></div>
        </div>

        {/* career path */}
        <div className="block">
          <div className="block__h">{t('my_path')}</div>
          <div className="path">
            {CAREER.map((c, i) => (
              <div key={c.key} className={`path__step${i < curIdx ? ' is-done' : i === curIdx ? ' is-now' : ''}`}>
                <span className="path__dot" />
                <span className="path__lb">{t(c.labelKey)}</span>
              </div>
            ))}
          </div>
        </div>

        {/* skills */}
        <div className="block">
          <div className="block__h">{t('my_skills')}</div>
          {p.skills.map((s) => (
            <div key={s.label} className="skill">
              <span className={`skill__badge is-${s.state}`}>{t(STATE_KEY[s.state])}</span>
              <span className="skill__txt">{s.label}</span>
              <span className="skill__unit">{s.unit}</span>
            </div>
          ))}
        </div>

        {/* cards preview */}
        <div className="block">
          <div className="block__h">{t('my_cards')}</div>
          <div className="cardrow">
            {p.cards.slice(0, 4).map((c) => (
              <div key={c.id} className={`pcard pcard--sm${c.owned ? '' : ' is-locked'}`}>
                <img src={c.img} alt="" loading="lazy" />
              </div>
            ))}
          </div>
        </div>

        {/* language */}
        <div className="block">
          <div className="block__h">{t('my_language')}</div>
          <div className="langbar">
            {LANGS.map((l) => (
              <button key={l.id} className={`langbtn${lang === l.id ? ' on' : ''}`}
                      onClick={() => setLang(l.id)}>
                {l.label}
              </button>
            ))}
          </div>
        </div>

        {/* account */}
        <div className="block">
          <button className="tile" onClick={onLogout}>
            <span className="tile__ic"><Icon name="user" size={20} /></span>
            <span><span className="tile__t">{authed ? t('logout') : t('login')}</span>
              <span className="tile__d">{authed ? t('logout_d') : t('login_d')}</span></span>
            <Icon name="chev" size={18} />
          </button>
        </div>
      </div>
    </>
  );
}
