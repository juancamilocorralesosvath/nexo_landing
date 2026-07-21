import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const { user, role } = useAuth();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const closeMenu = () => setMenuOpen(false);

  return (
    <nav className={scrolled ? 'scrolled' : ''}>
      <Link to="/" className="nav-logo">
        <img src="/assets/nexo-logo.svg" alt="NEXO SAS" />
      </Link>

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
        <li><Link to="/#servicios" onClick={closeMenu}>Servicios</Link></li>
        <li><Link to="/#nosotros" onClick={closeMenu}>Nosotros</Link></li>
        <li><Link to="/empleos" onClick={closeMenu}>Empleos</Link></li>
        <li><Link to="/#proceso" onClick={closeMenu}>Proceso</Link></li>
        {user ? (
          <li>
            <Link to={role === 'admin' ? '/admin' : '/portal'} className="nav-cta" onClick={closeMenu}>
              {role === 'admin' ? 'Panel admin' : 'Mi portal'}
            </Link>
          </li>
        ) : (
          <li><Link to="/login" className="nav-cta" onClick={closeMenu}>Ingresar</Link></li>
        )}
      </ul>
    </nav>
  );
}
