# 글로시스: 데뷔 프로젝트 (Glowsis Debut Project)

> **한국어로 성장하는 아이돌 육성 게임** — 캄보디아·베트남 학생이 나만의 아이돌을 키워
> **데뷔(=TOPIK I 2급)** 시키는 학습 게임. "공부가 곧 트레이닝".

## 🎮 컨셉

- 플레이어 = **기획사 대표**. 팀 = 4인 고정 (아란·채아·다희·로이)
- **선배 아이돌** = Glowsis 60인 로스터 재활용 (교류 미니게임)
- 진행: 입문 → 연습생 → 팀 프로젝트 → 데뷔 준비 → **데뷔(TOPIK 2급)**
- 최종 보상: 실제 TOPIK 합격 시 **Seedance 뮤직비디오** (설계)

## 🖥️ 현재 구현 (v0.1)

| 영역 | 상태 |
|---|---|
| **EP.1 첫 걸음, 한글** | ✅ 자음·모음 → 조합 미니게임 → 손글씨 쓰기 → 예명 짓기 → 보상 |
| **메인 프레임 5탭** | ✅ 홈 / 훈련 / 스토리 / 컬렉션 / My |
| **히어로 캐러셀** | ✅ 아란 9클립 수동 전환 (‹ › + dots) |
| **훈련** | ✅ 문제풀이 연습(읽기·듣기·어휘) + 교재(샛별 한국어 1A~6B, 121단원) |
| **로그인** | ✅ 매직링크(패스워드리스) + Google + Facebook |
| **게임 감성** | ✅ 3D 버튼·스프링 전환·글로우·맥동 애니메이션 |

## 🏗️ 구조

```
src/
├── app/            AppShell(로그인·탭·라우팅) · shell.css
├── components/     Hud · TabBar · Hero · HeroCarousel · Icon(SVG)
├── content/        members · episode1 · practice · player · textbook  (선언형 데이터)
├── features/
│   ├── auth/       LoginScreen
│   ├── home/ practice/ story/ collection/ my/    (탭 화면)
│   └── episode1/   Episode1 + scenes/ (대화·자모·조합·쓰기·예명·보상)
├── styles/         global.css (디자인 토큰 + 게임 애니메이션)
└── types/          game.ts (도메인 타입)
```

- **콘텐츠는 `content/*.ts` 데이터** — 코드 수정 없이 확장
- **게임 로직/렌더 분리** — 단원이 늘어도 렌더러는 1벌

## 🚀 실행

```bash
npm install
npm run dev      # http://localhost:5173
npm run build    # tsc -b && vite build
```

## 🛠️ 기술 스택

React 19 · TypeScript · Vite · Pretendard
(설계: GPT Image 아트 · **Seedance** 영상 · **CLOVA TTS** · DeepSeek 문제생성)

## 📄 문서

- `GAME_DESIGN.md` — 최종 게임 설계서 (Astra 설계 + 확정 컨셉)
- `ARCHITECTURE.md` — 시스템 아키텍처

## 🎨 자산

Glowsis 캐릭터(아란 루프 영상·포토카드)와 교재 데이터는 기존 `camnemi-topik`에서 재사용.
