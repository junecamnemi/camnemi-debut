# 글로시스: 데뷔 프로젝트 — 최종 게임 설계서
### (Astra 2026-09 설계 + 지금까지 확정 컨셉의 통합·갱신)

> **한 문장 정의**
> **"플레이어가 글로시스 멤버 1명을 골라, 한국어를 배우며 트레이닝하고, 그 아이돌을 데뷔(=TOPIK I 2급) 시키는 게임 — 매일 AI가 만드는 새 문제로."**

---

## 0. 이 문서가 갱신한 것 (Astra → 현재 컨셉)
- 사용자=연습생 주인공 → **사용자=프로듀서** (멤버 선택 → 데뷔 책임)
- 학습=게임진행 개념 유지 + **마법천자문 포맷**(표현=마법) 적용
- "공부 스타일 웹 → 게임 감성 학습앱" (겉껍질만 게임화, 학습엔진 유지)
- 경쟁분석 반영(NextKhIT/Nolja/Lingo Legend) + **3축 차별화**
- 신규 핵심: **AI 매일 10문제 자동 생성** (이미 camnemi-topik에서 가동)
- 기술: React+TS+Vite · **Seedance(시댄스) 영상** · eventBus · Supabase · QA

---

## 1. 제품 정체성

- **Camnemi** = 한국어 교육·유학 서비스
- **Glowsis** = 계속 학습하게 만드는 아이돌 IP · 세계관
- **플레이어** = 프로듀서. "내가 고른 아이돌의 데뷔를 책임진다"

**하지 않을 것**: "문제 풀어 코인 → 별개 게임" 환전 구조 / 과한 레벨업 연출 / 유료캐릭터·뽑기·에너지.

---

## 2. 플레이어 여정 (감화된 마법천자문)

```
① 캐릭터 선택 → ② 트레이닝(공부=연습) → ③ 성장·무대 → ④ 데뷔 = TOPIK I 2급 🎉
```

**에피소드 = TOPIK 핵심 표현 1개를 "마법/신스킬"로 배우는 장면**
```
도입: 멤버가 연습/무대 중 위기
마법: 핵심 표현 사용 → 파워업   (채아: "할 수 있어!"=-(으)ㄹ 수 있다)
학습: 문법·어휘가 스토리에 녹아듦
미션: 문장 조립·어미 선택 미니게임 (+ AI 신문제)
보상: 아이돌 성장 (레벨·무대·포카드·커리어 상승)
```

**공부 = 트레이닝**: 어떤 화면(교재/보케/모의고사/AI문제/미션)에서 공부해도 **같은 성장**에 반영(Astra 핵심).

---

## 3. 캐릭터 선택 (첫 화면)

메인 4인 선택(초회 4명만 — 시즌별 해금). 각 멤버 = 마법 속성 겸 **학습 문법 테마**:

| 멤버 | 포지션 | 색 | 마법 속성 (문법) |
|---|---|---|---|
| 아란 Aran | 리더·메인보컬 | 블루 | "우리"(함께·청유) |
| 채아 Chaea | 보컬 | 그린 | "-(으)ㄹ 수 있다"(용기) |
| 다희 Dahee | 댄서·래퍼 | 핑크 | "-(으)면서/려고"(추진) |
| 로이 Roy | 비주얼·막내 | 크림 | "-(으)면/니깐"(감성) |

나머지 3명 = **동료**(조력자). 60명은 시즌 전개로 점진 공개(Astra 원칙).

---

## 4. 성장 3축 (Astra 채택) + 데뷔

**A. 한국어 실력(실제)** — 구체적 표기, 오답=복습/숙련=자기해결 증거. T1~T6≠공식 TOPIK급.
**B. 아이돌 커리어(이야기)** — 입문→연습생→팀프로젝트→데뷔준비→**데뷔**→활동확장. 승급=학습목표+종합미션 통과.
**C. 관계·컬렉션(감정)** — 함께 완료 에피소드, 확정 해금(포카드·배경·후속이야기), 접속 안 함=하락 없음.

