#!/usr/bin/env python
"""
Glowsis 데뷔 — 매일 AI 문제 '은행' 생성기
TOPIK I/II 한국어 학습 문제를 LLM으로 생성해 Supabase game_daily_questions 에 저장.

영어 기반 학습자(캄보디아) 대상 → 모든 문항에 영어 병기 필드 포함:
  promptEn / passageEn / audioEn  +  explain(영어 2문장: 정답 근거 + 오답 함정)

사용:
  python scripts/daily_bank.py --days 30 --per-day 12
  python scripts/daily_bank.py --days 1 --start 2026-09-20
  python scripts/daily_bank.py --days 30 --per-day 12 --force   # 기존 날짜 덮어쓰기
  python scripts/daily_bank.py --backfill                       # 기존 문항에 영어 필드 추가
  python scripts/daily_bank.py --backfill --days 5              # 최근 5일만
"""
import json, os, re, sys, time, argparse, datetime, urllib.request, urllib.error

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))

MODEL = "deepseek/deepseek-v4-pro"     # flash 대신 pro (품질). reasoning 없이(=none) 호출해야 빠르고 잘림 없음
KINDS = ('vocab', 'read', 'listen')


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
    "Every learner reads English, so every Korean text you produce must be paired with a faithful, "
    "natural English translation. You produce accurate, level-appropriate TOPIK questions. "
    "Output ONLY valid JSON."
)

SCHEMA_HINT = """Return a JSON array of question objects. Each object:
{
  "id": "short unique slug",
  "kind": "vocab" | "read" | "listen",
  "level": "TOPIK I" | "TOPIK II",
  "prompt": "the question in Korean (instruction + question)",
  "promptEn": "English translation of prompt, including the instruction",
  "passage": "short Korean passage (only for read/listen; omit for vocab)",
  "passageEn": "English translation of passage (only when passage exists)",
  "audio": "Korean script to be spoken (only for listen; omit otherwise; write (남자)/(여자) speaker tags)",
  "audioEn": "English translation of the audio script (only when audio exists)",
  "opts": ["4 options, Korean"],
  "answer": 0-3,
  "explain": "TWO sentences in simple English: (1) why the correct answer is right, quoting the key Korean word/phrase, (2) why the other options do not fit"
}
Rules: exactly 4 options; answer is the 0-based index of the correct option; no duplicate options;
Korean only inside prompt/passage/audio/opts; keep vocabulary within the level.
promptEn is REQUIRED for every question. passageEn is REQUIRED whenever passage exists.
audioEn is REQUIRED whenever audio exists. explain must have exactly two sentences."""


def llm(prompt, tries=4, max_tokens=8000):
    body = json.dumps({
        "model": MODEL,
        "messages": [{"role": "system", "content": SYSTEM}, {"role": "user", "content": prompt}],
        "temperature": 0.7, "max_tokens": max_tokens,
        "reasoning": {"effort": "none"},     # ★ pro: 추론 끄기 (없으면 25s+ & 잘림)
    }).encode()
    for i in range(tries):
        try:
            req = urllib.request.Request(NOUS_URL.rstrip('/') + '/chat/completions', data=body, method='POST',
                headers={'Authorization': 'Bearer ' + NOUS_KEY, 'Content-Type': 'application/json',
                         'User-Agent': 'Mozilla/5.0'})
            r = json.load(urllib.request.urlopen(req, timeout=240))
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
    """영어 병기 필수 검증 — 불합격 문항은 저장하지 않는다."""
    if not (isinstance(q, dict) and q.get('prompt') and isinstance(q.get('opts'), list)
            and len(q['opts']) == 4 and isinstance(q.get('answer'), int) and 0 <= q['answer'] <= 3
            and q.get('kind') in KINDS and q.get('explain')):
        return False
    if len(set(q['opts'])) != 4:                       # 중복 보기 금지
        return False
    if not (q.get('promptEn') or '').strip():
        return False
    if q.get('passage') and not (q.get('passageEn') or '').strip():
        return False
    if q.get('kind') == 'listen' and not (q.get('audio') or '').strip():
        return False
    if q.get('audio') and not (q.get('audioEn') or '').strip():
        return False
    if len(q.get('explain') or '') < 60:               # 영어 2문장 강제(대충 1문장이면 탈락)
        return False
    return True


