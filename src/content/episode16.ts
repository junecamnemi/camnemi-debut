import type { Episode } from '../types/game';

/**
 * EP.16 — 데뷔 무대 (피날레).
 * story.ts 의 member 는 'all' 이지만, Episode.member 는 MemberId 여야 하므로
 * MEMBERS 조회가 깨지지 않게 대표 멤버 'aran' 으로 설정한다. (데뷔 그룹 스테이지로 연출)
 */
export const EPISODE16: Episode = {
  id: 'ep16',
  no: 16,
  title: 'Debut Stage',
  subtitle: 'Finally, debut — TOPIK I level 2 & the music video',
  member: 'aran',
  skill: 'Debut',
  careerPct: 100,

  dialogue: [
    { who: 'Aran', ko: '여러분, 드디어 데뷔합니다!',
      en: "Everyone — we're finally debuting!",
      tip: "Today's training — TOPIK I level 2 · debut" },
    { who: 'Chaea', ko: '글로시스, 시작합니다!',
      en: 'Glowsis, here we go!' },
    { who: 'Me · CEO', ko: '여기까지 온 우리 모두, 정말 수고했어요.',
      en: 'We all made it here — you worked so hard.' },
    { who: 'Roy', ko: '우리의 무대를 봐 주세요!',
      en: 'Please watch our stage!' },
  ],

  // 데뷔·복습 표현 카드
  phrases: [
    { ko: '데뷔', rom: 'debwi', en: 'debut' },
    { ko: '시작합니다', rom: 'sijakhamnida', en: 'we begin' },
    { ko: '수고했어요', rom: 'sugohaesseoyo', en: 'well done' },
    { ko: '무대', rom: 'mudae', en: 'stage' },
    { ko: '팬 여러분', rom: 'paen yeoreobun', en: 'fans / everyone' },
    { ko: '감사합니다', rom: 'gamsahamnida', en: 'thank you' },
  ],

  // 문법 포인트
  grammar: [
    {
      title: '-습니다 / -ㅂ니다 (formal stage)',
      body: 'The most polite ending — used on the debut stage. -습니다 after a consonant, -ㅂ니다 after a vowel.',
      ex: ['시작하다 → 시작합니다', '데뷔하다 → 데뷔합니다'],
    },
    {
      title: 'TOPIK I level 2',
      body: 'You have completed all the TOPIK I level 2 vocabulary & grammar across EP.1–16.',
      ex: ['Hangul → greetings → schedules → debut', 'TOPIK I level 2 reached 🎉'],
    },
  ],

  // 데뷔 미니게임 (3문항)
  manners: [
    { q: '드디어 데뷔한다고 알릴 때?', qen: 'Announcing the debut:',
      a: '', b: '', answer: '데뷔합니다',
      opts: ['데뷔합니다', '데뷔했어요', '데뷔할까요'],
      ok: '정답! 데뷔합니다는 공식 선언이에요.', no: '공식 선언은 데뷔합니다.',
      okEn: 'Correct! 데뷔합니다 is the official announcement.', noEn: 'Announce with 데뷔합니다.' },
    { q: '공식 무대를 시작할 때?', qen: 'Starting the official stage:',
      a: '', b: '', answer: '시작합니다',
      opts: ['시작합니다', '끝냅니다', '쉽니다'],
      ok: '정답! 시작합니다는 공식 시작 표현이에요.', no: '시작은 시작합니다.',
      okEn: 'Correct! 시작합니다 means to begin.', noEn: 'Begin with 시작합니다.' },
    { q: '무대를 봐 달라고 부탁할 때?', qen: 'Asking the fans to watch your stage:',
      a: '', b: '', answer: '무대를 봐 주세요',
      opts: ['무대를 봐 주세요', '무대를 지워 주세요', '무대를 피해 주세요'],
      ok: '정답! -아/어 주세요로 부탁해요.', no: '부탁은 -아/어 주세요.',
      okEn: 'Correct! Ask with -아/어 주세요.', noEn: 'Request with -아/어 주세요.' },
  ],

  writing: [
    { word: '데뷔', roman: 'debwi' },
    { word: '무대', roman: 'mudae' },
    { word: '글로시스', roman: 'geullosis' },
  ],

  combine: [],

  rewards: [
    { icon: '🎴', label: 'Glowsis group photocard No.016' },
    { icon: '📈', label: 'Skill · Debut → Mastered (+3)' },
    { icon: '🎉', label: 'Debut stage unlocked' },
    { icon: '🏆', label: 'TOPIK I level 2 complete' },
  ],
};
