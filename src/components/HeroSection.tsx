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
        <video className="hero-stage-video" src="/videos/banner.mp4" autoPlay muted loop playsInline />

        <div className="orb" style={{ width: 300, height: 300, background: 'oklch(0.82 0.155 80 / 0.18)', top: -80, left: '50%', ['--d' as string]: '10s' }} />
        <div className="orb" style={{ width: 180, height: 180, background: 'oklch(0.65 0.12 70 / 0.20)', top: '55%', left: '72%', ['--d' as string]: '7s', animationDelay: '-3s' }} />
        <div className="orb" style={{ width: 110, height: 110, background: 'oklch(0.82 0.155 80 / 0.14)', top: '18%', left: '32%', ['--d' as string]: '12s', animationDelay: '-6s' }} />

        <div className="hero-socials">
          {/* LinkedIn */}
          <a className="hero-social-btn" href="https://co.linkedin.com/company/consultora-de-recursos-humanos-nexo-sas" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
            <svg viewBox="0 0 24 24" fill="currentColor" width="16" height="16">
              <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
            </svg>
          </a>
          {/* Instagram */}
          <a className="hero-social-btn" href="https://www.instagram.com/nexosas/" target="_blank" rel="noopener noreferrer" aria-label="Instagram">
            <svg viewBox="0 0 24 24" fill="currentColor" width="16" height="16">
              <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/>
            </svg>
          </a>
          {/* Facebook */}
          <a className="hero-social-btn" href="https://www.facebook.com/CONSULTORARRHHNEXOSAS/" target="_blank" rel="noopener noreferrer" aria-label="Facebook">
            <svg viewBox="0 0 24 24" fill="currentColor" width="16" height="16">
              <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
            </svg>
          </a>
        </div>

        <div className="hero-bottom">
          <div className="hero-headline">
            Conectamos <em>talento</em><br />con el futuro de tu empresa
          </div>
        </div>
      </div>

      {/* Botones sociales — solo móvil pequeño */}
      <div className="hero-socials-mobile">
        <a className="hero-social-btn" href="https://co.linkedin.com/company/consultora-de-recursos-humanos-nexo-sas" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
          <svg viewBox="0 0 24 24" fill="currentColor" width="16" height="16">
            <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
          </svg>
        </a>
        <a className="hero-social-btn" href="https://www.instagram.com/nexosas/" target="_blank" rel="noopener noreferrer" aria-label="Instagram">
          <svg viewBox="0 0 24 24" fill="currentColor" width="16" height="16">
            <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/>
          </svg>
        </a>
        <a className="hero-social-btn" href="https://www.facebook.com/CONSULTORARRHHNEXOSAS/" target="_blank" rel="noopener noreferrer" aria-label="Facebook">
          <svg viewBox="0 0 24 24" fill="currentColor" width="16" height="16">
            <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
          </svg>
        </a>
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
