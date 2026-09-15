import { useState } from 'react';
import type { Episode, JamoStage } from '../../types/game';
import { setStageName as saveStageName, setSkill, unlock, logEvent, setCareer, setEpisodeDone } from '../../services/game';
import { applyGuestProgress } from '../../services/localProgress';
import { MEMBERS } from '../../content/members';
import { photocardId, careerKeyForPct } from '../../content/player';
import { useI18n, type TKey } from '../../i18n';
import { Hud } from '../../components/Hud';
import { DialogueScene } from './scenes/DialogueScene';
import { JamoLesson } from './scenes/JamoLesson';
import { FinalLesson } from './scenes/FinalLesson';
import { CombineGame } from './scenes/CombineGame';
import { WritingPractice } from './scenes/WritingPractice';
import { NamingScene } from './scenes/NamingScene';
import { RewardScene } from './scenes/RewardScene';
import { EpisodeCelebration } from '../../components/EpisodeCelebration';
import { cutFor, cutVideoForLine } from '../../content/cuts';
import './episode1.css';

type Phase = 'dlg' | 'jamo' | 'final' | 'combine' | 'write' | 'name' | 'reward';

/** 자모 단계 순서 */
const JAMO_ORDER: JamoStage[] = ['cons', 'vow', 'dcons', 'dvow'];

/** EP.1 완료 시 커리어 진행 % (entry 단계) */
const EP1_CAREER_PCT = 10;

const JAMO_UI: Record<JamoStage, { key: TKey; en: string }> = {
  cons:  { key: 'jamo_cons',  en: 'Consonants' },
  vow:   { key: 'jamo_vow',   en: 'Vowels' },
  dcons: { key: 'jamo_dcons', en: 'Double consonants' },
  dvow:  { key: 'jamo_dvow',  en: 'Compound vowels' },
};

/** 진행률/커리어 라벨 */
function progressFor(phase: Phase, dlgIdx: number, dlgLen: number, jamoStage: JamoStage, combineIdx: number, combineLen: number, charIdx: number, wordLen: number) {
  const jamoBase = 30 + JAMO_ORDER.indexOf(jamoStage) * 5;   // 30,35,40,45
  switch (phase) {
    case 'dlg':     return { pct: 16 + Math.round((dlgIdx / dlgLen) * 8), label: 'Career · Entry' };
    case 'jamo':    return { pct: jamoBase, label: 'Career · Entry → Trainee' };
    case 'final':   return { pct: 52, label: 'Career · Hangul complete' };
    case 'combine': return { pct: 58 + Math.round((combineIdx / combineLen) * 12), label: 'Career · Trainee prep' };
    case 'write':   return { pct: 72 + Math.round((charIdx / wordLen) * 12), label: 'Career · Writing' };
    case 'name':    return { pct: 90, label: 'Career · Stage name' };
    case 'reward':  return { pct: 100, label: 'Career · Trainee reached' };
  }
}

interface Props {
  ep: Episode;
  userId?: string | null;
  onNext?: () => void;
  onExit?: () => void;
}

