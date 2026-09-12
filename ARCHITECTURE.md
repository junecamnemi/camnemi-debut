# 글로시스: 데뷔 프로젝트 — 시스템 아키텍처

> 목표: 캄보디아·베트남 학생이 **내가 고른 아이돌을 키워 데뷔(=TOPIK I 2급) 시키는** 한국어 학습 게임.
> "공부가 곧 트레이닝" — 별개 게임이 아니라, 학습 결과가 아이돌 성장으로 보이는 구조.

---

## 0. 설계 원칙 (Astra 8 + 교훈)

1. 공부 = 진행 조건이자 진행 자체 (환전/이중 구조 없음)
2. 어느 메뉴에서 공부해도 **같은 성장**에 반영 (공통 학습 이벤트)
3. 학습 기록 ↔ 현재 상태 **분리** (규칙 변경에 안전, 기존 유저 진도 인정)
4. 콘텐츠는 **선언형 데이터**, 로직은 **공용 렌더러** (에피소드 늘어도 엔진 1벌)
5. 성취는 데이터·변화로 표시 (별도 과한 연출 금지 — 이미 기각)
6. 미디어는 **한 번 만들어 오래 사용** (정적·새전 생성·압축·캐시, 런타임 AI 없음)
7. 접속 안 한 날 벌주지 않음, 확정 해금(노가챠)
8. 코드 관리는 **모듈화 + 타입 + 테스트 + QA 게이트**

---

## 1. 전체 구조 (레이어)

```
   [ 사용자 (웹/PWA) ]
        │
┌───────▼─────────────────────────────────────────────┐
│  APP (React + TS + Vite)                             │
│  화면: 캐릭터선택·홈·트레이닝·커리어·컬렉션·데뷔      │
├─────────────────────────────────────────────────────┤
│  GAME CORE (순수 로직, UI 무관)                      │
│  progression · skill · rewards · career             │  ← 단위테스트 대상
├─────────────────────────────────────────────────────┤
│  LEARN ENGINE (재사용)                               │
│  문제은행 · 보케 · TTS · 숙련도                       │
├─────────────────────────────────────────────────────┤
│  CONTENT LAYER (선언형 JSON/TS)                      │
│  members · careerStages · episodes · missions ·     │
│  skills(TOPIK) · unlocks · photocards               │
├─────────────────────────────────────────────────────┤
│  STATE (Supabase + 로컬 캐시)                        │
│  player · career · unlock · skill_mastery · events  │
└─────────────────────────────────────────────────────┘
        │
   [ MEDIA PIPELINE — 오프라인 제작 ]
   FAL GPT Image (FILM ANIME 정지일러)
   Seedance 2.0 (시댄스: 캐릭터시트 → @character 컷씬영상)
   TTS 캐시 · 압축 · 저데이터 모드
```

---

## 2. 프론트엔드 — React + TypeScript + Vite

**왜?** 컴포넌트 모듈화 + 타입 안정성 + 테스트 용이 = "코드 관리 잘되는 모델".

```
src/
├── app/                 # 라우팅·레이아웃·캐릭터선택 흐름
├── features/            # 기능별 모듈 (화면 1개 = 폴더 1개)
│   ├── characterSelect/
│   ├── home/            # 내 아이돌 프로필 + 커리어 진행바
│   ├── training/        # 트레이닝 미션(미니게임 렌더러)
│   ├── career/          # 커리어 단계 화면
│   ├── collection/      # 포토카드·프로필 장식
│   └── debut/           # 데뷔(=2급) 장면
├── game/                # 순수 로직 (테스트)
├── learn/               # 학습엔진 (문제 렌더, TTS, 숙련)
├── content/             # 선언형 게임 데이터
├── services/            # Supabase 클라이언트
├── hooks/               # usePlayer, useCareer, useSkill
├── components/          # 공용 UI (카드·버튼·진행바·배너)
├── styles/              # 디자인 토큰 + FILM ANIME 비주얼
├── types/               # 도메인 타입 (멤버·커리어·에피소드…)
└── __tests__/
```

**화면↔로직 분리**: 컴포넌트는 상태만 보여주고, 모든 진행·계산은 `game/` 함수가 수행 (관리 용이·테스트 가능).

---

## 3. CONTENT LAYER — 선언형 데이터 (코드 수정 없이 콘텐츠 확장)

```
src/content/
├── members.ts          # 4인 (id·이름·포지션·마법속성·anchor이미지·컬러)
├── careerStages.ts     # 입문→연습생→팀프로젝트→데뷔준비→데뷔→활동확장 (학습조건+증명)
├── episodes/
│   └── ep01.ts         # 1화: 표현(마법)+대화+미션+보상 (선언형)
├── missions.ts         # 미션 유형 정의 (문장조립/어미선택/듣기)
├── skills.ts           # TOPIK I 항목 ↔ 숙련도 매핑
├── unlocks.ts          # 해금 규칙 (단원→포카드, 챕터→배경)
└── photocards.ts       # 카드 메타
```

**공통 태그**: 문제·교재·보케에 `[단원, 어휘, 문법, 학습목표]` 태그 → 어느 화면이든 같은 숙련도/미션 연결. (Astra 핵심)

