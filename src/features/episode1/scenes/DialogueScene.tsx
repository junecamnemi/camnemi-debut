import { useEffect, useRef, useState } from 'react';
import type { DialogueLine, Member } from '../../../types/game';
import { useI18n } from '../../../i18n';

interface Props {
  member: Member;
  line: DialogueLine;
  /** 스토리 컷씬 오버라이드 — 제공되면 line.scene/sceneVideo 대신 이 이미지를 16:9 랜드스케이프로 표시 */
  sceneImage?: string;
}

/** 크로스페이드 전환 시간(ms) — episode1.css .sceneframe__layer transition 과 일치시킬 것 */
const XFADE_MS = 420;

interface MediaLayer {
  id: number;
  videoSrc?: string;
  imgSrc?: string;   // 영상 있으면 poster, 없으면 <img> 소스(켄번즈 폴백)
  shown: boolean;
}

function prefersReducedMotion() {
  return typeof window !== 'undefined'
    && window.matchMedia?.('(prefers-reduced-motion: reduce)').matches;
}

/**
 * 장면 미디어 레이어 — 대사 인덱스와 무관하게 안정적으로 유지된다.
 * - 같은 장면에서 대사만 넘어가면(= src 동일) 레이어를 재마운트하지 않는다 → <video> 재로드/깜빡임 없음.
 * - 장면 src 가 실제로 바뀌면 새 레이어를 opacity 0 으로 위에 쌓고, onCanPlay/onLoad 이후 1 로 페이드해
 *   이전 레이어를 남긴 채 크로스페이드 → 검은 프레임 없이 자연스럽게 교체. (poster→mp4 도 동일)
 */
function SceneMedia({ videoSrc, imgSrc }: { videoSrc?: string; imgSrc?: string }) {
  const key = videoSrc || imgSrc || '';
  const idRef = useRef(1);
  const [layers, setLayers] = useState<MediaLayer[]>(
    () => [{ id: 1, videoSrc, imgSrc, shown: true }],
  );
  const lastKey = useRef(key);

  useEffect(() => {
    if (key === lastKey.current) return;   // 대사만 바뀜 → 미디어 그대로 유지
    lastKey.current = key;
    const id = ++idRef.current;
    setLayers((prev) => [...prev, { id, videoSrc, imgSrc, shown: false }]);
  }, [key, videoSrc, imgSrc]);

  // 새 레이어가 재생/로드 준비되면 페이드 인 → 전환 후 아래 레이어 정리
  function reveal(id: number) {
    setLayers((prev) => (prev.some((l) => l.id === id && !l.shown)
      ? prev.map((l) => (l.id === id ? { ...l, shown: true } : l))
      : prev));
    window.setTimeout(() => {
      setLayers((prev) => (prev.length > 1 ? prev.filter((l) => l.id >= id) : prev));
    }, XFADE_MS + 40);
  }

  // 영상 로드 실패(아직 생성 전 mp4 등) → 해당 레이어를 스틸 이미지(켄번즈)로 폴백
  function fallbackToImage(id: number) {
    setLayers((prev) => prev.map((l) => (l.id === id && l.videoSrc ? { ...l, videoSrc: undefined } : l)));
  }

  return (
    <>
      {layers.map((layer) => (
        <div className="sceneframe__layer" key={layer.id} style={{ opacity: layer.shown ? 1 : 0 }}>
          {layer.videoSrc ? (
            <video
              ref={(el) => {
                // React 합성 onError 는 <video> 에서 신뢰성 있게 발화하지 않고, src 를
                // prop 으로 세팅하면 로드가 먼저 시작돼 에러를 놓칠 수 있다. 리스너를
                // 먼저 붙인 뒤 src 를 세팅해 404/디코드 실패 시 스틸 폴백을 보장한다.
                if (!el) return;
                const onErr = () => fallbackToImage(layer.id);
                el.addEventListener('error', onErr);
                if (!el.src) el.src = layer.videoSrc!;
                return () => el.removeEventListener('error', onErr);
              }}
              className="sceneframe__vid"
              poster={layer.imgSrc}
              autoPlay loop muted playsInline preload="metadata"
              onCanPlay={() => reveal(layer.id)}
              onLoadedData={() => reveal(layer.id)}
            />
          ) : layer.imgSrc ? (
            <>
              <img className="sceneframe__img" src={layer.imgSrc} alt="" loading="lazy" onLoad={() => reveal(layer.id)} />
              <div className="sceneframe__light" />
              <span className="p p1" /><span className="p p2" /><span className="p p3" /><span className="p p4" />
            </>
          ) : null}
        </div>
      ))}
      <div className="sceneframe__vig" />
    </>
  );
}

/**
 * 대화 씬 — EP.1 장면 영상(있으면) 또는 장면 이미지(켄번즈) 또는 캐릭터 루프 영상.
 * 미디어 레이어는 대사 진행과 분리되어 안정적으로 유지되고, 장면이 바뀔 때만 크로스페이드된다.
 */
export function DialogueScene({ member, line, sceneImage }: Props) {
  const { lang } = useI18n();
  const mname = lang === 'ko' ? member.ko : member.en;
  const halo = `var(${member.color})`;
  // 컷씬은 항상 랜드스케이프 스틸을 표시한다(구 포트레이트 mp4 는 재생하지 않음).
  // 랜드스케이프 영상이 준비되면 videoSrc 를 다시 연결하면 된다(cutVideoFor/cutVideoForLine 참조).
  // sceneImage 가 주어지면(컷씬 오버라이드) line.scene/sceneVideo 는 무시.
  const videoSrc = sceneImage ? undefined : line.sceneVideo;
  const imgSrc = sceneImage ?? line.scene;
  const hasScene = !!(videoSrc || imgSrc);

  // 대사 버블: 재마운트(key) 대신 내용이 바뀔 때 짧게 페이드 인
  const [bubbleOp, setBubbleOp] = useState(1);
  const firstBubble = useRef(true);
  useEffect(() => {
    if (firstBubble.current) { firstBubble.current = false; return; }
    if (prefersReducedMotion()) { setBubbleOp(1); return; }
    setBubbleOp(0);
    let raf2 = 0;
    const raf1 = requestAnimationFrame(() => { raf2 = requestAnimationFrame(() => setBubbleOp(1)); });
    return () => { cancelAnimationFrame(raf1); cancelAnimationFrame(raf2); };
  }, [line]);

  return (
    <div className="scene dlg-scene" style={{ '--halo': halo } as React.CSSProperties}>
      <div className="char char--scene">
        <div className="char__halo" />

        {hasScene ? (
          <div className={`sceneframe${sceneImage ? ' sceneframe--landscape' : ''}`}>
            <SceneMedia videoSrc={videoSrc} imgSrc={imgSrc} />
          </div>
        ) : member.loop ? (
          <video className="char__vid" src={member.loop} poster={member.portrait}
                 autoPlay loop muted playsInline />
        ) : (
          <img className="char__vid" src={member.portrait} alt={member.ko} />
        )}

        <div className="char__tag">
          <span className="char__dot" />
          <b>{mname}</b>
          <i>{member.en} · {member.roleEn ?? member.role}</i>
        </div>
      </div>

      <div className="card dlg dlg--fade" style={{ opacity: bubbleOp }}>
        <div className="dlg__who"><i />{line.who}</div>
        <div className="dlg__ko">{line.ko}</div>
        {line.en && <div className="dlg__en">{line.en}</div>}
        {line.tip && <div className="dlg__tip">✨ {line.tip}</div>}
      </div>
    </div>
  );
}
