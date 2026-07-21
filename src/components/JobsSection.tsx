import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { listActiveJobs } from '../services/jobs';
import type { Job } from '../types';

export default function JobsSection() {
  const ref = useRef<HTMLDivElement>(null);
  const [jobs, setJobs] = useState<Job[]>([]);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) el.classList.add('vis'); },
      { threshold: 0.10, rootMargin: '0px 0px -28px 0px' }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  // Muestra hasta 3 vacantes destacadas. Si Firebase no está listo, degrada sin romper.
  useEffect(() => {
    listActiveJobs()
      .then((all) => setJobs(all.slice(0, 3)))
      .catch(() => setJobs([]))
      .finally(() => setLoaded(true));
  }, []);

  return (
    <section id="empleos">
      <div className="jobs-section rv" ref={ref}>
        <div className="jobs-header">
          <div>
            <div className="sec-tag" style={{ marginBottom: 14 }}>Ofertas de Empleo</div>
            <h2 className="sec-title">Encuentra el empleo de tus sueños</h2>
            <p className="jobs-desc" style={{ marginTop: 14 }}>
              Explora las vacantes disponibles y da el siguiente paso en tu carrera profesional.
              Únete a empresas líderes en Colombia a través de NEXO SAS.
            </p>
          </div>
          <div className="jobs-cta-wrap">
            <Link to="/empleos" className="jobs-cta-btn">
              Ver todas las vacantes →
            </Link>
          </div>
        </div>

        <div className="jobs-cards">
          {loaded && jobs.length === 0 && (
            <div className="job-card">
              <div className="job-title">Vacantes en actualización</div>
              <p className="job-step-desc">
                Estamos publicando nuevas oportunidades. Regístrate para ser el primero en enterarte.
              </p>
              <Link to="/registro" className="jobs-cta-btn" style={{ marginTop: 12, display: 'inline-flex' }}>
                Crear mi perfil →
              </Link>
            </div>
          )}

          {jobs.map((job) => (
            <Link key={job.id} to="/empleos" className="job-card" style={{ textDecoration: 'none', color: 'inherit' }}>
              <div className="job-title">{job.title}</div>
              <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', margin: '10px 0' }}>
                <span className="badge badge-gold">{job.city}</span>
                <span className="badge badge-muted">{job.contractType}</span>
              </div>
              <p className="job-step-desc">{job.description.slice(0, 120)}{job.description.length > 120 ? '…' : ''}</p>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
