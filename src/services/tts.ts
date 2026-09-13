import { SUPABASE_URL, SUPABASE_ANON_KEY } from '../config';

const FN = `${SUPABASE_URL}/functions/v1/tts`;
const urlCache = new Map<string, string>();

export interface SpeakOpts { voice?: string; speed?: number }

/** 재생 결과 — 'ok'=CLOVA 재생, 'fallback'=브라우저 TTS 폴백, 'error'=전부 실패 */
export type SpeakResult = 'ok' | 'fallback' | 'error';

/** 브라우저 내장 TTS 폴백 (CLOVA 미설정/실패 시) */
function webSpeak(text: string, lang = 'ko-KR', rate = 0.92): boolean {
  try {
    if (typeof window === 'undefined' || !('speechSynthesis' in window)) return false;
    const u = new SpeechSynthesisUtterance(text);
    u.lang = lang; u.rate = rate;
    window.speechSynthesis.speak(u);
    return true;
  } catch { return false; }
}

/** CLOVA TTS 음원 URL 요청 — 실패(HTTP 오류/네트워크) 시 1회 짧게 재시도 후 null */
async function fetchTtsUrl(text: string, voice: string, speed: number, key: string): Promise<string | null> {
  for (let attempt = 0; attempt < 2; attempt++) {
    try {
      const r = await fetch(FN, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', apikey: SUPABASE_ANON_KEY, Authorization: `Bearer ${SUPABASE_ANON_KEY}` },
        body: JSON.stringify({ text, voice, speed }),
      });
      if (r.ok) {
        const j = (await r.json()) as { url?: string };
        if (j.url) { urlCache.set(key, j.url); return j.url; }
        return null;
      }
      console.warn(`[tts] CLOVA TTS 요청 실패 — HTTP ${r.status} (시도 ${attempt + 1}/2)`);
    } catch (err) {
      console.warn(`[tts] CLOVA TTS 네트워크 오류 (시도 ${attempt + 1}/2):`, err);
    }
    if (attempt === 0) await new Promise((res) => setTimeout(res, 400));
  }
  return null;
}

/**
 * CLOVA TTS로 발음 재생 (엣지 함수 프록시 + 오디오 캐시).
 * - 서버 캐시(Storage) + 클라이언트 메모리 캐시로 재호출 비용 최소화
 * - 실패하면 브라우저 TTS로 자동 폴백 (게임이 멈추지 않음)
 * - 오류는 조용히 삼키지 않고 console.warn 로 남기며, 결과를 SpeakResult 로 반환
 */
export async function speak(text: string, opts: SpeakOpts = {}): Promise<SpeakResult> {
  const t = (text ?? '').trim();
  if (!t) return 'ok';
  const voice = opts.voice ?? 'nara';
  const speed = opts.speed ?? 0;
  const key = `${voice}|${speed}|${t}`;

  let url: string | null = urlCache.get(key) ?? null;
  if (!url) url = await fetchTtsUrl(t, voice, speed, key);

  if (url) {
    try {
      const a = new Audio(url);
      await a.play();
      return 'ok';
    } catch (err) {
      console.warn('[tts] CLOVA 오디오 재생 실패 — 브라우저 TTS로 폴백:', err);
    }
  }

  return webSpeak(t, 'ko-KR', speed ? 0.9 : 0.92) ? 'fallback' : 'error';
}

/** 듣기 문제 오디오(긴 문장) — 문장을 그대로 재생 */
export async function speakScript(script: string): Promise<SpeakResult> {
  return speak(script.replace(/\([^)]*\)/g, ' ').replace(/\s+/g, ' ').trim());
}
