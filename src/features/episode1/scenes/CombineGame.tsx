import { useState, useEffect, useRef } from 'react';
import type { CombineQuestion } from '../../../types/game';
import { useI18n } from '../../../i18n';

interface Props {
  question: CombineQuestion;
  onAnswered: (correct: boolean) => void;
}

/** 자음+모음 조합 미니게임 — 정답 판정 + 피드백 (오답 시 잠깐 보여주고 재시도) */
export function CombineGame({ question, onAnswered }: Props) {
  const { t } = useI18n();
  const [picked, setPicked] = useState<string | null>(null);
  const retryTimer = useRef<number | undefined>(undefined);
  const correct = picked === question.answer;

  // 새 문제로 바뀌면 선택 상태 초기화
  useEffect(() => { setPicked(null); }, [question]);

  // 언마운트 시 대기 중인 재시도 타이머 정리
  useEffect(() => () => {
    if (retryTimer.current !== undefined) window.clearTimeout(retryTimer.current);
  }, []);

  function pick(opt: string) {
    if (picked) return;
    setPicked(opt);
    const ok = opt === question.answer;
    onAnswered(ok);
    // 오답이면 ⚠️ 피드백을 잠깐 보여준 뒤 다시 선택할 수 있게 되돌린다 (재시도 → 막힘 방지).
    if (!ok) {
      retryTimer.current = window.setTimeout(() => setPicked(null), 1500);
    }
  }

  return (
    <div className="card dlg">
      <div className="mg__q">
        {question.qen}
        <small>{question.q}</small>
      </div>

      {(question.a || question.b) && (
        <div className="combo">
          <div className="combo__tile">{question.a}</div>
          <span className="combo__op">+</span>
          <div className="combo__tile">{question.b}</div>
          <span className="combo__op">=</span>
          <div className="combo__tile combo__tile--res">{picked ? question.answer : '?'}</div>
        </div>
      )}

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
          {correct ? '✅ ' + (question.okEn ?? question.ok) : '⚠️ ' + (question.noEn ?? question.no)}
          {!correct && <span className="fb__retry"> · {t('combine_retry')}</span>}
        </div>
      )}
    </div>
  );
}
