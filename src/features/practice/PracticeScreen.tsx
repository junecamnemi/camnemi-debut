import { useState } from 'react';
import { PRACTICE, KIND_ICON, type PracticeKind } from '../../content/practice';
import { Icon } from '../../components/Icon';
import { HeroCarousel } from '../../components/HeroCarousel';
import { TextbookSection } from './TextbookSection';
import { speakScript } from '../../services/tts';
import { useI18n, type TKey } from '../../i18n';

/** Train — practice problems + textbook */
export function PracticeScreen() {
  const { t } = useI18n();
  const [mode, setMode] = useState<'practice' | 'textbook'>('practice');
  const [kind, setKind] = useState<PracticeKind | null>(null);
  const [qi, setQi] = useState(0);
  const [picked, setPicked] = useState<number | null>(null);

  const list = kind ? PRACTICE.filter((q) => q.kind === kind) : [];
  const q = list[qi];

  function pick(i: number) { if (picked === null) setPicked(i); }
  function nextQ() {
    if (qi + 1 < list.length) { setQi(qi + 1); setPicked(null); }
    else { setKind(null); setQi(0); setPicked(null); }
  }
  function playAudio() { if (q?.audio) void speakScript(q.audio); }

  const kindKey: Record<PracticeKind, TKey> = { read: 'kind_read', listen: 'kind_listen', vocab: 'kind_vocab' };

  return (
    <>
      <div className="appbar">
        <span className="appbar__brand">{t('train')}</span>
        <span className="appbar__right">TOPIK I</span>
      </div>

      <HeroCarousel
        small={mode === 'textbook'}
        badge={mode === 'practice' ? 'TOPIK I' : t('train_textbook')}
        title={mode === 'practice' ? t('train_hero_title') : t('train_tb_title')}
        subtitle={mode === 'practice' ? t('train_hero_sub') : t('train_tb_sub')}
      />

      

      <div className="segbar">
        <button className={`seg${mode === 'practice' ? ' on' : ''}`} onClick={() => setMode('practice')}>{t('train_practice')}</button>
        <button className={`seg${mode === 'textbook' ? ' on' : ''}`} onClick={() => setMode('textbook')}>{t('train_textbook')}</button>
      </div>

      <div className="screen">
        {mode === 'textbook' ? <TextbookSection /> : !q ? (
          <>
            {(['read', 'listen', 'vocab'] as PracticeKind[]).map((k) => {
              const n = PRACTICE.filter((x) => x.kind === k).length;
              return (
                <button key={k} className="tile" onClick={() => { setKind(k); setQi(0); setPicked(null); }}>
                  <span className="tile__ic"><Icon name={KIND_ICON[k]} size={20} /></span>
                  <span><span className="tile__t">{t(kindKey[k])}</span>
                    <span className="tile__d">{t('questions_n')(n)}</span></span>
                  <Icon name="chev" size={18} />
                </button>
              );
            })}
          </>
        ) : (
          <>
            <div className="qmeta">
              <span className="qtag">{t(kindKey[q.kind])}</span>
              <span className="qtag qtag--lv">{q.level}</span>
              <span className="qprog">{qi + 1} / {list.length}</span>
            </div>
            <div className="card">
              <div className="qprompt">{q.prompt}</div>
              {q.passage && <div className="qpassage">{q.passage}</div>}
              {q.kind === 'listen' && q.audio && (
                <button className="qaudio" onClick={playAudio}><Icon name="play" size={18} /> {t('play_audio')}</button>
              )}
            </div>
            <div className="qopts">
              {q.opts.map((o, i) => {
                const isPicked = picked === i;
                const isAns = i === q.answer;
                const cls = picked === null ? '' : isAns ? ' is-correct' : isPicked ? ' is-wrong' : ' is-dim';
                return (
                  <button key={i} className={`qa${cls}`} onClick={() => pick(i)} disabled={picked !== null}>
                    <span className="qa__k">{'①②③④'[i]}</span>{o}
                  </button>
                );
              })}
            </div>
            {picked !== null && (
              <>
                <div className={`qfb${picked === q.answer ? ' ok' : ' no'}`}>
                  {picked === q.answer ? `✅ ${t('correct')}` : `💡 ${t('incorrect')}`} {q.explain}
                </div>
                <button className="btn btn--primary" onClick={nextQ}>
                  {qi + 1 < list.length ? t('next') : t('back_menu')}
                </button>
              </>
            )}
          </>
        )}
      </div>
    </>
  );
}