export function Episode1({ ep, userId, onNext, onExit }: Props) {
  const { t } = useI18n();
  const member = MEMBERS[ep.member];

  const [phase, setPhase] = useState<Phase>('dlg');
  const [dlgIdx, setDlgIdx] = useState(0);
  const [jamoStage, setJamoStage] = useState<JamoStage>('cons');
  const [combineIdx, setCombineIdx] = useState(0);
  const [combineOk, setCombineOk] = useState(false);
  const [taskIdx] = useState(0);
  const [charIdx, setCharIdx] = useState(0);
  const [writeDone, setWriteDone] = useState(false);
  const [stageName, setStageName] = useState('');
  const [celebrated, setCelebrated] = useState(false);

  const task = ep.writing[taskIdx];
  const { pct, label } = progressFor(
    phase, dlgIdx, ep.dialogue.length, jamoStage, combineIdx, ep.combine.length, charIdx, task.word.length,
  );

  const isLastDialogue = dlgIdx >= ep.dialogue.length - 1;
  const isLastCombine = combineIdx >= ep.combine.length - 1;
  const jamoIdx = JAMO_ORDER.indexOf(jamoStage);
  const jamoItems = (st: JamoStage) =>
    st === 'cons' ? (ep.consonants ?? []) : st === 'vow' ? (ep.vowels ?? []) : st === 'dcons' ? (ep.doubleCons ?? []) : (ep.complexVow ?? []);

  const canAdvance =
    phase === 'dlg' ? true
    : phase === 'jamo' ? true
    : phase === 'final' ? true
    : phase === 'combine' ? combineOk
    : phase === 'write' ? writeDone
    : phase === 'name' ? stageName.trim().length >= 2
    : false;

  const nextLabel =
    phase === 'dlg' ? (isLastDialogue ? t('ep1_start') : t('next'))
    : phase === 'jamo' ? (jamoIdx < JAMO_ORDER.length - 1 ? t('ep1_learn')(t(JAMO_UI[JAMO_ORDER[jamoIdx + 1]].key)) : t('ep1_learn')(t('jamo_final')))
    : phase === 'final' ? t('ep1_combine')
    : phase === 'combine' ? (isLastCombine ? t('ep1_writing') : t('next'))
    : phase === 'write' ? (writeDone ? (charIdx >= task.word.length - 1 ? t('ep1_naming') : t('ep1_next_char')) : t('ep1_check_first'))
    : phase === 'name' ? (stageName.trim().length >= 2 ? t('ep1_debut_as')(stageName.trim()) : t('ep1_name_placeholder'))
    : t('next');

  function advance() {
    if (!canAdvance) return;
    if (phase === 'dlg') {
      if (!isLastDialogue) setDlgIdx(dlgIdx + 1);
      else { setJamoStage('cons'); setPhase('jamo'); }
    } else if (phase === 'jamo') {
      if (jamoIdx < JAMO_ORDER.length - 1) setJamoStage(JAMO_ORDER[jamoIdx + 1]);
      else setPhase('final');
    } else if (phase === 'final') {
      setCombineIdx(0); setCombineOk(false); setPhase('combine');
    } else if (phase === 'combine') {
      if (!isLastCombine) { setCombineIdx(combineIdx + 1); setCombineOk(false); }
      else { setCharIdx(0); setWriteDone(false); setPhase('write'); }
    } else if (phase === 'write') {
      if (charIdx >= task.word.length - 1) setPhase('name');
      else { setCharIdx(charIdx + 1); setWriteDone(false); }
    } else if (phase === 'name') {
      const name = stageName.trim() || member.ko;
      if (userId) {
        void saveStageName(userId, name);
        void setSkill(userId, 'hangul_write', 'mastered');
        void setSkill(userId, 'hangul_read', 'mastered');
        void unlock(userId, photocardId(ep.no), 'photocard');
        void setCareer(userId, careerKeyForPct(EP1_CAREER_PCT), EP1_CAREER_PCT);
        void logEvent(userId, 'episode', ep.id, true, { stageName: name });
        void setEpisodeDone(userId, ep.no);
      } else {
        applyGuestProgress({ stageName: name, careerStage: careerKeyForPct(EP1_CAREER_PCT), careerPct: EP1_CAREER_PCT, episode: ep.no, unlockId: photocardId(ep.no) });
      }
      setPhase('reward');
      setCelebrated(true);
    }
  }

  const backVisible = phase === 'dlg' && dlgIdx > 0;
  function back() { if (phase === 'dlg' && dlgIdx > 0) setDlgIdx(dlgIdx - 1); }

  const displayName = stageName.trim() || member.ko;

  return (
    <div className="ep">
      <Hud epLabel={phase === 'reward' ? t('ep1_clear') : `EP.${ep.no} ${t('ep1_title')}`} careerLabel={label} progress={pct} />

      <div className="ep__body">
        <div className="scene" key={phase}
             style={{ display: 'flex', flexDirection: 'column', gap: 'var(--sp-4)', flex: 1 }}>
          {phase === 'dlg' && <DialogueScene member={member} line={ep.dialogue[dlgIdx]} sceneImage={cutFor(ep.no, dlgIdx, ep.dialogue.length, ep.dialogue[dlgIdx].cut)} sceneVideo={cutVideoForLine(ep.no, dlgIdx, ep.dialogue.length, ep.dialogue[dlgIdx].cut)} />}
          {phase === 'jamo' && (
            <JamoLesson
              title={t((JAMO_UI[jamoStage] ?? JAMO_UI.cons).key)}
              sub={`${(JAMO_UI[jamoStage] ?? JAMO_UI.cons).en} · ${t('jamo_count')(jamoItems(jamoStage).length)}`}
              items={jamoItems(jamoStage)}
            />
          )}
          {phase === 'final' && <FinalLesson finals={ep.finals ?? []} />}
          {phase === 'combine' && <CombineGame question={ep.combine[combineIdx]} onAnswered={setCombineOk} />}
          {phase === 'write' && <WritingPractice task={task} charIdx={charIdx} onCharDone={() => setWriteDone(true)} />}
          {phase === 'name' && <NamingScene member={member} value={stageName} onChange={setStageName} />}
          {phase === 'reward' && !celebrated && <RewardScene stageName={displayName} rewards={ep.rewards} no={ep.no} subtitle={ep.subtitle} />}
        </div>
      </div>

      <div className="ctl">
        {backVisible && <button className="btn btn--ghost" onClick={back}>←</button>}
        <button className="btn btn--primary" onClick={advance} disabled={!canAdvance}>
          {nextLabel}
        </button>
      </div>

      {celebrated && (
        <EpisodeCelebration
          no={ep.no}
          stageName={displayName}
          onRewards={() => setCelebrated(false)}
          onNext={onNext}
          onStory={onExit}
        />
      )}
    </div>
  );
}
