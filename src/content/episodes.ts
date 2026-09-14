import type { Episode } from '../types/game';

/**
 * EP.5~16 지연 로드 레지스트리 — 공용 EpisodePlayer 로 재생할 에피소드 데이터.
 * (EP.1~4 는 전용 컴포넌트를 쓰므로 여기 포함하지 않는다.)
 */
export const EPISODE_LOADERS: Record<number, () => Promise<Episode>> = {
  5: () => import('./episode5').then((m) => m.EPISODE5),
  6: () => import('./episode6').then((m) => m.EPISODE6),
  7: () => import('./episode7').then((m) => m.EPISODE7),
  8: () => import('./episode8').then((m) => m.EPISODE8),
  9: () => import('./episode9').then((m) => m.EPISODE9),
  10: () => import('./episode10').then((m) => m.EPISODE10),
  11: () => import('./episode11').then((m) => m.EPISODE11),
  12: () => import('./episode12').then((m) => m.EPISODE12),
  13: () => import('./episode13').then((m) => m.EPISODE13),
  14: () => import('./episode14').then((m) => m.EPISODE14),
  15: () => import('./episode15').then((m) => m.EPISODE15),
  16: () => import('./episode16').then((m) => m.EPISODE16),
};
