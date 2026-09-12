import { useState } from 'react';
import type { Episode, JamoStage } from '../../types/game';
import { setStageName as saveStageName, setSkill, unlock, logEvent, setCareer } from '../../services/game';
import { MEMBERS } from '../../content/members';
import { Hud } from '../../components/Hud';
import { DialogueScene } from './scenes/DialogueScene';
import { JamoLesson } from './scenes/JamoLesson';
import { FinalLesson } from './scenes/FinalLesson';
import { CombineGame } from './scenes/CombineGame';
import { WritingPractice } from './scenes/WritingPractice';
import { NamingScene } from './scenes/NamingScene';
import { RewardScene } from './scenes/RewardScene';
import './episode1.css';

type Phase = 'dlg' | 'jamo' | 'final' | 'combine' | 'write' | 'name' | 'reward';

/** 자모 단계 순서 */
const JAMO_ORDER: JamoStage[] = ['cons', 'vow', 'dcons', 'dvow'];

const JAMO_UI: Record<JamoStage, { title: string; en: string }> = {
  cons:  { title: '자음',   en: 'Consonants' },
  vow:   { title: '모음',   en: 'Vowels' },
  dcons: { title: '쌍자음', en: 'Double consonants' },
  dvow:  { title: '복합모음', en: 'Compound vowels' },
};

/** 진행률/커리어 라벨 */
function progressFor(phase: Phase, dlgIdx: number, dlgLen: number, jamoStage: JamoStage, combineIdx: number, combineLen: number, charIdx: number, wordLen: number) {
  const jamoBase = 30 + JAMO_ORDER.indexOf(jamoStage) * 5;   // 30,35,40,45
  switch (phase) {
    case 'dlg':     return { pct: 16 + Math.round((dlgIdx / dlgLen) * 8), label: '커리어 · 입문' };
    case 'jamo':    return { pct: jamoBase, label: '커리어 · 입문 → 연습생' };
    case 'final':   return { pct: 52, label: '커리어 · 한글 완성' };
    case 'combine': return { pct: 58 + Math.round((combineIdx / combineLen) * 12), label: '커리어 · 연습생 준비' };
    case 'write':   return { pct: 72 + Math.round((charIdx / wordLen) * 12), label: '커리어 · 한글 쓰기' };
    case 'name':    return { pct: 90, label: '커리어 · 예명 등록' };
    case 'reward':  return { pct: 100, label: '커리어 · 연습생 달성' };
  }
}

export function Episode1({ ep, userId }: { ep: Episode; userId?: string | null }) {
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

  const task = ep.writing[taskIdx];
  const { pct, label } = progressFor(
    phase, dlgIdx, ep.dialogue.length, jamoStage, combineIdx, ep.combine.length, charIdx, task.word.length,
  );

  const isLastDialogue = dlgIdx >= ep.dialogue.length - 1;
  const isLastCombine = combineIdx >= ep.combine.length - 1;
  const jamoIdx = JAMO_ORDER.indexOf(jamoStage);
  const jamoItems = (st: JamoStage) =>
    st === 'cons' ? ep.consonants : st === 'vow' ? ep.vowels : st === 'dcons' ? (ep.doubleCons ?? []) : (ep.complexVow ?? []);

  const canAdvance =
    phase === 'dlg' ? true
    : phase === 'jamo' ? true
    : phase === 'final' ? true
    : phase === 'combine' ? combineOk
    : phase === 'write' ? writeDone
    : phase === 'name' ? stageName.trim().length >= 2
    : false;

  const nextLabel =
    phase === 'dlg' ? (isLastDialogue ? '트레이닝 시작' : '다음')
    : phase === 'jamo' ? (jamoIdx < JAMO_ORDER.length - 1 ? `${JAMO_UI[JAMO_ORDER[jamoIdx + 1]].title} 배우기` : '받침 배우기')
    : phase === 'final' ? '조합 게임'
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
        void unlock(userId, 'pc0', 'photocard');
        void setCareer(userId, '연습생', 42);
        void logEvent(userId, 'episode', ep.id, true, { stageName: name });
      }
      setPhase('reward');
    }
  }

  const backVisible = phase === 'dlg' && dlgIdx > 0;
  function back() { if (phase === 'dlg' && dlgIdx > 0) setDlgIdx(dlgIdx - 1); }

  return (
    <div className="ep">
      <Hud epLabel={phase === 'reward' ? 'EP.1 클리어' : `EP.${ep.no} ${ep.title}`} careerLabel={label} progress={pct} />

      <div className="ep__body">
        <div className="scene" key={phase}
             style={{ display: 'flex', flexDirection: 'column', gap: 'var(--sp-4)', flex: 1 }}>
          {phase === 'dlg' && <DialogueScene member={member} line={ep.dialogue[dlgIdx]} />}
          {phase === 'jamo' && (
            <JamoLesson
              title={JAMO_UI[jamoStage].title}
              sub={`${JAMO_UI[jamoStage].en} · ${jamoItems(jamoStage).length}자`}
              items={jamoItems(jamoStage)}
            />
          )}
          {phase === 'final' && <FinalLesson finals={ep.finals ?? []} />}
          {phase === 'combine' && <CombineGame question={ep.combine[combineIdx]} onAnswered={setCombineOk} />}
          {phase === 'write' && <WritingPractice task={task} charIdx={charIdx} onCharDone={() => setWriteDone(true)} />}
          {phase === 'name' && <NamingScene member={member} value={stageName} onChange={setStageName} />}
          {phase === 'reward' && <RewardScene stageName={stageName.trim() || member.ko} rewards={ep.rewards} />}
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