### 데뷔 = TOPIK I 2급 (핵심 목표)
| 단계 | 학습 | 증명 |
|---|---|---|
| 입문 | 1A 초반 | 첫 대화 |
| 연습생 | 1A~1B | 미션 |
| 팀프로젝트 | 2A | 합동연습 |
| 데뷔준비 | 2B+인터뷰 | 종합 미션 |
| **데뷔** | **TOPIK I 2급 범위** | **AI 모의 2급 통과** |

---

## 5. 3축 차별화 (경쟁분석 반영)

1. **아이돌 데뷔 성장 게임** — 경쟁사(NextKhIT/Nolja)는 건조 시험 앱, Lingo Legend는 무미 판타지. 우리만 "내 아이돌 데뷔 = 2급".
2. **AI로 매일 새 10문제** — 경쟁사=유한 기출, 우리=무한·적응형 (이미 `daily_bank` 파이프라인 가동).
3. **유학 준비 통합** — 학습→2급→실제 유학(지원·장학금80%·비자)까지 연결(Camnemi 독점).

---

## 6. AI 매일 10문제 파이프라인 (핵심 무기)

- **배치 생성**: 매일 03:30 cron → DeepSeek가 10문제 생성 → `qa_lib`/`qa_banks` QA 게이트 통과만 배포
- **적응형**: skill_mastery 약점 기반으로 문제 생성 (개인화)
- **저비용**: 문제당 ~$0.01, 일괄·검수·정적 배포 (런타임 AI 없음 — Astra 원칙)
- **게임 연결**: AI 문제 = 트레이닝 미션, 정답률이 아이돌 성장 입력

---

## 7. 기술 아키텍처

```
APP (React+TS+Vite)
  ├─ features/: characterSelect·home·training·career·collection·debut
  ├─ game/ : progression·skill·rewards·eventBus (순수 로직, 단위테스트)
  ├─ learn/: 문제은행·보케·TTS(캐시) (camnemi-topik 재사용)
  ├─ content/: members·careerStages·episodes·missions·skills(TOPIK)·unlocks
  ├─ services/: Supabase
  └─ types/hooks/components/styles
STATE: Supabase (profile·career·learning_event·skill_mastery·unlock·daily_questions)
MEDIA: FAL GPT Image(FILM ANIME) · Seedance(시댄스) 컷씬 @character · **Naver CLOVA TTS(유료, 한국어 특화)** · 저데이터모드
QA: scripts/qa_game.ts 게이트 + vitest
배포: Cloudflare(정적) + Supabase (topik.camnemi.com 패턴)
```

**영상(시댄스) 원칙**: 일상 루프=정지일러(런타임 AI X). 데뷔·마법·절정 장면만 `치create_character`→`@character` 컷씬. 사전 생성·압축·캐시.

---

## 8. 데이터 모델 (게임 상태)

```
Profile{id, memberId, name}
Career{profileId, stage, missionDone[], completedAt}
LearningEvent{id, profileId, kind, itemId, correct, at}   # 원장
SkillMastery{profileId, itemId, state: 학습중|복습필요|숙련, evidence[]}
Unlock{profileId, kind:photo|bg|story, refId, at}
DailyQuestion{date, items[], qa_status}                    # AI 신문제
```
→ "데뷔" = Career.stage + TOPIK I 2급 SkillMastery 전부 숙련 + AI 모의 2급 통과

---

## 9. 핵심 원칙 (Astra 8 + 유지)
1 공부=진행 · 2 모든 학습 인정, 활동≠실력 · 3 기존 유저 진도 인정 · 4 데이터로 성취 표시(연출 금지) · 5 캐릭터는 학습을 돕고 가리지 않음 · 6 한번 만들어 오래 쓰기(정적·캐시) · 7 접속 안 한 날 벌주지 않음 · 8 재미와 학습성과 함께 검증

---

## 10. 로드맵 (첫 마일스톤)
```
M1 스캐폴드: React+TS 구조·타입·콘텐츠(4인·커리어·1화)·seedance media·QA 게이트
M2 캐릭터선택: FILM ANIME 4인 선택 → 내 아이돌 고정
M3 트레이닝: 학습엔진 이식 + AI 10문제 + eventBus 성장
M4 커리어→데뷔: 승급 판정 + 진행바 + 데뷔(2급) 화면 (시댄스 컷씬 1개)
M5 미디어/배포: 포카드·시댄스 컷씬·PWA·Cloudflare 배포
```