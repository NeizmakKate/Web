import { useState } from 'react';
import { galleryImages } from '../data/content';
import './Gallery.css';

export default function Gallery() {
  const [lightbox, setLightbox] = useState(null);

  const open = (img) => setLightbox(img);
  const close = () => setLightbox(null);

  return (
    <main className="page-main">
      <section className="page-hero">
        <div className="container">
          <p className="section-label">Візуальна хроніка</p>
          <h1 className="section-title">Галерея</h1>
        </div>
      </section>

      <section className="gallery-section">
        <div className="container">
          <p className="gallery-intro">
            Наші лабораторії, наукові заходи та повсякдення наукового центру.
          </p>
          <div className="gallery-grid">
            {galleryImages.map((img) => (
              <button
                key={img.id}
                className="gallery-item"
                onClick={() => open(img)}
                aria-label={img.title}
              >
                <img src={img.src} alt={img.title} loading="lazy" />
                <div className="gallery-item__overlay">
                  <h3 className="gallery-item__title">{img.title}</h3>
                  <p className="gallery-item__desc">{img.desc}</p>
                </div>
              </button>
            ))}
          </div>
        </div>
      </section>

      {lightbox && (
        <div className="lightbox" onClick={close} role="dialog" aria-modal="true">
          <div className="lightbox__inner" onClick={(e) => e.stopPropagation()}>
            <button className="lightbox__close" onClick={close} aria-label="Закрити">✕</button>
            <img src={lightbox.src} alt={lightbox.title} />
            <div className="lightbox__caption">
              <strong>{lightbox.title}</strong>
              <p>{lightbox.desc}</p>
            </div>
          </div>
        </div>
      )}
    </main>
  );
}
