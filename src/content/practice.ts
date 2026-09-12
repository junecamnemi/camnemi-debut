export type PracticeKind = 'read' | 'listen' | 'vocab';

export interface PracticeQ {
  id: string;
  kind: PracticeKind;
  level: string;        // 'TOPIK I'
  prompt: string;       // 문제 지문/질문
  passage?: string;     // 읽기 지문
  audio?: string;       // 듣기 스크립트(실제로는 오디오)
  opts: string[];
  answer: number;       // 정답 index
  explain: string;
}

export const KIND_LABEL: Record<PracticeKind, string> = {
  read: '읽기', listen: '듣기', vocab: '어휘',
};
export const KIND_ICON: Record<PracticeKind, string> = {
  read: 'book', listen: 'head', vocab: 'cards',
};

export const PRACTICE: PracticeQ[] = [
  { id: 'q1', kind: 'vocab', level: 'TOPIK I', prompt: '“사과”의 뜻은 무엇입니까?',
    opts: ['apple', 'banana', 'water', 'bread'], answer: 0, explain: '사과 = apple (과일)' },
  { id: 'q2', kind: 'read', level: 'TOPIK I', prompt: '무엇에 대한 안내입니까?',
    passage: '도서관은 오전 9시부터 오후 6시까지 문을 엽니다. 주말에는 문을 닫습니다.',
    opts: ['도서관 운영시간', '도서관 위치', '도서관 회원가입', '도서관 전화번호'], answer: 0,
    explain: '개관 시간과 휴관일을 안내하고 있어요 → 운영시간' },
  { id: 'q3', kind: 'read', level: 'TOPIK I', prompt: '빈 곳에 알맞은 것을 고르십시오.',
    passage: '저는 아침에 (   ) 먹어요.',
    opts: ['밥을', '밥이', '밥은', '밥도'], answer: 0, explain: '목적어에는 목적격 조사 -을/를 → 밥을' },
  { id: 'q4', kind: 'listen', level: 'TOPIK I', prompt: '들은 내용과 같은 것을 고르십시오.',
    audio: '(여자) 어제 뭐 했어요?  (남자) 친구랑 영화를 봤어요.',
    opts: ['친구와 영화를 봤다', '혼자 영화를 봤다', '책을 읽었다', '운동을 했다'], answer: 0,
    explain: '“친구랑 영화를 봤어요” → 친구와 영화를 봤다' },
  { id: 'q5', kind: 'listen', level: 'TOPIK I', prompt: '여기는 어디입니까?',
    audio: '(여자) 어서 오세요. 몇 분이세요?  (남자) 두 명이요.',
    opts: ['식당', '병원', '학교', '은행'], answer: 0, explain: '“몇 분이세요 / 두 명이요” → 식당(자리 안내)' },
];
