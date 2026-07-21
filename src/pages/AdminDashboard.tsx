import { useEffect, useMemo, useState } from 'react';
import PortalHeader from '../components/PortalHeader';
import JobForm from '../components/JobForm';
import { useAuth } from '../context/AuthContext';
import {
  createJob,
  deleteJob,
  listAllJobs,
  setJobActive,
  updateJob,
} from '../services/jobs';
import { listAllDocuments } from '../services/documents';
import {
  listAllApplications,
  setApplicationStatus,
} from '../services/applications';
import type { Application, ApplicationStatus, CandidateDoc, Job, JobInput } from '../types';
import { formatBytes, formatDate, statusBadgeClass } from '../lib/format';

type Tab = 'jobs' | 'docs' | 'apps';
const STATUSES: ApplicationStatus[] = ['Recibida', 'En revisión', 'Preseleccionada', 'Rechazada'];

export default function AdminDashboard() {
  const { profile } = useAuth();
  const [tab, setTab] = useState<Tab>('jobs');
  const [jobs, setJobs] = useState<Job[]>([]);
  const [docs, setDocs] = useState<CandidateDoc[]>([]);
  const [apps, setApps] = useState<Application[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editing, setEditing] = useState<Job | null>(null);
  const [saving, setSaving] = useState(false);

  async function refresh() {
    const [j, d, a] = await Promise.all([listAllJobs(), listAllDocuments(), listAllApplications()]);
    setJobs(j); setDocs(d); setApps(a);
  }

  useEffect(() => {
    let alive = true;
    (async () => {
      await refresh();
      if (alive) setLoading(false);
    })();
    return () => { alive = false; };
  }, []);

  async function handleSave(input: JobInput) {
    if (!profile) return;
    setSaving(true);
    try {
      if (editing) {
        await updateJob(editing.id, input);
      } else {
        await createJob(input, profile.uid);
      }
      await refresh();
      setShowForm(false);
      setEditing(null);
    } finally {
      setSaving(false);
    }
  }

  async function toggleActive(job: Job) {
    await setJobActive(job.id, !job.active);
    setJobs((prev) => prev.map((j) => (j.id === job.id ? { ...j, active: !j.active } : j)));
  }

  async function removeJob(job: Job) {
    if (!confirm(`¿Eliminar la oferta "${job.title}"? Esta acción no se puede deshacer.`)) return;
    await deleteJob(job.id);
    setJobs((prev) => prev.filter((j) => j.id !== job.id));
  }

  async function changeStatus(app: Application, status: ApplicationStatus) {
    await setApplicationStatus(app.id, status);
    setApps((prev) => prev.map((a) => (a.id === app.id ? { ...a, status } : a)));
  }

  const activeCount = useMemo(() => jobs.filter((j) => j.active).length, [jobs]);

  return (
    <>
      <PortalHeader />
      <div className="portal-page">
        <div className="portal-container">
          <div className="portal-head">
            <div className="portal-eyebrow">Panel de administración</div>
            <h1 className="portal-title">Gestión NEXO SAS</h1>
            <p className="portal-subtitle">Administra vacantes, revisa la documentación de candidatos y gestiona postulaciones.</p>
          </div>

          <div className="stat-row">
            <div className="stat"><div className="n">{activeCount}</div><div className="l">Ofertas activas</div></div>
            <div className="stat"><div className="n">{jobs.length}</div><div className="l">Ofertas totales</div></div>
            <div className="stat"><div className="n">{docs.length}</div><div className="l">Documentos</div></div>
            <div className="stat"><div className="n">{apps.length}</div><div className="l">Postulaciones</div></div>
          </div>

          <div style={{ display: 'flex', gap: 8, marginBottom: 22, flexWrap: 'wrap' }}>
            <button className={`btn btn-sm ${tab === 'jobs' ? 'btn-primary' : 'btn-ghost'}`} onClick={() => setTab('jobs')}>Ofertas</button>
            <button className={`btn btn-sm ${tab === 'docs' ? 'btn-primary' : 'btn-ghost'}`} onClick={() => setTab('docs')}>Documentos</button>
            <button className={`btn btn-sm ${tab === 'apps' ? 'btn-primary' : 'btn-ghost'}`} onClick={() => setTab('apps')}>Postulaciones</button>
          </div>

          {loading && <div className="portal-loading"><div className="spinner" /><p>Cargando…</p></div>}

          {/* ── OFERTAS ── */}
          {!loading && tab === 'jobs' && (
            <>
              <div className="row-between" style={{ marginBottom: 16 }}>
                <h2 className="card-title" style={{ margin: 0 }}>Ofertas de empleo</h2>
                <button className="btn btn-gold" onClick={() => { setEditing(null); setShowForm(true); }}>＋ Nueva oferta</button>
              </div>

              {showForm && (
                <JobForm
                  initial={editing}
                  saving={saving}
                  onSubmit={handleSave}
                  onCancel={() => { setShowForm(false); setEditing(null); }}
                />
              )}

              {jobs.length === 0 ? (
                <div className="card" style={{ textAlign: 'center', padding: 40 }}>
                  <p className="muted">Aún no hay ofertas. Crea la primera con “Nueva oferta”.</p>
                </div>
              ) : (
                <div className="table-wrap">
                  <table className="data">
                    <thead>
                      <tr><th>Cargo</th><th>Ciudad</th><th>Contrato</th><th>Estado</th><th style={{ width: 1 }}>Acciones</th></tr>
                    </thead>
                    <tbody>
                      {jobs.map((job) => (
                        <tr key={job.id}>
                          <td><strong>{job.title}</strong><div className="muted" style={{ fontSize: 13 }}>{job.area}</div></td>
                          <td className="muted">{job.city}</td>
                          <td className="muted">{job.contractType}</td>
                          <td>
                            <span className={`badge ${job.active ? 'badge-green' : 'badge-muted'}`}>
                              {job.active ? 'Activa' : 'Inactiva'}
                            </span>
                          </td>
                          <td>
                            <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
                              <button className="btn btn-ghost btn-sm" onClick={() => { setEditing(job); setShowForm(true); }}>Editar</button>
                              <button className="btn btn-ghost btn-sm" onClick={() => toggleActive(job)}>{job.active ? 'Desactivar' : 'Activar'}</button>
                              <button className="btn btn-danger btn-sm" onClick={() => removeJob(job)}>Eliminar</button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </>
          )}

          {/* ── DOCUMENTOS ── */}
          {!loading && tab === 'docs' && (
            <>
              <h2 className="card-title" style={{ marginBottom: 16 }}>Documentación de candidatos</h2>
              {docs.length === 0 ? (
                <div className="card" style={{ textAlign: 'center', padding: 40 }}>
                  <p className="muted">Los candidatos aún no han subido documentos.</p>
                </div>
              ) : (
                <div className="table-wrap">
                  <table className="data">
                    <thead>
                      <tr><th>Candidato</th><th>Correo</th><th>Archivo</th><th>Tamaño</th><th>Fecha</th><th style={{ width: 1 }}>Acción</th></tr>
                    </thead>
                    <tbody>
                      {docs.map((d) => (
                        <tr key={d.id}>
                          <td><strong>{d.ownerName}</strong></td>
                          <td className="muted">{d.ownerEmail}</td>
                          <td>{d.name}</td>
                          <td className="muted">{formatBytes(d.size)}</td>
                          <td className="muted">{formatDate(d.uploadedAt)}</td>
                          <td>
                            <a className="btn btn-gold btn-sm" href={d.downloadURL} target="_blank" rel="noopener noreferrer">Descargar</a>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </>
          )}

          {/* ── POSTULACIONES ── */}
          {!loading && tab === 'apps' && (
            <>
              <h2 className="card-title" style={{ marginBottom: 16 }}>Postulaciones recibidas</h2>
              {apps.length === 0 ? (
                <div className="card" style={{ textAlign: 'center', padding: 40 }}>
                  <p className="muted">Aún no hay postulaciones.</p>
                </div>
              ) : (
                <div className="table-wrap">
                  <table className="data">
                    <thead>
                      <tr><th>Candidato</th><th>Vacante</th><th>Fecha</th><th>Estado</th></tr>
                    </thead>
                    <tbody>
                      {apps.map((a) => (
                        <tr key={a.id}>
                          <td><strong>{a.candidateName}</strong><div className="muted" style={{ fontSize: 13 }}>{a.candidateEmail}</div></td>
                          <td>{a.jobTitle}</td>
                          <td className="muted">{formatDate(a.createdAt)}</td>
                          <td>
                            <select
                              className={`badge ${statusBadgeClass(a.status)}`}
                              style={{ border: 'none', cursor: 'pointer', padding: '5px 10px' }}
                              value={a.status}
                              onChange={(e) => changeStatus(a, e.target.value as ApplicationStatus)}
                            >
                              {STATUSES.map((s) => <option key={s} value={s}>{s}</option>)}
                            </select>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </>
  );
}
