import type { MemberId } from '../types/game';

export interface SkillItem {
  label: string;          // 학습 목표 라벨
  state: 'learning' | 'review' | 'mastered';
  unit: string;
}

export interface PlayerState {
  memberId: MemberId;
  stageName: string;
  careerKey: 'entry' | 'rookie' | 'team' | 'debut_ready' | 'debut';  // → i18n career_*
  careerPct: number;      // 0~100
  streakDays: number;
  hearts: number;         // 팬 하트 (5초당 +1)
  studyDays: number;
  mastered: number;
  skills: SkillItem[];
  cards: { id: string; img: string }[];
}

/** 데모용 플레이어 상태 (실제로는 Supabase profile/skill/unlock 에서) */
export const PLAYER: PlayerState = {
  memberId: 'aran',
  stageName: 'Stella',
  careerKey: 'rookie',
  careerPct: 42,
  streakDays: 7,
  hearts: 1280,
  studyDays: 23,
  mastered: 12,
  skills: [
    { label: 'Hangul — consonants & vowels', state: 'mastered', unit: 'EP.1' },
    { label: 'Syllable building (no final)', state: 'mastered', unit: 'EP.1' },
    { label: 'Self-introduction (-이에요/예요)', state: 'review', unit: 'EP.2' },
    { label: 'Numbers & age', state: 'learning', unit: 'EP.2' },
    { label: '있어요 / 없어요 (have / not have)', state: 'learning', unit: 'EP.3' },
    { label: '-(으)ㄹ 수 있다 (ability)', state: 'learning', unit: 'EP.3' },
  ],
  cards: [
    { id: 'pc0', img: 'assets/photocards/pc0.webp' },
    { id: 'pc1', img: 'assets/photocards/pc1.webp' },
    { id: 'pc2', img: 'assets/photocards/pc2.webp' },
    { id: 'pc3', img: 'assets/photocards/pc3.webp' },
    { id: 'pc4', img: 'assets/photocards/pc4.webp' },
    { id: 'pc5', img: 'assets/photocards/pc5.webp' },
    { id: 'pc6', img: 'assets/photocards/pc6.webp' },
    { id: 'pc7', img: 'assets/photocards/pc7.webp' },
    { id: 'pc8', img: 'assets/photocards/pc8.webp' },
    { id: 'pc9', img: 'assets/photocards/pc9.webp' },
    { id: 'pc10', img: 'assets/photocards/pc10.webp' },
    { id: 'pc11', img: 'assets/photocards/pc11.webp' },
    { id: 'pc12', img: 'assets/photocards/pc12.webp' },
    { id: 'pc13', img: 'assets/photocards/pc13.webp' },
    { id: 'pc14', img: 'assets/photocards/pc14.webp' },
    { id: 'pc15', img: 'assets/photocards/pc15.webp' },
  ],
};

/** i18n key for skill state */
export const STATE_KEY: Record<SkillItem['state'], 'sk_learning' | 'sk_review' | 'sk_mastered'> = {
  learning: 'sk_learning', review: 'sk_review', mastered: 'sk_mastered',
};

export type CareerKey = PlayerState['careerKey'];

/** 커리어 단계 (라벨은 i18n career_*) */
export const CAREER: { key: CareerKey; labelKey: 'career_entry' | 'career_rookie' | 'career_team' | 'career_debut_ready' | 'career_debut' }[] = [
  { key: 'entry', labelKey: 'career_entry' },
  { key: 'rookie', labelKey: 'career_rookie' },
  { key: 'team', labelKey: 'career_team' },
  { key: 'debut_ready', labelKey: 'career_debut_ready' },
  { key: 'debut', labelKey: 'career_debut' },
];

/** EP.N → 포토카드 id ('pc0'~'pc15', 0-based) */
export function photocardId(epNo: number): string {
  return 'pc' + (epNo - 1);
}

/** 포토카드 소유 판정 — unlock item_id('pcN')와 카드 id('pcN') 매칭 (컬렉션·My 공용) */
export function isOwned(cardId: string, unlocked: Set<string>): boolean {
  return unlocked.has(cardId);
}

/** careerPct(0~100) → 커리어 단계 키 (entry<21, rookie<51, team<76, debut_ready<96, debut>=96) */
export function careerKeyForPct(pct: number): CareerKey {
  if (pct >= 96) return 'debut';
  if (pct >= 76) return 'debut_ready';
  if (pct >= 51) return 'team';
  if (pct >= 21) return 'rookie';
  return 'entry';
}

/** 저장된 career_stage 문자열 → CareerKey (레거시 '연습생' → 'entry' 호환) */
export function normalizeCareerKey(stage: string | null | undefined): CareerKey {
  if (stage === 'entry' || stage === 'rookie' || stage === 'team' || stage === 'debut_ready' || stage === 'debut') return stage;
  if (stage === '연습생') return 'entry';
  return PLAYER.careerKey;
}
