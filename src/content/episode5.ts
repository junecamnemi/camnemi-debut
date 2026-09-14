import type { Episode } from '../types/game';

/** EP.5 — 댄서 다희 합류 · 무대 의상 · 옷/색 어휘 + -고 싶어요 */
export const EPISODE5: Episode = {
  id: 'ep05',
  no: 5,
  title: 'Stage Outfit',
  subtitle: 'Dancer Dahee joins · shopping for stage outfits',
  member: 'dahee',
  skill: 'Clothes & Colors',
  careerPct: 80,

  dialogue: [
    { who: 'Dahee', ko: '안녕하세요! 댄서 다희입니다.',
      en: "Hi! I'm Dahee, your dancer.",
      tip: "Today's training — clothes & colors · -고 싶어요" },
    { who: 'Me · CEO', ko: '다희야, 무대 의상부터 고르자.',
      en: "Dahee, let's pick your stage outfit first." },
    { who: 'Dahee', ko: '저는 이 핑크 재킷을 입고 싶어요.',
      en: 'I want to wear this pink jacket.' },
    { who: 'Chaea', ko: '다희가 제일 빛나네요!',
      en: 'Dahee really shines!' },
  ],

  // 옷·색 어휘 카드
  phrases: [
    { ko: '의상', rom: 'uisang', en: 'outfit' },
    { ko: '재킷', rom: 'jaekit', en: 'jacket' },
    { ko: '핑크', rom: 'pingkeu', en: 'pink' },
    { ko: '색', rom: 'saek', en: 'color' },
    { ko: '입고 싶어요', rom: 'ipgo sipeoyo', en: 'I want to wear' },
    { ko: '예뻐요', rom: 'yeppeoyo', en: "it's pretty" },
  ],

  // 문법 포인트
  grammar: [
    {
      title: '-고 싶어요 (want to)',
      body: 'Attach -고 싶어요 to a verb stem to say "I want to …".',
      ex: ['입다 → 입고 싶어요 (want to wear)', '가다 → 가고 싶어요 (want to go)'],
    },
    {
      title: '색 (colors)',
      body: 'Color names attach -색 to the base color word.',
      ex: ['핑크색 (pink)', '파란색 (blue)', '빨간색 (red)'],
    },
  ],

  // 옷·색 미니게임 (3문항)
  manners: [
    { q: '무대 의상을 입고 싶다고 말할 때?', qen: 'Saying you want to wear a stage outfit:',
      a: '', b: '', answer: '입고 싶어요',
      opts: ['입고 싶어요', '입었어요', '입을 수 있어요'],
      ok: '정답! -고 싶어요는 바람을 나타내요.', no: '-고 싶어요로 바람을 표현해요.',
      okEn: 'Correct! -고 싶어요 expresses a wish.', noEn: 'Use -고 싶어요 to express a wish.' },
    { q: '이 옷이 예쁘다고 말할 때?', qen: 'Saying the outfit is pretty:',
      a: '', b: '', answer: '예뻐요',
      opts: ['예뻐요', '맛있어요', '추워요'],
      ok: '정답! 예쁘다 → 예뻐요.', no: '예쁘다의 -아/어요 꼴은 예뻐요예요.',
      okEn: 'Correct! 예쁘다 → 예뻐요.', noEn: 'The polite form of 예쁘다 is 예뻐요.' },
    { q: '핑크색 의상이에요. 올바른 색 표현은?', qen: 'Which is the correct color word?',
      a: '', b: '', answer: '핑크색',
      opts: ['핑크색', '핑크맛', '핑크소리'],
      ok: '정답! 색은 -색으로 나타내요.', no: '색은 -색으로 표현해요.',
      okEn: 'Correct! Colors take -색.', noEn: 'Colors take -색.' },
  ],

  writing: [
    { word: '의상', roman: 'uisang' },
    { word: '핑크', roman: 'pingkeu' },
    { word: '재킷', roman: 'jaekit' },
  ],

  combine: [],

  rewards: [
    { icon: '🎴', label: 'Dahee photocard No.005' },
    { icon: '📈', label: 'Skill · Clothes & Colors → Mastered (+3)' },
    { icon: '👗', label: 'Stage outfit unlocked' },
    { icon: '🎬', label: 'Episode 6 preview · Dinner After Practice' },
  ],
};
