import { useEffect, useRef, useState } from 'react';
import { useI18n, type TKey } from '../i18n';

/** TOPIK 앱과 동일한 아란 히어로 캐러셀 — 일상 5 + 콘서트 4 (수동 전환, 자동 아님) */
interface Scene { k: string; labelKey: TKey; src: string; poster: string; pos: string }

const BASE = 'assets/carousel/';
/** 각 씬의 poster 는 해당 영상의 첫 프레임 → 전환 중에도 올바른 장면이 보인다
 *  (이전에는 프로필 사진을 poster 로 써서 전환 때 프로필이 튀어나왔다) */
const SCENES: Scene[] = [
  { k: 'home',    labelKey: 'scene_home',          src: BASE + 'aran_home.mp4',    poster: BASE + 'aran_home.jpg',    pos: 'center 32%' },
  { k: 'book',    labelKey: 'scene_song',        src: BASE + 'aran_book.mp4',    poster: BASE + 'aran_book.jpg',    pos: 'center 40%' },
  { k: 'daily',   labelKey: 'scene_stage',        src: BASE + 'aran_daily.mp4',   poster: BASE + 'aran_daily.jpg',   pos: 'center 46%' },
  { k: 'rank',    labelKey: 'scene_rank',        src: BASE + 'aran_rank.mp4',    poster: BASE + 'aran_rank.jpg',    pos: 'center 40%' },
  { k: 'my',      labelKey: 'scene_set',        src: BASE + 'aran_my.mp4',      poster: BASE + 'aran_my.jpg',      pos: 'center 34%' },
  { k: 'c_book',  labelKey: 'scene_c_song', src: BASE + 'aran_c_book.mp4',  poster: BASE + 'aran_c_book.jpg',  pos: 'center 40%' },
  { k: 'c_daily', labelKey: 'scene_c_stage', src: BASE + 'aran_c_daily.mp4', poster: BASE + 'aran_c_daily.jpg', pos: 'center 40%' },
  { k: 'c_rank',  labelKey: 'scene_c_rank', src: BASE + 'aran_c_rank.mp4',  poster: BASE + 'aran_c_rank.jpg',  pos: 'center 40%' },
  { k: 'c_my',    labelKey: 'scene_c_set', src: BASE + 'aran_c_my.mp4',    poster: BASE + 'aran_c_my.jpg',    pos: 'center 40%' },
];

const LS_KEY = 'camnemi_debut_hero_scene';

interface Props {
  badge?: string;
  title: string;
  subtitle?: string;
  small?: boolean;
}

export function HeroCarousel({ badge, title, subtitle, small }: Props) {
  const { t } = useI18n();
  const [idx, setIdx] = useState(() => {
    try { const s = parseInt(localStorage.getItem(LS_KEY) || '0', 10); return s >= 0 && s < SCENES.length ? s : 0; }
    catch { return 0; }
  });

  const refs = useRef<(HTMLVideoElement | null)[]>([]);

  useEffect(() => { try { localStorage.setItem(LS_KEY, String(idx)); } catch { /* noop */ } }, [idx]);

  // 활성 영상만 재생, 나머지는 정지 (9개 동시 재생 방지)
  useEffect(() => {
    refs.current.forEach((v, i) => {
      if (!v) return;
      if (i === idx) { v.play().catch(() => { /* 자동재생 차단 무시 */ }); }
      else { try { v.pause(); } catch { /* noop */ } }
    });
  }, [idx]);

  const go = (d: number) => setIdx((i) => (i + d + SCENES.length) % SCENES.length);
  const jump = (i: number) => setIdx(i);

  return (
    <div className={`hero${small ? ' hero--sm' : ''}`}>
      {SCENES.map((s, i) => {
        const active = i === idx;
        return (
          <video
            key={s.k}
            ref={(el) => { refs.current[i] = el; }}
            className={`hero__bg scene-video${active ? ' is-active' : ''}`}
            style={{ objectPosition: s.pos }}
            muted
            loop
            playsInline
            preload={active ? 'auto' : 'metadata'}
            poster={s.poster}
          >
            <source src={s.src} type="video/mp4" />
          </video>
        );
      })}

      <div className="hero__ov" />

      {/* 수동 전환 컨트롤 */}
      <button className="hero__nav prev" onClick={() => go(-1)} aria-label="Previous">‹</button>
      <button className="hero__nav next" onClick={() => go(1)} aria-label="Next">›</button>
      <div className="hero__dots">
        {SCENES.map((s, i) => (
          <button key={s.k} className={`hero__dot${i === idx ? ' on' : ''}`} onClick={() => jump(i)} aria-label={t(s.labelKey)} />
        ))}
      </div>

      <div className="hero__in">
        {badge && <span className="hero__badge">{badge}</span>}
        <h1 className="hero__title">{title}</h1>
        {subtitle && <p className="hero__sub">{subtitle}</p>}
      </div>

      <span className="hero__scenelabel">{t(SCENES[idx].labelKey)}</span>
    </div>
  );
}
