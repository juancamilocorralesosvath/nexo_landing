import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { logout } from '../services/auth';

export default function PortalHeader() {
  const { profile, role } = useAuth();
  const navigate = useNavigate();

  async function handleLogout() {
    await logout();
    navigate('/', { replace: true });
  }

  return (
    <nav className="scrolled">
      <Link to="/" className="nav-logo">
        <img src="/assets/nexo-logo.svg" alt="NEXO SAS" />
      </Link>

      <ul className="nav-links">
        <li><Link to="/empleos">Empleos</Link></li>
        {role === 'admin' ? (
          <li><Link to="/admin">Panel admin</Link></li>
        ) : (
          <li><Link to="/portal">Mi portal</Link></li>
        )}
        <li style={{ color: '#2B2019', fontSize: 13, fontFamily: "'Montserrat',sans-serif", fontWeight: 600 }}>
          {profile?.displayName}
        </li>
        <li>
          <button onClick={handleLogout} className="nav-cta" style={{ border: 'none', cursor: 'pointer', font: 'inherit' }}>
            Cerrar sesión
          </button>
        </li>
      </ul>
    </nav>
  );
}
