import { useState } from 'react';
import type { Episode } from '../../types/game';
import { MEMBERS } from '../../content/members';
import { photocardId, careerKeyForPct } from '../../content/player';
import { Hud } from '../../components/Hud';
import { DialogueScene } from '../episode1/scenes/DialogueScene';
import { CombineGame } from '../episode1/scenes/CombineGame';
import { WritingPractice } from '../episode1/scenes/WritingPractice';
import { RewardScene } from '../episode1/scenes/RewardScene';
import { PhraseLesson } from './scenes/PhraseLesson';
import { EpisodeCelebration } from '../../components/EpisodeCelebration';
import { setStageName as saveStageName, setSkill, unlock, logEvent, setCareer, setEpisodeDone } from '../../services/game';
import { applyGuestProgress } from '../../services/localProgress';
import { cutFor } from '../../content/cuts';
import '../episode1/episode1.css';
import './episode2.css';

type Phase = 'dlg' | 'phrase' | 'manners' | 'write' | 'reward';

interface Props {
  ep: Episode;
  userId?: string;
  onNext?: () => void;
  onExit?: () => void;
}

/** EP.2 플레이어 — 대화 → 자기소개 표현 → 매너 미니게임 → 쓰기 → 보상 */
export function Episode2({ ep, userId, onNext, onExit }: Props) {
  const [phase, setPhase] = useState<Phase>('dlg');
  const [dlgIdx, setDlgIdx] = useState(0);
  const [mannersIdx, setMannersIdx] = useState(0);
  const [mannersOk, setMannersOk] = useState(false);
  const [taskIdx, setTaskIdx] = useState(0);
  const [charIdx, setCharIdx] = useState(0);
  const [writeDone, setWriteDone] = useState(false);
  const [stageName, setName] = useState('');
  const [named, setNamed] = useState(false);
  const [celebrated, setCelebrated] = useState(false);

  const member = MEMBERS[ep.member];
  const manners = ep.manners ?? [];
  const writing = ep.writing ?? [];
  const phrases = ep.phrases ?? [];
  const grammar = ep.grammar ?? [];
  const careerPct = 20;

  function addEvent(ref: string, correct?: boolean) {
    if (userId) void logEvent(userId, 'episode', ref, correct);
  }

  function progressFor(): { pct: number; label: string } {
    const marks: Record<Phase, number> = { dlg: 0.1, phrase: 0.3, manners: 0.55, write: 0.85, reward: 1 };
    const labels: Record<Phase, string> = {
      dlg: 'EP.2 · Nice to Meet You', phrase: 'Career · Rookie', manners: 'Career · Rookie',
      write: 'Career · Trainee', reward: 'Career · Trainee',
    };
    return { pct: marks[phase] * 100, label: labels[phase] };
  }

  function next() {
    if (phase === 'dlg') {
      if (dlgIdx + 1 < ep.dialogue.length) setDlgIdx(dlgIdx + 1);
      else { setPhase('phrase'); if (userId) void setSkill(userId, 'Self-introduction', 'mastered'); addEvent('ep02-dialogue'); }
      return;
    }
    if (phase === 'phrase') { setPhase('manners'); addEvent('ep02-phrases'); return; }
    if (phase === 'manners') {
      if (mannersIdx + 1 < manners.length) { setMannersIdx(mannersIdx + 1); setMannersOk(false); }
      else { setPhase('write'); addEvent('ep02-manners'); }
      return;
    }
    if (phase === 'write') {
      if (charIdx + 1 < (writing[taskIdx]?.word.length ?? 0)) { setCharIdx(charIdx + 1); setWriteDone(false); }
      else if (taskIdx + 1 < writing.length) { setTaskIdx(taskIdx + 1); setCharIdx(0); setWriteDone(false); }
      else { setPhase('reward'); addEvent('ep02-write'); }
      return;
    }
  }

  function finishNaming() {
    if (!stageName.trim()) return;
    setNamed(true);
    if (userId) {
      void saveStageName(userId, stageName.trim());
      void unlock(userId, photocardId(ep.no), 'photocard');
      void setCareer(userId, careerKeyForPct(careerPct), careerPct);
      void setEpisodeDone(userId, ep.no);
    } else {
      applyGuestProgress({ stageName: stageName.trim(), careerStage: careerKeyForPct(careerPct), careerPct, episode: ep.no, unlockId: photocardId(ep.no) });
    }
    addEvent('ep02-reward');
    setPhase('reward');
    setCelebrated(true);
  }

  const { pct, label } = progressFor();
  const cur = ep.dialogue[dlgIdx];
  const wtask = writing[taskIdx];

  return (
    <div className="ep">
      <Hud epLabel={`EP.${ep.no} ${ep.title}`} careerLabel={label} progress={pct} />

      <div className="ep__body">
        <div className="scene" key={phase} style={{ display: 'flex', flexDirection: 'column', gap: 'var(--sp-4)' }}>
          {phase === 'dlg' && <DialogueScene member={member} line={cur} sceneImage={cutFor(ep.no, dlgIdx, ep.dialogue.length, cur.cut)} />}
          {phase === 'phrase' && <PhraseLesson phrases={phrases} grammar={grammar} />}
          {phase === 'manners' && manners[mannersIdx] && (
            <CombineGame question={manners[mannersIdx]} onAnswered={(c) => { setMannersOk(c); addEvent('ep02-manners-' + mannersIdx, c); }} />
          )}
          {phase === 'write' && wtask && (
            <WritingPractice task={wtask} charIdx={charIdx} onCharDone={(isLast) => { setWriteDone(true); if (isLast) addEvent('ep02-write-word'); }} />
          )}
          {phase === 'reward' && (
            <>
              {!named && (
                <div className="card naming">
                  <div className="naming__q">{'Your idol’s stage name?'}</div>
                  <div className="naming__chips">
                    {['루나', '스텔라', '하늘', '별이'].map((s) => (
                      <button key={s} className="chip" onClick={() => setName(s)}>{s}</button>
                    ))}
                  </div>
                  <input className="naming__in" value={stageName} onChange={(e) => setName(e.target.value)} placeholder={'e.g. Stella'} />
                </div>
              )}
              {named && !celebrated && <RewardScene stageName={stageName} rewards={ep.rewards} no={ep.no} subtitle={ep.subtitle} />}
            </>
          )}
        </div>
      </div>

      <div className="ctl">
        {phase !== 'reward' && !(phase === 'write' && !writeDone) && (
          <button
            className="btn btn--primary"
            disabled={(phase === 'manners' && !mannersOk) || (phase === 'write' && !writeDone)}
            onClick={next}
          >
            {phase === 'dlg' ? (dlgIdx + 1 < ep.dialogue.length ? 'Next' : 'Learn phrases') :
             phase === 'phrase' ? 'Manners game' :
             phase === 'manners' ? (mannersIdx + 1 < manners.length ? 'Next' : 'Write practice') :
             'Reward'}
          </button>
        )}
        {phase === 'reward' && !named && (
          <button className="btn btn--primary" disabled={!stageName.trim()} onClick={finishNaming}>Debut!</button>
        )}
      </div>

      {celebrated && (
        <EpisodeCelebration
          no={ep.no}
          stageName={stageName}
          onRewards={() => setCelebrated(false)}
          onNext={onNext}
          onStory={onExit}
        />
      )}
    </div>
  );
}
