import type { Member } from '../../../types/game';

interface Props {
  member: Member;
  value: string;
  onChange: (v: string) => void;
}

const SUGGEST = ['루나', '스텔라', '하늘', '별이'];

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
      <h3>이 아이돌의 예명을 지어주세요</h3>
      <div className="naming__sub">직접 지은 이름으로 데뷔해요<br />Give your idol a stage name</div>

      <input
        className="naming__in"
        value={value}
        maxLength={12}
        placeholder="예: 루나, 스텔라, 하늘…"
        onChange={(e) => onChange(e.target.value)}
      />
      <div className="naming__hint">한글 또는 영문 2~12자 {valid && '· 데뷔 준비 완료!'}</div>

      <div className="chips">
        {SUGGEST.map((s) => (
          <button key={s} className="chip" onClick={() => onChange(s)}>{s}</button>
        ))}
      </div>
    </div>
  );
}
