interface HudProps {
  epLabel: string;
  careerLabel: string;
  progress: number; // 0~100
}

/** 상단 HUD — 브랜드 · 에피소드 · 커리어 진행바 */
export function Hud({ epLabel, careerLabel, progress }: HudProps) {
  return (
    <header className="hud">
      <div className="hud__row">
        <span className="hud__brand">GLOWSIS</span>
        <span className="hud__ep">{epLabel}</span>
      </div>
      <div className="hud__career">
        <span className="hud__label">{careerLabel}</span>
        <div className="hud__bar">
          <div className="hud__fill" style={{ width: `${progress}%` }} />
        </div>
      </div>
    </header>
  );
}
