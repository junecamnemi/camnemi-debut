import type { Episode } from '../types/game';

/** EP.12 — 콜라보 곡 · -는데 + -지만 (배경·반대) */
export const EPISODE12: Episode = {
  id: 'ep12',
  no: 12,
  title: 'Collab Song',
  subtitle: 'A collab song · on the music show',
  member: 'roy',
  skill: 'Background & Contrast',
  careerPct: 96,

  dialogue: [
    { who: 'Roy', ko: '무대가 긴장되는데 재미있어요.',
      en: "I'm nervous on stage, but it's fun.",
      tip: "Today's training — -는데 · -지만 (background & contrast)" },
    { who: 'Senior', ko: '처음에는 어렵지만 금방 익숙해져요.',
      en: 'It is hard at first, but you get used to it.' },
    { who: 'Dahee', ko: '관객들이 우리를 응원해요!',
      en: 'The crowd is cheering for us!' },
    { who: 'Me · CEO', ko: '우리 콜라보, 정말 멋졌어요.',
      en: 'Our collab was truly amazing.' },
  ],

  // 배경·반대 표현 카드
  phrases: [
    { ko: '긴장돼요', rom: 'ginjangdwaeyo', en: "I'm nervous" },
    { ko: '재미있어요', rom: 'jaemiisseoyo', en: "it's fun" },
    { ko: '어렵지만', rom: 'eoryeopjiman', en: 'hard but' },
    { ko: '익숙해져요', rom: 'iksukhaejyeoyo', en: 'get used to it' },
    { ko: '관객', rom: 'gwangaeek', en: 'audience' },
    { ko: '콜라보', rom: 'kollabo', en: 'collab' },
  ],

  // 문법 포인트
  grammar: [
    {
      title: '-지만 (but)',
      body: 'Contrasts two clauses: "A, but B".',
      ex: ['어렵다 → 어렵지만 (hard, but)', '작지만 (small, but)'],
    },
    {
      title: '-는데 (background / contrast)',
      body: 'Provides background or a gentle contrast between clauses.',
      ex: ['긴장되는데 (nervous, and/but)', '바쁜데 (busy, so…)'],
    },
  ],

  // 배경·반대 미니게임 (3문항)
  manners: [
    { q: '긴장되지만 재미있다고 말할 때?', qen: 'Saying you are nervous but having fun:',
      a: '', b: '', answer: '긴장되는데 재미있어요',
      opts: ['긴장되는데 재미있어요', '긴장되는데 지루해요', '긴장되는데 슬퍼요'],
      ok: '정답! -는데는 배경을 깔며 이어줘요.', no: '배경·반대는 -는데.',
      okEn: 'Correct! -는데 gives background.', noEn: 'Use -는데 for background.' },
    { q: '처음엔 어렵지만 익숙해진다고 말할 때?', qen: 'Saying it is hard but you get used to it:',
      a: '', b: '', answer: '어렵지만 익숙해져요',
      opts: ['어렵지만 익숙해져요', '쉽지만 익숙해져요', '어렵지만 지루해져요'],
      ok: '정답! -지만은 반대를 이어줘요.', no: '반대는 -지만.',
      okEn: 'Correct! -지만 marks contrast.', noEn: 'Contrast with -지만.' },
    { q: '관객이 우리를 응원한다고 말할 때?', qen: 'Saying the crowd cheers for us:',
      a: '', b: '', answer: '관객들이 응원해요',
      opts: ['관객들이 응원해요', '관객들이 떠나요', '관객들이 잠들어요'],
      ok: '정답! 응원해요가 응원한다는 뜻이에요.', no: '응원하는 것은 응원해요.',
      okEn: 'Correct! 응원해요 means to cheer.', noEn: 'To cheer is 응원해요.' },
  ],

  writing: [
    { word: '콜라보', roman: 'kollabo' },
    { word: '관객', roman: 'gwangaeek' },
    { word: '재미', roman: 'jaemi' },
  ],

  combine: [],

  rewards: [
    { icon: '🎴', label: 'Roy photocard No.012' },
    { icon: '📈', label: 'Skill · Background & Contrast → Mastered (+3)' },
    { icon: '🎶', label: 'Collab song unlocked' },
    { icon: '🎬', label: 'Episode 13 preview · Debut Prep' },
  ],
};
