import { useState } from 'react';
import type { PhraseItem, GrammarNote } from '../../../types/game';
import { speak } from '../../../services/tts';
import { useI18n } from '../../../i18n';

interface Props {
  phrases: PhraseItem[];
  grammar: GrammarNote[];
}

/** EP.2 자기소개 표현 + 문법 포인트 — 탭하면 TTS 재생 */
export function PhraseLesson({ phrases, grammar }: Props) {
  const { t } = useI18n();
  const [open, setOpen] = useState<number | null>(0);

  return (
    <div className="phrase-wrap">
      <div className="card jl">
        <div className="jl__head">
          <div>
            <div className="jl__k">{t('self_intro')}</div>
            <div className="jl__s">{t('tap_to_hear')}</div>
          </div>
          <div className="jl__count">{phrases.length}</div>
        </div>
      </div>

      <div className="plist">
        {phrases.map((p, i) => (
          <button key={i} className="pcard2" onClick={() => { void speak(p.ko); setOpen(i); }}>
            <span className="pcard2__ko">{p.ko}</span>
            <span className="pcard2__rom">{p.rom}</span>
            <span className="pcard2__en">{p.en}</span>
          </button>
        ))}
      </div>

      <div className="card jl">
        <div className="jl__k">{t('grammar')}</div>
        <div className="gnotes">
          {grammar.map((g, i) => (
            <div key={i} className={`gnote${open === 100 + i ? ' on' : ''}`} onClick={() => setOpen(100 + i)}>
              <div className="gnote__t">{g.title}</div>
              {open === 100 + i && (
                <>
                  <div className="gnote__b">{g.body}</div>
                  {g.ex.map((e, j) => <div key={j} className="gnote__ex">{e}</div>)}
                </>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
