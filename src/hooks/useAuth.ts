import { useEffect, useState } from 'react';
import { getSession, onAuthChange } from '../services/auth';

/** Supabase 세션 구독 훅 */
export function useAuth() {
  const [userId, setUserId] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let alive = true;
    getSession().then((s) => { if (alive) { setUserId(s?.user?.id ?? null); setLoading(false); } });
    const unsub = onAuthChange((id) => { if (alive) { setUserId(id); setLoading(false); } });
    return () => { alive = false; unsub(); };
  }, []);

  return { userId, loading };
}
