import { useEffect, useState } from 'react';

/** TOPIK 앱과 동일한 아란 히어로 캐러셀 — 일상 5 + 콘서트 4 (수동 전환, 자동 아님) */
interface Scene { k: string; label: string; src: string; pos: string }

const SCENES: Scene[] = [
  { k: 'home',   label: '홈',        src: 'assets/carousel/aran_home.mp4',    pos: 'center 32%' },
  { k: 'book',   label: '노래',      src: 'assets/carousel/aran_book.mp4',    pos: 'center 40%' },
  { k: 'daily',  label: '무대',      src: 'assets/carousel/aran_daily.mp4',   pos: 'center 46%' },
  { k: 'rank',   label: '랭크',      src: 'assets/carousel/aran_rank.mp4',    pos: 'center 40%' },
  { k: 'my',     label: '설정',      src: 'assets/carousel/aran_my.mp4',      pos: 'center 34%' },
  { k: 'c_book', label: '콘서트 · 노래', src: 'assets/carousel/aran_c_book.mp4',  pos: 'center 40%' },
  { k: 'c_daily',label: '콘서트 · 무대', src: 'assets/carousel/aran_c_daily.mp4', pos: 'center 40%' },
  { k: 'c_rank', label: '콘서트 · 랭크', src: 'assets/carousel/aran_c_rank.mp4',  pos: 'center 40%' },
  { k: 'c_my',   label: '콘서트 · 설정', src: 'assets/carousel/aran_c_my.mp4',    pos: 'center 40%' },
];

const LS_KEY = 'camnemi_debut_hero_scene';

interface Props {
  badge?: string;
  title: string;
  subtitle?: string;
  small?: boolean;
}

export function HeroCarousel({ badge, title, subtitle, small }: Props) {
  const [idx, setIdx] = useState(() => {
    try { const s = parseInt(localStorage.getItem(LS_KEY) || '0', 10); return s >= 0 && s < SCENES.length ? s : 0; }
    catch { return 0; }
  });

  useEffect(() => { try { localStorage.setItem(LS_KEY, String(idx)); } catch { /* noop */ } }, [idx]);

  const go = (d: number) => setIdx((i) => (i + d + SCENES.length) % SCENES.length);
  const jump = (i: number) => setIdx(i);

  return (
    <div className={`hero${small ? ' hero--sm' : ''}`}>
      {SCENES.map((s, i) => {
        const active = i === idx;
        return (
          <video
            key={s.k}
            className={`hero__bg scene-video${active ? ' is-active' : ''}`}
            style={{ objectPosition: s.pos, display: active ? 'block' : 'none' }}
            autoPlay={active}
            muted
            loop
            playsInline
            preload={active ? 'auto' : 'none'}
            poster="assets/chars/aran.webp"
          >
            <source src={s.src} type="video/mp4" />
          </video>
        );
      })}

      <div className="hero__ov" />

      {/* 수동 전환 컨트롤 */}
      <button className="hero__nav prev" onClick={() => go(-1)} aria-label="이전">‹</button>
      <button className="hero__nav next" onClick={() => go(1)} aria-label="다음">›</button>
      <div className="hero__dots">
        {SCENES.map((s, i) => (
          <button key={s.k} className={`hero__dot${i === idx ? ' on' : ''}`} onClick={() => jump(i)} aria-label={s.label} />
        ))}
      </div>

      <div className="hero__in">
        {badge && <span className="hero__badge">{badge}</span>}
        <h1 className="hero__title">{title}</h1>
        {subtitle && <p className="hero__sub">{subtitle}</p>}
      </div>

      <span className="hero__scenelabel">{SCENES[idx].label}</span>
    </div>
  );
}
