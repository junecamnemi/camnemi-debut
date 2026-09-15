import { useEffect, useRef, useState } from 'react';
import type { EpisodeReward } from '../../../types/game';

interface Props {
  stageName: string;
  rewards: EpisodeReward[];
  no?: number;
  subtitle?: string;
}

/** 포토카드 오픈 전 대기 시간 (ms) — 짧게, 탭으로 건너뛸 수 있다 */
const REVEAL_MS = 1350;

/** 리빌 스파클 입자 — 결정론적으로 생성 (경량 CSS 애니메이션) */
const SPARKS = Array.from({ length: 10 }, (_, i) => ({
  left: `${(i * 37 + 11) % 100}%`,
  top: `${(i * 53 + 7) % 100}%`,
  delay: `${(i % 5) * 0.06}s`,
}));

/** 보상 씬 — 확정 해금 목록. 포토카드는 긴장감 있는 오픈 연출 후 공개. */
export function RewardScene({ stageName, rewards, no, subtitle }: Props) {
  // 동작 감소 설정이면 애니메이션 없이 즉시 카드 공개 (초기 상태로 결정)
  const prefersReduced =
    typeof window !== 'undefined' && window.matchMedia?.('(prefers-reduced-motion: reduce)')?.matches;
  const [revealed, setRevealed] = useState(() => prefersReduced);
  const timer = useRef<number | null>(null);

  useEffect(() => {
    if (prefersReduced) return;
    timer.current = window.setTimeout(() => setRevealed(true), REVEAL_MS);
    return () => { if (timer.current !== null) window.clearTimeout(timer.current); };
  }, [prefersReduced]);

  const noLabel = typeof no === 'number' ? `No.${String(no).padStart(3, '0')}` : 'No.001';
  const sub = subtitle || 'First recruit · Hangul first step complete';

  return (
    <div className="card reward">
      <button
        type="button"
        className={`reward__pc-wrap${revealed ? ' is-revealed' : ''}`}
        onClick={() => setRevealed(true)}
        aria-label={revealed ? 'Photocard unlocked' : 'Reveal photocard'}
        aria-pressed={revealed}
      >
        {!revealed ? (
          <span className="reward__pc-back" aria-hidden="true">
            <span className="reward__pc-q">?</span>
          </span>
        ) : (
          <>
            <img className="reward__pc" src="assets/photocards/pc0.webp" alt="photocard" />
            <span className="reward__pc-spark" aria-hidden="true">
              {SPARKS.map((s, i) => (
                <i key={i} style={{ left: s.left, top: s.top, animationDelay: s.delay }} />
              ))}
            </span>
          </>
        )}
      </button>

      <div className="reward__name">‘{stageName}’</div>
      <div className="reward__h">Photocard {noLabel} unlocked</div>
      <div className="reward__sub">{sub}</div>

      <div className="reward__list">
        {rewards.map((r) => (
          <div key={r.label} className="reward__item">
            <span className="reward__ic">{r.icon}</span>
            {r.label}
          </div>
        ))}
      </div>
    </div>
  );
}
