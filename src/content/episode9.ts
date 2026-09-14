import type { Episode } from '../types/game';

/** EP.9 — 팀 프로젝트 · 제안 표현 + -(으)ㄹ까요? + -는 게 어때요? */
export const EPISODE9: Episode = {
  id: 'ep09',
  no: 9,
  title: 'Team Project',
  subtitle: 'Planning a new stage together · suggestions',
  member: 'aran',
  skill: 'Making Suggestions',
  careerPct: 92,

  dialogue: [
    { who: 'Aran', ko: '새 곡 컨셉을 정할까요?',
      en: 'Shall we decide the concept for the new song?',
      tip: "Today's training — suggestions · -(으)ㄹ까요? · -는 게 어때요?" },
    { who: 'Chaea', ko: '여름 콘셉트는 어때요?',
      en: 'How about a summer concept?' },
    { who: 'Dahee', ko: '저는 시원한 무대가 좋아요.',
      en: "I'd love a refreshing stage." },
    { who: 'Me · CEO', ko: '좋아요. 다 같이 만들어 봐요.',
      en: "Great. Let's build it together." },
  ],

  // 제안 표현 카드
  phrases: [
    { ko: '컨셉', rom: 'keonsep', en: 'concept' },
    { ko: '새 곡', rom: 'sae gok', en: 'new song' },
    { ko: '여름', rom: 'yeoreum', en: 'summer' },
    { ko: '정할까요', rom: 'jeonghalkkayo', en: 'shall we decide' },
    { ko: '어때요', rom: 'eottaeyo', en: 'how about / how is it' },
    { ko: '시원한', rom: 'siwonhan', en: 'refreshing / cool' },
  ],

  // 문법 포인트
  grammar: [
    {
      title: '-(으)ㄹ까요? (shall we?)',
      body: 'Suggests an action to do together. -ㄹ까요 after a vowel, -을까요 after a consonant.',
      ex: ['정하다 → 정할까요 (shall we decide?)', '먹다 → 먹을까요 (shall we eat?)'],
    },
    {
      title: '-는 게 어때요? (how about?)',
      body: 'Softens a suggestion: "how about doing ~?".',
      ex: ['가는 게 어때요 (how about going?)', '해 보는 게 어때요 (how about trying?)'],
    },
  ],

  // 제안 미니게임 (3문항)
  manners: [
    { q: '컨셉을 함께 정하자고 제안할 때?', qen: 'Suggesting to decide the concept together:',
      a: '', b: '', answer: '컨셉을 정할까요?',
      opts: ['컨셉을 정할까요?', '컨셉을 정했어요?', '컨셉을 버릴까요?'],
      ok: '정답! -(으)ㄹ까요?는 함께 하자는 제안이에요.', no: '제안은 -(으)ㄹ까요?.',
      okEn: 'Correct! -(으)ㄹ까요? is a joint suggestion.', noEn: 'Suggest with -(으)ㄹ까요?.' },
    { q: '여름 콘셉트를 부드럽게 제안할 때?', qen: 'Softly suggesting a summer concept:',
      a: '', b: '', answer: '여름 콘셉트는 어때요?',
      opts: ['여름 콘셉트는 어때요?', '여름 콘셉트는 얼마예요?', '여름 콘셉트는 누구예요?'],
      ok: '정답! -는 게 어때요?로 부드럽게 제안해요.', no: '부드러운 제안은 어때요?.',
      okEn: 'Correct! Soften a suggestion with 어때요?.', noEn: 'Soften suggestions with 어때요?.' },
    { q: '좋은 의견에 동의할 때?', qen: 'Agreeing with a good idea:',
      a: '', b: '', answer: '좋아요',
      opts: ['좋아요', '싫어요', '몰라요'],
      ok: '정답! 좋아요로 동의를 표현해요.', no: '동의는 좋아요.',
      okEn: 'Correct! Agree with 좋아요.', noEn: 'Agree with 좋아요.' },
  ],

  writing: [
    { word: '여름', roman: 'yeoreum' },
    { word: '컨셉', roman: 'keonsep' },
    { word: '정할까요', roman: 'jeonghalkkayo' },
  ],

  combine: [],

  rewards: [
    { icon: '🎴', label: 'Aran photocard No.009' },
    { icon: '📈', label: 'Skill · Making Suggestions → Mastered (+3)' },
    { icon: '🎵', label: 'New song concept unlocked' },
    { icon: '🎬', label: 'Episode 10 preview · Recording Day' },
  ],
};
