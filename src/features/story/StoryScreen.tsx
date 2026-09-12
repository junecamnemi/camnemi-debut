import { Icon } from '../../components/Icon';
import { HeroCarousel } from '../../components/HeroCarousel';

interface Epi { no: number; title: string; desc: string; state: 'done' | 'now' | 'locked' }

const EPISODES: Epi[] = [
  { no: 1, title: '첫 걸음, 한글', desc: '자음·모음 · 쓰기 · 예명', state: 'done' },
  { no: 2, title: '자기소개', desc: '-이에요/예요 · 숫자와 나이', state: 'now' },
  { no: 3, title: '있어요 / 없어요', desc: '소유 표현 · -(으)ㄹ 수 있다', state: 'locked' },
  { no: 4, title: '시간과 약속', desc: '몇 시 · 청유문', state: 'locked' },
  { no: 5, title: '쇼핑', desc: '이거 얼마예요 · 지시대명사', state: 'locked' },
];

/** 스토리 — 에피소드 목록 (EP.1~16 데뷔까지) */
export function StoryScreen() {
  const done = EPISODES.filter((e) => e.state === 'done').length;

  return (
    <>
      <div className="appbar"><span className="appbar__brand">스토리</span>
        <span style={{ marginLeft: 'auto', fontSize: 12, fontWeight: 800, color: 'var(--ink-3)' }}>
          EP.{done}/{EPISODES.length}
        </span>
      </div>
      <HeroCarousel
        badge="기획사 글로시스"
        title="데뷔 프로젝트"
        subtitle="EP.1~16 · 아란과 함께 데뷔(TOPIK 2급)까지"
      />
      <div className="screen">
        <div className="block">
          {EPISODES.map((e) => (
            <button key={e.no} className="epi" disabled={e.state === 'locked'}>
              <span className={`epi__no${e.state === 'locked' ? ' locked' : ''}`}>
                {e.state === 'locked' ? <Icon name="lock" size={16} /> : e.no}
              </span>
              <span className="epi__meta">
                <span className="epi__t">EP.{e.no} {e.title}</span>
                <span className="epi__d">{e.desc}</span>
              </span>
              {e.state === 'done' && <span className="epi__state">✓ 완료</span>}
              {e.state === 'now' && <span className="epi__play"><Icon name="play" size={15} /></span>}
              {e.state === 'locked' && <span className="epi__state" style={{ color: 'var(--ink-3)' }}>잠김</span>}
            </button>
          ))}
        </div>
      </div>
    </>
  );
}
