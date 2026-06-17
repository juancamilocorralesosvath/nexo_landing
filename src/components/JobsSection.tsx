import { useEffect, useRef } from 'react';
import { steps } from '../data/jobs';

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
            <a
              href="https://www.instagram.com/nexosas/"
              target="_blank"
              rel="noopener noreferrer"
              className="jobs-cta-btn"
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <rect x="2" y="7" width="20" height="14" rx="2"/><path d="M16 7V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v2"/>
              </svg>
              Ver todas las vacantes →
            </a>
          </div>
        </div>

        <div className="jobs-cards">
          {steps.map((step) => (
            <div key={step.number} className="job-card">
              <div className="job-step-num">{step.number}</div>
              <div className="job-title">{step.title}</div>
              <p className="job-step-desc">{step.description}</p>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
