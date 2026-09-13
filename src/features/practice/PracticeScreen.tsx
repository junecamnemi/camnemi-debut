import { useEffect, useState } from 'react';
import { PRACTICE, KIND_ICON, type PracticeKind } from '../../content/practice';
import { Icon } from '../../components/Icon';
import { ScreenBg } from '../../components/ScreenBg';
import { TextbookSection } from './TextbookSection';
import { speakScript } from '../../services/tts';
import { loadDailyQuestions } from '../../services/game';
import { useI18n, type TKey } from '../../i18n';

type Source = PracticeKind | 'daily';

/** 문제풀이 모드의 레벨 라벨 — 헤더/배지가 항상 이 값으로 일치해야 함 */
const PRACTICE_LEVEL = 'TOPIK I';

/** Train — practice problems + textbook (세로 영상 배경 위 콘텐츠) */
export function PracticeScreen() {
  const { t } = useI18n();
  const [mode, setMode] = useState<'practice' | 'textbook'>('practice');
  const [kind, setKind] = useState<Source | null>(null);
  const [qi, setQi] = useState(0);
  const [picked, setPicked] = useState<number | null>(null);
  const [audioMsg, setAudioMsg] = useState<'fallback' | 'error' | null>(null);
  const [daily, setDaily] = useState<{ loading: boolean; qs: unknown[] }>({ loading: true, qs: [] });

  useEffect(() => {
    let alive = true;
    const day = new Date().toISOString().slice(0, 10);
    loadDailyQuestions(day)
      .then((qs) => { if (alive) setDaily({ loading: false, qs }); })
      .catch(() => { if (alive) setDaily({ loading: false, qs: [] }); });
    return () => { alive = false; };
  }, []);

  const list = kind === 'daily'
    ? (daily.qs as typeof PRACTICE)
    : kind ? PRACTICE.filter((q) => q.kind === kind) : [];
  const q = list[qi];

  function pick(i: number) { if (picked === null) setPicked(i); }
  function nextQ() {
    if (qi + 1 < list.length) { setQi(qi + 1); setPicked(null); }
    else { setKind(null); setQi(0); setPicked(null); }
  }
  function playAudio() {
    if (!q?.audio) return;
    setAudioMsg(null);
    void speakScript(q.audio).then((res) => { if (res !== 'ok') setAudioMsg(res); });
  }

  const kindKey: Record<PracticeKind, TKey> = { read: 'kind_read', listen: 'kind_listen', vocab: 'kind_vocab' };

  return (
    <ScreenBg
      video="assets/bg/train.mp4"
      poster="assets/bg/train.jpg"
      appbar={
        <div className="appbar appbar--abs">
          <span className="appbar__brand">{t('train')}</span>
          <span className="appbar__right">{PRACTICE_LEVEL}</span>
        </div>
      }
      head={
        <>
          <span className="scr__badge">{mode === 'practice' ? PRACTICE_LEVEL : t('train_textbook')}</span>
          <h1 className="scr__title">{mode === 'practice' ? t('train_hero_title') : t('train_tb_title')}</h1>
          <p className="scr__sub">{mode === 'practice' ? t('train_hero_sub') : t('train_tb_sub')}</p>
        </>
      }
    >
      <div className="segbar">
        <button className={`seg${mode === 'practice' ? ' on' : ''}`} onClick={() => setMode('practice')}>{t('train_practice')}</button>
        <button className={`seg${mode === 'textbook' ? ' on' : ''}`} onClick={() => setMode('textbook')}>{t('train_textbook')}</button>
      </div>

      <div className="screen">
        {mode === 'textbook' ? <TextbookSection /> : kind === 'daily' && !q ? (
          <div className="card">
            <div className="qprompt">{daily.loading ? t('loading') : t('daily_empty')}</div>
            <button className="btn btn--primary" onClick={() => { setKind(null); setQi(0); setPicked(null); }}>{t('back_menu')}</button>
          </div>
        ) : !q ? (
          <>
            <button className="tile" onClick={() => { setKind('daily'); setQi(0); setPicked(null); }}>
              <span className="tile__ic"><Icon name="story" size={20} /></span>
              <span><span className="tile__t">{t('daily_title')}</span>
                <span className="tile__d">{daily.loading ? t('loading') : t('questions_n')(daily.qs.length)}</span></span>
              <Icon name="chev" size={18} />
            </button>
            {(['read', 'listen', 'vocab'] as PracticeKind[]).map((k) => {
              const n = PRACTICE.filter((x) => x.kind === k).length;
              return (
                <button key={k} className="tile" onClick={() => { setKind(k); setQi(0); setPicked(null); }}>
                  <span className="tile__ic"><Icon name={KIND_ICON[k]} size={20} /></span>
                  <span><span className="tile__t">{t(kindKey[k])}</span>
                    <span className="tile__d">{t('questions_n')(n)}</span></span>
                  <Icon name="chev" size={18} />
                </button>
              );
            })}
          </>
        ) : (
          <>
            <div className="qmeta">
              <span className="qtag">{t(kindKey[q.kind])}</span>
              <span className="qtag qtag--lv">{PRACTICE_LEVEL}</span>
              <span className="qprog">{qi + 1} / {list.length}</span>
            </div>
            <div className="card">
              <div className="qprompt">{q.prompt}</div>
              {q.passage && <div className="qpassage">{q.passage}</div>}
              {q.kind === 'listen' && q.audio && (
                <button className="qaudio" onClick={playAudio}><Icon name="play" size={18} /> {t('play_audio')}</button>
              )}
              {audioMsg === 'fallback' && <div className="qfb no">ℹ️ {t('audio_fallback')}</div>}
              {audioMsg === 'error' && <div className="qfb no">⚠️ {t('audio_failed')}</div>}
            </div>
            <div className="qopts">
              {q.opts.map((o, i) => {
                const isPicked = picked === i;
                const isAns = i === q.answer;
                const cls = picked === null ? '' : isAns ? ' is-correct' : isPicked ? ' is-wrong' : ' is-dim';
                return (
                  <button key={i} className={`qa${cls}`} onClick={() => pick(i)} disabled={picked !== null}>
                    <span className="qa__k">{'①②③④'[i]}</span>{o}
                  </button>
                );
              })}
            </div>
            {picked !== null && (
              <>
                <div className={`qfb${picked === q.answer ? ' ok' : ' no'}`}>
                  {picked === q.answer ? `✅ ${t('correct')}` : `💡 ${t('incorrect')}`} {q.explain}
                </div>
                <button className="btn btn--primary" onClick={nextQ}>
                  {qi + 1 < list.length ? t('next') : t('back_menu')}
                </button>
              </>
            )}
          </>
        )}
      </div>
    </ScreenBg>
  );
}
