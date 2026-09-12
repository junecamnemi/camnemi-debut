import { useState } from 'react';
import type { JamoItem } from '../../../types/game';
import { speak } from '../../../services/tts';

interface Props {
  stage: 'cons' | 'vow';
  consonants: JamoItem[];
  vowels: JamoItem[];
}

/** 한글 자음·모음 학습 — 카드 탭 → 발음(TTS) */
export function JamoLesson({ stage, consonants, vowels }: Props) {
  const [played, setPlayed] = useState<string | null>(null);
  const [msg, setMsg] = useState('카드를 눌러 소리를 들어보세요 🔊');
  const list = stage === 'cons' ? consonants : vowels;
  const title = stage === 'cons' ? '자음' : '모음';
  const sub = stage === 'cons' ? 'Consonants' : 'Vowels';

  function play(j: string, r: string) {
    setPlayed(j);
    setMsg(`🔊 ${j} — 소리 [${r}]`);
    void speak(j, { speed: -2 });  // CLOVA (자모는 조금 천천히)
  }

  return (
    <>
      <div className="sec__head">
        <span className="sec__title">{title}</span>
        <span className="sec__sub">{sub}</span>
      </div>
      <div className="jgrid">
        {list.map((item) => (
          <button
            key={item.j}
            className={`jcard${played === item.j ? ' is-played' : ''}`}
            onClick={() => play(item.j, item.r)}
          >
            <div className="jcard__j">{item.j}</div>
            <div className="jcard__r">{item.r}</div>
          </button>
        ))}
      </div>
      <div className="card dlg" style={{ marginTop: 'var(--sp-4)' }}>
        <div className="dlg__ko" style={{ fontSize: 16 }}>{msg}</div>
        <div className="dlg__en">Listen and repeat.</div>
      </div>
    </>
  );
}
