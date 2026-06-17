import { useEffect, useRef } from 'react';

const DRIVE_URL = 'https://drive.google.com/drive/folders/1vSUSzQp3RDq0ZJqyr-JFE09ERpyjcd2Q?usp=sharing';

export default function PoliciesSection() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) el.classList.add('vis'); },
      { threshold: 0.10, rootMargin: '0px 0px -28px 0px' }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  return (
    <div className="policies-band rv" ref={ref}>
      <p className="policies-label">Transparencia</p>
      <h2 className="policies-title">Políticas institucionales</h2>
      <p className="policies-desc">
        Consulta nuestros documentos de políticas y reglamentos vigentes.
      </p>
      <a
        href={DRIVE_URL}
        target="_blank"
        rel="noopener noreferrer"
        className="btn btn-ghost-dk"
      >
        Ver políticas →
      </a>
    </div>
  );
}