def gen_day(day, per_day):
    got, seen = [], set()
    batch = 4
    rounds = 0
    while len(got) < per_day and rounds < 8:
        n = min(batch, per_day - len(got))
        mix = ", ".join(KINDS[(len(got) + i) % 3] for i in range(n))
        p = (f"Write {n} NEW TOPIK questions for {day}. Kinds in this order: {mix}. "
             f"Vary vocabulary and grammar; do not repeat these stems: {sorted(seen)[:12]}.\n\n{SCHEMA_HINT}")
        out = extract_json(llm(p, max_tokens=8000)) or []
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


def all_rows():
    req = urllib.request.Request(URL + '/rest/v1/game_daily_questions?select=day,questions&order=day.asc',
        headers={'apikey': ANON, 'Authorization': 'Bearer ' + ANON})
    return json.load(urllib.request.urlopen(req, timeout=60))


def existing_days():
    req = urllib.request.Request(URL + '/rest/v1/game_daily_questions?select=day',
        headers={'apikey': ANON, 'Authorization': 'Bearer ' + ANON})
    try:
        return {r['day'] for r in json.load(urllib.request.urlopen(req, timeout=30))}
    except Exception:
        return set()


# ── 백필: 기존 문항에 영어 병기 필드 추가 + explain 2문장 강화 (한국어/정답은 절대 불변) ──
BACKFILL_HINT = """You are given an array of existing TOPIK questions (Korean). For EACH question, return the
SAME object with the SAME keys and SAME values for: id, kind, level, prompt, passage, audio, opts, answer.
DO NOT change prompt, opts, answer, passage or audio — they are fixed.
ADD (or replace) only these English fields:
  "promptEn": faithful, natural English translation of prompt (including the instruction),
  "passageEn": English translation of passage (only if the question has a passage),
  "audioEn": English translation of audio (only if the question has audio),
  "explain": rewrite as TWO sentences in simple English — (1) why the correct option is right, quoting the
             key Korean word/phrase, (2) why the other options do not fit.
Output ONLY the JSON array, same length, same order."""


def backfill_questions(qs):
    """4문항씩 나눠 영어 필드 추가. 실패분은 원문 유지."""
    out = []
    for i in range(0, len(qs), 4):
        chunk = qs[i:i + 4]
        p = BACKFILL_HINT + "\n\nInput array:\n" + json.dumps(chunk, ensure_ascii=False)
        res = extract_json(llm(p, max_tokens=8000)) or []
        by_id = {r.get('id'): r for r in res if isinstance(r, dict)}
        for q in chunk:
            r = by_id.get(q.get('id'))
            if r and (r.get('promptEn') or '').strip() and r.get('opts') == q.get('opts') and r.get('answer') == q.get('answer'):
                merged = dict(q)
                merged['promptEn'] = r['promptEn']
                if q.get('passage'):
                    merged['passageEn'] = (r.get('passageEn') or '').strip() or None
                if q.get('audio'):
                    merged['audioEn'] = (r.get('audioEn') or '').strip() or None
                if len(r.get('explain') or '') >= 60:
                    merged['explain'] = r['explain']
                merged = {k: v for k, v in merged.items() if v is not None}
                out.append(merged)
                continue
            out.append(q)     # 실패 → 원문 유지 (기존 앱은 영어 필드 없어도 동작)
        time.sleep(0.4)
    return out


