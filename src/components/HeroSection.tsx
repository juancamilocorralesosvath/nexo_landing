import { useEffect, useRef, useState } from 'react';

const tickerItems = [
  'Reclutamiento', 'Selección de Personal', 'Contratación Temporal',
  'Consultoría RRHH', 'Desarrollo Organizacional', 'Gestión del Talento',
  'Nómina y Outsourcing', 'Formación Empresarial',
];

export default function HeroSection() {
  const [brandVis, setBrandVis] = useState(false);
  const [stageVis, setStageVis] = useState(false);
  const [tilesVis, setTilesVis] = useState(false);

  const scrollToServices = () => {
    const el = document.getElementById('servicios');
    if (el) window.scrollTo({ top: el.offsetTop - 80, behavior: 'smooth' });
  };

  useEffect(() => {
    const t1 = setTimeout(() => setBrandVis(true), 80);
    const t2 = setTimeout(() => setStageVis(true), 200);
    const t3 = setTimeout(() => setTilesVis(true), 400);
    return () => { clearTimeout(t1); clearTimeout(t2); clearTimeout(t3); };
  }, []);

  const statsBandRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = statsBandRef.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) el.classList.add('vis'); },
      { threshold: 0.10, rootMargin: '0px 0px -28px 0px' }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  return (
    <>
      {/* Hero Brand */}
      <div className={`hero-brand-wrap${brandVis ? ' vis' : ''}`}>
        <div className="hero-brand">NEXO<sup>®</sup>_SAS</div>
        <div className="hero-brand-tagline">RRHH · Colombia</div>
      </div>

      {/* Hero Stage */}
      <div className={`hero-stage${stageVis ? ' vis' : ''}`}>
        <div className="orb" style={{ width: 300, height: 300, background: 'oklch(0.82 0.155 80 / 0.18)', top: -80, left: '50%', ['--d' as string]: '10s' }} />
        <div className="orb" style={{ width: 180, height: 180, background: 'oklch(0.65 0.12 70 / 0.20)', top: '55%', left: '72%', ['--d' as string]: '7s', animationDelay: '-3s' }} />
        <div className="orb" style={{ width: 110, height: 110, background: 'oklch(0.82 0.155 80 / 0.14)', top: '18%', left: '32%', ['--d' as string]: '12s', animationDelay: '-6s' }} />

        <div className="hero-socials">
          <a className="hero-social-btn" href="#">in</a>
          <a className="hero-social-btn" href="#">ig</a>
          <a className="hero-social-btn" href="#">fb</a>
        </div>

        <div className="hero-bottom">
          <div className="hero-avatars">
            <div className="hero-avatar" style={{ background: 'var(--gold)' }}>AC</div>
            <div className="hero-avatar" style={{ background: 'oklch(0.75 0.14 82)' }}>ML</div>
            <div className="hero-avatar" style={{ background: 'oklch(0.70 0.12 75)' }}>PG</div>
            <div className="hero-avatar" style={{ background: 'var(--gold)' }}>RV</div>
            <span className="hero-clients-label">+500 empresas confían en nosotros</span>
          </div>
          <div className="hero-headline">
            Conectamos <em>talento</em><br />con el futuro de tu empresa
          </div>
        </div>
      </div>

      {/* Hero Tiles */}
      <div className={`hero-tiles${tilesVis ? ' vis' : ''}`}>
        {[
          { num: '(01)', label: 'Reclutamiento de Candidatos' },
          { num: '(02)', label: 'Selección de Personal' },
          { num: '(03)', label: 'Contratación Temporal' },
        ].map((tile) => (
          <div key={tile.num} className="hero-tile" onClick={scrollToServices}>
            <span className="tile-num">{tile.num}</span>
            <span className="tile-label">{tile.label}</span>
          </div>
        ))}
      </div>

      {/* Ticker */}
      <div className="ticker-wrap">
        <div className="ticker-track">
          {[...tickerItems, ...tickerItems].map((item, i) => (
            <span key={i} className="ticker-item">{item}</span>
          ))}
        </div>
      </div>
    </>
  );
}
