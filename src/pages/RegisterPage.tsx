import { useState, type FormEvent } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { register } from '../services/auth';

export default function RegisterPage() {
  const [form, setForm] = useState({ displayName: '', email: '', phone: '', password: '', confirm: '' });
  const [error, setError] = useState('');
  const [busy, setBusy] = useState(false);
  const navigate = useNavigate();

  const update = (k: keyof typeof form) => (e: React.ChangeEvent<HTMLInputElement>) =>
    setForm((f) => ({ ...f, [k]: e.target.value }));

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setError('');
    if (form.password.length < 6) return setError('La contraseña debe tener al menos 6 caracteres.');
    if (form.password !== form.confirm) return setError('Las contraseñas no coinciden.');

    setBusy(true);
    try {
      await register({
        displayName: form.displayName.trim(),
        email: form.email.trim(),
        phone: form.phone.trim(),
        password: form.password,
      });
      navigate('/portal', { replace: true });
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
          <h2>Da el siguiente paso en tu carrera profesional.</h2>
          <p>Crea tu perfil, sube tu hoja de vida y postúlate a vacantes verificadas en toda Colombia.</p>
        </div>
        <span style={{ fontSize: 13, color: 'oklch(0.7 0.02 80)' }}>Consultoría en Recursos Humanos · Colombia</span>
      </aside>

      <main className="auth-main">
        <div className="auth-card">
          <Link to="/" className="auth-back">← Volver al inicio</Link>
          <h1>Crear cuenta</h1>
          <p className="sub">Regístrate como candidato en NEXO SAS.</p>

          {error && <div className="alert alert-error">{error}</div>}

          <form onSubmit={handleSubmit}>
            <div className="field">
              <label htmlFor="name">Nombre completo</label>
              <input id="name" type="text" required value={form.displayName}
                onChange={update('displayName')} placeholder="Nombre y apellidos" />
            </div>
            <div className="field">
              <label htmlFor="email">Correo electrónico</label>
              <input id="email" type="email" autoComplete="email" required value={form.email}
                onChange={update('email')} placeholder="tucorreo@ejemplo.com" />
            </div>
            <div className="field">
              <label htmlFor="phone">Teléfono (opcional)</label>
              <input id="phone" type="tel" value={form.phone} onChange={update('phone')} placeholder="300 000 0000" />
            </div>
            <div className="grid-2">
              <div className="field">
                <label htmlFor="password">Contraseña</label>
                <input id="password" type="password" autoComplete="new-password" required
                  value={form.password} onChange={update('password')} placeholder="Mínimo 6 caracteres" />
              </div>
              <div className="field">
                <label htmlFor="confirm">Confirmar</label>
                <input id="confirm" type="password" autoComplete="new-password" required
                  value={form.confirm} onChange={update('confirm')} placeholder="Repite la contraseña" />
              </div>
            </div>
            <button type="submit" className="btn btn-primary btn-block" disabled={busy}>
              {busy ? 'Creando cuenta…' : 'Crear cuenta'}
            </button>
          </form>

          <p className="auth-switch">
            ¿Ya tienes cuenta? <Link to="/login">Inicia sesión</Link>
          </p>
        </div>
      </main>
    </div>
  );
}

function mapAuthError(err: unknown): string {
  const code = (err as { code?: string })?.code ?? '';
  if (code.includes('email-already-in-use')) return 'Ya existe una cuenta con este correo.';
  if (code.includes('invalid-email')) return 'El correo no tiene un formato válido.';
  if (code.includes('weak-password')) return 'La contraseña es demasiado débil.';
  return 'No se pudo crear la cuenta. Inténtalo de nuevo.';
}
