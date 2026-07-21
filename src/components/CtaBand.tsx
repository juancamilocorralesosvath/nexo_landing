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
        <a href="https://wa.me/573187098012?text=hola!%20quiero%20m%C3%A1s%20informaci%C3%B3n%20sobre%20los%20servicios%20de%20NEXO." target="_blank" rel="noopener noreferrer" className="btn btn-gold">Contáctanos →</a>
        <a href="#empleos" className="btn btn-ghost-dk">Ofertas de Empleo</a>
      </div>
    </div>
  );
}
