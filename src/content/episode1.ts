import type { Episode } from '../types/game';

/** EP.1 — 기획사 설립 + 아란 영입 + 한글 첫걸음(자음·모음 → 조합 → 쓰기 → 예명) */
export const EPISODE1: Episode = {
  id: 'ep01',
  no: 1,
  title: '첫 걸음, 한글',
  subtitle: '기획사 글로시스 · 아란 영입',
  member: 'aran',

  dialogue: [
    { who: '아란', ko: '…여기가 글로시스 기획사예요?', en: '…Is this the Glowsis agency?' },
    { who: '나 · 대표', ko: '네, 맞아요. 오늘부터 우리 같이 시작해요!', en: "Yes. Let's start together from today!" },
    { who: '아란', ko: '저, 한국어를 잘 못해요… 괜찮아요?', en: "I'm not good at Korean… is that okay?" },
    { who: '나 · 대표', ko: '괜찮아요. 첫 걸음은 한글이에요. 같이 배워요!', en: "It's okay. The first step is Hangul. Let's learn together!",
      tip: '오늘의 트레이닝 — 한글 자음·모음 → 조합 → 쓰기 → 예명 짓기' },
  ],

  consonants: [
    { j: 'ㄱ', r: 'g/k' }, { j: 'ㄴ', r: 'n' }, { j: 'ㄷ', r: 'd' }, { j: 'ㄹ', r: 'r/l' },
    { j: 'ㅁ', r: 'm' }, { j: 'ㅂ', r: 'b/p' }, { j: 'ㅅ', r: 's' }, { j: 'ㅇ', r: 'ng' },
  ],
  vowels: [
    { j: 'ㅏ', r: 'a' }, { j: 'ㅑ', r: 'ya' }, { j: 'ㅓ', r: 'eo' }, { j: 'ㅕ', r: 'yeo' },
    { j: 'ㅗ', r: 'o' }, { j: 'ㅛ', r: 'yo' }, { j: 'ㅜ', r: 'u' }, { j: 'ㅠ', r: 'yu' },
  ],

  combine: [
    { a: 'ㄱ', b: 'ㅏ', answer: '가', opts: ['가', '나', '다', '마'],
      q: '두 글자를 조합하면 어떤 글자가 될까요?', qen: 'Combine them — what syllable is it?',
      ok: '정답! ㄱ + ㅏ = 가 (ga)', no: 'ㄱ(자음) + ㅏ(모음) = 가. 왼쪽 → 오른쪽으로 읽어요.' },
    { a: 'ㄴ', b: 'ㅏ', answer: '나', opts: ['가', '나', '아', '자'],
      q: '이번엔 다른 조합이에요', qen: 'Another combo',
      ok: '정답! ㄴ + ㅏ = 나 (na)', no: 'ㄴ + ㅏ = 나. 자음이 먼저, 모음이 뒤에 와요.' },
    { a: 'ㅁ', b: 'ㅏ', answer: '마', opts: ['바', '사', '마', '아'],
      q: '마지막! 이 글자를 만들어보세요', qen: 'Last one!',
      ok: '정답! ㅁ + ㅏ = 마 (ma) — 아란의 마!', no: 'ㅁ(입술소리) + ㅏ = 마 예요.' },
  ],

  writing: [
    { word: '블랙핑크', roman: 'BLACKPINK' },
    { word: '비티에스', roman: 'BTS' },
    { word: '뉴진스', roman: 'NewJeans' },
    { word: '아이유', roman: 'IU' },
  ],

  rewards: [
    { icon: '🎴', label: '아란 포토카드 No.001 (확정 해금)' },
    { icon: '✍️', label: '스킬 · 한글 쓰기 → 숙련 (+3)' },
    { icon: '⭐', label: '예명 등록 — 내 아이돌 완성' },
    { icon: '🏠', label: '기획사 배경 해금' },
  ],
};
