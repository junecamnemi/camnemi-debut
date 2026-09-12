export interface TbUnit { no: string; title: string; en: string }
export interface TbLevel { level: string; file: string; units: TbUnit[] }

export const TEXTBOOK: TbLevel[] = [
  {
    "level": "1A",
    "file": "data/glowsis-book-1A.js",
    "units": [
      {
        "no": "0",
        "title": "Hangul First Steps",
        "en": "한글 — the ABC of Korean"
      },
      {
        "no": "1",
        "title": "Hello!",
        "en": "안녕하세요! — Greetings & 이에요/예요"
      },
      {
        "no": "2",
        "title": "I'm a Singer",
        "en": "저는 가수예요 — Self-introduction · N은/는"
      },
      {
        "no": "3",
        "title": "What is This?",
        "en": "이거 뭐예요? — Things · 이/그/저"
      },
      {
        "no": "4",
        "title": "Debut is in May",
        "en": "데뷔는 5월이에요 — Numbers · Dates · Days"
      },
      {
        "no": "5",
        "title": "I Like Singing",
        "en": "노래를 좋아해요 — Likes · 을/를 · -아요/어요"
      },
      {
        "no": "6",
        "title": "Tteokbokki is Spicy",
        "en": "떡볶이는 매워요 — Food · 안/못"
      },
      {
        "no": "7",
        "title": "I'm in the Practice Room",
        "en": "연습실에 있어요 — Location · 에/에서"
      },
      {
        "no": "8",
        "title": "What Did You Do Yesterday?",
        "en": "어제 뭐 했어요? — Past tense · -았/었어요"
      }
    ]
  },
  {
    "level": "1B",
    "file": "data/glowsis-book-1B.js",
    "units": [
      {
        "no": "9",
        "title": "I can't swim",
        "en": "저는 수영을 못 해요 — Abilities · 못 + verb vs -(으)ㄹ 수 있어요"
      },
      {
        "no": "10",
        "title": "Shall we have lunch?",
        "en": "같이 점심을 먹을까요? — Making suggestions · 함께"
      },
      {
        "no": "11",
        "title": "It's spicy so I can't eat it",
        "en": "떡볶이는 매워서 잘 못 먹어요 — Reasons with -아서/어서"
      },
      {
        "no": "12",
        "title": "I&rsquo;d Like to Look at Some Sneakers",
        "en": "운동화를 좀 보고 싶어요 — Shopping · -고 싶어요 / 좀 / -아/어 주세요"
      },
      {
        "no": "13",
        "title": "Can you do K-pop dance?",
        "en": "케이팝 댄스를 출 수 있어요? — Abilities · -(으)ㄹ 수 있어요 / 못 / -지만"
      },
      {
        "no": "14",
        "title": "Before Going Home I'll Travel",
        "en": "고향에 가기 전에 여행을 할 거예요 — Plans & Future · -(으)ㄹ 거예요"
      },
      {
        "no": "15",
        "title": "Rest Well After Taking Medicine",
        "en": "약을 먹은 후에 푹 쉬세요 — Health · -은/ㄴ 후에, -아/어 주세요"
      },
      {
        "no": "16",
        "title": "How Do I Get to Seoul Station?",
        "en": "여기에서 서울역까지 어떻게 가요? — Directions · -에서 -까지"
      },
      {
        "no": "17",
        "title": "What should I bring to the housewarming?",
        "en": "집들이에 뭘 사 가야 돼요? — Obligation with -아/어야 돼요"
      },
      {
        "no": "18",
        "title": "It's Congested, So Let's Take the Subway",
        "en": "길이 막히니까 지하철로 갑시다 — Reasons · -(으)니까 / Let's · -(으)ㅂ시다"
      },
      {
        "no": "19",
        "title": "Come buy it with me",
        "en": "저랑 같이 사러 가요 — Shopping together · V-러 가다"
      },
      {
        "no": "20",
        "title": "My Mother Likes Flowers",
        "en": "어머니께서 꽃을 좋아하세요 — Honorifics &amp; family"
      }
    ]
  },
  {
    "level": "2A",
    "file": "data/glowsis-book-2A.js",
    "units": [
      {
        "no": "1",
        "title": "It's raining a lot",
        "en": "비가 너무 많이 오네요 — Weather · -네요 \"oh…!\" + 너무/아주/조금 + -고 있네요"
      },
      {
        "no": "2",
        "title": "Go to Dongdaemun",
        "en": "동대문에 가 보세요 — Shopping · -아/어 보세요 \"try doing\" + -아/어 보다 + -기 전에"
      },
      {
        "no": "3",
        "title": "What does mom's friend look like?",
        "en": "엄마 친구는 어떻게 생겼어요? — Describing looks · 어떻게 생겼어요? + -는데"
      },
      {
        "no": "4",
        "title": "How about making bulgogi?",
        "en": "불고기를 해 먹는 게 어때요? — Suggestions · -아/어 먹다 &amp; -는 게 어때요?"
      },
      {
        "no": "5",
        "title": "I'd like to order",
        "en": "주문할게요 — Ordering food at a restaurant · -을게요 (I'll ~) · -을까요 (Shall I/we ~?) · counting 하나·두 개"
      },
      {
        "no": "6",
        "title": "How did you decide to spend vacation?",
        "en": "휴가를 어떻게 보내기로 했어요? — Vacation plans · -기로 하다 &amp; 어떻게"
      },
      {
        "no": "7",
        "title": "Don't eat too much cold food",
        "en": "찬 음식을 너무 많이 먹지 마세요 — Advice · -지 마세요 · 너무 많이/조금 · -으면 좋겠다"
      },
      {
        "no": "8",
        "title": "What do you want to do tonight?",
        "en": "오늘 저녁에 뭐 할래요? — Evening plans · -을래요? &amp; 같이"
      },
      {
        "no": "9",
        "title": "I go to the mountains every weekend",
        "en": "주말마다 산에 가요 — Weekend · -마다, -(으)면서 &amp; -러 가다"
      },
      {
        "no": "10",
        "title": "Be quiet after 10pm",
        "en": "밤 10시 이후로는 조용히 할 것 — Dorm rules · -(으)ㄹ 거예요 &amp; -아/어야 돼요"
      }
    ]
  },
  {
    "level": "2B",
    "file": "data/glowsis-book-2B.js",
    "units": [
      {
        "no": "11",
        "title": "I came back on my way to the meetup place",
        "en": "약속 장소에 가다가 돌아왔어요 — Midway · -다가 “…and then” + 돌아오다 + past -았/었어요"
      },
      {
        "no": "12",
        "title": "What kind of person do you like?",
        "en": "사비나 씨는 어떤 사람을 좋아해요? — Liking people · 어떤 + noun · -는/-(으)ㄴ person with personality &amp; appearance adjectives"
      },
      {
        "no": "13",
        "title": "Why don't we share the housework?",
        "en": "집안일을 나눠서 하는 게 어때? — Housework · -는 게 어때? + 나누다/나눠서 + 집안일 하기"
      },
      {
        "no": "14",
        "title": "It's my first time going to a jjimjilbang in Korea",
        "en": "한국에서 찜질방은 처음인데요 — First-Time · -(으)ㄴ 적이 없다 + 처음 + -는데"
      },
      {
        "no": "15",
        "title": "I'd like to order two chickens",
        "en": "치킨 두 마리를 주문하려고 해요 — Ordering &amp; Counting · -(으)려고 하다 + 마리 + -만"
      },
      {
        "no": "16",
        "title": "Can I try this dress on?",
        "en": "이 원피스를 입어 봐도 되요? — Clothes &amp; trying on · -아/어 보다 (try) · -아/어도 되요? (permission) · 입다/신다"
      },
      {
        "no": "17",
        "title": "I cook when I have time",
        "en": "저는 시간이 있을 때 요리해요 — When · -(으)ㄹ 때 &quot;when&quot; + -면 &quot;if/when&quot;"
      },
      {
        "no": "18",
        "title": "Has it already been a year since your baby was born?",
        "en": "대한 씨 딸이 태어난 지 벌써 1년이 됐어요 — Duration · -(으)ㄴ 지 … 됐어요 + 벌써 + 태어나다/자라다"
      },
      {
        "no": "19",
        "title": "Maybe I should move near the school, too",
        "en": "저도 학교 근처로 이사할까 봐요 — Uncertain Plans · -(으)ㄹ까 봐(요) \"maybe I should…\" + 근처로 이사하다 + 편하다"
      },
      {
        "no": "20",
        "title": "I can't make it this Sunday",
        "en": "이번 일요일은 좀 어려울 것 같아요 — Uncertainty · -(으)ㄹ 것 같아요 \"seems / I think it will\" + 이번 this + softening a refusal"
      }
    ]
  }
];