def run_expand(per_day, days_limit=None):
    """기존 날짜를 per_day 문항까지 채운다(기존 문항 보존 + 부족분만 생성해 뒤에 추가)."""
    rows = all_rows()
    if days_limit:
        rows = rows[-days_limit:]
    filled, skipped = 0, 0
    for r in rows:
        day = r['day']; qs = list(r['questions'])
        need = per_day - len(qs)
        if need <= 0:
            skipped += 1; continue
        seen = {q['prompt'] for q in qs}
        add, rounds = [], 0
        while len(add) < need and rounds < 4:
            mix = ", ".join(KINDS[(len(qs) + len(add) + i) % 3] for i in range(min(4, need - len(add))))
            p = (f"Write {min(4, need - len(add))} NEW TOPIK questions for {day}. Kinds in this order: {mix}. "
                 f"They must differ from these existing stems: {sorted(seen)[:16]}.\n\n{SCHEMA_HINT}")
            out = extract_json(llm(p, max_tokens=8000)) or []
            for q in out:
                if valid(q) and q['prompt'] not in seen:
                    seen.add(q['prompt']); add.append(q)
            rounds += 1
            time.sleep(0.5)
        if not add:
            print(f"  {day}: +0 (실패, 유지)"); continue
        write_day(day, qs + add)
        filled += 1
        print(f"  {day}: {len(qs)} → {len(qs) + len(add)} 문항 ✓")
        time.sleep(0.8)
    print(f"\nexpand done. filled={filled} skipped(already full)={skipped}")


def needs_english(q):
    """영어 병기/해설이 아직 부족한 문항인가 (백필 대상 판정)"""
    if not (q.get('promptEn') or '').strip():
        return True
    if q.get('passage') and not (q.get('passageEn') or '').strip():
        return True
    if q.get('audio') and not (q.get('audioEn') or '').strip():
        return True
    if len(q.get('explain') or '') < 60:
        return True
    return False


def run_backfill(days_limit=None):
    rows = all_rows()
    if days_limit:
        rows = rows[-days_limit:]
    done, skipped, failed = 0, 0, 0
    for r in rows:
        day = r['day']; qs = r['questions']
        todo = [q for q in qs if needs_english(q)]
        if not todo:
            skipped += 1; continue
        fixed = backfill_questions(todo)
        fix_by_id = {q.get('id'): q for q in fixed}
        new = [fix_by_id.get(q.get('id'), q) for q in qs]
        ok = sum(1 for a, b in zip(qs, new) if (b.get('promptEn') or '').strip())
        left = sum(1 for b in new if needs_english(b))
        # 한국어/정답 불변 검증
        for a, b in zip(qs, new):
            assert a['opts'] == b['opts'] and a['answer'] == b['answer'] and a['prompt'] == b['prompt'], 'MUTATION!'
        write_day(day, new)
        done += 1
        print(f"  {day}: {ok}/{len(qs)} 문항 영어 ✓ (대상 {len(todo)}, 남은 미비 {left})")
        time.sleep(0.8)
    print(f"\nbackfill done. updated={done} skipped(already)={skipped}")


def main():
    global URL, ANON, TOKEN, NOUS_URL, NOUS_KEY
    URL, ANON, TOKEN, NOUS_URL, NOUS_KEY = cfg()
    ap = argparse.ArgumentParser()
    ap.add_argument('--days', type=int, default=35)
    ap.add_argument('--per-day', type=int, default=12)
    ap.add_argument('--start', default=datetime.date.today().isoformat())
    ap.add_argument('--force', action='store_true')
    ap.add_argument('--backfill', action='store_true', help='기존 문항에 영어 병기 필드 추가')
    ap.add_argument('--expand', action='store_true', help='기존 날짜를 --per-day 문항까지 채우기')
    a = ap.parse_args()

    if a.backfill:
        run_backfill(a.days if a.days != 35 else None)
        return

    if a.expand:
        run_expand(a.per_day, a.days if a.days != 35 else None)
        return

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
