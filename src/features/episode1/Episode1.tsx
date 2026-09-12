import { useState } from 'react';
import type { Episode } from '../../types/game';
import { MEMBERS } from '../../content/members';
import { Hud } from '../../components/Hud';
import { DialogueScene } from './scenes/DialogueScene';
import { JamoLesson } from './scenes/JamoLesson';
import { CombineGame } from './scenes/CombineGame';
import { WritingPractice } from './scenes/WritingPractice';
import { NamingScene } from './scenes/NamingScene';
import { RewardScene } from './scenes/RewardScene';
import './episode1.css';

type Phase = 'dlg' | 'jamo' | 'combine' | 'write' | 'name' | 'reward';

/** 진행률/커리어 라벨 매핑 */
function progressFor(phase: Phase, dlgIdx: number, dlgLen: number, jamoStage: 'cons' | 'vow', combineIdx: number, combineLen: number, charIdx: number, wordLen: number) {
  switch (phase) {
    case 'dlg':      return { pct: 18 + Math.round((dlgIdx / dlgLen) * 8), label: '커리어 · 입문' };
    case 'jamo':     return { pct: jamoStage === 'cons' ? 34 : 42, label: '커리어 · 입문 → 연습생' };
    case 'combine':  return { pct: 50 + Math.round((combineIdx / combineLen) * 14), label: '커리어 · 연습생 준비' };
    case 'write':    return { pct: 66 + Math.round((charIdx / wordLen) * 12), label: '커리어 · 한글 쓰기' };
    case 'name':     return { pct: 90, label: '커리어 · 예명 등록' };
    case 'reward':   return { pct: 100, label: '커리어 · 연습생 달성' };
  }
}

export function Episode1({ ep }: { ep: Episode }) {
  const member = MEMBERS[ep.member];

  const [phase, setPhase] = useState<Phase>('dlg');
  const [dlgIdx, setDlgIdx] = useState(0);
  const [jamoStage, setJamoStage] = useState<'cons' | 'vow'>('cons');
  const [combineIdx, setCombineIdx] = useState(0);
  const [combineOk, setCombineOk] = useState(false);
  const [taskIdx, setTaskIdx] = useState(0);
  const [charIdx, setCharIdx] = useState(0);
  const [writeDone, setWriteDone] = useState(false);
  const [stageName, setStageName] = useState('');

  const task = ep.writing[taskIdx];
  const { pct, label } = progressFor(
    phase, dlgIdx, ep.dialogue.length, jamoStage, combineIdx, ep.combine.length, charIdx, task.word.length,
  );

  // 다음 버튼 활성/라벨
  const isLastDialogue = dlgIdx >= ep.dialogue.length - 1;
  const isLastCombine = combineIdx >= ep.combine.length - 1;
  const canAdvance =
    phase === 'dlg' ? true
    : phase === 'jamo' ? true
    : phase === 'combine' ? combineOk
    : phase === 'write' ? writeDone
    : phase === 'name' ? stageName.trim().length >= 2
    : false;

  const nextLabel =
    phase === 'dlg' ? (isLastDialogue ? '트레이닝 시작' : '다음')
    : phase === 'jamo' ? (jamoStage === 'cons' ? '모음 배우기' : '조합 게임')
    : phase === 'combine' ? (isLastCombine ? '쓰기 연습' : '다음 문제')
    : phase === 'write' ? (writeDone ? (charIdx >= task.word.length - 1 ? '예명 짓기' : '다음 글자') : '글자를 다 쓴 뒤 확인')
    : phase === 'name' ? (stageName.trim().length >= 2 ? `‘${stageName.trim()}’(으)로 데뷔하기` : '이름을 입력하세요')
    : '다음 에피소드';

  function advance() {
    if (!canAdvance) return;
    if (phase === 'dlg') {
      if (!isLastDialogue) setDlgIdx(dlgIdx + 1);
      else { setJamoStage('cons'); setPhase('jamo'); }
    } else if (phase === 'jamo') {
      if (jamoStage === 'cons') setJamoStage('vow');
      else { setCombineIdx(0); setCombineOk(false); setPhase('combine'); }
    } else if (phase === 'combine') {
      if (!isLastCombine) { setCombineIdx(combineIdx + 1); setCombineOk(false); }
      else { setTaskIdx(0); setCharIdx(0); setWriteDone(false); setPhase('write'); }
    } else if (phase === 'write') {
      if (charIdx >= task.word.length - 1) setPhase('name');
      else { setCharIdx(charIdx + 1); setWriteDone(false); }
    } else if (phase === 'name') {
      setPhase('reward');
    }
  }

  const backVisible = phase === 'dlg' && dlgIdx > 0;
  function back() {
    if (phase === 'dlg' && dlgIdx > 0) setDlgIdx(dlgIdx - 1);
  }

  return (
    <div className="ep">
      <Hud epLabel={phase === 'reward' ? 'EP.1 클리어' : `EP.${ep.no} ${ep.title}`} careerLabel={label} progress={pct} />

      <div className="ep__body">
        <div className="scene" key={`${phase}-${dlgIdx}-${combineIdx}-${charIdx}-${taskIdx}`}
             style={{ display: 'flex', flexDirection: 'column', gap: 'var(--sp-4)', flex: 1 }}>
          {phase === 'dlg' && <DialogueScene member={member} line={ep.dialogue[dlgIdx]} />}
          {phase === 'jamo' && <JamoLesson stage={jamoStage} consonants={ep.consonants} vowels={ep.vowels} />}
          {phase === 'combine' && (
            <CombineGame
              question={ep.combine[combineIdx]}
              onAnswered={setCombineOk}
            />
          )}
          {phase === 'write' && (
            <WritingPractice
              task={task}
              charIdx={charIdx}
              onCharDone={() => setWriteDone(true)}
            />
          )}
          {phase === 'name' && (
            <NamingScene member={member} value={stageName} onChange={setStageName} />
          )}
          {phase === 'reward' && (
            <RewardScene stageName={stageName.trim() || member.ko} rewards={ep.rewards} />
          )}
        </div>
      </div>

      <div className="ctl">
        {backVisible && <button className="btn btn--ghost" onClick={back}>←</button>}
        <button className="btn btn--primary" onClick={advance} disabled={!canAdvance}>
          {nextLabel}
        </button>
      </div>
    </div>
  );
}
