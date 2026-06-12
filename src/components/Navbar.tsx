import { useEffect, useState } from 'react';

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const closeMenu = () => setMenuOpen(false);

  return (
    <nav className={scrolled ? 'scrolled' : ''}>
      <a href="#" className="nav-logo">
        <img src="/assets/nexo-logo.svg" alt="NEXO SAS" />
      </a>

      <button
        className="nav-hamburger"
        onClick={() => setMenuOpen(!menuOpen)}
        aria-label={menuOpen ? 'Cerrar menú' : 'Abrir menú'}
        aria-expanded={menuOpen}
      >
        <span />
        <span />
        <span />
      </button>

      <ul className={`nav-links${menuOpen ? ' open' : ''}`}>
        <li><a href="#servicios" onClick={closeMenu}>Servicios</a></li>
        <li><a href="#nosotros" onClick={closeMenu}>Nosotros</a></li>
        <li><a href="#empleos" onClick={closeMenu}>Empleos</a></li>
        <li><a href="#proceso" onClick={closeMenu}>Proceso</a></li>
        <li><a href="#contacto" className="nav-cta" onClick={closeMenu}>Contáctanos</a></li>
      </ul>
    </nav>
  );
}
