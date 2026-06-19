import { useState } from 'react';
import Slider from '../components/Slider';
import NewsCard from '../components/NewsCard';
import DirectionModal from '../components/DirectionModal';
import NewsModal from '../components/NewsModal';
import { news, aboutInfo } from '../data/content';
import './Home.css';

const stats = [
  { value: aboutInfo.researchers, label: 'Науковців' },
  { value: aboutInfo.publications, label: 'Публікацій' },
  { value: aboutInfo.grants, label: 'Активних грантів' },
  { value: aboutInfo.partners, label: 'Партнерів світу' },
];

export default function Home() {
  const [selectedDirection, setSelectedDirection] = useState(null);
  const [selectedArticle, setSelectedArticle] = useState(null);

  return (
    <main>
      <Slider />

      {/* Stats strip */}
      <section className="stats-strip">
        <div className="container stats-strip__grid">
          {stats.map(({ value, label }) => (
            <div key={label} className="stat">
              <span className="stat__value">{value.toLocaleString()}+</span>
              <span className="stat__label">{label}</span>
            </div>
          ))}
        </div>
      </section>

      {/* Directions */}
      <section className="section directions">
        <div className="container">
          <p className="section-label">Чим ми займаємося</p>
          <h2 className="section-title">Напрями досліджень</h2>
          <div className="directions__grid">
            {aboutInfo.directions.map((dir) => (
              <button
                key={dir.title}
                className="direction-card direction-card--clickable"
                onClick={() => setSelectedDirection(dir)}
              >
                <span className="direction-card__icon">{dir.icon}</span>
                <h3 className="direction-card__title">{dir.title}</h3>
                <p className="direction-card__desc">{dir.desc}</p>
                <span className="direction-card__more">Детальніше →</span>
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* News */}
      <section className="section" id="news">
        <div className="container">
          <div className="section-header">
            <div>
              <p className="section-label">Що відбувається</p>
              <h2 className="section-title">Головні новини</h2>
            </div>
            <a href="/news" className="btn-outline">Всі новини</a>
          </div>
          <div className="news-grid">
            {news.map((article, i) => (
              <NewsCard
                key={article.id}
                article={article}
                featured={i === 0}
                onClick={() => setSelectedArticle(article)}
              />
            ))}
          </div>
        </div>
      </section>

      {/* CTA Banner */}
      <section className="cta-banner">
        <div className="container cta-banner__inner">
          <div>
            <h2 className="cta-banner__title">Станьте частиною наукової спільноти</h2>
            <p className="cta-banner__text">
              Відкритий набір до аспірантури 2026/2027. Подайте заявку до 1 серпня.
            </p>
          </div>
          <a href="/contacts" className="btn-primary">Зв'язатися з нами</a>
        </div>
      </section>

      {/* Modals */}
      {selectedDirection && (
        <DirectionModal
          direction={selectedDirection}
          onClose={() => setSelectedDirection(null)}
        />
      )}
      {selectedArticle && (
        <NewsModal
          article={selectedArticle}
          onClose={() => setSelectedArticle(null)}
        />
      )}
    </main>
  );
}
