import { createPortal } from 'react-dom';
import { useI18n } from '../i18n';
import { storyByNo } from '../content/story';
import './celebration.css';

interface Props {
  no: number;
  stageName: string;
  /** "보상 보기" — 축하 오버레이를 닫고 보상 씬을 보여준다 */
  onRewards: () => void;
  /** "다음 에피소드" — 다음 화 재생 (AppShell 이 전달) */
  onNext?: () => void;
  /** "스토리로 돌아가기" — 마지막 화에서 사용 */
  onStory?: () => void;
}

/** 폭죽 입자 — 브랜드 팔레트로 결정론적으로 생성 */
const CONFETTI = Array.from({ length: 26 }, (_, i) => ({
  left: `${(i * 149) % 100}%`,
  delay: `${(i % 9) * 0.22}s`,
  duration: `${2.4 + (i % 6) * 0.45}s`,
  color: ['#ec4899', '#8b5cf6', '#fbbf24', '#34d399', '#f472b6', '#c9a9ff', '#ffffff'][i % 7],
  size: 7 + (i % 4) * 3,
}));

/** 에피소드 완료 축하 — 전체화면 오버레이 (body 로 포탈) */
export function EpisodeCelebration({ no, stageName, onRewards, onNext, onStory }: Props) {
  const { t, lang } = useI18n();
  const story = storyByNo(no);
  const title = lang === 'ko' ? story?.titleKo : story?.titleEn;
  const isFinale = no >= 16;

  return createPortal(
    <div className="celebrate" role="dialog" aria-modal="true" aria-label={t('celebrate_badge')(no)}>
      <div className="celebrate__confetti" aria-hidden="true">
        {CONFETTI.map((c, i) => (
          <i
            key={i}
            className="confetto"
            style={{
              left: c.left,
              animationDelay: c.delay,
              animationDuration: c.duration,
              background: c.color,
              width: c.size,
              height: Math.round(c.size * 0.42),
            }}
          />
        ))}
      </div>

      <div className="celebrate__inner">
        <div className="celebrate__emoji" aria-hidden="true">🎉</div>
        <span className="celebrate__badge">{t('celebrate_badge')(no)}</span>
        <h2 className="celebrate__title">{t('celebrate_title')(title ?? `EP.${no}`)}</h2>
        <div className="celebrate__stage">‘{stageName}’</div>
        <p className="celebrate__line">{t(isFinale ? 'celebrate_line_final' : 'celebrate_line')}</p>

        <div className="celebrate__actions">
          <button className="celebrate__btn celebrate__btn--primary" onClick={onRewards}>
            {t('celebrate_rewards')}
          </button>
          {isFinale ? (
            <button className="celebrate__btn" onClick={onStory}>{t('celebrate_back')}</button>
          ) : (
            <button className="celebrate__btn" onClick={onNext}>{t('celebrate_next')(no + 1)}</button>
          )}
        </div>
      </div>
    </div>,
    document.body,
  );
}
