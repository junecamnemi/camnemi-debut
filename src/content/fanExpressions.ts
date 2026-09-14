export interface FanExpression { ko: string; rom: string; en: string }

/**
 * K-pop 팬(덕질) 필수 표현 — 데뷔/컴백/팬 문화에서 자주 쓰는 말.
 * 한글 + Revised Romanization + 영어 뜻 (팬이 실제로 마주치는 표기).
 */
export const FAN_EXPRESSIONS: FanExpression[] = [
  { ko: '데뷔', rom: 'debwi', en: 'debut (an idol\u2019s official first appearance)' },
  { ko: '컴백', rom: 'keombaek', en: 'comeback (returning with new music)' },
  { ko: '음방', rom: 'eumbang', en: 'music show (weekly K-pop broadcast)' },
  { ko: '자켓촬영', rom: 'jaket chwalyeong', en: 'album jacket photo shoot' },
  { ko: '팬미팅', rom: 'paenmiting', en: 'fan meeting' },
  { ko: '팬사인회', rom: 'paensainhoe', en: 'fan signing event' },
  { ko: '굿즈', rom: 'gutjeu', en: 'official merchandise' },
  { ko: '응원봉', rom: 'eungwonbong', en: 'light stick' },
  { ko: '멘트', rom: 'menteu', en: 'ment (a member\u2019s spoken segment)' },
  { ko: '리더', rom: 'rideo', en: 'group leader' },
  { ko: '센터', rom: 'senteo', en: 'center (member in the middle of formations)' },
  { ko: '막내', rom: 'mangnae', en: 'youngest member (maknae)' },
  { ko: '본진', rom: 'bonjin', en: 'your main group / bias group' },
  { ko: '최애', rom: 'choeae', en: 'ultimate bias (favorite member)' },
  { ko: '덕질', rom: 'deokjil', en: 'fangirling / devoted fan life' },
  { ko: '입덕', rom: 'ipdeok', en: 'becoming a fan (joining a fandom)' },
  { ko: '탈덕', rom: 'taldeok', en: 'leaving a fandom' },
  { ko: '떡밥', rom: 'tteokbap', en: 'hints / spoilers dropped by the agency' },
  { ko: '셀카', rom: 'selka', en: 'selfie' },
  { ko: '굿나잇셀카', rom: 'gunnait selka', en: 'goodnight selfie (posted before bed)' },
  { ko: '올킬', rom: 'olkil', en: 'all-kill (topping every music chart)' },
  { ko: '앵콜', rom: 'aengkol', en: 'encore stage' },
  { ko: '커플링', rom: 'keopeulling', en: 'fan pairing / ship' },
  { ko: '잠수', rom: 'jamsu', en: 'going silent on social media for a while' },
  { ko: '노래방', rom: 'noraebang', en: 'karaoke room' },
];
