import { useState } from 'react';
import type { Episode } from '../types/game';
import { MEMBERS } from '../content/members';
import { Hud } from './Hud';
import { DialogueScene } from '../features/episode1/scenes/DialogueScene';
import { CombineGame } from '../features/episode1/scenes/CombineGame';
import { WritingPractice } from '../features/episode1/scenes/WritingPractice';
import { RewardScene } from '../features/episode1/scenes/RewardScene';
import { PhraseLesson } from '../features/episode2/scenes/PhraseLesson';
import { setStageName as saveStageName, setSkill, unlock, logEvent, setCareer, setEpisodeDone } from '../services/game';
import { applyGuestProgress } from '../services/localProgress';
import { photocardId, careerKeyForPct } from '../content/player';
import { StoryIntro } from './StoryIntro';
import '../features/episode1/episode1.css';
import '../features/episode2/episode2.css';

type Phase = 'dlg' | 'phrase' | 'manners' | 'write' | 'reward';

/** EP.5~16 공용 플레이어 — 대화 → 표현 → 매너 미니게임 → 쓰기 → 보상 (데이터로 구동) */
export function EpisodePlayer({ ep, userId }: { ep: Episode; userId?: string }) {
  const [phase, setPhase] = useState<Phase>('dlg');
  const [introDone, setIntroDone] = useState(false);
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

  // 에피소드별 명명/보상 식별자
  const epTag = `ep${String(ep.no).padStart(2, '0')}`;        // ep05 … ep16
  const pcId = photocardId(ep.no); // pc4 … pc15
  const skillId = ep.skill ?? ep.title;
  const careerPct = ep.careerPct ?? Math.min(100, 20 * (ep.no - 1));
  const isFinale = ep.no === 16;

  function addEvent(ref: string, correct?: boolean) {
    if (userId) void logEvent(userId, 'episode', ref, correct);
  }

  function progressFor(): { pct: number; label: string } {
    const marks: Record<Phase, number> = { dlg: 0.1, phrase: 0.3, manners: 0.55, write: 0.85, reward: 1 };
    const labels: Record<Phase, string> = {
      dlg: `EP.${ep.no} · ${ep.title}`, phrase: 'Career · Rookie', manners: 'Career · Rookie',
      write: 'Career · Rookie', reward: 'Career · Rookie',
    };
    return { pct: marks[phase] * 100, label: labels[phase] };
  }

  function next() {
    if (phase === 'dlg') {
      if (dlgIdx + 1 < ep.dialogue.length) setDlgIdx(dlgIdx + 1);
      else { setPhase('phrase'); if (userId) void setSkill(userId, skillId, 'mastered'); addEvent(`${epTag}-dialogue`); }
      return;
    }
    if (phase === 'phrase') { setPhase('manners'); addEvent(`${epTag}-phrases`); return; }
    if (phase === 'manners') {
      if (mannersIdx + 1 < manners.length) { setMannersIdx(mannersIdx + 1); setMannersOk(false); }
      else { setPhase('write'); addEvent(`${epTag}-manners`); }
      return;
    }
    if (phase === 'write') {
      if (charIdx + 1 < (writing[taskIdx]?.word.length ?? 0)) { setCharIdx(charIdx + 1); setWriteDone(false); }
      else if (taskIdx + 1 < writing.length) { setTaskIdx(taskIdx + 1); setCharIdx(0); setWriteDone(false); }
      else { setPhase('reward'); addEvent(`${epTag}-write`); }
      return;
    }
  }

  function finishNaming() {
    if (!stageName.trim()) return;
    setNamed(true);
    if (userId) {
      void saveStageName(userId, stageName.trim());
      void unlock(userId, pcId, 'photocard');
      void setCareer(userId, careerKeyForPct(careerPct), careerPct);
      void setEpisodeDone(userId, ep.no);
    } else {
      applyGuestProgress({ stageName: stageName.trim(), careerStage: careerKeyForPct(careerPct), careerPct, episode: ep.no, unlockId: pcId });
    }
    addEvent(`${epTag}-reward`);
    setPhase('reward');
  }

  const { pct, label } = progressFor();
  const cur = ep.dialogue[dlgIdx];
  const wtask = writing[taskIdx];

  // 인트로 — 4컷 컷씬 스토리보드를 먼저 보여준 뒤 레슨(dlg) 진입
  if (!introDone) {
    return (
      <div className="ep">
        <Hud epLabel={`EP.${ep.no} ${ep.title}`} careerLabel="Story" progress={0} />
        <StoryIntro no={ep.no} onDone={() => setIntroDone(true)} />
      </div>
    );
  }

  return (
    <div className="ep">
      <Hud epLabel={`EP.${ep.no} ${ep.title}`} careerLabel={label} progress={pct} />

      <div className="ep__body">
        <div className="scene" key={phase} style={{ display: 'flex', flexDirection: 'column', gap: 'var(--sp-4)' }}>
          {phase === 'dlg' && <DialogueScene member={member} line={cur} />}
          {phase === 'phrase' && <PhraseLesson phrases={phrases} grammar={grammar} />}
          {phase === 'manners' && manners[mannersIdx] && (
            <CombineGame question={manners[mannersIdx]} onAnswered={(c) => { setMannersOk(c); addEvent(`${epTag}-manners-` + mannersIdx, c); }} />
          )}
          {phase === 'write' && wtask && (
            <WritingPractice task={wtask} charIdx={charIdx} onCharDone={(isLast) => { setWriteDone(true); if (isLast) addEvent(`${epTag}-write-word`); }} />
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
              {named && celebrated && (
                <div className="card reward">
                  <div className="reward__h">데뷔 완료! 🎉</div>
                  <div className="reward__sub">Glowsis debuted — TOPIK I level 2 reached</div>
                </div>
              )}
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
        {phase === 'reward' && named && isFinale && !celebrated && (
          <button className="btn btn--primary" onClick={() => setCelebrated(true)}>데뷔 완료! 🎉</button>
        )}
      </div>
    </div>
  );
}
