/* 글로시스: 데뷔 프로젝트 — 도메인 타입 */

export type MemberId = 'aran' | 'chaea' | 'dahee' | 'roy';

export interface Member {
  roleEn?: string;   // English role
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
  /** EP.1 애니 장면 영상 (선택) — 있으면 영상 재생 */
  sceneVideo?: string;
}

export interface JamoItem {
  j: string;   // 자모 글자
  r: string;   // 로마자
  n?: string;  // 한글 이름 (ㄱ → 기역)
}

export interface CombineQuestion {
  okEn?: string;   // English feedback (shown when UI lang = en)
  noEn?: string;
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


/** EP.2 자기소개 표현 카드 */
export interface PhraseItem {
  ko: string;      // 한국어 문장
  rom: string;     // 로마자
  en: string;      // 영어 뜻
}

/** 문법 포인트 */
export interface GrammarNote {
  title: string;   // -이에요 / -예요
  body: string;    // 설명 (en)
  ex: string[];    // 예문
}

/** 매너/관계 미니게임 문항 (CombineQuestion 재사용) */
export type MannerQuestion = CombineQuestion;

/** 자모 학습 단계 */
export type JamoStage = 'cons' | 'vow' | 'dcons' | 'dvow';

/** 받침 예시 (개념 학습) */
export interface FinalWord {
  word: string;      // 받침 있는 낱말 (밥)
  reading: string;   // 발음 (bap)
  meaning: string;   // 뜻 (rice)
  final: string;     // 받침 글자 (ㅂ)
}

export interface Episode {
  id: string;
  no: number;
  title: string;
  subtitle: string;
  member: MemberId;
  dialogue: DialogueLine[];
  consonants?: JamoItem[];     // 기본 자음 14 (EP.1)
  vowels?: JamoItem[];         // 기본 모음 10 (EP.1)
  phrases?: PhraseItem[];      // 자기소개 표현 (EP.2+)
  grammar?: GrammarNote[];     // 문법 포인트 (EP.2+)
  manners?: MannerQuestion[];  // 매너/관계 미니게임 (EP.2+)
  doubleCons?: JamoItem[];     // 쌍자음 5
  complexVow?: JamoItem[];     // 복합모음 11
  finals?: FinalWord[];        // 받침 예시
  combine: CombineQuestion[];
  writing: WriteTask[];
  rewards: EpisodeReward[];
}
