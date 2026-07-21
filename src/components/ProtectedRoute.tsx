import type { ReactNode } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import type { Role } from '../types';

interface Props {
  children: ReactNode;
  requireRole?: Role;
}

export default function ProtectedRoute({ children, requireRole }: Props) {
  const { user, role, loading } = useAuth();
  const location = useLocation();

  if (loading) {
    return (
      <div className="portal-loading">
        <div className="spinner" />
        <p>Cargando…</p>
      </div>
    );
  }

  if (!user) {
    // Guarda la ruta destino para volver tras iniciar sesión
    return <Navigate to="/login" state={{ from: location.pathname }} replace />;
  }

  if (requireRole && role !== requireRole) {
    // Autenticado pero sin permiso: lo enviamos a su panel correspondiente
    return <Navigate to={role === 'admin' ? '/admin' : '/portal'} replace />;
  }

  return <>{children}</>;
}
