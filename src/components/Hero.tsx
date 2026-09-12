interface HeroProps {
  src: string;
  video?: boolean;
  poster?: string;
  badge?: string;
  title: string;
  subtitle?: string;
  small?: boolean;
}

/** 탭 상단 히어로 — 이미지/영상 + 오버레이 + 타이틀 */
export function Hero({ src, video, poster, badge, title, subtitle, small }: HeroProps) {
  return (
    <div className={`hero${small ? ' hero--sm' : ''}`}>
      {video ? (
        <video className="hero__bg" src={src} poster={poster} autoPlay loop muted playsInline />
      ) : (
        <img className="hero__bg" src={src} alt="" />
      )}
      <div className="hero__ov" />
      <div className="hero__in">
        {badge && <span className="hero__badge">{badge}</span>}
        <h1 className="hero__title">{title}</h1>
        {subtitle && <p className="hero__sub">{subtitle}</p>}
      </div>
    </div>
  );
}