---

## 4. GAME CORE — 순수 로직 (단위테스트)

```
src/game/
├── progression.ts   # 커리어 승급 판정 (학습목표+종합미션 통과)
├── skill.ts         # 숙련도 계산 (오답→복습, 숙련=자기해결 증거만)
├── rewards.ts       # 해금 판정 (확정 해금)
├── eventBus.ts      # 공통 학습 이벤트 (어느 화면에서든 발행→성장 반영)
└── __tests__/
    └── progression.test.ts
```
- **입력=학습 이벤트, 출력=상태 변화** → 예측·테스트·디버그 쉬움
- 경험치 합계가 아닌 **조건 기반 승급** (Astra)

---

## 5. LEARN ENGINE — 학습엔진 (기존 자산 재사용)

기존 camnemi-topik의 **문제은행(reading/listening/writing/mock/vocab)** 과 TTS를 정리해 이식:
- 문제 데이터 → `content/` 선언형으로 이동 (QA 게이트 유지)
- TTS → Web Speech(ko-KR) + 검수 캐시 (런타임 API 호출 없음)
- 숙련도 표기: "약속 시간 이해하기: 복습 필요" (추상 전투력 X)

> 공부하는 모든 화면이 `eventBus` 로 성장에 연결 = "어디서 공부해도 같은 성장".

---

## 6. STATE & SYNC — Supabase

| 테이블 | 목적 |
|---|---|
| `profile` | 유저, 선택 캐릭터, 설정 |
| `learning_event` | 모든 학습 기록 (원장) |
| `skill_mastery` | 항목별 숙련도 (파생, 재계산 가능) |
| `career` | 커리어 단계·종합미션 완료 |
| `unlock` | 해금 내역 (포카드 등) |

- **기록(원장) ↔ 현재상태 분리**: 규칙 바꿔도 기록 기반 재계산, 기존 유저 진도 인정
- 멀티기기 동기화, 중복 이벤트 방지 (idempotent upsert)

---

## 7. MEDIA PIPELINE — (영상=시댄스 포함)

**원칙**: 런타임 AI 없음. **제작 시 사전 생성 → 검수 → 압축 → 캐시.** 일상 루프는 정지 일러스트+텍스트.

| 용도 | 도구 | 방식 |
|---|---|---|
| 캐릭터 정지 일러스트 | **FAL GPT Image 2** | FILM ANIME 스타일 클라우스(고정) |
| **절정/마법/데뷔 컷씬 영상** | **Seedance 2.0 (시댄스)** | `create_character`로 캐릭터 시트 → 프롬프트에 `@character:<id>` → i2i 컷씬 |
| 데뷔 직전 스테이지 배경 | FAL / 정적 | 사전 제작 |
| 오디오(TTS) | Web Speech / 서버 TTS | 검품 캐시 |
| 압축/전달 | ffmpeg (scale, crf, 저용량) + webp/avif | 캐시버스터 배포 |

**Seedance 캐릭터 일관성** (`@character` 지정 → i2i, 안정성 + 비용은 ~$0.04–0.30/s):
- 컷씬은 **공통 자산**(유저별 실시간 생성 X), 재사용
- 저데이터 모드 = 자동재생 off + 이미지 대체

---

## 8. QA & 배포

- **QA 게이트**: `scripts/qa_game.ts` — 문제은행 `qa_banks.js` 와 동일 패턴, 콘텐츠(멤버/에피소드/미션/해금/숙련도) 전수 검증 → 배포 전 exit 0
- **테스트**: `game/` 단위테스트 (vitest) + 핵심 UI 스모크
- **배포**: Cloudflare Worker/Pages 정적 배포 (topik.camnemi.com 패턴) + Supabase
  - 검증: git CI 자동빌드 → `?cb=` 캐시우회 → 스모크

---

## 9. 데이터 모델 (게임 상태)

```
Profile { id, memberId, name, created_at }
Career { profileId, stage: 입문|연습생|팀프로젝트|데뷔준비|데뷔|활동확장,
         missionDone[], completedAt }
LearningEvent { id, profileId, kind: bank|vocab|mock|mission|tts,
                itemId, correct, at }          # 원장
SkillMastery { profileId, itemId, state: 학습중|복습필요|숙련, evidence[] }
Unlock { profileId, kind: card|background|story, refId, at }
```

**데뷔 = TOPIK I 2급**: `career.stage==데뷔` + 2급 범위 `skill_mastery==숙련` 전부 + 종합(모의) 2급 통과.

---

## 10. 로드맵 (첫 마일스톤)

```
M1 스캐폴드   React+TS 구조 + 타입 + 콘텐츠 데이터(4인·커리어·1화) + QA 게이트
M2 캐릭터선택  선택 화면 (FILM ANIME 초상) → 내 아이돌 고정
M3 트레이닝   학습엔진 이식 + 미션 미니게임 + eventBus 성장
M4 커리어→데뷔   승급 판정 + 진행바 + 데뷔(2급) 달성 화면 (시댄스 컷씬 1개)
M5 미디어/배포  Seedance 컷씬·포카드·PWA·Cloudflare 배포
```