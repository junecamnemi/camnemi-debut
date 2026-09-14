import type { Episode } from '../types/game';

/** EP.13 — 데뷔 준비 · 이유/원인 표현 + -아/어서 + -기 때문에 */
export const EPISODE13: Episode = {
  id: 'ep13',
  no: 13,
  title: 'Debut Prep',
  subtitle: 'Preparing for debut · reasons & causes',
  member: 'aran',
  skill: 'Reasons & Causes',
  careerPct: 97,

  dialogue: [
    { who: 'Aran', ko: '오늘 열심히 연습해서 피곤해요.',
      en: "I practiced hard, so I'm tired.",
      tip: "Today's training — reasons & causes · -아/어서 · -기 때문에" },
    { who: 'Chaea', ko: '데뷔하기 때문에 긴장돼요.',
      en: "I'm nervous because we're debuting." },
    { who: 'Me · CEO', ko: '우리가 노력했기 때문에 여기까지 왔어요.',
      en: 'We made it here because we worked hard.' },
    { who: 'Aran', ko: '데뷔 무대, 꼭 성공하고 싶어요!',
      en: 'I really want our debut stage to succeed!' },
  ],

  // 이유·원인 표현 카드
  phrases: [
    { ko: '연습해서', rom: 'yeonseuphaeseo', en: 'because I practiced' },
    { ko: '피곤해요', rom: 'pigonhaeyo', en: "I'm tired" },
    { ko: '데뷔하기 때문에', rom: 'debwihagi ttaemune', en: 'because of debuting' },
    { ko: '노력했어요', rom: 'noryeokhaesseoyo', en: 'I worked hard' },
    { ko: '성공', rom: 'seonggong', en: 'success' },
    { ko: '열심히', rom: 'yeolsimhi', en: 'hard / diligently' },
  ],

  // 문법 포인트
  grammar: [
    {
      title: '-아/어서 (so / because)',
      body: 'Shows reason or sequence. -아서 after 아/오 vowels, -어서 elsewhere.',
      ex: ['연습하다 → 연습해서 (so I practiced)', '피곤하다 → 피곤해서 (so I am tired)'],
    },
    {
      title: '-기 때문에 (because)',
      body: 'A more formal way to give a reason.',
      ex: ['데뷔하다 → 데뷔하기 때문에 (because we debut)', '노력하다 → 노력했기 때문에 (because we worked hard)'],
    },
  ],

  // 이유·원인 미니게임 (3문항)
  manners: [
    { q: '연습해서 피곤하다고 말할 때?', qen: 'Saying you are tired because you practiced:',
      a: '', b: '', answer: '연습해서 피곤해요',
      opts: ['연습해서 피곤해요', '연습해서 신나요', '연습해서 배불러요'],
      ok: '정답! -아/어서는 이유를 나타내요.', no: '이유는 -아/어서.',
      okEn: 'Correct! -아/어서 marks a reason.', noEn: 'Use -아/어서 for a reason.' },
    { q: '데뷔 때문에 긴장된다고 말할 때?', qen: 'Saying you are nervous because of debuting:',
      a: '', b: '', answer: '데뷔하기 때문에 긴장돼요',
      opts: ['데뷔하기 때문에 긴장돼요', '데뷔하기 전에 긴장돼요', '데뷔한 후에 긴장돼요'],
      ok: '정답! -기 때문에는 이유를 강조해요.', no: '이유 강조는 -기 때문에.',
      okEn: 'Correct! -기 때문에 emphasizes the reason.', noEn: 'Use -기 때문에 for the reason.' },
    { q: '노력해서 여기까지 왔다고 말할 때?', qen: 'Saying we made it here by working hard:',
      a: '', b: '', answer: '노력했기 때문에 왔어요',
      opts: ['노력했기 때문에 왔어요', '노력 안 해서 왔어요', '포기해서 왔어요'],
      ok: '정답! 노력한 이유를 -기 때문에로 표현해요.', no: '이유는 -기 때문에.',
      okEn: 'Correct! State the reason with -기 때문에.', noEn: 'Use -기 때문에 for the reason.' },
  ],

  writing: [
    { word: '연습', roman: 'yeonseup' },
    { word: '데뷔', roman: 'debwi' },
    { word: '성공', roman: 'seonggong' },
  ],

  combine: [],

  rewards: [
    { icon: '🎴', label: 'Aran photocard No.013' },
    { icon: '📈', label: 'Skill · Reasons & Causes → Mastered (+3)' },
    { icon: '🚀', label: 'Debut prep unlocked' },
    { icon: '🎬', label: 'Episode 14 preview · Rehearsal' },
  ],
};
