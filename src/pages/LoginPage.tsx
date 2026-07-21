import { useState, type FormEvent } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { login, fetchProfile } from '../services/auth';
import { auth } from '../lib/firebase';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [busy, setBusy] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const from = (location.state as { from?: string } | null)?.from;

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setError('');
    setBusy(true);
    try {
      await login(email.trim(), password);
      const uid = auth.currentUser?.uid;
      const profile = uid ? await fetchProfile(uid) : null;
      const target = from ?? (profile?.role === 'admin' ? '/admin' : '/portal');
      navigate(target, { replace: true });
    } catch (err) {
      setError(mapAuthError(err));
      setBusy(false);
    }
  }

  return (
    <div className="auth-shell">
      <aside className="auth-aside">
        <div className="brand-mark">NEXO<sup style={{ fontSize: '0.4em' }}>®</sup></div>
        <div>
          <h2>Conectamos talento con el futuro de tu empresa.</h2>
          <p>Ingresa para gestionar tus documentos, postularte a vacantes y seguir tu proceso.</p>
        </div>
        <span style={{ fontSize: 13, color: 'oklch(0.7 0.02 80)' }}>Consultoría en Recursos Humanos · Colombia</span>
      </aside>

      <main className="auth-main">
        <div className="auth-card">
          <Link to="/" className="auth-back">← Volver al inicio</Link>
          <h1>Iniciar sesión</h1>
          <p className="sub">Bienvenido de nuevo a NEXO SAS.</p>

          {error && <div className="alert alert-error">{error}</div>}

          <form onSubmit={handleSubmit}>
            <div className="field">
              <label htmlFor="email">Correo electrónico</label>
              <input id="email" type="email" autoComplete="email" required
                value={email} onChange={(e) => setEmail(e.target.value)} placeholder="tucorreo@ejemplo.com" />
            </div>
            <div className="field">
              <label htmlFor="password">Contraseña</label>
              <input id="password" type="password" autoComplete="current-password" required
                value={password} onChange={(e) => setPassword(e.target.value)} placeholder="••••••••" />
            </div>
            <button type="submit" className="btn btn-primary btn-block" disabled={busy}>
              {busy ? 'Ingresando…' : 'Ingresar'}
            </button>
          </form>

          <p className="auth-switch">
            ¿No tienes cuenta? <Link to="/registro">Regístrate como candidato</Link>
          </p>
        </div>
      </main>
    </div>
  );
}

function mapAuthError(err: unknown): string {
  const code = (err as { code?: string })?.code ?? '';
  if (code.includes('invalid-credential') || code.includes('wrong-password') || code.includes('user-not-found'))
    return 'Correo o contraseña incorrectos.';
  if (code.includes('too-many-requests')) return 'Demasiados intentos. Espera unos minutos e inténtalo de nuevo.';
  if (code.includes('invalid-email')) return 'El correo no tiene un formato válido.';
  return 'No se pudo iniciar sesión. Verifica tus datos e inténtalo de nuevo.';
}
