import type { Episode } from '../types/game';

/** EP.11 — 컨셉과 스타일링 · 색/외모 형용사 + -아/어요 */
export const EPISODE11: Episode = {
  id: 'ep11',
  no: 11,
  title: 'Concept & Styling',
  subtitle: 'Choosing the stage concept & styling',
  member: 'dahee',
  skill: 'Descriptive Verbs',
  careerPct: 95,

  dialogue: [
    { who: 'Dahee', ko: '이번 콘셉트는 어때요?',
      en: 'What do you think of this concept?',
      tip: "Today's training — colors & looks · -아/어요" },
    { who: 'Aran', ko: '파란색이 예뻐요.',
      en: 'The blue looks pretty.' },
    { who: 'Chaea', ko: '저는 밝은 색이 좋아요.',
      en: 'I like bright colors.' },
    { who: 'Me · CEO', ko: '우리 팀은 핑크가 잘 어울려요.',
      en: 'Pink suits our team.' },
  ],

  // 색·외모 형용사 카드
  phrases: [
    { ko: '파란색', rom: 'paransaek', en: 'blue' },
    { ko: '빨간색', rom: 'ppalgansaek', en: 'red' },
    { ko: '노란색', rom: 'noransaek', en: 'yellow' },
    { ko: '예뻐요', rom: 'yeppeoyo', en: "it's pretty" },
    { ko: '밝은 색', rom: 'balgeun saek', en: 'bright color' },
    { ko: '잘 어울려요', rom: 'jal eoullyeoyo', en: 'it suits well' },
  ],

  // 문법 포인트
  grammar: [
    {
      title: '색 (colors)',
      body: 'Color words: 파란색 (blue), 빨간색 (red), 노란색 (yellow), 검은색 (black), 하얀색 (white).',
      ex: ['파란색 (blue)', '빨간색 (red)', '노란색 (yellow)'],
    },
    {
      title: '-아/어요 (descriptive verbs)',
      body: 'Describe a state politely with -아요 (after 아/오) or -어요 (elsewhere).',
      ex: ['예쁘다 → 예뻐요 (pretty)', '밝다 → 밝아요 (bright)'],
    },
  ],

  // 색·스타일 미니게임 (3문항)
  manners: [
    { q: '파란색이 예쁘다고 말할 때?', qen: 'Saying the blue looks pretty:',
      a: '', b: '', answer: '파란색이 예뻐요',
      opts: ['파란색이 예뻐요', '파란색이 맛있어요', '파란색이 조용해요'],
      ok: '정답! 예쁘다 → 예뻐요.', no: '예쁘다의 -아/어요 꼴은 예뻐요.',
      okEn: 'Correct! 예쁘다 → 예뻐요.', noEn: 'The polite form of 예쁘다 is 예뻐요.' },
    { q: '팀에 핑크가 잘 맞는다고 말할 때?', qen: 'Saying pink suits the team:',
      a: '', b: '', answer: '핑크가 잘 어울려요',
      opts: ['핑크가 잘 어울려요', '핑크가 잘 넘어져요', '핑크가 잘 싸워요'],
      ok: '정답! 어울려요가 잘 맞는다는 뜻이에요.', no: '잘 맞는 것은 어울려요.',
      okEn: 'Correct! 어울려요 means to suit.', noEn: 'To suit is 어울려요.' },
    { q: '밝은 색을 좋아한다고 말할 때?', qen: 'Saying you like bright colors:',
      a: '', b: '', answer: '밝은 색이 좋아요',
      opts: ['밝은 색이 좋아요', '밝은 색이 싫어요', '밝은 색이 무서워요'],
      ok: '정답! 좋아요가 좋아한다는 뜻이에요.', no: '좋아하는 것은 좋아요.',
      okEn: 'Correct! 좋아요 means to like.', noEn: 'To like is 좋아요.' },
  ],

  writing: [
    { word: '파란색', roman: 'paransaek' },
    { word: '예뻐요', roman: 'yeppeoyo' },
    { word: '어울려요', roman: 'eoullyeoyo' },
  ],

  combine: [],

  rewards: [
    { icon: '🎴', label: 'Dahee photocard No.011' },
    { icon: '📈', label: 'Skill · Descriptive Verbs → Mastered (+3)' },
    { icon: '💅', label: 'Styling set unlocked' },
    { icon: '🎬', label: 'Episode 12 preview · Collab Song' },
  ],
};
