import type { ReactNode } from 'react';

/**
 * 세로 영상 배경 + 바텀시트 콘텐츠 — 홈 디자인 언어 공용.
 * - 배경 영상은 절대배치(.scr__bgwrap)라 스크롤에 고정되고 계속 재생(autoplay/loop/muted/playsInline)
 * - .scr__scrim 그라데이션으로 상·하단 어둡게 → 가독성
 * - appbar(투명 상단바)/head(영상 위 타이틀)/panel(글래스 시트) 슬롯
 * - 콘텐츠는 바텀시트: 처음엔 하단에 조금만(--peek) 보이고, 위로 스크롤하면 올라와 펼쳐짐
 */
export function ScreenBg({
  video, poster, appbar, head, children,
}: {
  video: string;
  poster: string;
  appbar: ReactNode;
  head?: ReactNode;
  children: ReactNode;
}) {
  return (
    <div className="scr">
      {/* 고정 배경 (스크롤해도 제자리) */}
      <div className="scr__bgwrap">
        <video className="scr__bg" src={video} poster={poster} autoPlay loop muted playsInline />
        <div className="scr__scrim" />
      </div>

      {appbar}

      {head && <div className="scr__head">{head}</div>}

      {/* 바텀시트: 처음엔 조금만, 위로 스크롤하면 올라옴 */}
      <div className="scr__sheet">
        <div className="scr__pad" aria-hidden="true" />
        <div className="scr__panel">
          <div className="scr__grab" aria-hidden="true" />
          {children}
        </div>
      </div>
    </div>
  );
}
