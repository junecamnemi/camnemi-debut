import { useState } from 'react';
import type { FinalWord } from '../../../types/game';
import { speak } from '../../../services/tts';
import { useI18n } from '../../../i18n';

interface Props { finals: FinalWord[] }

/** 받침(종성) 개념 — 글자 아래에 오는 자음. 예시 낱말 탭 → 발음(TTS) */
export function FinalLesson({ finals }: Props) {
  const { t } = useI18n();
  const [played, setPlayed] = useState<string | null>(null);

  function play(f: FinalWord) {
    setPlayed(f.word);
    void speak(f.word, { speed: -2 });
  }

  return (
    <>
      <div className="sec__head">
        <span className="sec__title">{t('jamo_final')}</span>
        <span className="sec__sub">Final consonants · {t('jamo_count')(finals.length)}</span>
      </div>

      <div className="card final-expl">
        <div className="final-expl__row">
          <span className="final-expl__cell"><i>ㅂ</i><b>밥</b><em>ㅂ</em></span>
          <span className="final-expl__arrow">→</span>
          <span className="final-expl__txt">
            {t('final_expl')}
          </span>
        </div>
      </div>

      <div className="fgrid">
        {finals.map((f) => (
          <button
            key={f.word}
            className={`fcard${played === f.word ? ' is-played' : ''}`}
            onClick={() => play(f)}
          >
            <div className="fcard__w">{f.word}</div>
            <div className="fcard__f">{f.final}</div>
            <div className="fcard__r">[{f.reading}]</div>
            <div className="fcard__m">{f.meaning}</div>
          </button>
        ))}
      </div>

      <div className="card dlg" style={{ marginTop: 'var(--sp-4)' }}>
        <div className="dlg__ko" style={{ fontSize: 16 }}>🔊 {t('final_hint')}</div>
        <div className="dlg__en">{t('final_expl')}</div>
      </div>
    </>
  );
}
