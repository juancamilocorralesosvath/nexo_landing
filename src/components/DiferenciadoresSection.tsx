import { useEffect, useRef } from 'react';

const items = [
  {
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="var(--gold-dk)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 2L2 7l10 5 10-5-10-5z"/><path d="M2 17l10 5 10-5"/><path d="M2 12l10 5 10-5"/>
      </svg>
    ),
    title: 'Proceso Completamente Tercerizado',
    desc: 'Delegá todo el ciclo de contratación. Tu equipo se enfoca en lo que realmente importa.',
  },
  {
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="var(--gold-dk)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="10"/><line x1="2" y1="12" x2="22" y2="12"/>
        <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/>
      </svg>
    ),
    title: 'Cobertura en todo el país',
    desc: 'Reclutamos talento en las principales ciudades de Colombia, sin importar el sector.',
  },
  {
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="var(--gold-dk)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/>
        <path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/>
      </svg>
    ),
    title: 'Perfiles para toda industria',
    desc: 'Desde cargos operativos hasta directivos: encontramos el candidato que tu empresa necesita.',
  },
  {
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="var(--gold-dk)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
      </svg>
    ),
    title: 'Cumplimiento legal garantizado',
    desc: 'Contratos, seguridad social y nómina 100% bajo la normativa colombiana vigente.',
  },
];

export default function DiferenciadoresSection() {
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
    <div className="stats-band rv" ref={ref}>
      {items.map((item) => (
        <div key={item.title} className="stat-item">
          <div className="dif-icon">{item.icon}</div>
          <div className="dif-title">{item.title}</div>
          <div className="dif-desc">{item.desc}</div>
        </div>
      ))}
    </div>
  );
}
