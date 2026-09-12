import { useState } from 'react';
import { sendMagicLink, signInWithProvider, type OAuthProvider } from '../../services/auth';
import { useI18n } from '../../i18n';

/** Sign in — Supabase magic link (passwordless) + Google + Facebook */
export function LoginScreen({ onGuest }: { onGuest?: () => void }) {
  const { t } = useI18n();
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
  }

  return (
    <div className="login">
      <video className="login__bg" src="assets/login/login_concert.mp4" poster="assets/login/login_concert.jpg"
             autoPlay loop muted playsInline />
      <div className="login__ov" />

      <div className="login__in">
        <div className="login__brand">GLOWSIS</div>
        <div className="login__tag">Debut Project</div>
        <p className="login__sub">Learn Korean. Debut your idol.</p>

        <div className="login__card">
          {!sent ? (
            <>
              <label className="login__label">{t('auth_start')}</label>
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
                {busy ? t('auth_sending') : t('auth_send')}
              </button>
              <p className="login__note">{t('auth_note')}</p>
              {error && <p className="login__err">{error}</p>}

              <div className="login__or"><span>{t('auth_or')}</span></div>

              <div className="login__socials">
                <button className="sbtn" disabled={busy} onClick={() => oauth('google')}>
                  <span className="sbtn__ic g">G</span> {t('auth_google')}
                </button>
                <button className="sbtn" disabled={busy} onClick={() => oauth('facebook')}>
                  <span className="sbtn__ic f">f</span> {t('auth_facebook')}
                </button>
              </div>
            </>
          ) : (
            <div className="login__sent">
              <div className="login__sent-ic">✉️</div>
              <div className="login__sent-t">{t('auth_sent_t')}</div>
              <p className="login__sent-d">{t('auth_sent_d')(email)}</p>
              <button className="login__link" onClick={() => setSent(false)}>{t('auth_other')}</button>
            </div>
          )}
        </div>

        <p className="login__foot">{t('auth_foot')}</p>
        {onGuest && <button className="login__guest" onClick={onGuest}>{t('auth_guest')}</button>}
      </div>
    </div>
  );
}
