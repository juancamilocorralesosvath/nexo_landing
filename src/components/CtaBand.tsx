import { useEffect, useRef } from 'react';

export default function CtaBand() {
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
    <div className="cta-band rv" id="contacto" ref={ref}>
      <div className="cta-title">
        ¿Listo para encontrar el <em>talento</em> que tu empresa necesita?
      </div>
      <div className="cta-actions">
        <a href="mailto:contacto@nexosas.com" className="btn btn-gold">Contáctanos →</a>
        <a href="#empleos" className="btn btn-ghost-dk">Ofertas de Empleo</a>
      </div>
    </div>
  );
}
