import { useState } from 'react';
import type { FinalWord } from '../../../types/game';
import { speak } from '../../../services/tts';

interface Props { finals: FinalWord[] }

/** 받침(종성) 개념 — 글자 아래에 오는 자음. 예시 낱말 탭 → 발음(TTS) */
export function FinalLesson({ finals }: Props) {
  const [played, setPlayed] = useState<string | null>(null);

  function play(f: FinalWord) {
    setPlayed(f.word);
    void speak(f.word, { speed: -2 });
  }

  return (
    <>
      <div className="sec__head">
        <span className="sec__title">받침</span>
        <span className="sec__sub">Final consonants · {finals.length}개</span>
      </div>

      <div className="card final-expl">
        <div className="final-expl__row">
          <span className="final-expl__cell"><i>ㅂ</i><b>밥</b><em>받침 ㅂ</em></span>
          <span className="final-expl__arrow">→</span>
          <span className="final-expl__txt">
            자음이 <b>글자 아래</b>에 오면 <b>받침</b>이에요.<br />
            받침은 소리를 <b>닫아</b> 줍니다.
          </span>
        </div>
      </div>

      <div className="fgrid">
        {finals.map((f) => (
          <button
            key={f.word}
            className={`fcard${played === f.word ? ' is-played' : ''}`}
            onClick={() => play(f)}
          >
            <div className="fcard__w">{f.word}</div>
            <div className="fcard__f">받침 {f.final}</div>
            <div className="fcard__r">[{f.reading}]</div>
            <div className="fcard__m">{f.meaning}</div>
          </button>
        ))}
      </div>

      <div className="card dlg" style={{ marginTop: 'var(--sp-4)' }}>
        <div className="dlg__ko" style={{ fontSize: 16 }}>🔊 카드를 눌러 소리를 들어보세요</div>
        <div className="dlg__en">Tap a card — the final consonant closes the sound.</div>
      </div>
    </>
  );
}
