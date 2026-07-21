import { useEffect, useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { listActiveJobs } from '../services/jobs';
import { applyToJob } from '../services/applications';
import { useAuth } from '../context/AuthContext';
import type { Job } from '../types';

export default function JobsPage() {
  const [jobs, setJobs] = useState<Job[]>([]);
  const [loading, setLoading] = useState(true);
  const [loadError, setLoadError] = useState('');
  const [term, setTerm] = useState('');
  const [city, setCity] = useState('');
  const [feedback, setFeedback] = useState<{ id: string; msg: string; ok: boolean } | null>(null);
  const [applying, setApplying] = useState('');

  const { user, profile, role } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    listActiveJobs()
      .then(setJobs)
      .catch(() => setLoadError('No pudimos cargar las vacantes en este momento. Inténtalo más tarde.'))
      .finally(() => setLoading(false));
  }, []);

  const cities = useMemo(
    () => Array.from(new Set(jobs.map((j) => j.city))).sort(),
    [jobs]
  );

  const filtered = useMemo(() => {
    const t = term.toLowerCase().trim();
    return jobs.filter((j) => {
      const matchesTerm =
        !t || j.title.toLowerCase().includes(t) || j.area.toLowerCase().includes(t);
      const matchesCity = !city || j.city === city;
      return matchesTerm && matchesCity;
    });
  }, [jobs, term, city]);

  async function handleApply(job: Job) {
    if (!user || !profile) {
      navigate('/login', { state: { from: '/empleos' } });
      return;
    }
    if (role === 'admin') {
      setFeedback({ id: job.id, msg: 'Los administradores no se postulan a vacantes.', ok: false });
      return;
    }
    setApplying(job.id);
    try {
      await applyToJob(job, profile);
      setFeedback({ id: job.id, msg: '¡Postulación enviada! Revisa tu portal para el seguimiento.', ok: true });
    } catch (err) {
      setFeedback({ id: job.id, msg: (err as Error).message || 'No se pudo enviar la postulación.', ok: false });
    } finally {
      setApplying('');
    }
  }

  return (
    <>
      <Navbar />
      <div className="portal-page">
        <div className="portal-container">
          <div className="portal-head">
            <div className="portal-eyebrow">Ofertas de Empleo</div>
            <h1 className="portal-title">Vacantes disponibles</h1>
            <p className="portal-subtitle">
              Explora las oportunidades activas de NEXO SAS y postúlate en un clic.
              Conectamos tu perfil con empresas líderes en Colombia.
            </p>
          </div>

          <div className="card" style={{ padding: 16, marginBottom: 24 }}>
            <div className="row-between">
              <div className="field" style={{ margin: 0, flex: '1 1 240px' }}>
                <input type="search" placeholder="Buscar por cargo o área…"
                  value={term} onChange={(e) => setTerm(e.target.value)} aria-label="Buscar vacante" />
              </div>
              <div className="field" style={{ margin: 0, flex: '0 1 220px' }}>
                <select value={city} onChange={(e) => setCity(e.target.value)} aria-label="Filtrar por ciudad">
                  <option value="">Todas las ciudades</option>
                  {cities.map((c) => <option key={c} value={c}>{c}</option>)}
                </select>
              </div>
            </div>
          </div>

          {loading && (
            <div className="portal-loading"><div className="spinner" /><p>Cargando vacantes…</p></div>
          )}
          {loadError && <div className="alert alert-error">{loadError}</div>}

          {!loading && !loadError && filtered.length === 0 && (
            <div className="card" style={{ textAlign: 'center', padding: 48 }}>
              <p className="muted">No hay vacantes que coincidan con tu búsqueda en este momento.</p>
            </div>
          )}

          <div className="grid-jobs">
            {filtered.map((job) => (
              <article key={job.id} className="offer-card">
                <div>
                  <div className="offer-title">{job.title}</div>
                  <div className="offer-meta" style={{ marginTop: 8 }}>
                    <span className="badge badge-gold">{job.city}</span>
                    <span className="badge badge-muted">{job.area}</span>
                    <span className="badge badge-muted">{job.contractType}</span>
                  </div>
                </div>
                <p className="offer-desc">{job.description}</p>
                {job.salary && <div className="muted" style={{ fontSize: 14 }}><strong>Salario:</strong> {job.salary}</div>}
                {job.requirements.length > 0 && (
                  <ul style={{ margin: 0, paddingLeft: 18, color: 'var(--muted)', fontSize: 14 }}>
                    {job.requirements.slice(0, 3).map((r, i) => <li key={i}>{r}</li>)}
                  </ul>
                )}
                {feedback?.id === job.id && (
                  <div className={`alert ${feedback.ok ? 'alert-success' : 'alert-error'}`} style={{ margin: 0 }}>
                    {feedback.msg}
                  </div>
                )}
                <button className="btn btn-gold btn-block" onClick={() => handleApply(job)} disabled={applying === job.id}>
                  {applying === job.id ? 'Enviando…' : user ? 'Postularme' : 'Inicia sesión para postularte'}
                </button>
              </article>
            ))}
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}
