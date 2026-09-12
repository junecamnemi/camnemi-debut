import { useEffect, useState } from 'react';

/**
 * 하트 카운터 — 5초마다 1씩 증가.
 * 실제 서비스에서는 Supabase(game_state.hearts) + 서버 집계로 대체.
 */
export function useHearts(base: number, everyMs = 5000) {
  const [count, setCount] = useState(base);
  useEffect(() => {
    const id = window.setInterval(() => setCount((c) => c + 1), everyMs);
    return () => window.clearInterval(id);
  }, [everyMs]);
  return count;
}

/** 숫자 천단위 콤마 */
export function fmtNum(n: number) {
  return n.toLocaleString('en-US');
}
