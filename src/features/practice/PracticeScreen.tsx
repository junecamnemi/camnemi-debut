import { useState } from 'react';
import { PRACTICE, KIND_LABEL, KIND_ICON, type PracticeKind } from '../../content/practice';
import { Icon } from '../../components/Icon';
import { HeroCarousel } from '../../components/HeroCarousel';
import { TextbookSection } from './TextbookSection';
import { speakScript } from '../../services/tts';

/** 훈련 — 문제풀이 연습 + 교재 */
export function PracticeScreen() {
  const [mode, setMode] = useState<'practice' | 'textbook'>('practice');

  return (
    <>
      <div className="appbar"><span className="appbar__brand">훈련</span>
        <span style={{ marginLeft: 'auto', fontSize: 12, fontWeight: 800, color: 'var(--ink-3)' }}>TOPIK I</span>
      </div>

      <HeroCarousel
        small={mode === 'textbook'}
        badge={mode === 'practice' ? 'TOPIK I' : '샛별 한국어'}
        title={mode === 'practice' ? '문제풀이 연습' : '교재로 배우기'}
        subtitle={mode === 'practice' ? '매일 새로 생성되는 문제로 실력을 쌓아요' : '1A ~ 6B · 단원별 문법·어휘·회화'}
      />

      {/* 모드 전환 */}
      <div className="segbar">
        <button className={`seg${mode === 'practice' ? ' on' : ''}`} onClick={() => setMode('practice')}>
          <Icon name="train" size={17} /> 문제풀이
        </button>
        <button className={`seg${mode === 'textbook' ? ' on' : ''}`} onClick={() => setMode('textbook')}>
          <Icon name="book" size={17} /> 교재
        </button>
      </div>

      {mode === 'practice' ? <PracticeSection /> : <div className="screen"><TextbookSection /></div>}
    </>
  );
}

/* ── 문제풀이 연습 ── */
function PracticeSection() {
  const [kind, setKind] = useState<PracticeKind>('read');
  const [idx, setIdx] = useState(0);
  const [picked, setPicked] = useState<number | null>(null);

  const list = PRACTICE.filter((q) => q.kind === kind);
  const q = list[idx % Math.max(list.length, 1)];

  function changeKind(k: PracticeKind) { setKind(k); setIdx(0); setPicked(null); }
  function next() { setPicked(null); setIdx((i) => i + 1); }
  function speak() {
    if (!q?.audio) return;
    void speakScript(q.audio);  // CLOVA TTS
  }

  const kinds: PracticeKind[] = ['read', 'listen', 'vocab'];

  return (
    <div className="screen">
      <div className="kinds">
        {kinds.map((k) => (
          <button key={k} className={`kind${kind === k ? ' is-on' : ''}`} onClick={() => changeKind(k)}>
            <Icon name={KIND_ICON[k]} size={24} />
            <span className="kind__t">{KIND_LABEL[k]}</span>
            <span className="kind__n">{PRACTICE.filter((x) => x.kind === k).length}문제</span>
          </button>
        ))}
      </div>

      {q ? (
        <div className="qcard">
          <div className="qcard__top">
            <span className="qtag">{KIND_LABEL[q.kind]}</span>
            <span className="qtag">{q.level}</span>
            <span className="qprog">{(idx % list.length) + 1} / {list.length}</span>
          </div>

          {q.kind === 'listen' && (
            <button className="speak" onClick={speak} style={{ marginBottom: 16 }}>
              <Icon name="play" size={18} /> 듣기 재생
            </button>
          )}
          {q.passage && <div className="qpassage">{q.passage}</div>}

          <div className="qprompt">{q.prompt}</div>

          <div className="qopts">
            {q.opts.map((o, i) => {
              const cls = picked !== null
                ? i === q.answer ? ' is-correct' : i === picked ? ' is-wrong' : ''
                : '';
              return (
                <button key={o} className={`qopt${cls}`} onClick={() => picked === null && setPicked(i)} disabled={picked !== null}>
                  <span className="qopt__k">{'①②③④'[i]}</span>
                  {o}
                </button>
              );
            })}
          </div>

          {picked !== null && (
            <div className="qexplain">
              {picked === q.answer ? '✅ 정답! ' : '⚠️ 오답 · '}{q.explain}
            </div>
          )}
        </div>
      ) : (
        <div className="qcard" style={{ textAlign: 'center', color: 'var(--ink-3)' }}>이 유형의 문제가 아직 없어요.</div>
      )}

      <button className="btn btn--primary" disabled={picked === null} onClick={next}>
        {picked === null ? '답을 선택하세요' : '다음 문제 →'}
      </button>
    </div>
  );
}
