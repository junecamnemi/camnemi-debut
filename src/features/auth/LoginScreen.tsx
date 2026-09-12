import { useState } from 'react';
import { sendMagicLink, signInWithProvider, type OAuthProvider } from '../../services/auth';

/** 로그인 — Supabase 매직링크(패스워드리스) + Google + Facebook. 일반 id/pw 없음. */
export function LoginScreen({ onGuest }: { onGuest?: () => void }) {
  const [email, setEmail] = useState('');
  const [sent, setSent] = useState(false);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const valid = /^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email.trim());

  async function sendLink() {
    setBusy(true); setError(null);
    const res = await sendMagicLink(email.trim());
    setBusy(false);
    if (res.error) setError(res.error); else setSent(true);
  }

  async function oauth(provider: OAuthProvider) {
    setBusy(true); setError(null);
    const res = await signInWithProvider(provider);
    setBusy(false);
    if (res.error) setError(res.error);
    // 성공 시 브라우저가 provider 로그인으로 리다이렉트됩니다
  }

  return (
    <div className="login">
      <video className="login__bg" src="assets/hero/stage_lo.mp4" poster="assets/hero/story.webp"
             autoPlay loop muted playsInline />
      <div className="login__ov" />

      <div className="login__in">
        <div className="login__brand">GLOWSIS</div>
        <div className="login__tag">데뷔 프로젝트</div>
        <p className="login__sub">한국어를 배우며 나의 아이돌을 데뷔시키세요</p>

        <div className="login__card">
          {!sent ? (
            <>
              <label className="login__label">이메일로 시작하기</label>
              <input
                className="login__in-field"
                type="email"
                inputMode="email"
                placeholder="you@example.com"
                value={email}
                disabled={busy}
                onChange={(e) => setEmail(e.target.value)}
                onKeyDown={(e) => { if (e.key === 'Enter' && valid) sendLink(); }}
              />
              <button className="btn btn--primary login__btn" disabled={!valid || busy} onClick={sendLink}>
                {busy ? '보내는 중…' : '매직링크 받기'}
              </button>
              <p className="login__note">비밀번호 없이 이메일 링크로 로그인해요</p>
              {error && <p className="login__err">{error}</p>}

              <div className="login__or"><span>또는</span></div>

              <div className="login__socials">
                <button className="sbtn" disabled={busy} onClick={() => oauth('google')}>
                  <span className="sbtn__ic g">G</span> Google로 계속
                </button>
                <button className="sbtn" disabled={busy} onClick={() => oauth('facebook')}>
                  <span className="sbtn__ic f">f</span> Facebook으로 계속
                </button>
              </div>
            </>
          ) : (
            <div className="login__sent">
              <div className="login__sent-ic">✉️</div>
              <div className="login__sent-t">메일을 보냈어요</div>
              <p className="login__sent-d"><b>{email}</b> 로 로그인 링크를 보냈습니다.<br />메일함을 확인해주세요.</p>
              <button className="login__link" onClick={() => setSent(false)}>다른 이메일 사용</button>
            </div>
          )}
        </div>

        <p className="login__foot">계속 진행하면 이용약관 및 개인정보 처리방침에 동의하게 됩니다.</p>
        {onGuest && (
          <button className="login__guest" onClick={onGuest}>로그인 없이 둘러보기 →</button>
        )}
      </div>
    </div>
  );
}
