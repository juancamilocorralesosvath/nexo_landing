import { useEffect, useRef, useState } from 'react';
import PortalHeader from '../components/PortalHeader';
import { useAuth } from '../context/AuthContext';
import {
  deleteDocument,
  listOwnDocuments,
  uploadDocument,
} from '../services/documents';
import { listOwnApplications } from '../services/applications';
import type { Application, CandidateDoc } from '../types';
import { formatBytes, formatDate, statusBadgeClass } from '../lib/format';

const ACCEPTED = '.pdf,.doc,.docx,.jpg,.jpeg,.png';
const MAX_MB = 10;

export default function CandidateDashboard() {
  const { profile } = useAuth();
  const [docs, setDocs] = useState<CandidateDoc[]>([]);
  const [apps, setApps] = useState<Application[]>([]);
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);
  const [msg, setMsg] = useState<{ text: string; ok: boolean } | null>(null);
  const fileInput = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (!profile) return;
    let alive = true;
    (async () => {
      try {
        const [d, a] = await Promise.all([
          listOwnDocuments(profile.uid),
          listOwnApplications(profile.uid),
        ]);
        if (!alive) return;
        setDocs(d);
        setApps(a);
      } finally {
        if (alive) setLoading(false);
      }
    })();
    return () => { alive = false; };
  }, [profile]);

  async function handleFile(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file || !profile) return;
    setMsg(null);

    if (file.size > MAX_MB * 1024 * 1024) {
      setMsg({ text: `El archivo supera el límite de ${MAX_MB} MB.`, ok: false });
      if (fileInput.current) fileInput.current.value = '';
      return;
    }

    setUploading(true);
    try {
      const created = await uploadDocument(file, profile);
      setDocs((prev) => [created, ...prev]);
      setMsg({ text: `"${file.name}" se subió correctamente.`, ok: true });
    } catch {
      setMsg({ text: 'No se pudo subir el archivo. Inténtalo de nuevo.', ok: false });
    } finally {
      setUploading(false);
      if (fileInput.current) fileInput.current.value = '';
    }
  }

  async function handleDelete(docMeta: CandidateDoc) {
    if (!confirm(`¿Eliminar "${docMeta.name}"?`)) return;
    try {
      await deleteDocument(docMeta);
      setDocs((prev) => prev.filter((d) => d.id !== docMeta.id));
    } catch {
      setMsg({ text: 'No se pudo eliminar el documento.', ok: false });
    }
  }

  return (
    <>
      <PortalHeader />
      <div className="portal-page">
        <div className="portal-container">
          <div className="portal-head">
            <div className="portal-eyebrow">Mi portal</div>
            <h1 className="portal-title">Hola, {profile?.displayName?.split(' ')[0] ?? 'candidato'}</h1>
            <p className="portal-subtitle">
              Gestiona tu documentación y haz seguimiento a tus postulaciones.
            </p>
          </div>

          <div className="stat-row">
            <div className="stat"><div className="n">{docs.length}</div><div className="l">Documentos</div></div>
            <div className="stat"><div className="n">{apps.length}</div><div className="l">Postulaciones</div></div>
          </div>

          {/* Subir documentos */}
          <div className="card">
            <div className="card-title">Subir documentación</div>
            <p className="muted" style={{ fontSize: 14, marginBottom: 14 }}>
              Hoja de vida, certificados, diplomas y soportes. Formatos: PDF, Word o imagen · máx. {MAX_MB} MB.
            </p>
            {msg && <div className={`alert ${msg.ok ? 'alert-success' : 'alert-error'}`}>{msg.text}</div>}
            <input ref={fileInput} type="file" accept={ACCEPTED} hidden onChange={handleFile} />
            <button className="btn btn-gold" onClick={() => fileInput.current?.click()} disabled={uploading}>
              {uploading ? 'Subiendo…' : '＋ Seleccionar archivo'}
            </button>
          </div>

          {/* Mis documentos */}
          <div className="card">
            <div className="card-title">Mis documentos</div>
            {loading ? (
              <p className="muted">Cargando…</p>
            ) : docs.length === 0 ? (
              <p className="muted">Aún no has subido documentos.</p>
            ) : (
              <div className="table-wrap" style={{ marginTop: 12 }}>
                <table className="data">
                  <thead>
                    <tr><th>Archivo</th><th>Tamaño</th><th>Fecha</th><th style={{ width: 1 }}>Acciones</th></tr>
                  </thead>
                  <tbody>
                    {docs.map((d) => (
                      <tr key={d.id}>
                        <td>{d.name}</td>
                        <td className="muted">{formatBytes(d.size)}</td>
                        <td className="muted">{formatDate(d.uploadedAt)}</td>
                        <td>
                          <div style={{ display: 'flex', gap: 8 }}>
                            <a className="btn btn-ghost btn-sm" href={d.downloadURL} target="_blank" rel="noopener noreferrer">Ver</a>
                            <button className="btn btn-danger btn-sm" onClick={() => handleDelete(d)}>Eliminar</button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>

          {/* Mis postulaciones */}
          <div className="card">
            <div className="card-title">Mis postulaciones</div>
            {loading ? (
              <p className="muted">Cargando…</p>
            ) : apps.length === 0 ? (
              <p className="muted">Todavía no te has postulado a ninguna vacante.</p>
            ) : (
              <div className="table-wrap" style={{ marginTop: 12 }}>
                <table className="data">
                  <thead>
                    <tr><th>Vacante</th><th>Fecha</th><th>Estado</th></tr>
                  </thead>
                  <tbody>
                    {apps.map((a) => (
                      <tr key={a.id}>
                        <td>{a.jobTitle}</td>
                        <td className="muted">{formatDate(a.createdAt)}</td>
                        <td><span className={`badge ${statusBadgeClass(a.status)}`}>{a.status}</span></td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
