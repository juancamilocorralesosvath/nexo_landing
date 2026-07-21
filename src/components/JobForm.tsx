import { useState, type FormEvent } from 'react';
import type { ContractType, Job, JobInput } from '../types';

const CONTRACT_TYPES: ContractType[] = [
  'Término indefinido',
  'Término fijo',
  'Obra o labor',
  'Prestación de servicios',
  'Aprendizaje',
];

interface Props {
  initial: Job | null;
  saving: boolean;
  onSubmit: (input: JobInput) => void;
  onCancel: () => void;
}

export default function JobForm({ initial, saving, onSubmit, onCancel }: Props) {
  const [title, setTitle] = useState(initial?.title ?? '');
  const [area, setArea] = useState(initial?.area ?? '');
  const [city, setCity] = useState(initial?.city ?? '');
  const [contractType, setContractType] = useState<ContractType>(initial?.contractType ?? 'Término indefinido');
  const [salary, setSalary] = useState(initial?.salary ?? '');
  const [description, setDescription] = useState(initial?.description ?? '');
  const [requirements, setRequirements] = useState((initial?.requirements ?? []).join('\n'));
  const [active, setActive] = useState(initial?.active ?? true);
  const [error, setError] = useState('');

  function handleSubmit(e: FormEvent) {
    e.preventDefault();
    if (!title.trim() || !area.trim() || !city.trim() || !description.trim()) {
      setError('Completa cargo, área, ciudad y descripción.');
      return;
    }
    onSubmit({
      title: title.trim(),
      area: area.trim(),
      city: city.trim(),
      contractType,
      salary: salary.trim() || undefined,
      description: description.trim(),
      requirements: requirements.split('\n').map((r) => r.trim()).filter(Boolean),
      active,
    });
  }

  return (
    <div className="card" style={{ borderColor: 'var(--gold-dk)', marginBottom: 18 }}>
      <div className="card-title">{initial ? 'Editar oferta' : 'Nueva oferta'}</div>
      {error && <div className="alert alert-error">{error}</div>}
      <form onSubmit={handleSubmit}>
        <div className="grid-2">
          <div className="field">
            <label>Cargo</label>
            <input value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Ej. Auxiliar contable" />
          </div>
          <div className="field">
            <label>Área</label>
            <input value={area} onChange={(e) => setArea(e.target.value)} placeholder="Ej. Contabilidad" />
          </div>
          <div className="field">
            <label>Ciudad</label>
            <input value={city} onChange={(e) => setCity(e.target.value)} placeholder="Ej. Cali" />
          </div>
          <div className="field">
            <label>Tipo de contrato</label>
            <select value={contractType} onChange={(e) => setContractType(e.target.value as ContractType)}>
              {CONTRACT_TYPES.map((c) => <option key={c} value={c}>{c}</option>)}
            </select>
          </div>
        </div>

        <div className="field">
          <label>Salario (opcional)</label>
          <input value={salary} onChange={(e) => setSalary(e.target.value)} placeholder="Ej. $1.800.000 – $2.200.000" />
        </div>

        <div className="field">
          <label>Descripción</label>
          <textarea value={description} onChange={(e) => setDescription(e.target.value)}
            placeholder="Describe la vacante, responsabilidades y condiciones." />
        </div>

        <div className="field">
          <label>Requisitos (uno por línea)</label>
          <textarea value={requirements} onChange={(e) => setRequirements(e.target.value)}
            placeholder={'Técnico o tecnólogo en…\n1 año de experiencia\nManejo de Excel'} />
          <div className="field-hint">Cada línea se mostrará como un requisito independiente.</div>
        </div>

        <label style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: 14, marginBottom: 18, cursor: 'pointer' }}>
          <input type="checkbox" style={{ width: 'auto' }} checked={active} onChange={(e) => setActive(e.target.checked)} />
          Publicar como activa (visible en la página de empleos)
        </label>

        <div style={{ display: 'flex', gap: 10 }}>
          <button type="submit" className="btn btn-primary" disabled={saving}>
            {saving ? 'Guardando…' : initial ? 'Guardar cambios' : 'Crear oferta'}
          </button>
          <button type="button" className="btn btn-ghost" onClick={onCancel} disabled={saving}>Cancelar</button>
        </div>
      </form>
    </div>
  );
}
