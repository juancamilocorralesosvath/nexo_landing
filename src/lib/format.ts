import type { ApplicationStatus } from '../types';

export function formatBytes(bytes: number): string {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(0)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
}

export function formatDate(ts: number): string {
  return new Date(ts).toLocaleDateString('es-CO', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
  });
}

export function statusBadgeClass(status: ApplicationStatus): string {
  switch (status) {
    case 'Recibida': return 'badge-muted';
    case 'En revisión': return 'badge-blue';
    case 'Preseleccionada': return 'badge-green';
    case 'Rechazada': return 'badge-red';
    default: return 'badge-muted';
  }
}
