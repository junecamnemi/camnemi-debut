import { useEffect, useState } from 'react';
import { Icon } from '../../components/Icon';
import { ScreenBg } from '../../components/ScreenBg';
import { useI18n } from '../../i18n';
import { STORY } from '../../content/story';
import type { StoryEpisode } from '../../types/game';
import './story.css';

/** 화별 진행 상태 — 현재는 EP.1~3 완료 · EP.4 진행 중, 나머지는 성장하면 열림 */
function stateOf(no: number): 'done' | 'now' | 'locked' {
  if (no <= 3) return 'done';
  if (no === 4) return 'now';
  return 'locked';
}

/** Story — EP.1~16 전체 스토리(제목·설명·대화·장면) + 장면 미리보기 시트 */
export function StoryScreen({ onPlay }: { onPlay?: (n: 1 | 2 | 3 | 4) => void }) {
  const { t, lang } = useI18n();
  const [open, setOpen] = useState<StoryEpisode | null>(null);
  const done = STORY.filter((e) => stateOf(e.no) === 'done').length;

  // 프리뷰 시트 열림 시 배경 스크롤 잠금 + ESC 닫기
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') setOpen(null); };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [open]);

  const playable = (no: number): no is 1 | 2 | 3 | 4 => no >= 1 && no <= 4;

  return (
    <ScreenBg
      video="assets/bg/story.mp4"
      poster="assets/bg/story.jpg"
      appbar={
        <div className="appbar appbar--abs">
          <span className="appbar__brand">{t('story')}</span>
          <span className="appbar__right">EP.{done}/{STORY.length}</span>
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
        {onPlay && (
          <button className="btn btn--primary" onClick={() => onPlay(4)}>
            {lang === 'ko' ? STORY[3].titleKo : STORY[3].titleEn} · {t('story_play')}
          </button>
        )}
        <div className="block">
          {STORY.map((e) => {
            const st = stateOf(e.no);
            return (
              <button
                key={e.no}
                className={`epi${st === 'locked' ? ' is-locked' : ''}`}
                onClick={() => setOpen(e)}
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
      </div>

      {open && (
        <div className="stsheet" role="dialog" aria-modal="true">
          <button className="stsheet__bd" aria-label={t('story_close')} onClick={() => setOpen(null)} />
          <div className="stsheet__panel">
            <div className="stsheet__media">
              {open.sceneVideo
                ? <video src={open.sceneVideo} poster={open.scene} autoPlay loop muted playsInline />
                : open.scene && <img src={open.scene} alt="" />}
              <div className="stsheet__scrim" />
              <button className="stsheet__x" aria-label={t('story_close')} onClick={() => setOpen(null)}>
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
              <button className="btn btn--ghost" onClick={() => setOpen(null)}>{t('story_close')}</button>
            </div>
          </div>
        </div>
      )}
    </ScreenBg>
  );
}
