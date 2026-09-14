import { useRef, useEffect, useState } from 'react';
import type { WriteTask } from '../../../types/game';
import { speak } from '../../../services/tts';
import { useI18n } from '../../../i18n';

interface Props {
  task: WriteTask;
  charIdx: number;
  onCharDone: (isLast: boolean) => void;
}

/** 잉크(찍힌 영역)를 나누는 거친 격자 크기 (가로×세로 동일) */
const GRID = 48;
/** 그린 셀 중 기준 글자와 겹친 비율 하한 — 낙서/엉뚱한 곳에 그리기 걸러냄 */
const MIN_PRECISION = 0.25;
/** 기준 글자 셀 중 그리기가 덮은 비율 하한 — 대충 비슷하면 OK */
const MIN_COVERAGE = 0.35;
/** IoU (intersection / union) 하한 — 정밀하지 않아도 전체적인 닮은꼴이면 통과 */
const MIN_IOU = 0.25;

/** 쓰기 연습 — 실제 아이돌 이름을 손으로 따라쓰고, 목표 글자(글리프)와의 격자 오버랩으로 인식 판정 */
export function WritingPractice({ task, charIdx, onCharDone }: Props) {
  const { t } = useI18n();
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const gbRef = useRef<HTMLDivElement>(null);
  const drawing = useRef(false);
  const retryTimer = useRef<number | undefined>(undefined);
  const [done, setDone] = useState(false);
  const [fb, setFb] = useState<{ ok: boolean; msg: string } | null>(null);
  const chars = [...task.word];
  const target = chars[charIdx];

  // 캔버스 초기화 (고해상도)
  useEffect(() => {
    const cv = canvasRef.current;
    if (!cv) return;
    const rect = cv.getBoundingClientRect();
    cv.width = rect.width * 2;
    cv.height = rect.height * 2;
    const ctx = cv.getContext('2d')!;
    ctx.scale(2, 2);
    ctx.lineWidth = 5;
    ctx.lineCap = 'round';
    ctx.lineJoin = 'round';
    ctx.strokeStyle = '#a878ff';
  }, []);

  useEffect(() => {
    setDone(false);
    setFb(null);
    clear();
  }, [charIdx, task.word]);

  // 언마운트 시 대기 중인 자동 지우기 타이머 정리
  useEffect(() => () => {
    if (retryTimer.current !== undefined) window.clearTimeout(retryTimer.current);
  }, []);

  function clear() {
    const cv = canvasRef.current;
    if (cv) cv.getContext('2d')!.clearRect(0, 0, cv.width, cv.height);
  }

  function pos(e: React.PointerEvent) {
    const cv = canvasRef.current!;
    const b = cv.getBoundingClientRect();
    return [e.clientX - b.left, e.clientY - b.top] as const;
  }
  function down(e: React.PointerEvent) {
    drawing.current = true;
    const ctx = canvasRef.current!.getContext('2d')!;
    ctx.beginPath();
    ctx.moveTo(...pos(e));
  }
  function move(e: React.PointerEvent) {
    if (!drawing.current) return;
    const ctx = canvasRef.current!.getContext('2d')!;
    ctx.lineTo(...pos(e));
    ctx.stroke();
  }

  /** 캔버스의 잉크(alpha>0)를 GRID×GRID 격자 셀 인덱스 집합으로 추출 */
  function inkCells(cv: HTMLCanvasElement): Set<number> {
    const ctx = cv.getContext('2d')!;
    const w = cv.width;
    const h = cv.height;
    const d = ctx.getImageData(0, 0, w, h).data;
    const set = new Set<number>();
    const cw = w / GRID;
    const ch = h / GRID;
    for (let i = 3; i < d.length; i += 4) {
      if (d[i] > 20) {
        const p = i >> 2; // 픽셀 인덱스 (바이트 인덱스 / 4)
        const x = p % w;
        const y = (p - x) / w;
        set.add(Math.floor(y / ch) * GRID + Math.floor(x / cw));
      }
    }
    return set;
  }

  /** 목표 글자를 가이드와 같은 폰트/크기/중앙 정렬로 오프스크린에 그려 기준 마스크 생성 */
  function buildRefMask(): Set<number> {
    const cv = canvasRef.current!;
    const gb = gbRef.current!;
    const cvRect = cv.getBoundingClientRect();
    const gbRect = gb.getBoundingClientRect();
    // 가이드 글자의 중심(캔버스 기준, CSS px)
    const cx = gbRect.left + gbRect.width / 2 - cvRect.left;
    const cy = gbRect.top + gbRect.height / 2 - cvRect.top;

    const off = document.createElement('canvas');
    off.width = cv.width;
    off.height = cv.height;
    const octx = off.getContext('2d')!;
    octx.scale(2, 2);
    // getComputedStyle().font (shorthand)는 일부 브라우저에서 ""를 반환하므로 개별 속성으로 조합
    const cs = getComputedStyle(gb);
    octx.font = `${cs.fontWeight} ${cs.fontSize} ${cs.fontFamily}`;
    octx.textAlign = 'center';
    octx.textBaseline = 'middle';
    octx.fillStyle = '#000';
    octx.fillText(target, cx, cy);
    return inkCells(off);
  }

  function check() {
    const cv = canvasRef.current!;
    const ref = buildRefMask();
    const drawn = inkCells(cv);

    // 빈 캔버스·기준 미생성은 무조건 실패
    if (drawn.size === 0 || ref.size === 0) {
      setFb({ ok: false, msg: t('write_retry') });
      return;
    }

    let inter = 0;
    for (const c of drawn) if (ref.has(c)) inter++;

    const precision = inter / drawn.size; // 그린 셀 중 기준 글자와 겹친 비율
    const coverage = inter / ref.size;    // 기준 글자 셀 중 그리기가 덮은 비율
    const iou = inter / (drawn.size + ref.size - inter); // intersection over union

    const pass = (precision >= MIN_PRECISION && coverage >= MIN_COVERAGE) || iou >= MIN_IOU;

    if (pass) {
      if (retryTimer.current !== undefined) {
        window.clearTimeout(retryTimer.current);
        retryTimer.current = undefined;
      }
      setDone(true);
      const isLast = charIdx >= chars.length - 1;
      setFb({
        ok: true,
        msg: isLast
          ? `🎉 ${t('write_done')} "${task.word}"`
          : `✅ ${t('write_great')} "${target}"`,
      });
      void speak('Great job');
      onCharDone(isLast);
    } else {
      setFb({ ok: false, msg: t('write_retry') });
      // 잠시 후 자동으로 지워 다시 그릴 수 있게
      if (retryTimer.current !== undefined) window.clearTimeout(retryTimer.current);
      retryTimer.current = window.setTimeout(() => clear(), 900);
    }
  }

  return (
    <div className="card dlg">
      <div className="write__label">✍️ {t('write_trace')}</div>
      <div className="write__word">{task.word} ({task.roman}) — letter {charIdx + 1}/{chars.length}: "{target}"</div>

      <div className="write__pad">
        <div className="write__guide">
          <div ref={gbRef} className={`write__gb${done ? ' is-done' : ''}`}>{target}</div>
        </div>
        <canvas
          ref={canvasRef}
          className="write__cv"
          onPointerDown={down}
          onPointerMove={move}
          onPointerUp={() => (drawing.current = false)}
          onPointerLeave={() => (drawing.current = false)}
        />
      </div>

      <div className="write__tools">
        <button className="wbtn" onClick={clear}>Clear</button>
        <button className="wbtn" onClick={check}>{t('check')}</button>
      </div>

      <div className="write__dots">
        {chars.map((_, i) => (
          <div key={i} className={`wdot${i < charIdx || (i === charIdx && done) ? ' is-done' : ''}`} />
        ))}
      </div>

      {fb && <div className={`fb ${fb.ok ? 'fb--ok' : 'fb--no'}`}>{fb.msg}</div>}
    </div>
  );
}