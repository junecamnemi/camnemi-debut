import { createContext, useCallback, useContext, useEffect, useState, type ReactNode } from 'react';
import { PLAYER } from '../content/player';
import { loadGameState, setStageName as saveStageNameRemote } from '../services/game';
import { loadLocalProgress, applyGuestProgress } from '../services/localProgress';

export interface PlayerProfile {
  /** 예명 — 미지정 시 null (기본값 폴백 없음; 화면에서 "예명 정하기" 프롬프트를 띄운다) */
  stageName: string | null;
  careerStage: string;
  careerPct: number;
}

interface PlayerProfileApi {
  profile: PlayerProfile | null;
  /** 예명 저장 (계정/게스트 동일 인터페이스) — 성공 시 공유 상태 즉시 갱신. */
  saveStageName: (name: string) => Promise<boolean>;
}

const PlayerProfileCtx = createContext<PlayerProfileApi | null>(null);

/**
 * 플레이어 프로필(예명·커리어) 공용 Provider — 계정(game_state) / 게스트(localStorage).
 *
 * Home·My 등 모든 화면이 이 하나의 컨텍스트를 구독하므로, 어느 화면에서든
 * 이름을 바꾸면 "즉시" 모든 구독자에 반영된다 (탭 재마운트/새로고침 불필요).
 * 예명 미지정 시 PLAYER.stageName 으로 폴백하지 않고 null 을 반환해
 * "기본값 새어나감(fallback leak)"을 막는다.
 *
 * @param userId     로그인 계정 id (게스트면 undefined)
 * @param refreshKey 외부에서 값이 바뀌었을 때 bump 하면 재조회 (게스트→계정 병합 등)
 */
export function PlayerProfileProvider({ userId, refreshKey = 0, children }: {
  userId?: string;
  refreshKey?: number;
  children: ReactNode;
}) {
  const [profile, setProfile] = useState<PlayerProfile | null>(null);

  useEffect(() => {
    let alive = true;
    (async () => {
      if (userId) {
        const st = await loadGameState(userId);
        if (!alive) return;
        setProfile({
          stageName: st?.stage_name ?? null,
          careerStage: st?.career_stage ?? PLAYER.careerKey,
          careerPct: st?.career_pct ?? PLAYER.careerPct,
        });
      } else {
        const lp = loadLocalProgress();
        if (!alive) return;
        setProfile({
          stageName: lp.stageName ?? null,
          careerStage: lp.careerStage ?? PLAYER.careerKey,
          careerPct: lp.careerPct,
        });
      }
    })();
    return () => { alive = false; };
  }, [userId, refreshKey]);

  const saveStageName = useCallback(async (name: string): Promise<boolean> => {
    const trimmed = name.trim();
    if (!trimmed) return false;
    if (userId) {
      const { error } = await saveStageNameRemote(userId, trimmed);
      if (error) {
        // 저장 실패 시 로컬 상태를 갱신하지 않아 계정/화면이 어긋나는 것을 막는다.
        console.warn('[usePlayerProfile] save stage name', error.message);
        return false;
      }
    } else {
      applyGuestProgress({ stageName: trimmed });
    }
    setProfile((prev) =>
      prev
        ? { ...prev, stageName: trimmed }
        : { stageName: trimmed, careerStage: PLAYER.careerKey, careerPct: PLAYER.careerPct },
    );
    return true;
  }, [userId]);

  return (
    <PlayerProfileCtx.Provider value={{ profile, saveStageName }}>
      {children}
    </PlayerProfileCtx.Provider>
  );
}

/** 플레이어 프로필 공용 훅 — 반드시 <PlayerProfileProvider> 하위에서 호출. */
export function usePlayerProfile(): PlayerProfileApi {
  const ctx = useContext(PlayerProfileCtx);
  if (!ctx) throw new Error('usePlayerProfile must be used within <PlayerProfileProvider>');
  return ctx;
}
