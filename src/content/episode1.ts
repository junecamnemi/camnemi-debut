import type { Episode } from '../types/game';

/** EP.1 — 기획사 설립 + 아란 영입 + 한글 첫걸음(자음·모음 → 조합 → 쓰기 → 예명) */
export const EPISODE1: Episode = {
  id: 'ep01',
  no: 1,
  title: '첫 걸음, 한글',
  subtitle: 'Glowsis Agency · Aran joins',
  member: 'aran',

  dialogue: [
    { who: 'Aran', ko: '…여기가 글로시스 기획사예요?', en: '…Is this the Glowsis agency?',
      scene: 'assets/ep1/ep1_arrival.jpg' },
    { who: 'Me · CEO', ko: '네, 맞아요. 오늘부터 우리 같이 시작해요!', en: "Yes. Let's start together from today!",
      scene: 'assets/ep1/ep1_arrival.jpg' },
    { who: 'Aran', ko: '저, 한국어를 잘 못해요… 괜찮아요?', en: "I'm not good at Korean… is that okay?",
      scene: 'assets/ep1/ep1_intro.jpg' },
    { who: 'Me · CEO', ko: '괜찮아요. 첫 걸음은 한글이에요. 같이 배워요!', en: "It's okay. The first step is Hangul. Let's learn together!",
      tip: "Today's training — Hangul letters → combine → writing → stage name",
      scene: 'assets/ep1/ep1_study.jpg' },
  ],

  // 기본 자음 14자 (훈민정음 순)
  consonants: [
    { j: 'ㄱ', r: 'g/k',  n: '기역' }, { j: 'ㄴ', r: 'n',    n: '니은' },
    { j: 'ㄷ', r: 'd/t',  n: '디귿' }, { j: 'ㄹ', r: 'r/l',  n: '리을' },
    { j: 'ㅁ', r: 'm',    n: '미음' }, { j: 'ㅂ', r: 'b/p',  n: '비읍' },
    { j: 'ㅅ', r: 's',    n: '시옷' }, { j: 'ㅇ', r: 'ng',   n: '이응' },
    { j: 'ㅈ', r: 'j',    n: '지읒' }, { j: 'ㅊ', r: 'ch',   n: '치읓' },
    { j: 'ㅋ', r: 'k',    n: '키읔' }, { j: 'ㅌ', r: 't',    n: '티읕' },
    { j: 'ㅍ', r: 'p',    n: '피읖' }, { j: 'ㅎ', r: 'h',    n: '히읗' },
  ],
  // 기본 모음 10자
  vowels: [
    { j: 'ㅏ', r: 'a',   n: '아' }, { j: 'ㅑ', r: 'ya',  n: '야' },
    { j: 'ㅓ', r: 'eo',  n: '어' }, { j: 'ㅕ', r: 'yeo', n: '여' },
    { j: 'ㅗ', r: 'o',   n: '오' }, { j: 'ㅛ', r: 'yo',  n: '요' },
    { j: 'ㅜ', r: 'u',   n: '우' }, { j: 'ㅠ', r: 'yu',  n: '유' },
    { j: 'ㅡ', r: 'eu',  n: '으' }, { j: 'ㅣ', r: 'i',   n: '이' },
  ],
  // 쌍자음 5자 (된소리)
  doubleCons: [
    { j: 'ㄲ', r: 'kk', n: '쌍기역' }, { j: 'ㄸ', r: 'tt', n: '쌍디귿' },
    { j: 'ㅃ', r: 'pp', n: '쌍비읍' }, { j: 'ㅆ', r: 'ss', n: '쌍시옷' },
    { j: 'ㅉ', r: 'jj', n: '쌍지읒' },
  ],
  // 복합모음 11자
  complexVow: [
    { j: 'ㅐ', r: 'ae',  n: '애' }, { j: 'ㅒ', r: 'yae', n: '얘' },
    { j: 'ㅔ', r: 'e',   n: '에' }, { j: 'ㅖ', r: 'ye',  n: '예' },
    { j: 'ㅘ', r: 'wa',  n: '와' }, { j: 'ㅙ', r: 'wae', n: '왜' },
    { j: 'ㅚ', r: 'oe',  n: '외' }, { j: 'ㅝ', r: 'wo',  n: '워' },
    { j: 'ㅞ', r: 'we',  n: '웨' }, { j: 'ㅟ', r: 'wi',  n: '위' },
    { j: 'ㅢ', r: 'ui',  n: '의' },
  ],
  // 받침(종성) 예시 — 글자 아래에 오는 자음
  finals: [
    { word: '밥',   reading: 'bap',       meaning: 'rice',   final: 'ㅂ' },
    { word: '물',   reading: 'mul',       meaning: 'water',  final: 'ㄹ' },
    { word: '사람', reading: 'sa-ram',    meaning: 'person', final: 'ㅁ' },
    { word: '한국', reading: 'han-guk',   meaning: 'Korea',  final: 'ㄱ' },
    { word: '집',   reading: 'jip',       meaning: 'house',  final: 'ㅂ' },
  ],

  combine: [
    { a: 'ㄱ', b: 'ㅏ', answer: '가', opts: ['가', '나', '다', '마'],
      q: '두 글자를 조합하면 어떤 글자가 될까요?', qen: 'Combine them — what syllable is it?',
      ok: '정답! ㄱ + ㅏ = 가 (ga)', no: 'ㄱ(자음) + ㅏ(모음) = 가. 왼쪽 → 오른쪽으로 읽어요.',
      okEn: 'Correct! ㄱ + ㅏ = 가 (ga)', noEn: 'A consonant comes first, then the vowel: ㄱ + ㅏ = 가.' },
    { a: 'ㄴ', b: 'ㅏ', answer: '나', opts: ['가', '나', '아', '자'],
      q: '이번엔 다른 조합이에요', qen: 'Another combo',
      ok: '정답! ㄴ + ㅏ = 나 (na)', no: 'ㄴ + ㅏ = 나. 자음이 먼저, 모음이 뒤에 와요.',
      okEn: 'Correct! ㄴ + ㅏ = 나 (na)', noEn: 'Consonant first, vowel second: ㄴ + ㅏ = 나.' },
    { a: 'ㅁ', b: 'ㅏ', answer: '마', opts: ['바', '사', '마', '아'],
      q: '마지막! 이 글자를 만들어보세요', qen: 'Last one!',
      ok: '정답! ㅁ + ㅏ = 마 (ma) — 아란의 마!', no: 'ㅁ(입술소리) + ㅏ = 마 예요.',
      okEn: "Correct! ㅁ + ㅏ = 마 (ma) — Aran's 마!", noEn: 'ㅁ (lip sound) + ㅏ = 마.' },
  ],

  writing: [
    { word: '블랙핑크', roman: 'BLACKPINK' },
    { word: '비티에스', roman: 'BTS' },
    { word: '뉴진스', roman: 'NewJeans' },
    { word: '아이유', roman: 'IU' },
  ],

  rewards: [
    { icon: '🎴', label: 'Aran Photocard No.001 (guaranteed unlock)' },
    { icon: '✍️', label: '스킬 · 한글 쓰기 → 숙련 (+3)' },
    { icon: '⭐', label: '예명 등록 — 내 아이돌 완성' },
    { icon: '🏠', label: '기획사 배경 해금' },
  ],
};
