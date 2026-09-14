/**
 * 게스트(비로그인) 플레이어의 진행 로컬 미러.
 * 계정의 game_state / game_unlocks 와 같은 의미의 값만 localStorage 에 저장해
 * 새로고침 후에도 진행이 유지되고, 이후 로그인 시 계정으로 병합된다.
 */
export interface LocalProgress {
  stageName: string | null;
  careerStage: string | null;
  careerPct: number;
  furthestEpisode: number;
  unlocks: string[];
}

const KEY = 'camnemi_debut_progress';

const EMPTY: LocalProgress = {
  stageName: null,
  careerStage: null,
  careerPct: 0,
  furthestEpisode: 1,
  unlocks: [],
};

export function loadLocalProgress(): LocalProgress {
  try {
    const raw = localStorage.getItem(KEY);
    if (!raw) return { ...EMPTY };
    const p = JSON.parse(raw) as Partial<LocalProgress>;
    return {
      stageName: typeof p.stageName === 'string' ? p.stageName : null,
      careerStage: typeof p.careerStage === 'string' ? p.careerStage : null,
      careerPct: typeof p.careerPct === 'number' ? p.careerPct : 0,
      furthestEpisode: typeof p.furthestEpisode === 'number' && p.furthestEpisode >= 1 ? p.furthestEpisode : 1,
      unlocks: Array.isArray(p.unlocks) ? p.unlocks.filter((x): x is string => typeof x === 'string') : [],
    };
  } catch {
    return { ...EMPTY };
  }
}

export function saveLocalProgress(p: LocalProgress) {
  try { localStorage.setItem(KEY, JSON.stringify(p)); } catch { /* noop */ }
}

export function clearLocalProgress() {
  try { localStorage.removeItem(KEY); } catch { /* noop */ }
}

/**
 * 게스트 진행 병합 저장 — 계정 저장(setStageName/setCareer/unlock/setEpisodeDone)의 로컬 미러.
 * furthestEpisode 와 careerPct 는 최대값 유지, unlocks 는 중복 없이 누적.
 */
export function applyGuestProgress(patch: {
  stageName?: string;
  careerStage?: string;
  careerPct?: number;
  episode?: number;
  unlockId?: string;
}) {
  const p = loadLocalProgress();
  if (patch.stageName) p.stageName = patch.stageName;
  if (patch.careerStage) p.careerStage = patch.careerStage;
  if (typeof patch.careerPct === 'number') p.careerPct = Math.max(p.careerPct, patch.careerPct);
  if (typeof patch.episode === 'number') p.furthestEpisode = Math.max(p.furthestEpisode, patch.episode);
  if (patch.unlockId && !p.unlocks.includes(patch.unlockId)) p.unlocks.push(patch.unlockId);
  saveLocalProgress(p);
  return p;
}
