import { useRef, useEffect, useState } from 'react';
import type { WriteTask } from '../../../types/game';
import { speak } from '../../../services/tts';
import { useI18n } from '../../../i18n';

interface Props {
  task: WriteTask;
  charIdx: number;
  onCharDone: (isLast: boolean) => void;
}

/** 쓰기 연습 — 실제 아이돌 이름을 손으로 따라쓰고, 잉크량으로 인식 판정 */
export function WritingPractice({ task, charIdx, onCharDone }: Props) {
  const { t } = useI18n();
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const drawing = useRef(false);
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

  function check() {
    const cv = canvasRef.current!;
    const ctx = cv.getContext('2d')!;
    const d = ctx.getImageData(0, 0, cv.width, cv.height).data;
    let ink = 0;
    for (let i = 3; i < d.length; i += 4) if (d[i] > 20) ink++;
    const ratio = ink / (cv.width * cv.height);

    if (ratio > 0.01) {
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
      setFb({ ok: false, msg: 'Almost — trace over the guide letter ✍️' });
    }
  }



  return (
    <div className="card dlg">
      <div className="write__label">✍️ {t('write_trace')}</div>
      <div className="write__word">{task.word} ({task.roman}) — letter {charIdx + 1}/{chars.length}: “{target}”</div>

      <div className="write__pad">
        <div className="write__guide">
          <div className={`write__gb${done ? ' is-done' : ''}`}>{target}</div>
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
        <button className="wbtn" onClick={check}>{t("check")}</button>
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
