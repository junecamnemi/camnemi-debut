/** 화별 컷씬 4장(16:9 랜드스케이프) 경로 — EP.{no} 스토리를 4컷 만화로 재생.
 *  에피소드 대화 씬의 배경 장면으로 쓰므로 story.ts 의 대용량 STORY 데이터와 분리해
 *  플레이어 번들에 불필요한 데이터가 딸려오지 않게 작은 모듈로 유지한다. */
/** 컷씬 자산 버전 — 파일명은 그대로 두고 내용만 갱신할 때 CDN/브라우저 캐시를 무효화한다.
 *  캐시 버스트 값을 올리면 전 에피소드 컷씬이 새로 로드된다. */
const CUTS_CACHE_BUST = 'v2';

export const cutsFor = (no: number): string[] =>
  Array.from({ length: 4 }, (_, i) => `assets/story/cuts/ep${no}/ep${no}_cut${i + 1}.webp?${CUTS_CACHE_BUST}`);

/** 대사 줄의 컷 인덱스(0..3)를 결정 — cutFor/cutVideoForLine 이 공유한다.
 *  - 대사에 명시된 cut(1..4)이 있으면 그 컷을 그대로 써서 대사 내용과 컷씬을 의미적으로 일치시킨다.
 *  - 없으면(명시 매핑이 없는 에피소드) 대화 진행도(dlgIdx/dlgLen)를 4컷에 균등 버킷 매핑으로 폴백한다. */
const cutIndex = (dlgIdx: number, dlgLen: number, cut?: number): number => {
  if (cut !== undefined && cut >= 1 && cut <= 4) return cut - 1;
  return dlgLen > 0 ? Math.min(Math.floor((dlgIdx / dlgLen) * 4), 3) : 0;
};

/** 대사 줄에 해당하는 컷씬 스틸 경로 — cut(1..4) 명시값 우선, 없으면 진행도 버킷. */
export const cutFor = (no: number, dlgIdx: number, dlgLen: number, cut?: number): string =>
  cutsFor(no)[cutIndex(dlgIdx, dlgLen, cut)];

/** 컷 k(1..4)의 스토리 컷씬 영상(mp4, 16:9 랜드스케이프) 경로 — 스틸과 동일한 캐시 버스트를 붙인다.
 *  아직 mp4 가 없는 에피소드는 404 가 나므로 DialogueScene 이 스틸로 폴백한다. */
export const cutVideoFor = (no: number, k: number): string =>
  `assets/story/videos/ep${no}_cut${k}.mp4?${CUTS_CACHE_BUST}`;

/** 대사 줄에 해당하는 컷씬 영상 경로(컷 1..4) — cutFor 와 같은 인덱스 매핑(같은 cut 명시값)을 쓴다. */
export const cutVideoForLine = (no: number, dlgIdx: number, dlgLen: number, cut?: number): string =>
  cutVideoFor(no, cutIndex(dlgIdx, dlgLen, cut) + 1);
