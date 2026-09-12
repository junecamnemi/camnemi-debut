import { createClient } from '@supabase/supabase-js';
import { SUPABASE_URL, SUPABASE_ANON_KEY } from '../config';

/** Supabase 클라이언트 (TOPIK 앱과 같은 프로젝트 공유) */
export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY, {
  auth: {
    persistSession: true,
    autoRefreshToken: true,
    detectSessionInUrl: true,
    // 매직링크/해시 토큰 처리 (Supabase 최신 권장)
    flowType: 'pkce',
  },
});
