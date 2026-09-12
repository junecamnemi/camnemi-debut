import type { DialogueLine, Member } from '../../../types/game';

interface Props {
  member: Member;
  line: DialogueLine;
}

/**
 * 대화 씬 — EP.1 장면 이미지(있으면) 또는 캐릭터 루프 영상.
 * 장면 이미지는 켄번즈(느린 줌/팬) + 빛 입자로 "애니메이션 장면"처럼 연출.
 */
export function DialogueScene({ member, line }: Props) {
  const halo = `var(${member.color})`;

  return (
    <div className="scene" style={{ '--halo': halo } as React.CSSProperties}>
      <div className="char char--scene">
        <div className="char__halo" />

        {line.sceneVideo ? (
          <div className="sceneframe" key={line.sceneVideo}>
            <video className="sceneframe__vid" src={line.sceneVideo} poster={line.scene}
                   autoPlay loop muted playsInline preload="metadata" />
            <div className="sceneframe__vig" />
          </div>
        ) : line.scene ? (
          <div className="sceneframe" key={line.scene}>
            <img className="sceneframe__img" src={line.scene} alt="" />
            <div className="sceneframe__light" />
            <span className="p p1" /><span className="p p2" /><span className="p p3" /><span className="p p4" />
            <div className="sceneframe__vig" />
          </div>
        ) : member.loop ? (
          <video className="char__vid" src={member.loop} poster={member.portrait}
                 autoPlay loop muted playsInline />
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
