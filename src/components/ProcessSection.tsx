import { useEffect, useRef } from 'react';

const steps = [
  { num: '01', title: 'Diagnóstico', desc: 'Conocemos tu empresa, la vacante y el perfil que necesitas cubrir.' },
  { num: '02', title: 'Atracción de Talento', desc: 'Activamos portales especializados, red de referidos y headhunting activo.' },
  { num: '03', title: 'Evaluación', desc: 'Filtramos hojas de vida, entrevistamos y aplicamos pruebas psicotécnicas validadas.' },
  { num: '04', title: 'Presentación de Candidatos', desc: 'Te entregamos una terna de perfiles preseleccionados listos para entrevistar.' },
  { num: '05', title: 'Acompañamiento', desc: 'Te acompañamos hasta la vinculación exitosa y el seguimiento postcontratación.' },
];

export default function ProcessSection() {
  const hdrRef = useRef<HTMLDivElement>(null);
  const bodyRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const els = [hdrRef.current, bodyRef.current].filter(Boolean) as HTMLElement[];
    const obs = new IntersectionObserver(
      (entries) => entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('vis'); }),
      { threshold: 0.10, rootMargin: '0px 0px -28px 0px' }
    );
    els.forEach(el => obs.observe(el));
    return () => obs.disconnect();
  }, []);

  return (
    <section id="proceso">
      <div className="sec-hdr sec-hdr-border rv" ref={hdrRef}>
        <h2 className="sec-title">Así trabajamos contigo</h2>
        <div className="sec-tag">Proceso</div>
      </div>
      <div className="proceso-wrap rv" ref={bodyRef}>
        <div className="proceso-timeline">
          {steps.map((step) => (
            <div key={step.num} className="proceso-step">
              <div className="proceso-dot-row">
                <div className="proceso-dot">
                  <span className="proceso-step-num">{step.num}</span>
                </div>
              </div>
              <div className="proceso-step-title">{step.title}</div>
              <div className="proceso-step-desc">{step.desc}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
