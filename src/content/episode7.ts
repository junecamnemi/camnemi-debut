import type { Episode } from '../types/game';

/** EP.7 — 막내 로이 합류 · 이사 · 장소/교통 + -에 가다 + -(으)로 */
export const EPISODE7: Episode = {
  id: 'ep07',
  no: 7,
  title: 'Moving In',
  subtitle: 'Maknae Roy joins · moving into the new dorm',
  member: 'roy',
  skill: 'Places & Transport',
  careerPct: 87,

  dialogue: [
    { who: 'Roy', ko: '안녕하세요, 막내 로이예요!',
      en: "Hi, I'm Roy, the maknae!",
      tip: "Today's training — places & transport · -에 가다 · -(으)로" },
    { who: 'Me · CEO', ko: '로이야, 숙소는 지하철로 가면 돼.',
      en: 'Roy, take the subway to the dorm.' },
    { who: 'Roy', ko: '저 상자, 제가 들게요.',
      en: "I'll carry that box." },
    { who: 'Aran', ko: '로이가 와서 우리 넷이 다 모였어요!',
      en: 'With Roy, all four of us are here!' },
  ],

  // 장소·교통 어휘 카드
  phrases: [
    { ko: '숙소', rom: 'sukso', en: 'dorm' },
    { ko: '지하철', rom: 'jihacheol', en: 'subway' },
    { ko: '버스', rom: 'beoseu', en: 'bus' },
    { ko: '가면 돼', rom: 'gamyeon dwae', en: 'you can take / go' },
    { ko: '상자', rom: 'sangja', en: 'box' },
    { ko: '이사', rom: 'isa', en: 'moving (house)' },
  ],

  // 문법 포인트
  grammar: [
    {
      title: '-에 가다 (go to)',
      body: 'The destination particle -에 comes before 가다 (to go).',
      ex: ['숙소 + 에 가요 → 숙소에 가요 (go to the dorm)', '학교 + 에 가요 → 학교에 가요 (go to school)'],
    },
    {
      title: '-(으)로 (by / with)',
      body: 'Marks the means of transport or a tool. -로 after a vowel or ㄹ, -으로 after a consonant.',
      ex: ['지하철 + 로 → 지하철로 (by subway)', '버스 + 로 → 버스로 (by bus)'],
    },
  ],

  // 장소·교통 미니게임 (3문항)
  manners: [
    { q: '숙소에 가는 방법을 말할 때?', qen: 'Saying how to get to the dorm:',
      a: '', b: '', answer: '지하철로 가요',
      opts: ['지하철로 가요', '지하철을 먹어요', '지하철이 읽어요'],
      ok: '정답! 교통수단은 -(으)로 표현해요.', no: '교통수단은 -(으)로.',
      okEn: 'Correct! Transport takes -(으)로.', noEn: 'Transport takes -(으)로.' },
    { q: '짐을 들어 주겠다고 말할 때?', qen: 'Offering to carry a box:',
      a: '', b: '', answer: '제가 들게요',
      opts: ['제가 들게요', '제가 먹을게요', '제가 살게요'],
      ok: '정답! 들게요가 상자를 든다는 뜻이에요.', no: '상자를 드는 것은 들게요.',
      okEn: 'Correct! 들게요 means to carry.', noEn: 'Carrying is 들게요.' },
    { q: '막내가 처음 인사할 때?', qen: 'Greeting as the new maknae:',
      a: '', b: '', answer: '안녕하세요, 막내 로이예요',
      opts: ['안녕하세요, 막내 로이예요', '야, 나 로이야', '저 로이 아니에요'],
      ok: '정답! -이에요/예요로 자기소개해요.', no: '자기소개는 -이에요/예요.',
      okEn: 'Correct! Introduce yourself with -이에요/예요.', noEn: 'Introduce with -이에요/예요.' },
  ],

  writing: [
    { word: '숙소', roman: 'sukso' },
    { word: '지하철', roman: 'jihacheol' },
    { word: '로이', roman: 'roi' },
  ],

  combine: [],

  rewards: [
    { icon: '🎴', label: 'Roy photocard No.007' },
    { icon: '📈', label: 'Skill · Places & Transport → Mastered (+3)' },
    { icon: '🏠', label: 'Dorm background unlocked' },
    { icon: '🎬', label: 'Episode 8 preview · Joint Stage' },
  ],
};
