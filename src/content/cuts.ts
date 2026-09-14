/** 화별 컷씬 4장(9:16 포트레이트) 경로 — EP.{no} 스토리를 4컷 만화로 인트로 재생.
 *  에피소드 인트로/프리뷰에서 공용으로 쓰므로 story.ts 의 대용량 STORY 데이터와 분리해
 *  플레이어 번들에 불필요한 데이터가 딸려오지 않게 작은 모듈로 유지한다. */
export const cutsFor = (no: number): string[] =>
  Array.from({ length: 4 }, (_, i) => `assets/story/cuts/ep${no}/ep${no}_cut${i + 1}.webp`);
