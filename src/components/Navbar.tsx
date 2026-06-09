import { useEffect, useState } from 'react';

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <nav className={scrolled ? 'scrolled' : ''}>
      <a href="#" className="nav-logo">
        <img src="/assets/nexo-logo.svg" alt="NEXO SAS" />
      </a>
      <ul className="nav-links">
        <li><a href="#servicios">Servicios</a></li>
        <li><a href="#nosotros">Nosotros</a></li>
        <li><a href="#empleos">Empleos</a></li>
        <li><a href="#proceso">Proceso</a></li>
        <li><a href="#contacto" className="nav-cta">Contáctanos</a></li>
      </ul>
    </nav>
  );
}
