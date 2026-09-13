import { createContext, useContext, useEffect, useState, type ReactNode } from 'react';

export type Lang = 'en' | 'ko';
const LS_KEY = 'camnemi_debut_lang';

/** UI 문자열 (학습 콘텐츠인 한글 자모·낱말은 번역하지 않음) */
const DICT = {
  en: {
    // tabs
    tab_home: 'Home', tab_train: 'Train', tab_story: 'Story', tab_cards: 'Cards', tab_my: 'My',
    // common
    streak: (n: number) => `${n}-day streak`,
    continue: 'Continue',
    next: 'Next',
    back: 'Back',
    locked: 'Locked',
    replay: 'Play again',
    loading: 'Loading…',
    // home
    home_today: "Today's training",
    home_hero_title: 'Learn self-introductions with Aran',
    home_hero_sub: 'EP.2 · -이에요/예요 · about 12 min',
    home_my_idol: 'My idol',
    home_quick: 'Quick access',
    tile_practice: 'Practice problems',
    tile_practice_d: 'New AI questions every day',
    tile_story: 'Debut story',
    tile_story_d: 'EP.1 – 16 to debut',
    tile_cards: 'Photocards',
    tile_cards_d: 'Collect as you grow',
    // train
    train: 'Train',
    train_practice: 'Practice',
    train_textbook: 'Textbook',
    train_hero_title: 'Practice problems',
    train_hero_sub: 'Build skill with fresh questions every day',
    train_tb_title: 'Learn with the textbook',
    train_tb_sub: '1A – 6B · grammar, vocab, dialogue by unit',
    kind_read: 'Reading', kind_listen: 'Listening', kind_vocab: 'Vocabulary',
    play_audio: 'Play audio', check: 'Check', correct: 'Correct!', incorrect: 'Not quite',
    audio_failed: "Couldn't play audio. Please try again.",
    audio_fallback: 'Could not load the premium voice — played with the device voice instead.',
    // story
    story: 'Story',
    story_hero_title: 'Debut Project',
    story_hero_badge: 'Glowsis Agency',
    story_hero_sub: 'EP.1–16 · debut with Aran (TOPIK level 2)',
    story_progress: 'Progress',
    // collection
    collection: 'Collection',
    collection_hero: 'Photocards',
    collection_sub: 'Cards unlock as you finish episodes (no gacha)',
    collected: (a: number, b: number) => `${a} / ${b} collected`,
    // my
    my_profile: 'My Profile',
    my_career: 'Career',
    my_stats: 'Study stats',
    stat_streak: 'Streak', stat_days: 'Days', stat_mastered: 'Mastered',
    my_path: 'Path to debut',
    my_skills: 'Learning skills',
    my_cards: 'Photocards',
    my_language: 'Language',
    my_settings: 'Settings',
    logout: 'Log out', login: 'Sign in',
    logout_d: 'Leave this account', login_d: 'Sign in to save progress',
    // skill states
    sk_mastered: 'Mastered', sk_review: 'Needs review', sk_learning: 'Learning',
    // auth
    auth_start: 'Start with your email',
    auth_send: 'Send magic link',
    auth_sending: 'Sending…',
    auth_note: 'No password — we email you a sign-in link',
    auth_or: 'or',
    auth_google: 'Continue with Google',
    auth_facebook: 'Continue with Facebook',
    auth_sent_t: 'Check your email',
    auth_sent_d: (e: string) => `We sent a sign-in link to ${e}.`,
    auth_other: 'Use another email',
    auth_foot: 'By continuing you agree to the Terms and Privacy Policy.',
    auth_guest: 'Explore without signing in →',
    // episode 1
    ep1_title: 'First Step: Hangul',
    ep1_start: 'Start training',
    ep1_learn: (w: string) => `Learn ${w}`,
    ep1_combine: 'Combine game',
    ep1_writing: 'Writing practice',
    ep1_naming: 'Pick a stage name',
    ep1_next_char: 'Next letter',
    ep1_check_first: 'Write the letter, then check',
    ep1_name_placeholder: 'Enter a name (2+ letters)',
    ep1_debut_as: (n: string) => `Debut as ‘${n}’`,
    ep1_clear: 'EP.1 Clear',
    jamo_cons: 'Consonants', jamo_vow: 'Vowels', jamo_dcons: 'Double consonants', jamo_dvow: 'Compound vowels',
    jamo_final: 'Final consonants',
    jamo_hint: 'Tap a card to hear the sound 🔊',
    jamo_listen: 'Listen and repeat.',
    jamo_count: (n: number) => `${n} letters`,
    final_expl: 'A consonant below the letter is a final consonant (받침). It closes the sound.',
    final_hint: 'Tap a card — the final consonant closes the sound.',
    write_trace: 'Trace each letter with your finger',
    write_great: 'Nice!',
    write_done: 'You did it!',
    reward_title: 'Unlocked',
    self_intro: 'Self-introduction phrases',
    tap_to_hear: 'Tap a card to hear it',
    grammar: 'Grammar',
    // hero carousel scene labels
    scene_home: 'Home', scene_song: 'Song', scene_stage: 'Stage', scene_rank: 'Rank', scene_set: 'Settings',
    scene_c_song: 'Concert · Song', scene_c_stage: 'Concert · Stage', scene_c_rank: 'Concert · Rank', scene_c_set: 'Concert · Settings',
    questions_n: (n: number) => `${n} question${n === 1 ? '' : 's'}`, daily_title: "Today's TOPIK", daily_empty: 'No problems yet — check back soon.', back_menu: 'Back to menu',
    replay_ep: (n: number) => `Replay EP.${n} →`,
    // career stages
    career_entry: 'Trainee', career_rookie: 'Rookie', career_team: 'Team project',
    career_debut_ready: 'Debut prep', career_debut: 'Debut',
  },
  ko: {
    tab_home: '홈', tab_train: '훈련', tab_story: '스토리', tab_cards: '컬렉션', tab_my: 'My',
    streak: (n: number) => `${n}일 연속`,
    continue: '이어서 하기',
    next: '다음',
    back: '뒤로',
    locked: '잠김',
    replay: '다시 보기',
    loading: '불러오는 중…',
    home_today: '오늘의 트레이닝',
    home_hero_title: '아란과 자기소개를 배워요',
    home_hero_sub: 'EP.2 · -이에요/예요 · 약 12분',
    home_my_idol: '내 아이돌',
    home_quick: '바로가기',
    tile_practice: '문제풀이 연습',
    tile_practice_d: '매일 새 AI 문제',
    tile_story: '데뷔 스토리',
    tile_story_d: 'EP.1~16 데뷔까지',
    tile_cards: '포토카드',
    tile_cards_d: '성장하며 수집',
    train: '훈련',
    train_practice: '문제풀이',
    train_textbook: '교재',
    train_hero_title: '문제풀이 연습',
    train_hero_sub: '매일 새로 생성되는 문제로 실력을 쌓아요',
    train_tb_title: '교재로 배우기',
    train_tb_sub: '1A~6B · 단원별 문법·어휘·회화',
    kind_read: '읽기', kind_listen: '듣기', kind_vocab: '어휘',
    play_audio: '음성 재생', check: '확인', correct: '정답!', incorrect: '다시 볼까요',
    audio_failed: '음성을 재생하지 못했어요. 잠시 후 다시 시도해 주세요.',
    audio_fallback: '고품질 음성을 불러오지 못해 기기 음성으로 재생했어요.',
    story: '스토리',
    story_hero_title: '데뷔 프로젝트',
    story_hero_badge: '기획사 글로시스',
    story_hero_sub: 'EP.1~16 · 아란과 함께 데뷔(TOPIK 2급)까지',
    story_progress: '진행',
    collection: '컬렉션',
    collection_hero: '포토카드',
    collection_sub: '에피소드를 완료하면 카드가 열려요 (확정 해금)',
    collected: (a: number, b: number) => `${a} / ${b} 수집`,
    my_profile: '내 프로필',
    my_career: '커리어',
    my_stats: '학습 통계',
    stat_streak: '연속 학습', stat_days: '총 학습일', stat_mastered: '숙련 스킬',
    my_path: '데뷔까지',
    my_skills: '학습 스킬',
    my_cards: '포토카드',
    my_language: '언어',
    my_settings: '설정',
    logout: '로그아웃', login: '로그인하기',
    logout_d: '계정에서 나가기', login_d: '진도를 저장하려면 로그인',
    sk_mastered: '숙련', sk_review: '복습 필요', sk_learning: '학습중',
    auth_start: '이메일로 시작하기',
    auth_send: '매직링크 받기',
    auth_sending: '보내는 중…',
    auth_note: '비밀번호 없이 이메일 링크로 로그인해요',
    auth_or: '또는',
    auth_google: 'Google로 계속',
    auth_facebook: 'Facebook으로 계속',
    auth_sent_t: '메일을 보냈어요',
    auth_sent_d: (e: string) => `${e} 로 로그인 링크를 보냈습니다.`,
    auth_other: '다른 이메일 사용',
    auth_foot: '계속 진행하면 이용약관 및 개인정보 처리방침에 동의하게 됩니다.',
    auth_guest: '로그인 없이 둘러보기 →',
    ep1_title: '첫 걸음, 한글',
    ep1_start: '트레이닝 시작',
    ep1_learn: (w: string) => `${w} 배우기`,
    ep1_combine: '조합 게임',
    ep1_writing: '쓰기 연습',
    ep1_naming: '예명 짓기',
    ep1_next_char: '다음 글자',
    ep1_check_first: '글자를 다 쓴 뒤 확인',
    ep1_name_placeholder: '이름을 입력하세요 (2자 이상)',
    ep1_debut_as: (n: string) => `‘${n}’(으)로 데뷔하기`,
    ep1_clear: 'EP.1 클리어',
    jamo_cons: '자음', jamo_vow: '모음', jamo_dcons: '쌍자음', jamo_dvow: '복합모음',
    jamo_final: '받침',
    jamo_hint: '카드를 눌러 소리를 들어보세요 🔊',
    jamo_listen: '듣고 따라해 보세요.',
    jamo_count: (n: number) => `${n}자`,
    final_expl: '자음이 글자 아래에 오면 받침이에요. 받침은 소리를 닫아 줍니다.',
    final_hint: '카드를 눌러 소리를 들어보세요',
    write_trace: '손가락으로 글자를 따라 써보세요',
    write_great: '잘했어요!',
    write_done: '다 했어요!',
    reward_title: '해금',
    scene_home: '홈', scene_song: '노래', scene_stage: '무대', scene_rank: '랭크', scene_set: '설정',
    scene_c_song: '콘서트 · 노래', scene_c_stage: '콘서트 · 무대', scene_c_rank: '콘서트 · 랭크', scene_c_set: '콘서트 · 설정',
    questions_n: (n: number) => `${n}문제`, daily_title: '오늘의 문제', daily_empty: '아직 문제가 없어요 — 곧 올라옵니다.', back_menu: '메뉴로', replay_ep: (n: number) => `EP.${n} 다시 보기 →`,
    career_entry: '입문', career_rookie: '연습생', career_team: '팀프로젝트',
    career_debut_ready: '데뷔준비', career_debut: '데뷔',
  },
} as const;

