import type { MemberId } from '../types/game';

export interface SkillItem {
  label: string;          // 학습 목표 라벨
  state: 'learning' | 'review' | 'mastered';
  unit: string;
}

export interface PlayerState {
  memberId: MemberId;
  stageName: string;
  careerStage: string;    // 입문 / 연습생 / …
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
  stageName: '스텔라',
  careerStage: '연습생',
  careerPct: 42,
  streakDays: 7,
  studyDays: 23,
  mastered: 12,
  skills: [
    { label: '한글 자음·모음', state: 'mastered', unit: 'EP.1' },
    { label: '자모 조합 (받침 없는 글자)', state: 'mastered', unit: 'EP.1' },
    { label: '자기소개 (-이에요/예요)', state: 'review', unit: 'EP.2' },
    { label: '숫자와 나이', state: 'learning', unit: 'EP.2' },
    { label: '있어요 / 없어요', state: 'learning', unit: 'EP.3' },
    { label: '-(으)ㄹ 수 있다 (능력)', state: 'learning', unit: 'EP.3' },
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

export const STATE_LABEL: Record<SkillItem['state'], string> = {
  learning: '학습 중', review: '복습 필요', mastered: '숙련',
};
