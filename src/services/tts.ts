import { SUPABASE_URL, SUPABASE_ANON_KEY } from '../config';

const FN = `${SUPABASE_URL}/functions/v1/tts`;
const urlCache = new Map<string, string>();

export interface SpeakOpts { voice?: string; speed?: number }

/** 브라우저 내장 TTS 폴백 (CLOVA 미설정/실패 시) */
function webSpeak(text: string, lang = 'ko-KR', rate = 0.92) {
  try {
    const u = new SpeechSynthesisUtterance(text);
    u.lang = lang; u.rate = rate;
    speechSynthesis.speak(u);
  } catch { /* noop */ }
}

/**
 * CLOVA TTS로 발음 재생 (엣지 함수 프록시 + 오디오 캐시).
 * - 서버 캐시(Storage) + 클라이언트 메모리 캐시로 재호출 비용 최소화
 * - 실패하면 브라우저 TTS로 자동 폴백 (게임이 멈추지 않음)
 */
export async function speak(text: string, opts: SpeakOpts = {}): Promise<void> {
  const t = (text ?? '').trim();
  if (!t) return;
  const voice = opts.voice ?? 'nara';
  const speed = opts.speed ?? 0;
  const key = `${voice}|${speed}|${t}`;

  try {
    let url = urlCache.get(key);
    if (!url) {
      const r = await fetch(FN, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', apikey: SUPABASE_ANON_KEY, Authorization: `Bearer ${SUPABASE_ANON_KEY}` },
        body: JSON.stringify({ text: t, voice, speed }),
      });
      if (r.ok) {
        const j = (await r.json()) as { url?: string };
        if (j.url) { url = j.url; urlCache.set(key, url); }
      }
    }
    if (url) {
      const a = new Audio(url);
      await a.play();
      return;
    }
  } catch { /* fallthrough to web speech */ }

  webSpeak(t, 'ko-KR', speed ? 0.9 : 0.92);
}

/** 듣기 문제 오디오(긴 문장) — 문장을 그대로 재생 */
export async function speakScript(script: string): Promise<void> {
  await speak(script.replace(/\([^)]*\)/g, ' ').replace(/\s+/g, ' ').trim());
}
