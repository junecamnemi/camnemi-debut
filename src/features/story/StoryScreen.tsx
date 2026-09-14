import { useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import { Icon } from '../../components/Icon';
import { ScreenBg } from '../../components/ScreenBg';
import { useI18n } from '../../i18n';
import { STORY } from '../../content/story';
import { loadGameState } from '../../services/game';
import { loadLocalProgress } from '../../services/localProgress';
import type { StoryEpisode, EpisodeNo } from '../../types/game';
import './story.css';

/** 화별 진행 상태 — 실제 저장된 furthest_episode(계정)/로컬(게스트) 기준 */
function stateOf(no: number, furthest: number): 'done' | 'now' | 'locked' {
  if (no <= furthest) return 'done';
  if (no === furthest + 1) return 'now';
  return 'locked';
}

/** Story — EP.1~16 전체 스토리(제목·설명·대화·장면) + 장면 미리보기 시트 */
export function StoryScreen({ onPlay, userId }: { onPlay?: (n: EpisodeNo) => void; userId?: string }) {
  const { t, lang } = useI18n();
  const [open, setOpen] = useState<StoryEpisode | null>(null);
  const [furthest, setFurthest] = useState<number | null>(null);

  // 실제 저장된 진행 로드 (계정: game_state.furthest_episode / 게스트: 로컬) — 기본 1
  useEffect(() => {
    let alive = true;
    (async () => {
      let f = 1;
      if (userId) {
        const st = await loadGameState(userId);
        f = st?.furthest_episode ?? 1;
      } else {
        f = loadLocalProgress().furthestEpisode;
      }
      if (alive) setFurthest(f);
    })();
    return () => { alive = false; };
  }, [userId]);

  // open 상태 미러 — popstate 핸들러에서 항상 최신값을 참조
  const openRef = useRef(open);
  useEffect(() => { openRef.current = open; }, [open]);

  // 프리뷰 열기 — 히스토리 엔트리를 하나 더 쌓아 브라우저 '뒤로'로 시트를 닫을 수 있게 함
  function openPreview(e: StoryEpisode) {
    setOpen(e);
    try {
      const cur = window.history.state && typeof window.history.state === 'object' ? window.history.state : {};
      window.history.pushState({ ...cur, storyPreview: e.no }, '');
    } catch { /* 샌드박스 등 pushState 불가 시 무시 */ }
  }

  // 프리뷰 닫기 (✕ / 백드롭 / 닫기 버튼 / ESC) — 쌓아둔 히스토리 엔트리 정리
  function closePreview() {
    setOpen(null);
    try {
      const st = window.history.state as { storyPreview?: number } | null;
      if (st && typeof st === 'object' && st.storyPreview != null) {
        window.history.back();
      }
    } catch { /* noop */ }
  }

  // ESC 키 + 브라우저 '뒤로'로 프리뷰 닫기 (백드롭/✕ 는 위 closePreview 사용)
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') closePreview(); };
    const onPop = () => { if (openRef.current) setOpen(null); };
    window.addEventListener('keydown', onKey);
    window.addEventListener('popstate', onPop);
    return () => {
      window.removeEventListener('keydown', onKey);
      window.removeEventListener('popstate', onPop);
    };
  }, []);

  const playable = (no: number): no is EpisodeNo => no >= 1 && no <= 16;

  const loaded = furthest !== null;
  const fv = furthest ?? 1;
  const done = loaded ? STORY.filter((e) => e.no <= fv).length : 0;
  const nextNo = Math.min(fv + 1, STORY.length) as EpisodeNo;
  const nextEp = loaded && fv < STORY.length ? STORY[nextNo - 1] : null;

  return (
    <ScreenBg
      video="assets/bg/story_aran.mp4"
      poster="assets/chars/aran.webp"
      appbar={
        <div className="appbar appbar--abs">
          <span className="appbar__brand">{t('story')}</span>
          <span className="appbar__right">{loaded ? `EP.${done}/${STORY.length}` : 'EP.…'}</span>
        </div>
      }
      head={
        <>
          <span className="scr__badge">{t('story_hero_badge')}</span>
          <h1 className="scr__title">{t('story_hero_title')}</h1>
          <p className="scr__sub">{t('story_hero_sub')}</p>
        </>
      }
    >
      <div className="screen">
        {!loaded ? (
          <div className="screen-loading" role="status" aria-label="loading">
            <span className="screen-loading__spinner" />
          </div>
        ) : (
          <>
            {onPlay && nextEp && (
              <button className="btn btn--primary" onClick={() => onPlay(nextNo)}>
                {lang === 'ko' ? nextEp.titleKo : nextEp.titleEn} · {t('story_play')}
              </button>
            )}
            <div className="block">
              {STORY.map((e) => {
                const st = stateOf(e.no, fv);
                return (
                  <button
                    key={e.no}
                    className={`epi${st === 'locked' ? ' is-locked' : ''}`}
                    onClick={() => openPreview(e)}
                  >
                    <span className={`epi__no${st === 'done' ? ' is-done' : st === 'now' ? ' is-now' : ' locked'}`}>{e.no}</span>
                    <span className="epi__txt">
                      <span className="epi__t">{lang === 'ko' ? e.titleKo : e.titleEn}</span>
                      <span className="epi__d">{lang === 'ko' ? e.descKo : e.descEn}</span>
                    </span>
                    {st === 'done' ? <span className="epi__st">✓</span>
                      : st === 'now' ? <span className="epi__play"><Icon name="play" size={16} /></span>
                      : <span className="epi__lock"><Icon name="lock" size={15} /></span>}
                  </button>
                );
              })}
            </div>
          </>
        )}
      </div>

      {open && createPortal(
        <div className="stsheet" role="dialog" aria-modal="true">
          <button className="stsheet__bd" aria-label={t('story_close')} onClick={closePreview} />
          <div className="stsheet__panel">
            <div className="stsheet__media">
              {open.sceneVideo
                ? <video src={open.sceneVideo} poster={open.scene} autoPlay loop muted playsInline />
                : open.scene && <img src={open.scene} alt="" />}
              <div className="stsheet__scrim" />
              <button className="stsheet__x" aria-label={t('story_close')} onClick={closePreview}>
                <Icon name="x" size={18} />
              </button>
              <div className="stsheet__head">
                <span className="stsheet__no">EP.{open.no}</span>
                <h2 className="stsheet__title">{lang === 'ko' ? open.titleKo : open.titleEn}</h2>
                <p className="stsheet__sub">{lang === 'ko' ? open.descKo : open.descEn}</p>
              </div>
            </div>

            <div className="stsheet__body">
              <span className="stsheet__focus">
                <b>{t('story_focus')}</b>
                {lang === 'ko' ? open.focusKo : open.focusEn}
              </span>

              <ul className="stlines">
                {open.lines.map((l, i) => (
                  <li className="stline" key={i}>
                    <span className="stline__who">{l.who}</span>
                    <span className="stline__ko">{l.ko}</span>
                    <span className="stline__en">{l.en}</span>
                  </li>
                ))}
              </ul>

              {playable(open.no) && onPlay ? (
                <button className="btn btn--primary" onClick={() => {
                  const no = open.no;
                  if (playable(no)) { setOpen(null); onPlay(no); }
                }}>
                  {t('story_play')} · EP.{open.no}
                </button>
              ) : (
                <span className="stsheet__note">{t('story_locked_note')}</span>
              )}
              <button className="btn btn--ghost" onClick={closePreview}>{t('story_close')}</button>
            </div>
          </div>
        </div>,
        document.body,
      )}
    </ScreenBg>
  );
}
