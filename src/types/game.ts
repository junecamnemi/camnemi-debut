/* 글로시스: 데뷔 프로젝트 — 도메인 타입 */

export type MemberId = 'aran' | 'chaea' | 'dahee' | 'roy';

export interface Member {
  id: MemberId;
  ko: string;
  en: string;
  role: string;
  color: string;            // CSS var name (e.g. '--aran')
  portrait: string;         // image path
  loop?: string;            // looping video path
}

export interface DialogueLine {
  who: string;
  ko: string;
  en?: string;
  tip?: string;
  /** EP.1 애니 장면 이미지 (선택) */
  scene?: string;
}

export interface JamoItem {
  j: string;   // 자모 글자
  r: string;   // 로마자
}

export interface CombineQuestion {
  a: string; b: string; answer: string;
  opts: string[];
  q: string; qen: string;
  ok: string; no: string;
}

export interface WriteTask {
  /** 연습할 단어(실제 아이돌 이름) */
  word: string;
  roman: string;
}

export interface EpisodeReward {
  icon: string;
  label: string;
}

export interface Episode {
  id: string;
  no: number;
  title: string;
  subtitle: string;
  member: MemberId;
  dialogue: DialogueLine[];
  consonants: JamoItem[];
  vowels: JamoItem[];
  combine: CombineQuestion[];
  writing: WriteTask[];
  rewards: EpisodeReward[];
}
