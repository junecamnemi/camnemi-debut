import { useEffect, useState } from 'react';
import { MEMBERS } from '../../content/members';
import { PLAYER, STATE_KEY, CAREER, type CareerKey } from '../../content/player';
import { Icon } from '../../components/Icon';
import { ScreenBg } from '../../components/ScreenBg';
import { useI18n, type Lang } from '../../i18n';
import { loadGameState } from '../../services/game';
import { loadLocalProgress } from '../../services/localProgress';

/** 저장된 career_stage 문자열 → CAREER 단계 키 매핑 (EP.1은 '연습생'으로 저장됨) */
function careerKeyOf(stage: string | null | undefined): CareerKey {
  if (stage === 'entry' || stage === 'rookie' || stage === 'team' || stage === 'debut_ready' || stage === 'debut') {
    return stage;
  }
  if (stage === '연습생') return 'rookie';
  return PLAYER.careerKey;
}

interface Profile {
  stageName: string;
  careerStage: string;
  careerPct: number;
}

/** My — idol profile · career · stats · skills · language · account (세로 영상 배경 위 콘텐츠) */
export function MyScreen({ onLogout, authed, userId }: { onLogout?: () => void; authed?: boolean; userId?: string }) {
  const { t, lang, setLang } = useI18n();
  const m = MEMBERS[PLAYER.memberId];
  const name = (lang === 'ko' ? m.ko : m.en);
  const p = PLAYER;
  const [profile, setProfile] = useState<Profile | null>(null);

  // 예명 + 커리어 복원 (계정: game_state / 게스트: 로컬) — 나머지는 데모값 유지
  useEffect(() => {
    let alive = true;
    (async () => {
      if (userId) {
        const st = await loadGameState(userId);
        if (!alive) return;
        setProfile({
          stageName: st?.stage_name ?? PLAYER.stageName,
          careerStage: st?.career_stage ?? PLAYER.careerKey,
          careerPct: st?.career_pct ?? PLAYER.careerPct,
        });
      } else {
        const lp = loadLocalProgress();
        if (alive) {
          setProfile({
            stageName: lp.stageName ?? PLAYER.stageName,
            careerStage: lp.careerStage ?? PLAYER.careerKey,
            careerPct: lp.careerPct,
          });
        }
      }
    })();
    return () => { alive = false; };
  }, [userId]);

  const stageName = profile?.stageName ?? '';
  const careerKey = careerKeyOf(profile?.careerStage);
  const careerPct = profile?.careerPct ?? 0;
  const curIdx = Math.max(0, CAREER.findIndex((c) => c.key === careerKey));
  const cur = CAREER[curIdx];

  const LANGS: { id: Lang; label: string }[] = [
    { id: 'en', label: 'English' },
    { id: 'ko', label: '한국어' },
  ];

  return (
    <ScreenBg
      video="assets/bg/my.mp4"
      poster="assets/bg/my.jpg"
      appbar={
        <div className="appbar appbar--abs">
          <span className="appbar__brand">GLOWSIS</span>
          <span className="appbar__right"><Icon name="gear" size={19} /></span>
        </div>
      }
      head={
        <>
          <span className="scr__badge">{t('my_profile')}</span>
          <h1 className="scr__title">‘{profile ? stageName : '…'}’</h1>
          <p className="scr__sub">{name} · {t(cur.labelKey)} · {careerPct}%</p>
        </>
      }
    >
      <div className="screen">
        {!profile ? (
          <div className="screen-loading" role="status" aria-label="loading">
            <span className="screen-loading__spinner" />
          </div>
        ) : (
          <>
            {/* profile */}
            <div className="profile">
              <img className="profile__av" src={m.portrait} alt={stageName} />
              <div className="profile__txt">
                <div className="profile__name">{stageName}</div>
                <div className="profile__meta">{name} · {m.roleEn ?? m.role}</div>
                <div className="profile__badge">{t(cur.labelKey)}</div>
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
          </>
        )}
      </div>
    </ScreenBg>
  );
}
