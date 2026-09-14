import { useCallback, useEffect, useState } from 'react';
import { PLAYER } from '../content/player';
import { loadGameState, setStageName as saveStageNameRemote } from '../services/game';
import { loadLocalProgress, applyGuestProgress } from '../services/localProgress';

export interface PlayerProfile {
  stageName: string;
  careerStage: string;
  careerPct: number;
}

/**
 * 플레이어 프로필(예명·커리어) 로드/저장 공용 훅.
 * 계정: game_state (loadGameState / setStageName)
 * 게스트: localStorage (loadLocalProgress / applyGuestProgress)
 *
 * Home·My 등 여러 화면이 이 한 곳에서 읽어 "이름을 바꾸면 어디서나 반영"되게 한다.
 * (예명 미지정 시 PLAYER.stageName 기본값으로 폴백.)
 */
export function usePlayerProfile(userId?: string) {
  const [profile, setProfile] = useState<PlayerProfile | null>(null);

  useEffect(() => {
    let alive = true;
    (async () => {
      if (userId) {
        const st = await loadGameState(userId);
        if (!alive) return;
        setProfile({
          stageName: st?.stage_name ?? PLAYER.stageName,
          careerStage: st?.career_stage ?? PLAYER.careerKey,
          careerPct: st?.career_pct ?? PLAYER.careerPct,
        });
      } else {
        const lp = loadLocalProgress();
        if (!alive) return;
        setProfile({
          stageName: lp.stageName ?? PLAYER.stageName,
          careerStage: lp.careerStage ?? PLAYER.careerKey,
          careerPct: lp.careerPct,
        });
      }
    })();
    return () => { alive = false; };
  }, [userId]);

  /** 예명 저장 (계정/게스트 동일 인터페이스) — 성공 시 로컬 상태도 즉시 갱신. */
  const saveStageName = useCallback(async (name: string) => {
    const trimmed = name.trim();
    if (!trimmed) return;
    if (userId) {
      const { error } = await saveStageNameRemote(userId, trimmed);
      if (error) console.warn('[usePlayerProfile] save stage name', error.message);
    } else {
      applyGuestProgress({ stageName: trimmed });
    }
    setProfile((prev) =>
      prev
        ? { ...prev, stageName: trimmed }
        : { stageName: trimmed, careerStage: PLAYER.careerKey, careerPct: PLAYER.careerPct },
    );
  }, [userId]);

  return { profile, saveStageName };
}
