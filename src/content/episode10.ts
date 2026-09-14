import type { Episode } from '../types/game';

/** EP.10 — 녹음실 · 능력/가능 표현 + -(으)ㄹ 수 있다/없다 */
export const EPISODE10: Episode = {
  id: 'ep10',
  no: 10,
  title: 'Recording Day',
  subtitle: 'At the studio · ability & possibility',
  member: 'chaea',
  skill: 'Ability & Possibility',
  careerPct: 94,

  dialogue: [
    { who: 'Chaea', ko: '이번 파트는 제가 부를 수 있어요!',
      en: 'I can sing this part!',
      tip: "Today's training — ability · -(으)ㄹ 수 있다/없다" },
    { who: 'Aran', ko: '저는 높은 음을 못 올라가요.',
      en: "I can't reach the high notes." },
    { who: 'Me · CEO', ko: '괜찮아요. 천천히 하면 할 수 있어요.',
      en: "It's okay. Take it slow — you can do it." },
    { who: 'Chaea', ko: '다 같이 할 수 있어요!',
      en: 'We can all do it!' },
  ],

  // 능력·가능 표현 카드
  phrases: [
    { ko: '부를 수 있어요', rom: 'bureul su isseoyo', en: 'I can sing' },
    { ko: '할 수 있어요', rom: 'hal su isseoyo', en: 'I can do it' },
    { ko: '못 해요', rom: 'mot haeyo', en: "I can't" },
    { ko: '파트', rom: 'pateu', en: 'part' },
    { ko: '높은 음', rom: 'nopeun eum', en: 'high note' },
    { ko: '녹음실', rom: 'nogeumsil', en: 'recording studio' },
  ],

  // 문법 포인트
  grammar: [
    {
      title: '-(으)ㄹ 수 있다 (can)',
      body: 'Expresses ability or possibility. -ㄹ 수 있다 after a vowel, -을 수 있다 after a consonant.',
      ex: ['부르다 → 부를 수 있어요 (can sing)', '하다 → 할 수 있어요 (can do)'],
    },
    {
      title: '-(으)ㄹ 수 없다 / 못 (cannot)',
      body: 'Expresses inability. Use 못 + verb, or the negative -(으)ㄹ 수 없다.',
      ex: ['못 해요 (cannot do)', '할 수 없어요 (cannot do)'],
    },
  ],

  // 능력 미니게임 (3문항)
  manners: [
    { q: '이 파트를 부를 수 있다고 말할 때?', qen: 'Saying you can sing this part:',
      a: '', b: '', answer: '부를 수 있어요',
      opts: ['부를 수 있어요', '부를 수 없어요', '부르고 싶어요'],
      ok: '정답! -(으)ㄹ 수 있어요는 가능을 나타내요.', no: '가능은 -(으)ㄹ 수 있어요.',
      okEn: 'Correct! -(으)ㄹ 수 있어요 marks ability.', noEn: 'Use -(으)ㄹ 수 있어요 for ability.' },
    { q: '높은 음을 못 부른다고 말할 때?', qen: 'Saying you cannot reach the high notes:',
      a: '', b: '', answer: '못 올라가요',
      opts: ['못 올라가요', '잘 올라가요', '빨리 올라가요'],
      ok: '정답! 못 + 동사는 불가능을 나타내요.', no: '불가능은 못 + 동사.',
      okEn: 'Correct! 못 + verb marks inability.', noEn: 'Inability is 못 + verb.' },
    { q: '다 같이 할 수 있다고 격려할 때?', qen: 'Encouraging that we can all do it:',
      a: '', b: '', answer: '다 같이 할 수 있어요',
      opts: ['다 같이 할 수 있어요', '다 같이 할 수 없어요', '다 같이 포기해요'],
      ok: '정답! 할 수 있어요로 격려해요.', no: '격려는 할 수 있어요.',
      okEn: 'Correct! Encourage with 할 수 있어요.', noEn: 'Encourage with 할 수 있어요.' },
  ],

  writing: [
    { word: '녹음', roman: 'nogeum' },
    { word: '파트', roman: 'pateu' },
    { word: '할 수 있어요', roman: 'hal su isseoyo' },
  ],

  combine: [],

  rewards: [
    { icon: '🎴', label: 'Chaea photocard No.010' },
    { icon: '📈', label: 'Skill · Ability & Possibility → Mastered (+3)' },
    { icon: '🎙️', label: 'Recording studio unlocked' },
    { icon: '🎬', label: 'Episode 11 preview · Concept & Styling' },
  ],
};
