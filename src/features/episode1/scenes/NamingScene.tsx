import type { Member } from '../../../types/game';

interface Props {
  member: Member;
  value: string;
  onChange: (v: string) => void;
}

const SUGGEST = ['Luna', 'Stella', 'Nova', 'Aria'];

/** 예명 짓기 — 사용자가 자기 아이돌의 이름을 직접 정한다 */
export function NamingScene({ member, value, onChange }: Props) {
  const valid = value.trim().length >= 2;
  return (
    <div className="card naming">
      <div className="naming__scene">
        <video src="assets/ep1/video/naming.mp4" poster="assets/ep1/ep1_naming.jpg"
               autoPlay loop muted playsInline preload="metadata" />
      </div>
      <img className="naming__av" src={member.portrait} alt={member.ko} />
      <h3>Give your idol a stage name</h3>
      <div className="naming__sub">Debut under the name you choose</div>

      <input
        className="naming__in"
        value={value}
        maxLength={12}
        placeholder="e.g. Luna, Stella, Nova…"
        onChange={(e) => onChange(e.target.value)}
      />
      <div className="naming__hint">2–12 letters {valid && '· ready to debut!'}</div>

      <div className="chips">
        {SUGGEST.map((s) => (
          <button key={s} className="chip" onClick={() => onChange(s)}>{s}</button>
        ))}
      </div>
    </div>
  );
}
