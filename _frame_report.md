# 프레임 & 문자 정렬 UX — 작업 리포트 (_frame_report.md)

작업일: 2026-09-13 · 대상: `C:\Users\USER\camnemi-debut` (React19+TS+Vite)
범위: 전 화면 프레임 완성 + 문자 정렬 타이포 시스템 설계·구현. **영상 미변경.**

---

## 절대 규칙 준수 확인
- 영상: `<video>`/poster 참조 **전혀 손대지 않음**. 비디오 생성 없음.
- 기존 로직(게임 상태·i18n·Supabase auth·라우팅·EP.1/EP.2 플레이어) **보존**.
- `npm run build` → **tsc 0오류**, vite 빌드 성공.
- 콘솔 런타임 에러 **0** (favicon.ico 404 1건만, 실자산 아님 → 무시 가능).
- 디자인 톤: 기존 CUTE·중성 유지, 신규 색/변형 도입 없음.

---

## B. 문자 정렬 UX 시스템 — `src/styles/typography.css` (신규)

한/영 혼용에서 정렬이 흔들리지 않도록 **토큰 + 유틸리티**로 구현.
`main.tsx`에서 전역 import, `i18n.tsx`가 `<html lang>` 을 실제 언어로 세팅 →
`:lang()` 규칙이 자동 적용됨.

1. **정렬 정책**
   - 제목·히어로 = 중앙(`.t-hero`/`.t-title`, `text-wrap:balance`)
   - 본문·리스트·폼·읽기 = 좌측·동일 거터(`.txt`, `--gutter`)
   - 숫자·통계 = `tabular-nums`·우측(`.num`/`.num--stat`/`.num--right`)
   - **justify 금지**: `[align=justify]`, `.t-justify` 강제 좌측 복원.
   - 여러 줄 본문 중앙정렬 금지(정책 주석 명시, 유틸은 좌측 기본).
2. **줄바꿈**: `word-break:keep-all`(한국어 단어중간 잘림 방지) 전역 +
   `overflow-wrap:anywhere`(긴 라틴/URL 강제 분리). `.txt`, `.txt--keep`.
3. **줄간격**: 한글 본문 1.55 / 라틴 1.45 — `:root:lang()` + `:where(:lang())`로
   `--lh-doc` 자동 스왑. 제목 1.2, 소제목 1.35.
4. **행 길이(measure)**: `--measure:38ch`, `.measure`(100%까지), `.measure--center`.
   읽기 지문(`.qpassage`/`.qprompt`)에 실제 적용.
5. **혼용 스크립트**: 폰트 fallback을 body/button/input **한 벌로 통일**(Pretendard →
   Apple SD Gothic Neo → Malgun Gothic → system) → baseline·자간 흔들림 최소화.
   본문 `--ls-body(-.01em)`, 숫자 `--ls-num(0)` 규칙 분리.
6. **말줄임**: `.ellipsis`(한 줄), `.clamp-1/2/3`(여러 줄, keep-all 유지).
7. **광학 정렬**: `.optic`(아이콘+텍스트, 아이콘 `top:.02em` x-height 보정),
   버튼류 `inline-flex + justify-content:center + 좌우 동일 패딩(토큰)`.
8. **반응형**: 모든 폰트 크기 `clamp()`. 고정폭 금지 → `.flex-txt`, `min-width:0`,
   flex 배치로 EN↔KO 전환에도 안 깨지게.

추가: 빈 상태(`.state`), 스켈레톤 로딩(`.skel*`), 잠금 배지(`.lockbadge`),
`prefers-reduced-motion` 대응.

