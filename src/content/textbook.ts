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
  },
  {
    "level": "3A",
    "file": "data/glowsis-book-3A.js",
    "units": [
      {
        "no": "21",
        "title": "I'm studying Korean now",
        "en": "공부하고 있어요 — Ongoing · -고 있어요 (present progressive) + 지금 &amp; time words + -는 중이에요"
      },
      {
        "no": "22",
        "title": "What are you going to do this weekend?",
        "en": "주말에 뭐 할 거예요? — Planning · -(으)ㄹ 거예요 (future plan) + -(으)러 가다 (go to do) + -고 싶다 (want to)"
      },
      {
        "no": "23",
        "title": "Why did you come to Korea?",
        "en": "왜 한국에 왔어요 — Reason · -(으)니까 &amp; -기 때문에 (because) + 왜 (why) 질문"
      },
      {
        "no": "24",
        "title": "Have you ever been to Busan?",
        "en": "부산에 가 본 적이 있어요? — Experience · -아/어 본 적이 있다 (experience) + -(으)ㄴ 적이 있다 (have done) + -아/어 보다 (try)"
      },
      {
        "no": "25",
        "title": "Can you play the guitar?",
        "en": "기타를 칠 수 있어요? — Ability(가능) · -을 수 있다/없다 (can/cannot) + 잘/못 (well/not) + -ㄹ 줄 알다 (know how to)"
      },
      {
        "no": "26",
        "title": "It became cold",
        "en": "날씨가 추워졌어요 — Turn / Change · -아/어지다 (become) + -게 되다 (come to) + past change"
      },
      {
        "no": "27",
        "title": "Can you help me?",
        "en": "좀 도와줄 수 있어요? — 부탁(favor) · -아/어 주다 (do for someone) + -(으)ㄹ 수 있어요? (polite request) + 좀 (a little / please)"
      },
      {
        "no": "28",
        "title": "It might rain tomorrow",
        "en": "내일 비가 올지도 몰라요 — Possibility · -(으)ㄹ지도 모르다 (might) + 아마/어쩌면 (maybe) + -(으)ㄹ 것 같다 (I think it will)"
      },
      {
        "no": "29",
        "title": "Reading Korean is fun",
        "en": "한국어를 읽는 것이 재미있어요 — Nominalization · -(으)ㄴ/는 것 (turn verbs into nouns) + -는 것이 좋다 (it's good to) + -기 (the -ing gerund)"
      },
      {
        "no": "30",
        "title": "Why don't we order fried chicken?",
        "en": "치킨을 시킬까요? — Suggestion · -(으)ㄹ까요? (shall we?) + -(으)ㅂ시다 (let's) + -지 않을래요? (won't you?)"
      }
    ]
  },
  {
    "level": "3B",
    "file": "data/glowsis-book-3B.js",
    "units": [
      {
        "no": "31",
        "title": "I'm going to become a singer",
        "en": "가수가 되려고 해요 — Intention · -(으)려고 하다 (intend to) + -기로 하다 (decide to) + -고 싶다/싶었어요 (want)"
      },
      {
        "no": "32",
        "title": "Even if it rains, I'll go",
        "en": "비가 와도 갈 거예요 — Concession · -아/어도 (even if) + -아/어도 돼요 (it's ok to) + 그런데도/그래도 (even so)"
      },
      {
        "no": "33",
        "title": "If I have time, I'll call you",
        "en": "시간이 있으면 전화할게요 — Condition · -(으)면 (if) + -(으)면 좋겠다 (hope) + 만약 &amp; 그러면"
      },
      {
        "no": "34",
        "title": "I have to go to practice",
        "en": "연습하러 가야 돼요 — Obligation(의무) · -아/어야 되다/하다 (have to) + -(으)면 안 되다 (must not) + 필요해요/필요없어요"
      },
      {
        "no": "35",
        "title": "You should rest a little",
        "en": "조금 쉬어야 돼요 — Advice · -아/어야 되다 (should) + -(으)ㄹ 것 같다 (I think) + -지 마세요 (don't)"
      },
      {
        "no": "36",
        "title": "This is more expensive than that",
        "en": "이것이 그것보다 더 비싸요 — 비교(Comparison) · -보다 더 (more than) + 가장/제일 (most) + -만큼 (as much as)"
      },
      {
        "no": "37",
        "title": "After eating, let's go",
        "en": "밥을 먹고 나서 가요 — Sequence (순서) · -고 나서 (after doing) + -다가 (and then, mid-action) + 그리고/그다음에 (next)"
      },
      {
        "no": "38",
        "title": "I've finished practicing",
        "en": "연습을 다 끝냈어요 — Endings · -아/어 버리다 (end up -ing) + -다 (plain sentence ending) + 다 했어요 (finished it all)"
      },
      {
        "no": "39",
        "title": "I almost fell asleep",
        "en": "잠이 들 뻔했어요 — Situation · -(으)ㄹ 뻔하다 (almost) &amp; -(으)ㄹ 수밖에 없다 (no choice but) &amp; 하마터면 (nearly)"
      },
      {
        "no": "40",
        "title": "Because it was too hard, I rested",
        "en": "너무 힘들어서 쉬었어요 — Cause · -아/어서 (because) + -기 때문에 (because) + 그래서 (so)"
      }
    ]
  },
  {
    "level": "4A",
    "file": "data/glowsis-book-4A.js",
    "units": [
      {
        "no": "41",
        "title": "It looks delicious, so let's order it",
        "en": "맛있어 보이니까 시켜요 — 원인·결과 · -아/어 보이다 (looks / seems) + -(으)ㄴ 것 같다 (seems like) + -아/어서 (because / so)"
      },
      {
        "no": "42",
        "title": "She said she's busy today",
        "en": "오늘 바쁘다고 했어요 — Quotation · -다고 하다 (indirect statement) + -(이)라고 하다 (calling a noun) + -냐고/자고 하다 (questions &amp; suggestions)"
      },
      {
        "no": "43",
        "title": "I exercised, so I'm tired",
        "en": "운동했기 때문에 피곤해요 — 이유·근거 (Reason &amp; Grounds) · -기 때문에 (because) + -(으)ㄴ/는 탓에 (due to) + 덕분에/덕분이다 (thanks to)"
      },
      {
        "no": "44",
        "title": "It must be cold outside",
        "en": "밖에 추울 거예요 — Supposition (추측) · -(으)ㄹ 거예요 (will / must) + -(으)ㄹ 텐데 (I bet) + -(으)ㄴ가 봐요 (I guess)"
      },
      {
        "no": "45",
        "title": "I found out she's an idol",
        "en": "그녀가 아이돌인 걸 알았어요 — 발견 · -(으)ㄴ/는 걸 알다 (find out) + -(으)ㄴ 줄 알다 (thought that) + -(으)ㄴ/는 지 알다 (know whether)"
      },
      {
        "no": "46",
        "title": "It's cheap, but the quality is good",
        "en": "싸기는 한데 품질이 좋아요 — Contrast(대조) · -기는 한데 (it's true but) + -(으)ㄴ데 (but/and) + -지만 (but)"
      },
      {
        "no": "47",
        "title": "I should have studied more",
        "en": "더 공부할 걸 그랬어요 — Regret · -(으)ㄹ 걸 그랬다 (should have) + -았/었으면 좋았을 텐데 (would've been nice) + -지 말 걸 그랬다 (shouldn't have)"
      },
      {
        "no": "48",
        "title": "I went to buy tickets",
        "en": "표를 사러 갔어요 — Purpose · -(으)러 가다 (go to do) + -기 위해서 (in order to) + -(으)려고 (to)"
      },
      {
        "no": "49",
        "title": "I learned by practicing",
        "en": "연습해서 배웠어요 — Process (과정) · -아/어서 (by doing) + -을수록 (the more) + -다 보니 (as I kept doing)"
      },
      {
        "no": "50",
        "title": "I'll go even if it takes all night",
        "en": "밤새도 갈 거예요 — Concession &amp; Restriction · -아/어도 (even if) + -더라도 (even if) + -아/어야만 (only if)"
      }
    ]
  },
  {
    "level": "4B",
    "file": "data/glowsis-book-4B.js",
    "units": [
      {
        "no": "51",
        "title": "I used to sing a lot",
        "en": "노래를 많이 하곤 했어요 — Past Habits &amp; Recollection · -곤 하다 (used to) + -고는 하다 (used to) + -던/았던 (past recollection)"
      },
      {
        "no": "52",
        "title": "If I were you, I'd rest",
        "en": "내가 너라면 쉬었을 거야 — Hypothetical Condition · -았/었으면 (if it were …) + -(으)ㄹ 텐데 (would probably …) + 만약에 ~았을 거예요 (if … I would've)"
      },
      {
        "no": "53",
        "title": "I've been practicing for 3 hours",
        "en": "세 시간 동안 연습했어요 — Duration &amp; Counting · -동안 (during / for) + -부터~까지 (from~to) + 세기·단위 (마리/개/시 등)"
      },
      {
        "no": "54",
        "title": "I became more confident",
        "en": "자신감이 생겼어요 — Change (변화) · -아/어지다 (become) + -게 하다 (make someone) + -고 있다 (state)"
      },
      {
        "no": "55",
        "title": "It seems the concert was great",
        "en": "콘서트가 정말 좋았던 것 같아요 — Modality &amp; guessing · -(으)ㄴ 것 같다 (seems) + -나 보다 (looks like) + -(으)ㄹ걸요 (probably)"
      },
      {
        "no": "56",
        "title": "I happened to see her",
        "en": "우연히 그녀를 봤어요 — Coincidence · 우연히 / 마침 (coincidentally) + -(으)ㄴ 김에 (while at it) + -다가 (was doing and…)"
      },
      {
        "no": "57",
        "title": "It's really worth it",
        "en": "정말 그럴 만해요 — Emphasis · -을/ㄹ 만하다 (worth) + -(으)ㄹ 만해요 (worth doing) + 정말/진짜 강조"
      },
      {
        "no": "58",
        "title": "If only I had more time",
        "en": "시간이 좀 더 있었으면 좋겠어요 — Wishes &amp; Hopes (가정) · -았/었으면 좋겠다 (I wish I had) + -(으)면 좋겠다 (I hope) + -았/었으면 했어요 (I was hoping)"
      },
      {
        "no": "59",
        "title": "Let's do it one by one",
        "en": "하나씩 해요 — Manner &amp; Method · -씩 (each) + -처럼 (like) + -대로 (as)"
      },
      {
        "no": "60",
        "title": "In conclusion, we did great",
        "en": "결국 우리는 잘했어요 — Conclusion (결론) · 결국/마침내 (finally) + -(으)ㄴ 결과 (as a result) + 드디어 (at last)"
      }
    ]
  },
  {
    "level": "5A",
    "file": "data/glowsis-book-5A.js",
    "units": [
      {
        "no": "61",
        "title": "Even so, I'll keep going",
        "en": "그래도 계속할 거예요 — Concession &amp; Contrast (양보 · 대조) · -기는커녕 (far from) + -(으)ㄴ/는 반면에 (whereas) + -(으)ㄴ/는데도 (even though)"
      },
      {
        "no": "62",
        "title": "The harder it gets, the more I try",
        "en": "어려울수록 더 노력해요 — Complexity (복합) · -을수록 (the more… the more) + -아/어도 되다 (may) + -(으)ㄹ 뿐이다 (only)"
      },
      {
        "no": "63",
        "title": "Assuming we win, what then?",
        "en": "우리가 이긴다면 그다음엔? — Assumption (전제) · -다면 (if) + -(으)ㄴ/는 한 (as long as) + -(으)ㄴ/는 이상 (since / now that)"
      },
      {
        "no": "64",
        "title": "I'm tired from practicing all night",
        "en": "밤새 연습해서 피곤해요 — 이유·근거 (Reason &amp; Grounds) · -아/어서 (because/cause) + -(으)ㄴ 탓에 (due to) + -느라고 (because busy doing)"
      },
      {
        "no": "65",
        "title": "It turned out she could sing",
        "en": "그녀가 노래를 잘 부르더라고요 — Modality 2 (양태 2) · -더라고요 (I found that) + -더군요 (I recall) + -(으)ㄴ/는 줄 알았다 (I thought)"
      },
      {
        "no": "66",
        "title": "I'm thinking about going abroad",
        "en": "외국에 갈 생각이에요 — Intentions &amp; Plans (의도 · 계획) · -(으)ㄹ 생각이에요 (plan to) + -(으)ㄹ 예정이에요 (scheduled to) + -(으)ㄹ 작정이에요 (intend to)"
      },
      {
        "no": "67",
        "title": "In the end, it worked out",
        "en": "결국 잘 풀렸어요 — Conclusion 2 (결론 2) · 결국/아무튼 (anyway) + -(으)ㄴ/는 셈이다 (amounts to) + -고 말다 (end up doing)"
      },
      {
        "no": "68",
        "title": "I absolutely have to finish",
        "en": "꼭 끝내야 해요 — Emphasis · 꼭/반드시 (definitely) + -아/어야만 (only if) + -(으)ㄹ 수밖에 없다 (no choice)"
      },
      {
        "no": "69",
        "title": "Little by little, I improved",
        "en": "조금씩 나아졌어요 — Process (과정 2) · -아/어 가다 (keep -ing) + -게 되다 (come to) + -다 보니 (as I kept)"
      },
      {
        "no": "70",
        "title": "I can't help but worry",
        "en": "걱정할 수밖에 없어요 — Attitude (태도) · -(으)ㄹ 수밖에 없다 (no choice but) + -아/어야겠다 (should) + -지 않을 수 없다 (can't not)"
      }
    ]
  },
  {
    "level": "5B",
    "file": "data/glowsis-book-5B.js",
    "units": [
      {
        "no": "71",
        "title": "Because of the rain, the show was cancelled",
        "en": "비 때문에 공연이 취소됐어요 — Cause (원인) · -때문에 (because of) + -(으)로 인해 (due to) + -아/어서 그런지 (maybe because)"
      },
      {
        "no": "72",
        "title": "Only if you practice daily will you improve",
        "en": "매일 연습해야만 늘어요 — Conditions (조건) · -아/어야만 (only if) + -(으)ㄴ/는 이상 (now that) + -아/어야 비로소 (only then)"
      },
      {
        "no": "73",
        "title": "It's so good that I cried",
        "en": "너무 좋아서 울었어요 — Degree (정도) · -아/어서 (so ~ that) + -(으)ㄹ 정도로 (to the extent) + 너무/정말 (too / really)"
      },
      {
        "no": "74",
        "title": "She's still sleeping",
        "en": "아직 자고 있어요 — State (상태) · -고 있다 (ongoing state) + -아/어 있다 (state after) + 아직 &amp; 이미 (still/already)"
      },
      {
        "no": "75",
        "title": "From my view, it looks great",
        "en": "제가 보기엔 정말 좋아요 — Perspective (관점) · -에 비하면 (compared to) + -(으)ㄴ/는 셈 치고 (counting as) + -아/어 놓고 (having done)"
      },
      {
        "no": "76",
        "title": "I tend to practice late at night",
        "en": "밤늦게 연습하곤 해요 — Habits &amp; Tendencies · -곤 하다 (tend to) + -곤 했다 (used to) + -는 편이다 (tend to)"
      },
      {
        "no": "77",
        "title": "I meant the one from yesterday",
        "en": "어제 그 거예요 — Clarify &amp; Set the Record Straight (정정) · -(이)라는 것 (the thing called) + -(으)ㄴ/는 거예요 (it's that) + -아/어야지요 (surely must)"
      },
      {
        "no": "78",
        "title": "It's a huge concert",
        "en": "엄청 큰 콘서트예요 — Scale (규모) · 엄청/되게 (very) + -아/어 대다 (keep doing) + -(으)ㄴ/는 데다가 (in addition)"
      },
      {
        "no": "79",
        "title": "I expected it to be harder",
        "en": "더 어려울 줄 알았어요 — Expectation (기대) · -(으)ㄹ 줄 알았어요 (thought it would) + -(으)ㄹ 줄 몰랐어요 (didn't know it would) + -(으)ㄴ/는지 몰라요 (don't know if)"
      },
      {
        "no": "80",
        "title": "After all that, we made it",
        "en": "결국 우리가 해냈어요 — Aftermath &amp; Result (결과) · -고 나서야 (only after) + -(으)ㄴ/는 덕분에 (thanks to) + -아/어 내다 (manage to)"
      }
    ]
  },
  {
    "level": "6A",
    "file": "data/glowsis-book-6A.js",
    "units": [
      {
        "no": "81",
        "title": "I've come a long way",
        "en": "많이 왔어요 — Reflection (반성) · -아/어 오다 (have been -ing) + -(으)ㄴ/는 김에 (while at it) + -(으)ㄴ/는 셈치고 (count as)"
      },
      {
        "no": "82",
        "title": "From a fan's view, it's amazing",
        "en": "팬이 보기엔 정말 대단해요 — Perspective 2 (관점 2) · -아/어 보니 (after seeing) + -(으)ㄴ/는 한편 (on the other hand) + -에 있어서 (regarding)"
      },
      {
        "no": "83",
        "title": "I realize practice matters most",
        "en": "연습이 제일 중요하다는 걸 알았어요 — Realization (깨달음) · -(으)ㄴ/는 걸 알다 (know that) + -(으)ㄴ/는 사실 (the fact that) + -게 마련이다 (is bound to)"
      },
      {
        "no": "84",
        "title": "It must have been exhausting",
        "en": "정말 힘들었을 거예요 — Imagining the Past (추측) · -았/었을 거예요 (must have) + -았/었을 텐데 (would have) + -(으)ㄹ 뻔했다 (almost)"
      },
      {
        "no": "85",
        "title": "We built this step by step",
        "en": "한 걸음씩 만들어 왔어요 — Process 3 (과정 3) · -아/어 오다 (have been) + -게 하다 (make/let) + -아/어 내다 (manage to)"
      },
      {
        "no": "86",
        "title": "Thanks to the fans, we're here",
        "en": "팬들 덕분에 여기까지 왔어요 — Cause &amp; Thanks (원인) · -덕분에 (thanks to) + -덕에 (thanks to, casual) + -통에 (due to, negative)"
      },
      {
        "no": "87",
        "title": "Surprisingly, it was easy",
        "en": "의외로 쉬웠어요 — Reversal (반전) · 의외로 &amp; 뜻밖에 (unexpectedly) + -다니 (what a surprise) + -고 보니 (after all)"
      },
      {
        "no": "88",
        "title": "We've been together for years",
        "en": "몇 년째 함께 있어요 — Long-term · -째 (for N years) + -아/어 오다 (has been) + -(으)ㄴ/는 지 N 되다 (it's been)"
      },
      {
        "no": "89",
        "title": "We decided to go global",
        "en": "세계로 나가기로 했어요 — Decision &amp; Plans (결정 · 계획) · -기로 하다 (decide to) + -(으)ㄴ/는 바람에 (because, neg) + -에 따라 (depending on)"
      },
      {
        "no": "90",
        "title": "We'll leave a legacy",
        "en": "유산을 남길 거예요 — Legacy &amp; Future · -(으)ㄴ/는 덕에 (thanks to) + -아/어 내다 (achieve) + -(으)ㄹ 전망이다 (is expected to)"
      }
    ]
  },
  {
    "level": "6B",
    "file": "data/glowsis-book-6B.js",
    "units": [
      {
        "no": "91",
        "title": "We'll be remembered",
        "en": "우리는 기억될 거예요 — Legacy &amp; Memory (유산) · -(으)ㄹ 것이다 (will) + -아/어 두다 (keep -ed) + -(으)ㄴ/는 한편 (meanwhile)"
      },
      {
        "no": "92",
        "title": "We differ, but we fit",
        "en": "달라도 잘 맞아요 — Contrast &amp; Unity (대조와 조화) · -에도 불구하고 (despite) + -(으)ㄴ/는 반면 (whereas) + -면서도 (while also)"
      },
      {
        "no": "93",
        "title": "This is our peak",
        "en": "이것이 우리의 정점이에요 — Culmination &amp; Climax · -(으)ㄴ/는 만큼 (as much as) + -(으)ㄴ/는 중이다 (in the middle) + -아/어 오다 (have been)"
      },
      {
        "no": "94",
        "title": "Looking back, we grew a lot",
        "en": "돌아보면 많이 자랐어요 — Reflection · -아/어 보니 (after looking) + -(으)ㄴ/는 데에 있어서 (regarding) + -게 되었다 (came to)"
      },
      {
        "no": "95",
        "title": "Our dream is global",
        "en": "우리의 꿈은 세계예요 — Ambition &amp; Vision · -(으)ㄹ 예정이다 (planned to) + -(으)ㄴ/는 가운데 (amid) + -에 한하여 (limited to)"
      },
      {
        "no": "96",
        "title": "We blend in perfectly",
        "en": "우리는 완벽하게 어울려요 — Harmony &amp; Balance · -도록 (so that) + -(으)ㄴ/는 덕분에 (thanks to) + -에 비해서 (compared to)"
      },
      {
        "no": "97",
        "title": "We always bounce back",
        "en": "우리는 언제나 회복해요 — Resilience &amp; Recovery · -아/어도 되다 (may) + -(으)ㄴ/는 대로 (as) + -고 나서 (after)"
      },
      {
        "no": "98",
        "title": "The future looks bright",
        "en": "미래가 밝아 보여요 — Forecast (전망) · -아/어 보이다 (looks) + -(으)ㄹ 것 같다 (seems will) + -아/어 갈 것이다 (will keep)"
      },
      {
        "no": "99",
        "title": "We owe it all to you",
        "en": "모두 여러분 덕분이에요 — Appreciation (감사) · -덕분에 (thanks to) + -아/어 드리다 (do for someone, honorific) + -(으)ㄴ/는 마음으로 (with the heart of)"
      },
      {
        "no": "100",
        "title": "We'll be together forever",
        "en": "우리는 영원히 함께할 거예요 — Forever &amp; Promise · -(으)ㄹ 것이다 (will) + -도록 하다 (make sure) + -(으)ㄴ/는 것을 약속하다 (promise to)"
      }
    ]
  }
];
