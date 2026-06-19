import { useEffect } from 'react';
import './DirectionModal.css';

export default function DirectionModal({ direction, onClose }) {
  useEffect(() => {
    const onKey = (e) => e.key === 'Escape' && onClose();
    document.addEventListener('keydown', onKey);
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', onKey);
      document.body.style.overflow = '';
    };
  }, [onClose]);

  return (
    <div className="dmodal-backdrop" onClick={onClose} role="dialog" aria-modal="true">
      <div className="dmodal" onClick={(e) => e.stopPropagation()}>
        <button className="dmodal__close" onClick={onClose} aria-label="Закрити">✕</button>

        <div className="dmodal__hero" style={{ backgroundImage: `url(${direction.image})` }}>
          <div className="dmodal__hero-overlay" />
          <div className="dmodal__hero-content">
            <span className="dmodal__icon">{direction.icon}</span>
            <h2 className="dmodal__title">{direction.title}</h2>
          </div>
        </div>

        <div className="dmodal__body">
          <p className="dmodal__desc">{direction.fullDesc}</p>

          <div className="dmodal__stats">
            <div className="dmodal__stat">
              <span className="dmodal__stat-value">{direction.researchers}</span>
              <span className="dmodal__stat-label">Науковців</span>
            </div>
            <div className="dmodal__stat">
              <span className="dmodal__stat-value">{direction.projects}</span>
              <span className="dmodal__stat-label">Активних проектів</span>
            </div>
            <div className="dmodal__stat">
              <span className="dmodal__stat-value">{direction.publications}</span>
              <span className="dmodal__stat-label">Публікацій</span>
            </div>
          </div>

          <div className="dmodal__highlights">
            <h3 className="dmodal__highlights-title">Ключові напрями</h3>
            <ul className="dmodal__highlights-list">
              {direction.highlights.map((h) => (
                <li key={h} className="dmodal__highlight-item">
                  <span className="dmodal__highlight-dot" />
                  {h}
                </li>
              ))}
            </ul>
          </div>

          <button className="btn-primary dmodal__cta" onClick={onClose}>
            Закрити
          </button>
        </div>
      </div>
    </div>
  );
}
