import { lazy, Suspense } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import HomePage from './pages/HomePage';
import ProtectedRoute from './components/ProtectedRoute';

// Carga diferida: el código del portal/admin/auth no pesa sobre la landing pública.
const JobsPage = lazy(() => import('./pages/JobsPage'));
const LoginPage = lazy(() => import('./pages/LoginPage'));
const RegisterPage = lazy(() => import('./pages/RegisterPage'));
const CandidateDashboard = lazy(() => import('./pages/CandidateDashboard'));
const AdminDashboard = lazy(() => import('./pages/AdminDashboard'));

function Fallback() {
  return (
    <div className="portal-loading">
      <div className="spinner" />
      <p>Cargando…</p>
    </div>
  );
}

export default function App() {
  return (
    <Suspense fallback={<Fallback />}>
      <Routes>
        {/* Públicas */}
        <Route path="/" element={<HomePage />} />
        <Route path="/empleos" element={<JobsPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/registro" element={<RegisterPage />} />

        {/* Candidato */}
        <Route
          path="/portal"
          element={
            <ProtectedRoute requireRole="candidate">
              <CandidateDashboard />
            </ProtectedRoute>
          }
        />

        {/* Administrador */}
        <Route
          path="/admin"
          element={
            <ProtectedRoute requireRole="admin">
              <AdminDashboard />
            </ProtectedRoute>
          }
        />

        {/* Cualquier otra ruta vuelve al inicio */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Suspense>
  );
}
