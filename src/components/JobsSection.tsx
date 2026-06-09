import { useEffect, useRef } from 'react';
import { jobs } from '../data/jobs';

export default function JobsSection() {
  const ref = useRef<HTMLDivElement>(null);

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
            <a href="#" className="jobs-cta-btn">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <rect x="2" y="7" width="20" height="14" rx="2"/><path d="M16 7V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v2"/>
              </svg>
              Ver todas las vacantes →
            </a>
            <p style={{ fontSize: 11, color: 'var(--muted)', textAlign: 'right', fontFamily: 'Montserrat, sans-serif', letterSpacing: '0.04em' }}>
              Portal en construcción · Próximamente disponible
            </p>
          </div>
        </div>

        <div className="jobs-cards">
          {jobs.map((job) => (
            <div key={job.title} className="job-card">
              <div className="job-card-top">
                <span className="job-dept">{job.department}</span>
                <span className="job-type">{job.type}</span>
              </div>
              <div className="job-title">{job.title}</div>
              <div className="job-meta">
                <span>📍 {job.city}</span>
                <span>⏱ {job.schedule}</span>
              </div>
              <a href="#" className="job-apply">Postularme →</a>
            </div>
          ))}
        </div>

        <div className="jobs-more">
          <a href="#" className="jobs-more-link">Ver más vacantes disponibles</a>
        </div>
      </div>
    </section>
  );
}
