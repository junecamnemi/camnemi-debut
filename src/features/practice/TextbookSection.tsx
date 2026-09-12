import { useState, useEffect } from 'react';
import { Icon } from '../../components/Icon';
import { TEXTBOOK } from '../../content/textbook';
import './glowsis-book.css';
import './textbook.css';

interface Section { cls: string; html: string }
interface BookUnit { id: number; sections: Section[] }
interface Page { type: string; blocks: string[] }

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

/** 단원의 섹션을 책 페이지로 묶기 (원본 glowsis-view.js groupPages 이식) */
function groupPages(unit: BookUnit): Page[] {
  const secs = unit.sections || [];
  const pages: Page[] = [];
  const cover: Page = { type: 'cover', blocks: [] };   // unit-flag + sec-title + story
  let talk: Page | null = null;                        // goals + dialogue
  const mid: Page[] = [];                              // grammar/vocab/practice/culture
  let cur: Page | null = null;

  for (const s of secs) {
    const t = s.cls;
    if (t === 'unit-flag' || t === 'sec-title' || t === 'story') {
      cover.blocks.push(s.html);
    } else if (t === 'goals' || t === 'dialog') {
      if (!talk) talk = { type: 'talk', blocks: [] };
      talk.blocks.push(s.html);
    } else if (t === 'grammar' || t === 'vocab-grid' || t === 'vocab-lab' || t === 'practice' || t === 'culture' || t === 'teach') {
      const pg = (t === 'vocab-grid' || t === 'vocab-lab') ? 'vocab' : t;
      const cap = (pg === 'grammar' || pg === 'practice') ? 2 : 1;
      if (!cur || cur.type !== pg || cur.blocks.length >= cap) {
        if (cur) mid.push(cur);
        cur = { type: pg, blocks: [s.html] };
      } else {
        cur.blocks.push(s.html);
      }
    }
  }
  if (cur) mid.push(cur);

  if (cover.blocks.length) pages.push(cover);
  if (talk) pages.push(talk);
  mid.forEach((p) => pages.push(p));
  return pages;
}

const LABELS: Record<string, string> = {
  cover: 'Start', talk: 'Talk', goals: 'Goals', dialog: 'Talk',
  grammar: 'Grammar', teach: 'Teacher', vocab: 'Words', practice: 'Practice', culture: 'Culture',
};

/** 훈련 → 교재 (Glowsis Korean 1A~2B) · 책(플립) 형태 */
export function TextbookSection() {
  const [levelIdx, setLevelIdx] = useState(0);
  const [units, setUnits] = useState<BookUnit[]>([]);
  const [openIdx, setOpenIdx] = useState<number | null>(null);
  const [page, setPage] = useState(0);
  const lvl = TEXTBOOK[levelIdx];

  useBook(lvl.file, (u) => { setUnits(u); setOpenIdx(null); });

  // ── 단원 뷰어 (플립북) ──
  if (openIdx !== null && units[openIdx]) {
    const u = units[openIdx];
    const pages = groupPages(u);
    const p = pages[Math.min(page, pages.length - 1)] ?? { type: 'cover', blocks: [] };
    const last = page >= pages.length - 1;
    const meta = lvl.units.find((x) => Number(x.no) === u.id) ?? lvl.units[openIdx];

    return (
      <div className="tb2">
        <div className="tb2__bar">
          <button className="tb2__back" onClick={() => { setOpenIdx(null); setPage(0); }}>
            <Icon name="chev" size={15} /> 단원 목록
          </button>
          <div className="tb2__crumb">Glowsis Korean {lvl.level}</div>
        </div>

        <div className="tb2__head">
          <div className="tb2__no">UNIT {meta?.no ?? u.id}</div>
          <div className="tb2__ti">{meta?.title ?? ''}</div>
          {meta?.en && <div className="tb2__en">{meta.en}</div>}
        </div>

        <div className="book">
          <div className="book__spine" />
          <div className="book__page" key={page}>
            {p.blocks.map((html, i) => (
              <div key={i} className="book__blk" dangerouslySetInnerHTML={{ __html: html }} />
            ))}
          </div>
        </div>

        <div className="book__nav">
          <button className="book__arrow" disabled={page === 0} onClick={() => setPage(Math.max(0, page - 1))}>
            <Icon name="chev" size={18} />
          </button>
          <div className="book__dots">
            {pages.map((pg, i) => (
              <button key={i}
                className={`book__dot${i === page ? ' on' : ''}`}
                title={LABELS[pg.type] ?? 'Page'}
                onClick={() => setPage(i)} />
            ))}
          </div>
          <button className="book__arrow book__arrow--r" disabled={last} onClick={() => setPage(Math.min(pages.length - 1, page + 1))}>
            <Icon name="chev" size={18} />
          </button>
        </div>

        <div className="book__foot">
          <span className="book__lb">{LABELS[p.type] ?? 'Page'}</span>
          <span className="book__num">{page + 1} / {pages.length}</span>
        </div>
      </div>
    );
  }

  // ── 레벨 + 단원 목록 ──
  return (
    <div className="tb2">
      <div className="block">
        <span className="block__t">Glowsis Korean {lvl.level}</span>
        <span className="block__x">{lvl.units.length} units</span>
      </div>

      <div className="lvbar">
        {TEXTBOOK.map((l, i) => (
          <button key={l.level} className={`lvchip${i === levelIdx ? ' on' : ''}`} onClick={() => setLevelIdx(i)}>
            {l.level}
          </button>
        ))}
      </div>

      <div className="tblist">
        {lvl.units.map((u, i) => (
          <button key={i} className="tbrow" onClick={() => { setOpenIdx(i); setPage(0); }}>
            <span className="tbrow__no">{u.no}</span>
            <span className="tbrow__tx">
              <span className="tbrow__ti">{u.title}</span>
              <span className="tbrow__en">{u.en}</span>
            </span>
            <Icon name="chev" size={16} />
          </button>
        ))}
      </div>
    </div>
  );
}
