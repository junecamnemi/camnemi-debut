import type { Episode } from '../types/game';

/** EP.14 — 리허설 · 관형사형 -(으)ㄴ/는 복습 */
export const EPISODE14: Episode = {
  id: 'ep14',
  no: 14,
  title: 'Rehearsal',
  subtitle: 'Final rehearsal · reviewing what we learned',
  member: 'chaea',
  skill: 'Modifiers',
  careerPct: 98,

  dialogue: [
    { who: 'Chaea', ko: '어제 배운 노래를 다시 해요.',
      en: "Let's do the song we learned yesterday again.",
      tip: "Today's training — modifiers · -(으)ㄴ/는" },
    { who: 'Dahee', ko: '무대에서 실수한 부분을 고쳐요.',
      en: "Let's fix the part we missed on stage." },
    { who: 'Me · CEO', ko: '지금까지 배운 것이 다 여기 있어요.',
      en: "Everything we've learned is right here." },
    { who: 'Chaea', ko: '완벽해요! 이제 준비됐어요.',
      en: "Perfect! We're ready now." },
  ],

  // 관형사형 표현 카드
  phrases: [
    { ko: '배운 노래', rom: 'baeun norae', en: 'the song (I) learned' },
    { ko: '실수한 부분', rom: 'silsuhan bubun', en: 'the part (I) missed' },
    { ko: '다시 해요', rom: 'dasi haeyo', en: 'do it again' },
    { ko: '고쳐요', rom: 'gochyeoyo', en: 'fix' },
    { ko: '준비됐어요', rom: 'junbidwaesseoyo', en: "I'm ready" },
    { ko: '완벽해요', rom: 'wanbyeokhaeyo', en: "it's perfect" },
  ],

  // 문법 포인트
  grammar: [
    {
      title: '-(으)ㄴ (modifier, past)',
      body: 'Turns a verb into a noun modifier for a completed action. -ㄴ after a vowel, -은 after a consonant.',
      ex: ['배우다 → 배운 (learned)', '실수하다 → 실수한 (missed/mistaken)'],
    },
    {
      title: '-는 (modifier, present)',
      body: 'Present-tense noun modifier for an ongoing action.',
      ex: ['하다 → 하는 (doing)', '가다 → 가는 (going)'],
    },
  ],

  // 관형사형 미니게임 (3문항)
  manners: [
    { q: '어제 배운 노래를 말할 때?', qen: 'Referring to the song learned yesterday:',
      a: '', b: '', answer: '배운 노래',
      opts: ['배운 노래', '배울 노래', '배우는 노래'],
      ok: '정답! 지난 일은 -(으)ㄴ으로 꾸며요.', no: '완료된 일은 -(으)ㄴ.',
      okEn: 'Correct! Completed actions take -(으)ㄴ.', noEn: 'Use -(으)ㄴ for completed actions.' },
    { q: '무대에서 실수한 부분을 말할 때?', qen: 'Referring to the part missed on stage:',
      a: '', b: '', answer: '실수한 부분',
      opts: ['실수한 부분', '실수할 부분', '실수하는 부분'],
      ok: '정답! 지난 실수는 실수한.', no: '완료된 일은 -(으)ㄴ.',
      okEn: 'Correct! Past mistakes take 실수한.', noEn: 'Use -(으)ㄴ for the past.' },
    { q: '이제 준비가 됐다고 말할 때?', qen: 'Saying you are ready now:',
      a: '', b: '', answer: '준비됐어요',
      opts: ['준비됐어요', '준비할게요', '준비 중이에요'],
      ok: '정답! 준비됐어요는 완료된 상태예요.', no: '완료 상태는 준비됐어요.',
      okEn: 'Correct! 준비됐어요 is the ready state.', noEn: 'Ready is 준비됐어요.' },
  ],

  writing: [
    { word: '노래', roman: 'norae' },
    { word: '부분', roman: 'bubun' },
    { word: '준비', roman: 'junbi' },
  ],

  combine: [],

  rewards: [
    { icon: '🎴', label: 'Chaea photocard No.014' },
    { icon: '📈', label: 'Skill · Modifiers → Mastered (+3)' },
    { icon: '🎬', label: 'Rehearsal stage unlocked' },
    { icon: '🎬', label: 'Episode 15 preview · Interview' },
  ],
};
