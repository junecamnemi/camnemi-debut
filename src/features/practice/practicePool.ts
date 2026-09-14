import { PRACTICE, type PracticeQ, type PracticeKind } from '../../content/practice';

/** 오늘의 문제 목표: 읽기 10 + 듣기 10 = 20문항 */
export const DAILY_TARGETS: Record<'read' | 'listen', number> = { read: 10, listen: 10 };

/** 일일 문제 로컬 누적 저장 키 — 오늘 생성분이 read/listen 풀에 계속 쌓이도록 */
const DAILY_POOL_KEY = 'camnemi_debut_daily_pool';

function isPracticeQ(x: unknown): x is PracticeQ {
  const q = x as PracticeQ;
  return !!q && typeof q === 'object'
    && typeof q.id === 'string'
    && (q.kind === 'read' || q.kind === 'listen' || q.kind === 'vocab')
    && typeof q.prompt === 'string'
    && Array.isArray(q.opts) && q.opts.length === 4
    && typeof q.answer === 'number' && q.answer >= 0 && q.answer <= 3
    && typeof q.explain === 'string';
}

/** id 기준 중복 제거 — 먼저 나온 문항 우선 (동일 id 재생성 시 중복 방지) */
export function dedupeById(qs: PracticeQ[]): PracticeQ[] {
  const seen = new Set<string>();
  const out: PracticeQ[] = [];
  for (const q of qs) {
    if (!q?.id || seen.has(q.id)) continue;
    seen.add(q.id);
    out.push(q);
  }
  return out;
}

/** 문자열 시드 → 0..1 결정적 값 (FNV-1a) — 같은 날엔 항상 같은 문제 */
function hashSeed(seed: string): number {
  let h = 2166136261;
  for (let i = 0; i < seed.length; i++) {
    h ^= seed.charCodeAt(i);
    h = Math.imul(h, 16777619);
  }
  return (h >>> 0) / 4294967295;
}

/** 결정적 샘플 — day 시드로 매일 다른 n문항 (부족하면 전부) */
export function seededSample(qs: PracticeQ[], n: number, seed: string): PracticeQ[] {
  if (qs.length <= n) return [...qs];
  const off = Math.floor(hashSeed(seed) * qs.length);
  const out: PracticeQ[] = [];
  for (let i = 0; i < n; i++) out.push(qs[(off + i) % qs.length]);
  return out;
}

/** Supabase 일일 문항(raw)을 안전하게 정규화 — 불완전/손상 문항 제거, level 기본값 채움 */
export function normalizeDaily(raw: unknown[]): PracticeQ[] {
  return raw.filter(isPracticeQ).map((q) => ({ ...q, level: q.level || 'TOPIK I' }));
}

/**
 * 오늘의 문제 20문항 = 읽기 10 + 듣기 10.
 * Supabase 문항 우선, 부족분은 PRACTICE 읽기/듣기 풀에서 결정적으로 샘플 보충.
 */
export function buildDailyQuestions(day: string, supabaseQs: unknown[]): PracticeQ[] {
  const fromDb = normalizeDaily(supabaseQs);
  const dbRead = fromDb.filter((q) => q.kind === 'read');
  const dbListen = fromDb.filter((q) => q.kind === 'listen');
  const staticRead = PRACTICE.filter((q) => q.kind === 'read');
  const staticListen = PRACTICE.filter((q) => q.kind === 'listen');
  const read = dedupeById([...dbRead, ...seededSample(staticRead, DAILY_TARGETS.read, 'read:' + day)])
    .slice(0, DAILY_TARGETS.read);
  const listen = dedupeById([...dbListen, ...seededSample(staticListen, DAILY_TARGETS.listen, 'listen:' + day)])
    .slice(0, DAILY_TARGETS.listen);
  return [...read, ...listen];
}

/** 정적 PRACTICE id 집합 — 이미 풀에 있는 문항은 누적하지 않는다 */
const STATIC_IDS = new Set(PRACTICE.map((q) => q.id));

/**
 * 오늘 생성된 일일 문항을 로컬 풀에 누적(스태킹)한다.
 * 정적 문항과 겹치지 않는 "새" 문항만 쌓고, id 기준 중복은 제거 → 같은 세션에서 무한 증가 없음.
 */
export function accumulateDailyPool(todayQs: PracticeQ[]): PracticeQ[] {
  let acc: PracticeQ[] = [];
  try {
    const raw = JSON.parse(localStorage.getItem(DAILY_POOL_KEY) || '[]') as unknown;
    if (Array.isArray(raw)) acc = raw.filter(isPracticeQ);
  } catch { acc = []; }
  const fresh = todayQs.filter((q) => q.id && !STATIC_IDS.has(q.id));
  const merged = dedupeById([...acc, ...fresh]);
  try { localStorage.setItem(DAILY_POOL_KEY, JSON.stringify(merged)); } catch { /* 스토리지 거부/가득참 무시 */ }
  return merged;
}

/**
 * read/listen/vocab 풀 = 정적 문항 + 누적 일일 문항(해당 kind), id 중복 제거.
 * 일일 문항이 매일 쌓이므로 풀이 풀은 시간이 지나며 커진다(100을 향해/넘어서).
 */
export function poolFor(kind: PracticeKind, accumulatedDaily: PracticeQ[]): PracticeQ[] {
  const staticQs = PRACTICE.filter((q) => q.kind === kind);
  const dailyQs = accumulatedDaily.filter((q) => q.kind === kind);
  return dedupeById([...staticQs, ...dailyQs]);
}
