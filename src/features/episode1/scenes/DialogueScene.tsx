import type { DialogueLine, Member } from '../../types/game';

interface Props {
  member: Member;
  line: DialogueLine;
}

/** 대화 씬 — 캐릭터(루프 영상) + 대사 버블 */
export function DialogueScene({ member, line }: Props) {
  const halo = `var(${member.color})`;
  return (
    <div className="scene" style={{ '--halo': halo } as React.CSSProperties}>
      <div className="char">
        <div className="char__halo" />
        {member.loop ? (
          <video
            className="char__vid"
            src={member.loop}
            poster={member.portrait}
            autoPlay
            loop
            muted
            playsInline
          />
        ) : (
          <img className="char__vid" src={member.portrait} alt={member.ko} />
        )}
        <div className="char__tag">
          <span className="char__dot" />
          <b>{member.ko}</b>
          <i>{member.en} · {member.role}</i>
        </div>
      </div>

      <div className="card dlg" style={{ marginTop: 'var(--sp-4)' }}>
        <div className="dlg__who"><i />{line.who}</div>
        <div className="dlg__ko">{line.ko}</div>
        {line.en && <div className="dlg__en">{line.en}</div>}
        {line.tip && <div className="dlg__tip">✨ {line.tip}</div>}
      </div>
    </div>
  );
}
