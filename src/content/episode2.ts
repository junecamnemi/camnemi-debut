import type { Episode } from '../types/game';

/** EP.2 — 채아 영입 + 자기소개 표현 + 선배 매너 */
export const EPISODE2: Episode = {
  id: 'ep02',
  no: 2,
  title: 'Nice to Meet You',
  subtitle: 'Chaea joins the agency · self-introduction',
  member: 'chaea',

  dialogue: [
    // cut: 1 도착/인사, 2 환영, 3 만나서 반가워요, 4 함께 연습
    { who: 'Chaea', ko: '안녕하세요! 저는 채아예요.',
      en: "Hello! I'm Chaea.",
      tip: "Today's training — self-introduction · -이에요/예요",
      cut: 1 },
    { who: 'Me · CEO', ko: '어서 오세요. 잘 부탁해요.',
      en: 'Welcome. Nice to have you.',
      cut: 2 },
    { who: 'Chaea', ko: '저는 캄보디아에서 왔어요. 만나서 반가워요!',
      en: "I'm from Cambodia. Nice to meet you!",
      cut: 3 },
    { who: 'Aran', ko: '우리 같이 연습해요!',
      en: "Let's practice together!",
      cut: 4 },
  ],

  // 자기소개 표현 카드
  phrases: [
    { ko: '안녕하세요', rom: 'annyeonghaseyo', en: 'Hello' },
    { ko: '저는 채아예요', rom: 'jeoneun chaea-yeyo', en: "I'm Chaea" },
    { ko: '캄보디아에서 왔어요', rom: 'kambodia-eseo wasseoyo', en: 'I am from Cambodia' },
    { ko: '만나서 반가워요', rom: 'mannaseo bangawoyo', en: 'Nice to meet you' },
    { ko: '저는 연습생이에요', rom: 'jeoneun yeonseupsaeng-ieyo', en: "I'm a trainee" },
    { ko: '잘 부탁해요', rom: 'jal butakaeyo', en: 'Please take care of me' },
  ],

  // 문법 포인트
  grammar: [
    {
      title: '-이에요 / -예요',
      body: 'The polite "to be" ending. Use -이에요 after a consonant, -예요 after a vowel.',
      ex: ['연습생 + 이에요 → 연습생이에요', '채아 + 예요 → 채아예요'],
    },
    {
      title: '-에서 왔어요',
      body: '"I came from ~". Put the place before 에서.',
      ex: ['캄보디아 + 에서 왔어요 → 캄보디아에서 왔어요'],
    },
  ],

  // 선배/매너 미니게임 (3문항)
  manners: [
    { q: '처음 만난 선배에게 인사는?', qen: 'Greeting a senior you just met:',
      a: '', b: '', answer: '안녕하세요, 만나서 반가워요',
      opts: ['안녕하세요, 만나서 반가워요', '야, 안녕', '(아무 말 없이 지나간다)'],
      ok: '정답! 정중한 인사가 기본이에요.', no: '반말·무시는 실례예요.',
      okEn: 'Correct! A polite greeting is the basics.', noEn: 'Casual speech or ignoring is rude.' },
    { q: '선배를 부를 때 올바른 호칭은?', qen: 'The right way to address a senior:',
      a: '', b: '', answer: '선배님',
      opts: ['선배님', '선배야', '어이'],
      ok: '정답! 존중을 담은 -님을 붙여요.', no: '-님을 붙여 존중을 표현해요.',
      okEn: 'Correct! Add -님 to show respect.', noEn: 'Add -님 to show respect.' },
    { q: '선배가 조언을 해줬을 때 대답은?', qen: 'When a senior gives you advice:',
      a: '', b: '', answer: '감사합니다, 잘 배우겠습니다',
      opts: ['감사합니다, 잘 배우겠습니다', '네, 알았어', '(무시한다)'],
      ok: '정답! 감사와 배움의 의지를 표현해요.', no: '감사 표현이 관계를 만들어요.',
      okEn: 'Correct! Show gratitude and willingness.', noEn: 'Gratitude builds the relationship.' },
  ],

  writing: [
    { word: '채아', roman: 'Chaea' },
    { word: '안녕', roman: 'annyeong' },
  ],

  combine: [],

  rewards: [
    { icon: '🎴', label: 'Chaea photocard No.002' },
    { icon: '📈', label: 'Skill · Self-introduction → Mastered (+3)' },
    { icon: '🏠', label: 'Agency lobby background unlocked' },
    { icon: '🎬', label: 'Episode 3 preview · Our Schedule' },
  ],
};
