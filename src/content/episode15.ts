import type { Episode } from '../types/game';

/** EP.15 — 데뷔 전 인터뷰 · 감정 표현 + -네요 + -겠- */
export const EPISODE15: Episode = {
  id: 'ep15',
  no: 15,
  title: 'Interview',
  subtitle: 'Pre-debut interview · feelings & resolve',
  member: 'dahee',
  skill: 'Expressing Feelings',
  careerPct: 99,

  dialogue: [
    { who: 'Reporter', ko: '데뷔 소감이 어떠세요?',
      en: 'How do you feel about debuting?',
      tip: "Today's training — feelings · -네요 · -겠-" },
    { who: 'Dahee', ko: '정말 떨리네요. 열심히 하겠습니다!',
      en: "I'm really nervous. We'll do our best!" },
    { who: 'Aran', ko: '글로시스를 기다려 주신 팬들, 감사합니다.',
      en: 'Thank you to the fans who waited for Glowsis.' },
    { who: 'Me · CEO', ko: '우리 팀을 믿어 주세요.',
      en: 'Please believe in our team.' },
  ],

  // 감정 표현 카드
  phrases: [
    { ko: '떨리네요', rom: 'tteollineyo', en: "I'm nervous" },
    { ko: '열심히 하겠습니다', rom: 'yeolsimhi hagetsseumnida', en: "I'll do my best" },
    { ko: '감사합니다', rom: 'gamsahamnida', en: 'thank you' },
    { ko: '소감', rom: 'sogam', en: 'impressions / feelings' },
    { ko: '기쁘네요', rom: 'gippeuneyo', en: "I'm happy" },
    { ko: '믿어 주세요', rom: 'mideo juseyo', en: 'please believe in us' },
  ],

  // 문법 포인트
  grammar: [
    {
      title: '-네요 (realization / feeling)',
      body: 'Expresses a newly realized or felt state.',
      ex: ['떨리다 → 떨리네요 (I am nervous)', '기쁘다 → 기쁘네요 (I am happy)'],
    },
    {
      title: '-겠- (resolve / presumption)',
      body: 'Shows strong resolve or a polite presumption.',
      ex: ['하다 → 하겠습니다 (I will do)', '맛있겠어요 (it looks delicious)'],
    },
  ],

  // 감정 표현 미니게임 (3문항)
  manners: [
    { q: '떨린다는 감정을 표현할 때?', qen: 'Expressing that you are nervous:',
      a: '', b: '', answer: '떨리네요',
      opts: ['떨리네요', '배부르네요', '졸리네요'],
      ok: '정답! -네요는 감정을 표현해요.', no: '감정 표현은 -네요.',
      okEn: 'Correct! -네요 expresses a feeling.', noEn: 'Express feelings with -네요.' },
    { q: '열심히 하겠다는 각오를 말할 때?', qen: 'Expressing your resolve to do your best:',
      a: '', b: '', answer: '열심히 하겠습니다',
      opts: ['열심히 하겠습니다', '열심히 안 하겠습니다', '그냥 쉬겠습니다'],
      ok: '정답! -겠-은 각오를 나타내요.', no: '각오는 -겠-.',
      okEn: 'Correct! -겠- marks resolve.', noEn: 'Use -겠- for resolve.' },
    { q: '팬들에게 고마움을 표현할 때?', qen: 'Thanking the fans:',
      a: '', b: '', answer: '감사합니다',
      opts: ['감사합니다', '미안합니다', '괜찮습니다'],
      ok: '정답! 감사합니다는 감사의 표현이에요.', no: '감사는 감사합니다.',
      okEn: 'Correct! 감사합니다 means thank you.', noEn: 'Thank you is 감사합니다.' },
  ],

  writing: [
    { word: '소감', roman: 'sogam' },
    { word: '떨리네요', roman: 'tteollineyo' },
    { word: '감사', roman: 'gamsa' },
  ],

  combine: [],

  rewards: [
    { icon: '🎴', label: 'Dahee photocard No.015' },
    { icon: '📈', label: 'Skill · Expressing Feelings → Mastered (+3)' },
    { icon: '🎤', label: 'Interview stage unlocked' },
    { icon: '🎬', label: 'Episode 16 preview · Debut Stage' },
  ],
};
