import { supabase } from './supabase';

export type OAuthProvider = 'google' | 'facebook';

/** 이메일 매직링크 (패스워드리스) 전송 */
export async function sendMagicLink(email: string): Promise<{ error?: string }> {
  const redirectTo = window.location.origin + window.location.pathname;
  const { error } = await supabase.auth.signInWithOtp({
    email,
    options: { emailRedirectTo: redirectTo, shouldCreateUser: true },
  });
  return error ? { error: error.message } : {};
}

/** Google / Facebook OAuth */
export async function signInWithProvider(provider: OAuthProvider): Promise<{ error?: string }> {
  const redirectTo = window.location.origin + window.location.pathname;
  const { error } = await supabase.auth.signInWithOAuth({
    provider,
    options: { redirectTo },
  });
  return error ? { error: error.message } : {};
}

export async function signOut() {
  await supabase.auth.signOut();
}

export async function getSession() {
  const { data } = await supabase.auth.getSession();
  return data.session;
}

export function onAuthChange(cb: (userId: string | null) => void) {
  const { data } = supabase.auth.onAuthStateChange((_event, session) => {
    cb(session?.user?.id ?? null);
  });
  return () => data.subscription.unsubscribe();
}
