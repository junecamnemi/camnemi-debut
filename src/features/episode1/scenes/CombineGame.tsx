import { useState, useEffect } from 'react';
import type { CombineQuestion } from '../../../types/game';

interface Props {
  question: CombineQuestion;
  onAnswered: (correct: boolean) => void;
}

/** 자음+모음 조합 미니게임 — 정답 판정 + 피드백 */
export function CombineGame({ question, onAnswered }: Props) {
  const [picked, setPicked] = useState<string | null>(null);
  const correct = picked === question.answer;

  useEffect(() => { setPicked(null); }, [question]);

  function pick(opt: string) {
    if (picked) return;
    setPicked(opt);
    onAnswered(opt === question.answer);
  }

  return (
    <div className="card dlg">
      <div className="mg__q">
        {question.q}
        <small>{question.qen}</small>
      </div>

      <div className="combo">
        <div className="combo__tile">{question.a}</div>
        <span className="combo__op">+</span>
        <div className="combo__tile">{question.b}</div>
        <span className="combo__op">=</span>
        <div className="combo__tile combo__tile--res">{picked ? question.answer : '?'}</div>
      </div>

      <div className="opts">
        {question.opts.map((opt, i) => {
          const cls = picked
            ? opt === question.answer ? ' is-correct'
              : opt === picked ? ' is-wrong' : ''
            : '';
          return (
            <button key={opt} className={`opt${cls}`} onClick={() => pick(opt)} disabled={!!picked}>
              <span className="opt__k">{'ABCD'[i]}</span>
              <span className="opt__t">{opt}</span>
            </button>
          );
        })}
      </div>

      {picked && (
        <div className={`fb ${correct ? 'fb--ok' : 'fb--no'}`}>
          {correct ? '✅ ' + question.ok : '⚠️ ' + question.no}
        </div>
      )}
    </div>
  );
}
