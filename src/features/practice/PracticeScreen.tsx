import { useEffect, useMemo, useState } from 'react';
import { KIND_ICON, type PracticeKind, type PracticeQ } from '../../content/practice';
import { Icon } from '../../components/Icon';
import { ScreenBg } from '../../components/ScreenBg';
import { TextbookSection } from './TextbookSection';
import { FanExpressions } from './FanExpressions';
import { speakScript } from '../../services/tts';
import { loadDailyQuestions, loadPracticeEvents, logEvent } from '../../services/game';
import { buildDailyQuestions, accumulateDailyPool, poolFor } from './practicePool';
import { useI18n, type TKey } from '../../i18n';

type Source = PracticeKind | 'daily';

/** 문제풀이 모드의 레벨 라벨 — 헤더/배지가 항상 이 값으로 일치해야 함 */
const PRACTICE_LEVEL = 'TOPIK I';

/** 오늘 날짜(YYYY-MM-DD) — 일일 문제 조회·기록 키 */
const todayISO = () => new Date().toISOString().slice(0, 10);

/** Train — practice problems + textbook (세로 영상 배경 위 콘텐츠) */
export function PracticeScreen({ userId }: { userId?: string }) {
  const { t } = useI18n();
  const [mode, setMode] = useState<'practice' | 'textbook'>('practice');
  const [kind, setKind] = useState<Source | null>(null);
  const [qi, setQi] = useState(0);
  const [picked, setPicked] = useState<number | null>(null);
  const [audioMsg, setAudioMsg] = useState<'fallback' | 'error' | null>(null);
  const [daily, setDaily] = useState<{ loading: boolean; qs: PracticeQ[] }>({ loading: true, qs: [] });
  /** 문항 id → 마지막 시도 정답 여부 (원장 game_events 에서 로드) */
  const [answered, setAnswered] = useState<Record<string, boolean>>({});
  const day = useMemo(() => todayISO(), []);

  useEffect(() => {
    let alive = true;
    loadDailyQuestions(day)
      .then((qs) => { if (alive) setDaily({ loading: false, qs: buildDailyQuestions(day, qs) }); })
      .catch(() => { if (alive) setDaily({ loading: false, qs: buildDailyQuestions(day, []) }); });
    return () => { alive = false; };
  }, [day]);

  /** 오늘 생성된 일일 문항을 로컬 풀에 누적 → read/listen 풀이 시간이 지나며 커진다 */
  const accumulated = useMemo(() => accumulateDailyPool(daily.qs), [daily.qs]);

  // 이미 푼 문제 표시 — 로그인 사용자만 (게스트는 기록 없음)
  useEffect(() => {
    if (!userId) return;
    let alive = true;
    loadPracticeEvents(userId)
      .then((rows) => {
        if (!alive) return;
        const m: Record<string, boolean> = {};
        for (const r of rows) if (r.ref && !(r.ref in m)) m[r.ref] = r.correct === true;  // 최신순 → 첫 값이 최종
        setAnswered(m);
      })
      .catch(() => { /* 기록 없으면 표시 안 함 */ });
    return () => { alive = false; };
  }, [userId]);

  const list = kind === 'daily'
    ? daily.qs
    : kind ? poolFor(kind, accumulated) : [];
  const q = list[qi];

  /** 오늘의 문제 진행도 — 푼 문항 수 */
  const dailyDone = useMemo(() => {
    return daily.qs.filter((x) => x?.id && answered[x.id] !== undefined).length;
  }, [daily.qs, answered]);

  function pick(i: number) {
    if (picked !== null || !q) return;
    setPicked(i);
    const correct = i === q.answer;
    setAnswered((m) => ({ ...m, [q.id]: correct }));
    if (userId) void logEvent(userId, 'practice', q.id, correct, { kind: q.kind, level: q.level, day });
  }
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
  const prev = q?.id ? answered[q.id] : undefined;

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
                <span className="tile__d">
                  {daily.loading ? t('loading')
                    : dailyDone > 0 ? `${daily.qs.length}${t('q_of')} ${dailyDone}${t('q_done')}`
                    : t('questions_n')(daily.qs.length)}
                </span></span>
              <Icon name="chev" size={18} />
            </button>
            <div className="segbar segbar--kinds">
              {(['read', 'listen', 'vocab'] as PracticeKind[]).map((k) => {
                const n = poolFor(k, accumulated).length;
                return (
                  <button key={k} className={`seg${kind === k ? ' on' : ''}`} onClick={() => { setKind(k); setQi(0); setPicked(null); }}>
                    <Icon name={KIND_ICON[k]} size={17} />
                    <span>{t(kindKey[k])}</span>
                    <span className="seg__n">{n}</span>
                  </button>
                );
              })}
            </div>
            <FanExpressions />
          </>
        ) : (
          <>
            <div className="qmeta">
              <span className="qtag">{t(kindKey[q.kind])}</span>
              <span className={`qtag qtag--lv${q.level === 'TOPIK II' ? ' is-ii' : ''}`}>{q.level}</span>
              {prev !== undefined && (
                <span className={`qtag qtag--done${prev ? ' is-ok' : ' is-no'}`}>
                  {prev ? `✓ ${t('q_seen_ok')}` : `↻ ${t('q_seen_no')}`}
                </span>
              )}
              <span className="qprog">{qi + 1} / {list.length}</span>
            </div>
            <div className="card">
              <div className="qprompt">{q.prompt}</div>
              {q.promptEn && <div className="qprompt__en">{q.promptEn}</div>}
              {q.passage && <div className="qpassage">{q.passage}</div>}
              {q.passageEn && <div className="qpassage__en">{q.passageEn}</div>}
              {q.kind === 'listen' && q.audio && (
                <button className="qaudio" onClick={playAudio}><Icon name="play" size={18} /> {t('play_audio')}</button>
              )}
              {q.kind === 'listen' && q.audioEn && <div className="qaudio__en">{q.audioEn}</div>}
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
