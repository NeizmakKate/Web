import { useEffect } from 'react';
import './NewsModal.css';

export default function NewsModal({ article, onClose }) {
  useEffect(() => {
    const onKey = (e) => e.key === 'Escape' && onClose();
    document.addEventListener('keydown', onKey);
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', onKey);
      document.body.style.overflow = '';
    };
  }, [onClose]);

  const date = new Date(article.date).toLocaleDateString('uk-UA', {
    day: 'numeric', month: 'long', year: 'numeric',
  });

  return (
    <div className="nmodal-backdrop" onClick={onClose} role="dialog" aria-modal="true">
      <div className="nmodal" onClick={(e) => e.stopPropagation()}>
        <button className="nmodal__close" onClick={onClose} aria-label="Закрити">✕</button>

        <div className="nmodal__img-wrap">
          <img src={article.image} alt={article.title} />
          <div className="nmodal__img-overlay" />
          <span className="nmodal__category">{article.category}</span>
        </div>

        <div className="nmodal__body">
          <div className="nmodal__meta">
            <time className="nmodal__date">{date}</time>
            {article.author && <span className="nmodal__author">Автор: {article.author}</span>}
            {article.readTime && <span className="nmodal__read-time">⏱ {article.readTime} читання</span>}
          </div>

          <h2 className="nmodal__title">{article.title}</h2>

          <div className="nmodal__content">
            {article.content
              ? article.content.split('\n\n').map((para, i) => (
                  <p key={i}>{para}</p>
                ))
              : <p>{article.excerpt}</p>
            }
          </div>

          <div className="nmodal__footer">
            <button className="btn-outline" onClick={onClose}>← Назад до новин</button>
          </div>
        </div>
      </div>
    </div>
  );
}
