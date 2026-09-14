import type { Episode } from '../types/game';

/** EP.6 — 연습 후 저녁 · 음식 어휘 + -(으)ㄹ래요? + -아/어 주세요 */
export const EPISODE6: Episode = {
  id: 'ep06',
  no: 6,
  title: 'Dinner After Practice',
  subtitle: 'Dinner together after practice',
  member: 'dahee',
  skill: 'Food & Dining',
  careerPct: 84,

  dialogue: [
    { who: 'Dahee', ko: '다들 뭐 먹을래요?',
      en: 'What does everyone want to eat?',
      tip: "Today's training — food · shall we? · please do" },
    { who: 'Aran', ko: '저는 김치찌개 먹을래요.',
      en: "I'll have kimchi stew." },
    { who: 'Chaea', ko: '물 좀 주세요!',
      en: 'Some water, please!' },
    { who: 'Me · CEO', ko: '오늘 연습 잘했어요. 맛있게 먹어요!',
      en: "Great practice today. Let's eat well!" },
  ],

  // 음식 어휘 카드
  phrases: [
    { ko: '밥', rom: 'bap', en: 'rice / meal' },
    { ko: '김치찌개', rom: 'gimchijjigae', en: 'kimchi stew' },
    { ko: '물', rom: 'mul', en: 'water' },
    { ko: '먹을래요', rom: 'meogeullaeyo', en: "shall we eat / I'll have" },
    { ko: '주세요', rom: 'juseyo', en: 'please give me' },
    { ko: '맛있게 먹어요', rom: 'masitge meogeoyo', en: 'eat well / enjoy' },
  ],

  // 문법 포인트
  grammar: [
    {
      title: '-(으)ㄹ래요? (shall we / want to)',
      body: 'Suggests an action or states an intention. -ㄹ래요 after a vowel, -을래요 after a consonant.',
      ex: ['먹다 → 먹을래요 (shall we eat?)', '가다 → 갈래요 (want to go)'],
    },
    {
      title: '-아/어 주세요 (please do)',
      body: 'A polite request. -아 주세요 after 아/오 vowels, -어 주세요 elsewhere.',
      ex: ['주다 → 주세요 (please give)', '읽다 → 읽어 주세요 (please read)'],
    },
  ],

  // 음식·식사 미니게임 (3문항)
  manners: [
    { q: '뭐 먹고 싶은지 물을 때?', qen: 'Asking what to eat:',
      a: '', b: '', answer: '뭐 먹을래요?',
      opts: ['뭐 먹을래요?', '뭐 읽을래요?', '뭐 살래요?'],
      ok: '정답! -(으)ㄹ래요?로 제안·의향을 물어요.', no: '-(으)ㄹ래요?로 물어요.',
      okEn: 'Correct! Ask with -(으)ㄹ래요?.', noEn: 'Ask with -(으)ㄹ래요?.' },
    { q: '물을 부탁할 때 정중한 표현은?', qen: 'Politely asking for water:',
      a: '', b: '', answer: '물 좀 주세요',
      opts: ['물 좀 주세요', '물 줘', '물 사'],
      ok: '정답! -아/어 주세요가 정중한 부탁이에요.', no: '정중한 부탁은 -아/어 주세요.',
      okEn: 'Correct! -아/어 주세요 is the polite request.', noEn: 'Use -아/어 주세요 for a polite request.' },
    { q: '다 같이 맛있게 먹자고 할 때?', qen: 'Inviting everyone to enjoy the meal:',
      a: '', b: '', answer: '맛있게 먹어요',
      opts: ['맛있게 먹어요', '빨리 먹어요', '조용히 먹어요'],
      ok: '정답! 맛있게 먹어요는 식사 인사예요.', no: '식사 전 인사는 맛있게 먹어요.',
      okEn: 'Correct! 맛있게 먹어요 is the meal greeting.', noEn: 'Say 맛있게 먹어요 before a meal.' },
  ],

  writing: [
    { word: '밥', roman: 'bap' },
    { word: '물', roman: 'mul' },
    { word: '주세요', roman: 'juseyo' },
  ],

  combine: [],

  rewards: [
    { icon: '🎴', label: 'Dahee photocard No.006' },
    { icon: '📈', label: 'Skill · Food & Dining → Mastered (+3)' },
    { icon: '🍲', label: 'Dinner scene unlocked' },
    { icon: '🎬', label: 'Episode 7 preview · Moving In' },
  ],
};
