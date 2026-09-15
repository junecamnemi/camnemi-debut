import type { Episode } from '../types/game';

/** EP.4 — 선배 아이돌과 · 인사·매너 + 높임말 + 인사/매너 미니게임 */
export const EPISODE4: Episode = {
  id: 'ep04',
  no: 4,
  title: 'With a Senior Idol',
  subtitle: 'Meeting a senior idol · greetings & manners',
  member: 'chaea',

  dialogue: [
    // cut: 1 선배 등장, 2 인사/절, 3 칭찬, 4 배움 각오
    { who: 'Senior', ko: '안녕하세요, 선배예요.',
      en: "Hello, I'm your sunbae.",
      tip: "Today's training — greetings & manners · 안녕하세요",
      cut: 1 },
    { who: 'Chaea', ko: '안녕하세요, 선배님! 만나서 영광이에요.',
      en: 'Hello, sunbae! It is an honor.',
      tip: 'Address seniors with -님 · 선배님',
      cut: 2 },
    { who: 'Senior', ko: '첫인상이 참 좋네요.',
      en: 'You make a lovely first impression.',
      tip: 'A gentle compliment · -네요',
      cut: 3 },
    { who: 'Aran', ko: '잘 배우겠습니다!',
      en: "We'll learn a lot from you!",
      tip: 'Formal polite ending -습니다 · 배우겠습니다',
      cut: 4 },
  ],

  // 인사·매너 표현 카드
  phrases: [
    { ko: '안녕하세요', rom: 'annyeonghaseyo', en: 'Hello (formal)' },
    { ko: '선배님', rom: 'seonbaenim', en: 'Senior (with -님 respect)' },
    { ko: '만나서 영광이에요', rom: 'mannaseo yeonggwang-ieyo', en: "It's an honor to meet you" },
    { ko: '잘 부탁해요', rom: 'jal butakaeyo', en: 'Please take care of me' },
    { ko: '감사합니다', rom: 'gamsahamnida', en: 'Thank you (formal)' },
    { ko: '죄송합니다', rom: 'joesonghamnida', en: "I'm sorry (formal)" },
  ],

  // 문법 포인트
  grammar: [
    {
      title: '-습니다 / -ㅂ니다 (formal polite)',
      body: 'The most polite sentence ending — used with seniors and on formal stages. -습니다 after a consonant, -ㅂ니다 after a vowel.',
      ex: ['감사하다 → 감사합니다', '배우다 → 배웁니다', '죄송하다 → 죄송합니다'],
    },
    {
      title: '-아/어요 (informal polite)',
      body: 'The everyday polite ending — warmer than -습니다 but still respectful. -아요 after 아/오 vowels, -어요 elsewhere.',
      ex: ['만나다 → 만나요', '먹다 → 먹어요', '보다 → 봐요'],
    },
  ],

  // 인사·매너 미니게임 (3문항)
  manners: [
    { q: '선배 아이돌을 처음 만났을 때 인사는?', qen: 'Meeting a senior idol for the first time:',
      a: '', b: '', answer: '안녕하세요, 선배님!',
      opts: ['안녕하세요, 선배님!', '어, 안녕', '(인사 없이 지나간다)'],
      ok: '정답! 공식적인 자리에서는 정중한 인사가 기본이에요.', no: '선배님께는 정중하게 인사해요.',
      okEn: 'Correct! A polite greeting is the basics in formal settings.', noEn: 'Greet seniors politely.' },
    { q: '선배가 칭찬해 주셨을 때 대답은?', qen: 'When a senior compliments you:',
      a: '', b: '', answer: '감사합니다!',
      opts: ['감사합니다!', '당연하죠', '네, 그래요?'],
      ok: '정답! 칭찬에는 감사로 답해요.', no: '겸손하게 감사로 답해요.',
      okEn: 'Correct! Answer praise with thanks.', noEn: 'Answer praise with humble thanks.' },
    { q: '실수했을 때 정중한 사과는?', qen: 'Apologizing politely after a mistake:',
      a: '', b: '', answer: '죄송합니다',
      opts: ['죄송합니다', '미안', '뭐 어때'],
      ok: '정답! 죄송합니다는 정중한 사과 표현이에요.', no: '공식적인 자리에서는 죄송합니다를 써요.',
      okEn: 'Correct! 죄송합니다 is the polite apology.', noEn: 'Use 죄송합니다 in formal settings.' },
  ],

  writing: [
    { word: '선배', roman: 'seonbae' },
    { word: '감사', roman: 'gamsa' },
    { word: '인사', roman: 'insa' },
  ],

  combine: [],

  rewards: [
    { icon: '🎴', label: 'Chaea photocard No.004' },
    { icon: '📈', label: 'Skill · Greetings & Manners → Mastered (+3)' },
    { icon: '🎥', label: 'Studio background unlocked' },
    { icon: '🎬', label: 'Episode 5 preview · Stage Outfit' },
  ],
};
