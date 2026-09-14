/** 화별 컷씬 4장(9:16 포트레이트) 경로 — EP.{no} 스토리를 4컷 만화로 재생.
 *  에피소드 대화 씬의 배경 장면으로 쓰므로 story.ts 의 대용량 STORY 데이터와 분리해
 *  플레이어 번들에 불필요한 데이터가 딸려오지 않게 작은 모듈로 유지한다. */
export const cutsFor = (no: number): string[] =>
  Array.from({ length: 4 }, (_, i) => `assets/story/cuts/ep${no}/ep${no}_cut${i + 1}.webp`);

/** 대화 진행도(dlgIdx/dlgLen)를 컷 인덱스(0..3)로 매핑 — cutFor/cutVideoForLine 이 공유한다.
 *  EP.1(4줄)처럼 대사 수가 4면 줄마다 한 컷씩, 그보다 많으면 구간(bucket) 단위로 전환된다. */
const cutIndex = (dlgIdx: number, dlgLen: number): number =>
  dlgLen > 0 ? Math.min(Math.floor((dlgIdx / dlgLen) * 4), 3) : 0;

/** 대화 진행도를 4컷에 매핑 — 씬을 넘어갈수록 cut1→cut4 순으로 표시. */
export const cutFor = (no: number, dlgIdx: number, dlgLen: number): string =>
  cutsFor(no)[cutIndex(dlgIdx, dlgLen)];

/** 컷 k(1..4)의 스토리 컷씬 영상(mp4) 경로 — 아직 생성 전이면 파일이 없을 수 있음(호출부에서 스틸로 폴백). */
export const cutVideoFor = (no: number, k: number): string =>
  `assets/story/videos/ep${no}_cut${k}.mp4`;

/** 대화 진행도에 해당하는 컷씬 영상 경로(컷 1..4) — cutFor 와 같은 인덱스 매핑을 쓴다. */
export const cutVideoForLine = (no: number, dlgIdx: number, dlgLen: number): string =>
  cutVideoFor(no, cutIndex(dlgIdx, dlgLen) + 1);
