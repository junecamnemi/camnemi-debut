import { useRef, useState, type TouchEvent } from 'react';
import { cutsFor } from '../content/cuts';
import { useI18n } from '../i18n';
import './storyIntro.css';

interface Props {
  no: number;
  onDone: () => void;
}

/** 에피소드 시작 인트로 — 4컷 포트레이트 스토리보드.
 *  탭/스와이프로 1→4컷 전환, 마지막 컷 탭 또는 시작 버튼으로 레슨(dlg) 진입. */
export function StoryIntro({ no, onDone }: Props) {
  const { t } = useI18n();
  const cuts = cutsFor(no);
  const [idx, setIdx] = useState(0);
  const touchX = useRef<number | null>(null);

  const onTouchStart = (e: TouchEvent<HTMLDivElement>) => { touchX.current = e.touches[0].clientX; };
  const onTouchEnd = (e: TouchEvent<HTMLDivElement>) => {
    if (touchX.current == null) return;
    const dx = e.changedTouches[0].clientX - touchX.current;
    touchX.current = null;
    if (Math.abs(dx) < 40) return; // 탭 — onClick 이 처리
    setIdx((i) => (dx < 0 ? Math.min(cuts.length - 1, i + 1) : Math.max(0, i - 1)));
  };
  const tapAdvance = () => {
    if (idx < cuts.length - 1) setIdx(idx + 1);
    else onDone(); // 마지막 컷에서 탭 → 시작
  };

  return (
    <div className="intro">
      <div
        className="intro__frame"
        onTouchStart={onTouchStart}
        onTouchEnd={onTouchEnd}
        onClick={tapAdvance}
        role="group"
        aria-label={`EP.${no} intro`}
      >
        <div className="intro__track" style={{ transform: `translateX(-${idx * 100}%)` }}>
          {cuts.map((src, i) => (
            <img
              key={src}
              className="intro__slide"
              src={src}
              alt={`EP.${no} cut ${i + 1}`}
              loading={i === 0 ? 'eager' : 'lazy'}
              draggable={false}
            />
          ))}
        </div>
        <div className="intro__dots">
          {cuts.map((_, i) => (
            <button
              key={i}
              className={`intro__dot${i === idx ? ' on' : ''}`}
              aria-label={`Cut ${i + 1}`}
              tabIndex={-1}
              onClick={(e) => { e.stopPropagation(); setIdx(i); }}
            />
          ))}
        </div>
        <span className="intro__count">{idx + 1}/{cuts.length}</span>
      </div>

      <button className="btn btn--primary intro__start" onClick={onDone}>
        {t('intro_start')}
      </button>
    </div>
  );
}
