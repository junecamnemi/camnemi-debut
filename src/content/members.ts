import type { Member } from '../types/game';

/** 글로시스 4인 — FILM ANIME. 선배 아이돌(60인 로스터)은 이후 시즌에서 영입. */
export const MEMBERS: Record<string, Member> = {
  aran: {
    id: 'aran', ko: '아란', en: 'Aran', role: '리더 · 메인보컬',
    color: '--aran',
    portrait: 'assets/chars/aran.webp',
    loop: 'assets/video/aran_loop.mp4',
  },
  chaea: {
    id: 'chaea', ko: '채아', en: 'Chaea', role: '보컬 · 분위기메이커',
    color: '--chaea',
    portrait: 'assets/chars/chaea.webp',
    loop: 'assets/video/chaea_loop.mp4',
  },
  dahee: { id: 'dahee', ko: '다희', en: 'Dahee', role: '메인댄서 · 래퍼', color: '--dahee', portrait: 'assets/chars/dahee.webp' },
  roy:   { id: 'roy',   ko: '로이', en: 'Roy',   role: '비주얼 · 막내',      color: '--roy',   portrait: 'assets/chars/roy.webp' },
};
