import { useEffect, useRef, useState } from 'react';
import { services } from '../data/services';

export default function ServicesSection() {
  const [activeTab, setActiveTab] = useState(0);
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

  const current = services[activeTab];

  return (
    <section id="servicios">
      <div className="sec-hdr sec-hdr-border rv" ref={ref}>
        <h2 className="sec-title">Nuestros Servicios</h2>
        <div className="sec-tag">Servicios</div>
      </div>

      <div className="svc-wrapper rv">
        {/* Tab strip */}
        <div className="svc-tabs">
          {services.map((svc, i) => (
            <div
              key={svc.num}
              className={`svc-tab${i === activeTab ? ' active' : ''}`}
              onClick={() => setActiveTab(i)}
            >
              <span className="svc-tab-num">({String(i + 1).padStart(2, '0')})</span>
              <span className="svc-tab-label">{svc.tabLabel}</span>
            </div>
          ))}
        </div>

        {/* Panel */}
        <div className="svc-panel">
          <div className="svc-panel-img" data-hint={current.hint} />
          <div className="svc-panel-body">
            <div className="svc-panel-num">{current.num}</div>
            <div className="svc-panel-title">{current.title}</div>
            <div className="svc-panel-desc">{current.description}</div>
            <div className="svc-chips">
              {current.chips.map((chip) => (
                <span key={chip} className="svc-chip">{chip}</span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
