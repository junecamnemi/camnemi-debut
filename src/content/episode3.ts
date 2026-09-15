import type { Episode } from '../types/game';

/** EP.3 — 시간·날짜 표현 + 스케줄 계획 + 일정 미니게임 */
export const EPISODE3: Episode = {
  id: 'ep03',
  no: 3,
  title: 'Our Schedule',
  subtitle: 'Planning the day · time & dates',
  member: 'aran',

  dialogue: [
    // cut: 1 스케줄 물어보기, 2 시간 답변, 3 점심, 4 뮤직쇼
    { who: 'Aran', ko: '오늘 연습은 몇 시예요?',
      en: 'What time is practice today?',
      tip: "Today's training — time & dates · 몇 시예요?",
      cut: 1 },
    { who: 'Me · CEO', ko: '오전 아홉 시에 시작해요.',
      en: 'We start at nine in the morning.',
      cut: 2 },
    { who: 'Chaea', ko: '점심은 어디에서 먹어요?',
      en: 'Where do we eat lunch?',
      cut: 3 },
    { who: 'Aran', ko: '내일은 뮤직쇼가 있어요!',
      en: "There's a music show tomorrow!",
      cut: 4 },
  ],

  // 시간·날짜 표현 카드
  phrases: [
    { ko: '오늘', rom: 'oneul', en: 'today' },
    { ko: '내일', rom: 'naeil', en: 'tomorrow' },
    { ko: '아홉 시', rom: 'ahop si', en: "nine o'clock" },
    { ko: '몇 시예요', rom: 'myeot siyeyo', en: 'what time is it?' },
    { ko: '뮤직쇼가 있어요', rom: 'myujiksyo-ga isseoyo', en: 'there is a music show' },
    { ko: '일곱 시에 만나요', rom: 'ilgop si-e mannayo', en: "let's meet at seven" },
  ],

  // 문법 포인트
  grammar: [
    {
      title: '-에 (time)',
      body: 'The time particle -에 marks when something happens: "at (time)".',
      ex: ['아홉 시 + 에 → 아홉 시에 시작해요', '일곱 시 + 에 → 일곱 시에 만나요'],
    },
    {
      title: '-(으)ㄹ 거예요 (future plan)',
      body: 'Future tense for plans. Use -ㄹ 거예요 after a vowel, -을 거예요 after a consonant.',
      ex: ['가다 → 갈 거예요 (will go)', '먹다 → 먹을 거예요 (will eat)'],
    },
  ],

  // 시간·일정 미니게임 (3문항)
  manners: [
    { q: '약속 시간을 말할 때 올바른 표현은?', qen: 'Stating a meeting time:',
      a: '', b: '', answer: '아홉 시에 만나요',
      opts: ['아홉 시에 만나요', '아홉 시를 만나요', '아홉 시가 만나요'],
      ok: '정답! 시간 뒤에는 -에를 붙여요.', no: '시간 뒤에는 -에를 붙여요.',
      okEn: 'Correct! Time takes -에.', noEn: 'Time takes -에.' },
    { q: '시간을 물을 때 올바른 표현은?', qen: 'Asking the time:',
      a: '', b: '', answer: '몇 시예요?',
      opts: ['몇 시예요?', '몇 시에요?', '몇 시간이에요?'],
      ok: '정답! 몇 시예요?가 자연스러워요.', no: '몇 시예요?라고 물어요.',
      okEn: 'Correct! Ask with 몇 시예요?', noEn: 'Ask with 몇 시예요?' },
    { q: '내일 계획을 말할 때 알맞은 표현은?', qen: "Talking about tomorrow's plan:",
      a: '', b: '', answer: '뮤직쇼가 있을 거예요',
      opts: ['뮤직쇼가 있을 거예요', '뮤직쇼가 있었어요', '뮤직쇼가 없을 거예요'],
      ok: '정답! -(으)ㄹ 거예요는 미래 계획이에요.', no: '-(으)ㄹ 거예요는 미래 계획을 나타내요.',
      okEn: 'Correct! -(으)ㄹ 거예요 marks a future plan.', noEn: '-(으)ㄹ 거예요 marks a future plan.' },
  ],

  writing: [
    { word: '월', roman: 'wol' },
    { word: '일', roman: 'il' },
    { word: '뮤직쇼', roman: 'myujiksyo' },
  ],

  combine: [],

  rewards: [
    { icon: '🎴', label: 'Aran photocard No.003' },
    { icon: '📈', label: 'Skill · Time & Date → Mastered (+3)' },
    { icon: '🎤', label: 'Music show stage unlocked' },
    { icon: '🎬', label: 'Episode 4 preview · With a Senior Idol' },
  ],
};
