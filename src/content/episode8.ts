import type { Episode } from '../types/game';

/** EP.8 — 합동 무대 · -고 + -(으)면서 (동시 동작) */
export const EPISODE8: Episode = {
  id: 'ep08',
  no: 8,
  title: 'Joint Stage',
  subtitle: 'Sharing the stage with seniors',
  member: 'roy',
  skill: 'Simultaneous Actions',
  careerPct: 90,

  dialogue: [
    { who: 'Senior', ko: '오늘은 우리와 같이 무대에 서요.',
      en: 'Today we share the stage with you.',
      tip: "Today's training — -고 · -(으)면서 (simultaneous actions)" },
    { who: 'Roy', ko: '노래하면서 춤도 출 수 있어요?',
      en: 'Can you sing and dance at the same time?' },
    { who: 'Dahee', ko: '네, 저는 노래하면서 춤춰요.',
      en: 'Yes, I dance while singing.' },
    { who: 'Me · CEO', ko: '다 같이 멋진 무대를 만들어요!',
      en: "Let's make a great stage together!" },
  ],

  // 동시 동작 표현 카드
  phrases: [
    { ko: '노래해요', rom: 'noraehaeyo', en: 'I sing' },
    { ko: '춤춰요', rom: 'chumchwoyo', en: 'I dance' },
    { ko: '노래하면서', rom: 'noraehamyeonseo', en: 'while singing' },
    { ko: '같이', rom: 'gachi', en: 'together' },
    { ko: '무대', rom: 'mudae', en: 'stage' },
    { ko: '멋진', rom: 'meotjin', en: 'great / cool' },
  ],

  // 문법 포인트
  grammar: [
    {
      title: '-고 (and)',
      body: 'Connects two actions or states: "A and B".',
      ex: ['노래하고 춤춰요 (sing and dance)', '크고 예뻐요 (big and pretty)'],
    },
    {
      title: '-(으)면서 (while doing)',
      body: 'Two simultaneous actions done by the same subject: "while doing A, also B".',
      ex: ['노래하다 → 노래하면서 (while singing)', '먹다 → 먹으면서 (while eating)'],
    },
  ],

  // 동시 동작 미니게임 (3문항)
  manners: [
    { q: '노래와 춤을 함께 한다고 말할 때?', qen: 'Saying you sing and dance together:',
      a: '', b: '', answer: '노래하고 춤춰요',
      opts: ['노래하고 춤춰요', '노래하거나 춤춰요', '노래한 후에 춤춰요'],
      ok: '정답! -고는 두 동작을 나란히 이어요.', no: '-고로 두 동작을 이어요.',
      okEn: 'Correct! -고 links two actions.', noEn: 'Link actions with -고.' },
    { q: '두 동작을 동시에 한다고 말할 때?', qen: 'Saying two actions happen at once:',
      a: '', b: '', answer: '노래하면서 춤춰요',
      opts: ['노래하면서 춤춰요', '노래하기 전에 춤춰요', '노래한 후에 춤춰요'],
      ok: '정답! -(으)면서는 동시 동작을 나타내요.', no: '동시 동작은 -(으)면서.',
      okEn: 'Correct! -(으)면서 marks simultaneous actions.', noEn: 'Use -(으)면서 for simultaneous actions.' },
    { q: '다 함께 무대를 만들자고 할 때?', qen: 'Suggesting to make a stage together:',
      a: '', b: '', answer: '멋진 무대를 만들어요',
      opts: ['멋진 무대를 만들어요', '멋진 무대를 부숴요', '멋진 무대를 숨겨요'],
      ok: '정답! 만들어요가 만든다는 뜻이에요.', no: '만드는 것은 만들어요.',
      okEn: 'Correct! 만들어요 means to make.', noEn: 'To make is 만들어요.' },
  ],

  writing: [
    { word: '무대', roman: 'mudae' },
    { word: '같이', roman: 'gachi' },
    { word: '노래', roman: 'norae' },
  ],

  combine: [],

  rewards: [
    { icon: '🎴', label: 'Roy photocard No.008' },
    { icon: '📈', label: 'Skill · Simultaneous Actions → Mastered (+3)' },
    { icon: '🎤', label: 'Joint stage unlocked' },
    { icon: '🎬', label: 'Episode 9 preview · Team Project' },
  ],
};
