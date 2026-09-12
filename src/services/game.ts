import { supabase } from './supabase';
import type { MemberId } from '../types/game';

export interface GameState {
  user_id: string;
  member_id: MemberId;
  stage_name: string | null;
  career_stage: string;
  career_pct: number;
  streak_days: number;
  study_days: number;
}

export interface SkillRow { skill_id: string; state: 'learning' | 'review' | 'mastered' }
export interface UnlockRow { item_id: string; kind: string }

/** 플레이어 게임 상태 로드 (없으면 생성) */
export async function loadGameState(userId: string): Promise<GameState | null> {
  const { data, error } = await supabase
    .from('game_state').select('*').eq('user_id', userId).maybeSingle();
  if (error) { console.warn('[game] load state', error.message); return null; }
  if (data) return data as GameState;
  // 최초 로그인 → 기본 상태 생성
  const { data: created, error: insErr } = await supabase
    .from('game_state').insert({ user_id: userId }).select('*').single();
  if (insErr) { console.warn('[game] create state', insErr.message); return null; }
  return created as GameState;
}

/** 예명 등록 (EP.1 마지막 단계) */
export async function setStageName(userId: string, stageName: string) {
  return supabase.from('game_state')
    .update({ stage_name: stageName, updated_at: new Date().toISOString() })
    .eq('user_id', userId);
}

/** 선택 멤버 저장 */
export async function setMember(userId: string, memberId: MemberId) {
  return supabase.from('game_state').update({ member_id: memberId }).eq('user_id', userId);
}

/** 커리어 진행 저장 */
export async function setCareer(userId: string, careerStage: string, careerPct: number) {
  return supabase.from('game_state')
    .update({ career_stage: careerStage, career_pct: careerPct, updated_at: new Date().toISOString() })
    .eq('user_id', userId);
}

/** 학습/게임 이벤트 기록 — "어느 메뉴에서 공부해도 같은 성장" 원장 */
export async function logEvent(userId: string, kind: string, ref?: string, correct?: boolean, payload: Record<string, unknown> = {}) {
  return supabase.from('game_events').insert({ user_id: userId, kind, ref, correct, payload });
}

/** 스킬 숙련도 upsert */
export async function setSkill(userId: string, skillId: string, state: SkillRow['state']) {
  return supabase.from('game_skill_mastery')
    .upsert({ user_id: userId, skill_id: skillId, state, updated_at: new Date().toISOString() },
            { onConflict: 'user_id,skill_id' });
}

/** 확정 해금 (포토카드·배경·의상 등) */
export async function unlock(userId: string, itemId: string, kind: string) {
  return supabase.from('game_unlocks')
    .upsert({ user_id: userId, item_id: itemId, kind }, { onConflict: 'user_id,item_id', ignoreDuplicates: true });
}

export async function loadSkills(userId: string): Promise<SkillRow[]> {
  const { data } = await supabase.from('game_skill_mastery').select('skill_id,state').eq('user_id', userId);
  return (data as SkillRow[]) || [];
}

export async function loadUnlocks(userId: string): Promise<UnlockRow[]> {
  const { data } = await supabase.from('game_unlocks').select('item_id,kind').eq('user_id', userId);
  return (data as UnlockRow[]) || [];
}

/** 오늘의 AI 문제 (공용) */
export async function loadDailyQuestions(day: string) {
  const { data } = await supabase.from('game_daily_questions').select('questions').eq('day', day).maybeSingle();
  return (data?.questions as unknown[]) || [];
}
