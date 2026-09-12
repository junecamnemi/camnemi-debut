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
  studyDays: number;
  mastered: number;
  skills: SkillItem[];
  cards: { id: string; img: string; owned: boolean }[];
}

/** 데모용 플레이어 상태 (실제로는 Supabase profile/skill/unlock 에서) */
export const PLAYER: PlayerState = {
  memberId: 'aran',
  stageName: 'Stella',
  careerKey: 'rookie',
  careerPct: 42,
  streakDays: 7,
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
    { id: 'pc0', img: 'assets/photocards/pc0.webp', owned: true },
    { id: 'pc1', img: 'assets/photocards/pc1.webp', owned: true },
    { id: 'pc2', img: 'assets/photocards/pc2.webp', owned: false },
    { id: 'pc3', img: 'assets/photocards/pc3.webp', owned: false },
    { id: 'pc4', img: 'assets/photocards/pc4.webp', owned: false },
    { id: 'pc5', img: 'assets/photocards/pc5.webp', owned: false },
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
