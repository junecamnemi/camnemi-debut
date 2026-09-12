import { useState, useEffect } from 'react';
import { Icon } from '../../components/Icon';
import { TEXTBOOK } from '../../content/textbook';

interface Section { cls: string; html: string }
interface BookUnit { id: number; sections: Section[] }

/** book data script(window.GLOWSIS_BOOK)를 로드 */
function useBook(file: string, onLoad: (units: BookUnit[]) => void) {
  useEffect(() => {
    let cancelled = false;
    (window as unknown as { GLOWSIS_BOOK?: BookUnit[] }).GLOWSIS_BOOK = undefined;
    const s = document.createElement('script');
    s.src = file;
    s.onload = () => {
      if (cancelled) return;
      onLoad((window as unknown as { GLOWSIS_BOOK?: BookUnit[] }).GLOWSIS_BOOK || []);
    };
    document.body.appendChild(s);
    return () => { cancelled = true; s.remove(); };
  }, [file]);
}

/** 훈련 → 교재 (최신 Glowsis Korean 1A~6B — GLOWSIS STORY / GLOW POINT / TOPIK TYPE) */
export function TextbookSection() {
  const [levelIdx, setLevelIdx] = useState(0);
  const [units, setUnits] = useState<BookUnit[]>([]);
  const [openIdx, setOpenIdx] = useState<number | null>(null);
  const lvl = TEXTBOOK[levelIdx];

  useBook(lvl.file, (u) => { setUnits(u); setOpenIdx(null); });

  // 단원 뷰어
  if (openIdx !== null && units[openIdx]) {
    const u = units[openIdx];
    return (
      <div className="tb-reader">
        <button className="tb-back" onClick={() => setOpenIdx(null)}>
          <Icon name="chev" size={16} /> 목록으로
        </button>
        <div className="tb-reader__head">
          <span className="tb-reader__lvl">{lvl.level}</span>
          <span className="tb-reader__t">{lvl.units[openIdx]?.title || `Unit ${u.id}`}</span>
        </div>
        <div className="tb-content">
          {u.sections.map((sec, i) => (
            <div key={i} className={`tb-sec tb-sec--${sec.cls}`} dangerouslySetInnerHTML={{ __html: sec.html }} />
          ))}
        </div>
      </div>
    );
  }

  return (
    <>
      {/* 레벨 선택 */}
      <div className="lvbar">
        {TEXTBOOK.map((l, i) => (
          <button key={l.level} className={`lvchip${i === levelIdx ? ' on' : ''}`} onClick={() => setLevelIdx(i)}>
            {l.level}
          </button>
        ))}
      </div>

      {/* 단원 목록 */}
      <div className="block">
        <div className="block__h">
          <span className="block__t">Glowsis Korean {lvl.level}</span>
          <span className="block__more">{lvl.units.length} 단원</span>
        </div>
        {lvl.units.map((u, i) => (
          <button key={i} className="epi" onClick={() => setOpenIdx(i)}>
            <span className="epi__no">{u.no || i}</span>
            <span className="epi__meta">
              <span className="epi__t">{u.title}</span>
              {u.en && <span className="epi__d">{u.en}</span>}
            </span>
            <span className="epi__play"><Icon name="play" size={14} /></span>
          </button>
        ))}
      </div>
    </>
  );
}
