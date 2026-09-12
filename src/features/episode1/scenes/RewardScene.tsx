import type { EpisodeReward } from '../../../types/game';

interface Props {
  stageName: string;
  rewards: EpisodeReward[];
}

/** 보상 씬 — 확정 해금 목록. 과한 연출 없이 데이터/변화로 성취 표시. */
export function RewardScene({ stageName, rewards }: Props) {
  return (
    <div className="card reward">
      <img className="reward__pc" src="assets/photocards/pc0.webp" alt="photocard" />
      <div className="reward__name">‘{stageName}’</div>
      <div className="reward__h">Photocard No.001 unlocked</div>
      <div className="reward__sub">{'First recruit · Hangul first step complete'}</div>

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
