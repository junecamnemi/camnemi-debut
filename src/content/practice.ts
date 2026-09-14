export type PracticeKind = 'read' | 'listen' | 'vocab';

export interface PracticeQ {
  id: string;
  kind: PracticeKind;
  level: string;        // 'TOPIK I' | 'TOPIK II'
  prompt: string;       // 문제 지문/질문 (한국어)
  promptEn?: string;    // 지문/질문 영어 (영어 기반 학습자용)
  passage?: string;     // 읽기 지문
  passageEn?: string;   // 읽기 지문 영어
  audio?: string;       // 듣기 스크립트(실제로는 오디오)
  audioEn?: string;     // 듣기 스크립트 영어
  opts: string[];
  answer: number;       // 정답 index
  explain: string;      // 영어 해설 (정답 근거 + 오답 함정)
}

export const KIND_LABEL: Record<PracticeKind, string> = {
  read: '읽기', listen: '듣기', vocab: '어휘',
};
export const KIND_ICON: Record<PracticeKind, string> = {
  read: 'book', listen: 'head', vocab: 'cards',
};

export const PRACTICE: PracticeQ[] = [
  { id: 'q1', kind: 'vocab', level: 'TOPIK I', prompt: '“사과”의 뜻은 무엇입니까?',
    promptEn: 'What does “사과” mean?',
    opts: ['apple', 'banana', 'water', 'bread'], answer: 0,
    explain: '사과 = apple (a fruit). The other options are banana, water and bread, none of which match 사과.' },
  { id: 'q2', kind: 'read', level: 'TOPIK I', prompt: '무엇에 대한 안내입니까?',
    promptEn: 'What is this notice about?',
    passage: '도서관은 오전 9시부터 오후 6시까지 문을 엽니다. 주말에는 문을 닫습니다.',
    passageEn: 'The library opens from 9 a.m. to 6 p.m. It is closed on weekends.',
    opts: ['도서관 운영시간', '도서관 위치', '도서관 회원가입', '도서관 전화번호'], answer: 0,
    explain: 'The notice gives opening and closing hours, so it is about 운영시간 (opening hours). Location, membership and phone number are never mentioned.' },
  { id: 'q3', kind: 'read', level: 'TOPIK I', prompt: '빈 곳에 알맞은 것을 고르십시오.',
    promptEn: 'Choose the correct word for the blank.',
    passage: '저는 아침에 (   ) 먹어요.',
    passageEn: 'I eat (   ) in the morning.',
    opts: ['밥을', '밥이', '밥은', '밥도'], answer: 0,
    explain: 'The verb 먹어요 (to eat) needs an object, so the object particle -을/를 is required: 밥을. 밥이/밥은/밥도 are subject or topic markers, which do not fit an object.' },
  { id: 'q4', kind: 'listen', level: 'TOPIK I', prompt: '들은 내용과 같은 것을 고르십시오.',
    promptEn: 'Choose the option that matches what you hear.',
    audio: '(여자) 어제 뭐 했어요?  (남자) 친구랑 영화를 봤어요.',
    audioEn: '(Woman) What did you do yesterday?  (Man) I watched a movie with a friend.',
    opts: ['친구와 영화를 봤다', '혼자 영화를 봤다', '책을 읽었다', '운동을 했다'], answer: 0,
    explain: 'The man says 친구랑 영화를 봤어요 — he watched a movie with a friend. Since he was not alone, chose a book or exercised, only the first option matches.' },
  { id: 'q5', kind: 'listen', level: 'TOPIK I', prompt: '여기는 어디입니까?',
    promptEn: 'Where is this conversation taking place?',
    audio: '(여자) 어서 오세요. 몇 분이세요?  (남자) 두 명이요.',
    audioEn: '(Woman) Welcome. How many people?  (Man) Two.',
    opts: ['식당', '병원', '학교', '은행'], answer: 0,
    explain: 'Asking 몇 분이세요 (how many people?) and answering 두 명이요 is how a restaurant seats guests, so the place is 식당. The other places do not ask about the number of people.' },
];
