import { useEffect, useState } from 'react';
import { MEMBERS } from '../../content/members';
import { PLAYER, STATE_KEY, CAREER, normalizeCareerKey, isOwned } from '../../content/player';
import { Icon } from '../../components/Icon';
import { ScreenBg } from '../../components/ScreenBg';
import { useI18n, type Lang } from '../../i18n';
import { loadUnlockedCardIds } from '../../services/game';
import { usePlayerProfile } from '../../hooks/usePlayerProfile';

/** My — idol profile · career · stats · skills · language · account (세로 영상 배경 위 콘텐츠) */
export function MyScreen({ onLogout, authed, userId }: { onLogout?: () => void; authed?: boolean; userId?: string }) {
  const { t, lang, setLang } = useI18n();
  const m = MEMBERS[PLAYER.memberId];
  const name = (lang === 'ko' ? m.ko : m.en);
  const p = PLAYER;
  const { profile, saveStageName } = usePlayerProfile();
  const [unlocked, setUnlocked] = useState<Set<string> | null>(null);
  const [editing, setEditing] = useState(false);
  const [draft, setDraft] = useState('');
  const ownedCount = unlocked ? p.cards.filter((c) => isOwned(c.id, unlocked)).length : 0;

  // 해금된 포토카드 id 로드 (계정/게스트 동일 기준) — 컬렉션 탭과 일치
  useEffect(() => {
    let alive = true;
    void loadUnlockedCardIds(userId).then((ids) => { if (alive) setUnlocked(ids); });
    return () => { alive = false; };
  }, [userId]);

  const stageName = profile?.stageName ?? '';
  const careerKey = normalizeCareerKey(profile?.careerStage);
  const careerPct = profile?.careerPct ?? 0;
  const curIdx = Math.max(0, CAREER.findIndex((c) => c.key === careerKey));
  const cur = CAREER[curIdx];

  function startEdit() {
    setDraft(stageName);
    setEditing(true);
  }
  function cancelEdit() {
    setEditing(false);
    setDraft('');
  }
  async function commitEdit() {
    const trimmed = draft.trim();
    if (trimmed.length < 2) return;
    await saveStageName(trimmed);
    setEditing(false);
    setDraft('');
  }

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
          <h1 className="scr__title">‘{stageName || '…'}’</h1>
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
                {editing ? (
                  <div className="profile__editrow">
                    <input
                      className="profile__editin"
                      value={draft}
                      maxLength={12}
                      autoFocus
                      placeholder={PLAYER.stageName}
                      onChange={(e) => setDraft(e.target.value)}
                      onKeyDown={(e) => {
                        if (e.key === 'Enter') void commitEdit();
                        else if (e.key === 'Escape') cancelEdit();
                      }}
                    />
                    <button
                      className="btn btn--primary"
                      disabled={draft.trim().length < 2}
                      onClick={() => void commitEdit()}
                      aria-label={t('save_name')}
                    >
                      <Icon name="check" size={16} />
                    </button>
                    <button className="btn btn--ghost" onClick={cancelEdit} aria-label={t('cancel')}>
                      <Icon name="x" size={16} />
                    </button>
                  </div>
                ) : (
                  <div className="profile__name">{stageName}</div>
                )}
                <div className="profile__meta">{name} · {m.roleEn ?? m.role}</div>
                <div className="profile__badge">{t(cur.labelKey)}</div>
              </div>
              {!editing && (
                <button className="profile__edit" onClick={startEdit} aria-label={t('edit_name')}>
                  <Icon name="pencil" size={13} />
                </button>
              )}
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
              <div className="block__h">{t('my_cards')}{unlocked ? ` · ${ownedCount} / ${p.cards.length}` : ''}</div>
              {!unlocked ? (
                <div className="screen-loading screen-loading--sm" role="status" aria-label="loading">
                  <span className="screen-loading__spinner" />
                </div>
              ) : (
                <div className="cardrow">
                  {p.cards.slice(0, 4).map((c) => {
                    const owned = isOwned(c.id, unlocked);
                    return (
                      <div key={c.id} className={`pcard pcard--sm${owned ? '' : ' is-locked'}`}>
                        <img src={c.img} alt="" loading="lazy" />
                      </div>
                    );
                  })}
                </div>
              )}
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
