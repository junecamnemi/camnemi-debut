import { useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import { Icon } from '../../components/Icon';
import { ScreenBg } from '../../components/ScreenBg';
import { useI18n } from '../../i18n';
import { STORY } from '../../content/story';
import { cutsFor } from '../../content/cuts';
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

/** 미리보기 컷씬 슬라이드쇼 타이밍(ms) — story.css .stslides__img transition/키프레임과 맞춘다. */
const ST_HOLD_MS = 4000;  // 각 컷 유지 시간(크로스페이드 1.2s 는 story.css 에서 정의)

/** 모션 최소화 선호 여부(접근성) */
function prefersReducedMotion(): boolean {
  return typeof window !== 'undefined'
    && window.matchMedia?.('(prefers-reduced-motion: reduce)').matches;
}

/**
 * 에피소드 컷씬 스틸 슬라이드쇼 — EP.{no} 의 4컷(16:9 랜드스케이프)을
 * 천천히 크로스페이드 + 켄번즈(느린 줌/팬)로 자동 재생한다.
 * - 프리뷰 시트가 열려 있는 동안만 타이머를 돌리고, 닫히면 unmount 로 정리.
 * - 모션 최소화 선호 시 타이머를 돌리지 않고 첫 컷만 정지 표시(CSS 도 애니 정지).
 */
function StSlideshow({ no }: { no: number }) {
  const cuts = cutsFor(no);
  const [active, setActive] = useState(0);
  const [reduced] = useState(() => prefersReducedMotion());

  useEffect(() => {
    if (reduced || cuts.length <= 1) return;
    const timer = window.setInterval(() => {
      setActive((a) => (a + 1) % cuts.length);
    }, ST_HOLD_MS);
    return () => window.clearInterval(timer);
  }, [reduced, cuts.length]);

  return (
    <div className="stslides" aria-hidden="true">
      {cuts.map((src, i) => (
        <img
          key={src}
          src={src}
          alt=""
          loading="eager"
          decoding="async"
          draggable={false}
          className={`stslides__img${i === active ? ' is-active' : ''}`}
        />
      ))}
    </div>
  );
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
      poster="assets/bg/story_aran.jpg"
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
              <StSlideshow key={open.no} no={open.no} />
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
