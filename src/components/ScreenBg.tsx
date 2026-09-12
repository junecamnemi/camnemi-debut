import type { ReactNode } from 'react';

/**
 * 세로 영상 배경 + 콘텐츠 오버레이 래퍼 — 홈(HomeScreen) 디자인 언어를 공용화.
 * - 배경 영상은 절대배치(.scr__bgwrap)라 스크롤에 고정되고 계속 재생(autoplay/loop/muted/playsInline)
 * - .scr__scrim 그라데이션 스크림으로 상·하단을 어둡게 해 가독성 확보
 * - appbar(투명 상단바)/head(영상 위 타이틀)/panel(글래스 콘텐츠) 슬롯 제공
 * - 페이지는 스크롤하지 않음. 콘텐츠가 넘칠 때만 .scr__panel 1개가 자체 스크롤(배경 고정).
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

      {/* 넘칠 때만 이 패널 하나가 스크롤(배경은 고정) */}
      <div className="scr__panel">{children}</div>
    </div>
  );
}
