import { useEffect, useRef, useState } from 'react';

const aboutData = [
  {
    title: 'Conectamos talento con oportunidades reales',
    body: 'Somos la agencia que gestiona todo el ciclo de contratación por ti. Tu empresa se enfoca en crecer; nosotros encontramos a las personas que lo hacen posible.',
  },
  {
    title: 'Proceso riguroso, resultados en tiempo récord',
    body: 'Desde el diagnóstico del perfil hasta la vinculación, cada paso está diseñado para reducir el tiempo de contratación sin sacrificar la calidad del candidato.',
  },
  {
    title: 'Transparencia y compromiso en cada proceso',
    body: 'Trabajamos con honestidad hacia empresas y candidatos por igual. Construimos relaciones de largo plazo basadas en la confianza y el respeto mutuo.',
  },
];

export default function AboutSection() {
  const [activeTab, setActiveTab] = useState(0);
  const [panelOpacity, setPanelOpacity] = useState(1);
  const [displayedIdx, setDisplayedIdx] = useState(0);
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

  const handleTabClick = (idx: number) => {
    if (idx === activeTab) return;
    setActiveTab(idx);
    setPanelOpacity(0);
    setTimeout(() => {
      setDisplayedIdx(idx);
      setPanelOpacity(1);
    }, 120);
  };

  const current = aboutData[displayedIdx];

  return (
    <section id="nosotros">
      <div className="about-panel rv" ref={ref}>
        <div className="about-img" />
        <div>
          <div className="about-label">Sobre Nosotros</div>
          <h2 className="about-title">Potencializa tu empresa con NEXO</h2>

          <div className="about-tab-strip">
            {['Misión', 'Método', 'Valores'].map((label, i) => (
              <button
                key={label}
                className={`about-tab${i === activeTab ? ' active' : ''}`}
                onClick={() => handleTabClick(i)}
              >
                {label}
              </button>
            ))}
          </div>

          <div className="about-tab-panel" style={{ opacity: panelOpacity }}>
            <div className="about-tab-panel-title">{current.title}</div>
            <div className="about-tab-panel-body">{current.body}</div>
          </div>

          <div className="btn-row" style={{ marginTop: 28 }}>
            <a href="#contacto" className="btn btn-gold">Conoce Más →</a>
            <a href="#servicios" className="btn btn-ghost-w">Ver Servicios</a>
          </div>
        </div>
      </div>
    </section>
  );
}
