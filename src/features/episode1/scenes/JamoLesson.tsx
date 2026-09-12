import { useState } from 'react';
import type { JamoItem } from '../../../types/game';
import { speak } from '../../../services/tts';

interface Props {
  title: string;   // 자음 / 모음 / 쌍자음 / 복합모음
  sub: string;     // Consonants · 14자
  items: JamoItem[];
  hint?: string;
}

/** 한글 자모 학습 — 카드 탭 → 이름/발음(TTS) */
export function JamoLesson({ title, sub, items, hint }: Props) {
  const [played, setPlayed] = useState<string | null>(null);
  const [msg, setMsg] = useState(hint ?? '카드를 눌러 소리를 들어보세요 🔊');

  function play(item: JamoItem) {
    setPlayed(item.j);
    setMsg(item.n ? `🔊 ${item.j} (${item.n}) — 소리 [${item.r}]` : `🔊 ${item.j} — 소리 [${item.r}]`);
    void speak(item.n ?? item.j, { speed: -2 });   // 이름으로 읽어 더 정확
  }

  return (
    <>
      <div className="sec__head">
        <span className="sec__title">{title}</span>
        <span className="sec__sub">{sub}</span>
      </div>
      <div className="jgrid">
        {items.map((item) => (
          <button
            key={item.j}
            className={`jcard${played === item.j ? ' is-played' : ''}`}
            onClick={() => play(item)}
          >
            <div className="jcard__j">{item.j}</div>
            <div className="jcard__r">{item.r}</div>
            {item.n && <div className="jcard__n">{item.n}</div>}
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