### 전 화면 일괄 적용 (컴포넌트 바인딩)
JSX를 전부 재작성하지 않고 **기존 클래스를 타이포 규칙에 연결**하는 단일 소스 섹션으로
Login/Home/Practice(+Textbook)/Story/Collection/My + 공용(TabBar/appbar/ScreenBg)에
일괄 적용:
- 제목류(`.home__title`,`.scr__title`,`.screen__title`,`.tb2__ti` …) → 토큰 폰트+keep-all+balance
- 본문·읽기(`.scr__sub`,`.qprompt`,`.qpassage`,`.tb-sec`,`.login__sub` …) → 언어별 줄간격+keep-all
- 리스트 제목(`.epi__t`,`.tile__t`,`.profile__name` …) → 한 줄 ellipsis
- 리스트 설명(`.epi__d`,`.tile__d`,`.profile__meta`) → 2줄 clamp
- 숫자·카운터(`.stat b`,`.hearts__n`,`.qprog`,`.career__pct`,`.book__num` …) → tabular-nums
- 버튼 라벨(`.btn`,`.seg`,`.langbtn`,`.lvchip`) → 중앙+좌우 동일 패딩+nowrap

---

## A. 프레임 (3단 구조 · 스크롤 · 토큰)

- **3단 구조**: 모든 탭 화면이 상단(`appbar--abs`) · 본문(`scr__panel`/`home__body`/`screen`)
  · 하단(`TabBar`) 규칙으로 통일. Home은 고정배경+바텀시트, 4개 탭은 공용 `ScreenBg`로 동일 패턴.
- **세로 스크롤 최소화**: 배경 고정 + 내부 패널(`scr__sheet`/`scr__panel`)만 스크롤(기존 구조 유지).
- **가로 스크롤 금지**: 검증에서 **전 화면 `body.scrollWidth == 420(viewport)`** 확인.
- **토큰만 사용**: 신규 여백/폰트는 `--sp-*`,`--r-*`,`--fs-*`,`--lh-*`,`--measure`만. 임의 px 없음.
- **컴포넌트 재사용**: 신규 UI 변형 없음 — 기존 `.card`/`.tile`/`.epi`/`.btn`/`.block` 패턴만 활용.
- **빈/로딩/잠금 상태 정의**:
  - Textbook: 레벨 로딩 중 **스켈레톤 5행**, 단원 0개 시 **빈 상태**.
  - Collection: 카드 0개 시 **빈 상태**, 미보유 카드 **잠금 오버레이**(기존) 유지.
  - Story: locked 에피소드 잠금 아이콘(기존) 유지.
  - 앱 로딩: 기존 splash 유지.

---

## C. 검증 (Playwright, 뷰포트 420×900, 실측)

스크립트 `_verify.py`(dev 서버 localhost:5173, chromium) — 로그인(게스트)→5탭→
교재 목록→단원 뷰어→EP.2 플레이어를 EN·KO 각각 순회.

| 항목 | 결과 |
|---|---|
| 가로 스크롤(`bodyScrollW==viewport`) | **전 14개 화면 상태 통과** (EN 7 + KO 7), horiz=False |
| `pageerror` | **0** |
| 콘솔 error | favicon.ico 404 1건만 (실자산 아님, 무시 가능) |
| EN↔KO 전환 | 각 화면 재순회 — 넘침/가로스크롤 0 (가장 긴 라벨 기준 안전) |
| 요소단위 overflow | `.app__stage` 1건뿐 — 회전 오로라 장식 pseudo(`inset:-30%`), `.app{overflow:hidden}`로 클리핑·`pointer-events:none` → **거짓양성**(스킬 기록된 장식요소 패턴), 실제 레이아웃 깨짐 아님 |

빌드: `npm run build` → tsc 0오류, `dist/assets/index-*.css 75.99kB`(타이포 시스템 +6.6kB).

---

## 변경 파일
- 신규: `src/styles/typography.css`
- 수정: `src/main.tsx`(import), `src/i18n.tsx`(`<html lang>` 세팅),
  `src/features/practice/TextbookSection.tsx`(로딩 스켈레톤+빈 상태),
  `src/features/collection/CollectionScreen.tsx`(빈 상태)
- 검증용(비배포): `_verify.py`, `_analyze.py`, `_verify_out.json`, `.verify-venv/`

## 커밋/배포
- 커밋·푸시 **안 함**. 검증만 완료. 배포는 사람이 수행.
