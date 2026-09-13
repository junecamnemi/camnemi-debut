#!/usr/bin/env python
"""
Glowsis 데뷔 — 매일 AI 문제 '은행' 생성기
TOPIK I/II 한국어 학습 문제를 LLM으로 생성해 Supabase game_daily_questions 에 저장.

사용:
  python scripts/daily_bank.py --days 30 --per-day 8
  python scripts/daily_bank.py --days 1 --start 2026-09-14
  python scripts/daily_bank.py --days 30 --force     # 기존 날짜 덮어쓰기
"""
import json, os, re, sys, time, argparse, datetime, urllib.request, urllib.error

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))


def _read(path):
    return open(path, encoding='utf-8', errors='ignore').read()


def cfg():
    c = _read(os.path.join(ROOT, 'src', 'config.ts'))
    url = re.search(r'SUPABASE_URL\s*=\s*[\'"]([^\'"]+)', c).group(1)
    anon = re.search(r'SUPABASE_ANON_KEY\s*=\s*[\'"]([^\'"]+)', c).group(1)
    env = _read(os.path.expanduser('~/AppData/Local/hermes/.env'))
    tok = re.search(r'GAME_BANK_TOKEN=(\S+)', env).group(1)
    auth = json.load(open(os.path.expanduser('~/AppData/Local/hermes/auth.json'), encoding='utf-8'))
    n = auth['providers']['nous']
    return url, anon, tok, n.get('inference_base_url') or n.get('base_url'), n.get('agent_key') or n.get('api_key')


URL, ANON, TOKEN, NOUS_URL, NOUS_KEY = None, None, None, None, None

SYSTEM = (
    "You are a Korean-language curriculum writer for a TOPIK study app used by Cambodian learners. "
    "You produce accurate, level-appropriate TOPIK questions. Output ONLY valid JSON."
)

SCHEMA_HINT = """Return a JSON array of question objects. Each object:
{
  "id": "short unique slug",
  "kind": "vocab" | "read" | "listen",
  "level": "TOPIK I" | "TOPIK II",
  "prompt": "the question in Korean",
  "passage": "short Korean passage (only for read/listen; omit for vocab)",
  "audio": "Korean script to be spoken (only for listen; omit otherwise)",
  "opts": ["4 options, Korean"],
  "answer": 0-3,
  "explain": "one short explanation in simple English"
}
Rules: exactly 4 options; answer is the 0-based index of the correct option; no duplicate options; "
Korean only inside prompt/passage/audio/opts; keep vocabulary within the level."""


def llm(prompt, tries=4):
    body = json.dumps({
        "model": "deepseek/deepseek-v4-flash-0731",
        "messages": [{"role": "system", "content": SYSTEM}, {"role": "user", "content": prompt}],
        "temperature": 0.8, "max_tokens": 8000,
    }).encode()
    for i in range(tries):
        try:
            req = urllib.request.Request(NOUS_URL.rstrip('/') + '/chat/completions', data=body, method='POST',
                headers={'Authorization': 'Bearer ' + NOUS_KEY, 'Content-Type': 'application/json',
                         'User-Agent': 'Mozilla/5.0'})
            r = json.load(urllib.request.urlopen(req, timeout=180))
            return r['choices'][0]['message']['content']
        except Exception as e:
            print(f"  llm retry {i+1}: {e}")
            time.sleep(3 + i * 3)
    return None


def extract_json(txt):
    if not txt:
        return None
    m = re.search(r'\[[\s\S]*\]', txt)
    if not m:
        return None
    try:
        return json.loads(m.group(0))
    except Exception:
        return None


def valid(q):
    return (isinstance(q, dict) and q.get('prompt') and isinstance(q.get('opts'), list)
            and len(q['opts']) == 4 and isinstance(q.get('answer'), int) and 0 <= q['answer'] <= 3
            and q.get('kind') in ('vocab', 'read', 'listen') and q.get('explain'))


def gen_day(day, per_day):
    kinds = ['vocab', 'read', 'listen']
    got, seen = [], set()
    batch = 4
    rounds = 0
    while len(got) < per_day and rounds < 6:
        n = min(batch, per_day - len(got))
        mix = ", ".join(kinds[(len(got) + i) % 3] for i in range(n))
        p = (f"Write {n} NEW TOPIK questions for {day}. Kinds in this order: {mix}. "
             f"Vary vocabulary and grammar; do not repeat these stems: {sorted(seen)[:12]}.\n\n{SCHEMA_HINT}")
        out = extract_json(llm(p)) or []
        for q in out:
            if valid(q) and q['prompt'] not in seen:
                seen.add(q['prompt']); got.append(q)
        rounds += 1
        time.sleep(0.5)
    return got[:per_day]


def write_day(day, questions):
    body = json.dumps({"p_token": TOKEN, "p_day": day, "p_questions": questions}).encode()
    req = urllib.request.Request(URL + '/rest/v1/rpc/upsert_daily_bank', data=body, method='POST',
        headers={'apikey': ANON, 'Authorization': 'Bearer ' + ANON, 'Content-Type': 'application/json'})
    urllib.request.urlopen(req, timeout=30)


def existing_days():
    req = urllib.request.Request(URL + '/rest/v1/game_daily_questions?select=day',
        headers={'apikey': ANON, 'Authorization': 'Bearer ' + ANON})
    try:
        return {r['day'] for r in json.load(urllib.request.urlopen(req, timeout=30))}
    except Exception:
        return set()


def main():
    global URL, ANON, TOKEN, NOUS_URL, NOUS_KEY
    URL, ANON, TOKEN, NOUS_URL, NOUS_KEY = cfg()
    ap = argparse.ArgumentParser()
    ap.add_argument('--days', type=int, default=30)
    ap.add_argument('--per-day', type=int, default=8)
    ap.add_argument('--start', default=datetime.date.today().isoformat())
    ap.add_argument('--force', action='store_true')
    a = ap.parse_args()
    start = datetime.date.fromisoformat(a.start)
    have = set() if a.force else existing_days()
    made, skipped = 0, 0
    for i in range(a.days):
        day = (start + datetime.timedelta(days=i)).isoformat()
        if day in have:
            skipped += 1; continue
        qs = gen_day(day, a.per_day)
        if len(qs) < max(1, a.per_day // 2):
            print(f"  {day}: generated only {len(qs)} — skipped"); continue
        write_day(day, qs)
        made += 1
        print(f"  {day}: {len(qs)} questions ✓")
        time.sleep(1)
    print(f"\ndone. days written={made} skipped(existing)={skipped}")


if __name__ == '__main__':
    main()