type Dict = typeof DICT['en'];
export type TKey = keyof Dict;

/* 값이 문자열 또는 함수(파라미터 치환) 혼합이므로 호출부 편의를 위해 any 반환 */
interface Ctx { lang: Lang; setLang: (l: Lang) => void; /* eslint-disable-next-line @typescript-eslint/no-explicit-any */
  t: <K extends TKey>(k: K) => any }
const LangCtx = createContext<Ctx>(null!);

export function LangProvider({ children }: { children: ReactNode }) {
  const [lang, setLang] = useState<Lang>(() => {
    try { return localStorage.getItem(LS_KEY) === 'ko' ? 'ko' : 'en'; } catch { return 'en'; }
  });
  useEffect(() => {
    try { localStorage.setItem(LS_KEY, lang); } catch { /* noop */ }
    // <html lang> 을 실제 언어로 → typography.css 의 :lang() 줄간격 규칙 자동 적용
    try { document.documentElement.lang = lang; } catch { /* noop */ }
  }, [lang]);

  const t = ((k: TKey) => (DICT[lang] as Record<string, unknown>)[k] ?? (DICT.en as Record<string, unknown>)[k]) as Ctx['t'];
  return <LangCtx.Provider value={{ lang, setLang, t }}>{children}</LangCtx.Provider>;
}

export const useI18n = () => useContext(LangCtx);
