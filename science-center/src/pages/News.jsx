import { useState } from 'react';
import { news } from '../data/content';
import NewsCard from '../components/NewsCard';
import NewsModal from '../components/NewsModal';
import './News.css';

const categories = ['Всі', ...new Set(news.map((n) => n.category))];

export default function News() {
  const [active, setActive] = useState('Всі');
  const [selectedArticle, setSelectedArticle] = useState(null);

  const filtered = active === 'Всі' ? news : news.filter((n) => n.category === active);

  return (
    <main className="page-main">
      <section className="page-hero">
        <div className="container">
          <p className="section-label">Актуальне</p>
          <h1 className="section-title">Новини центру</h1>
        </div>
      </section>

      <section className="news-page-section">
        <div className="container">
          <div className="news-filters">
            {categories.map((cat) => (
              <button
                key={cat}
                className={`news-filter-btn ${active === cat ? 'news-filter-btn--active' : ''}`}
                onClick={() => setActive(cat)}
              >
                {cat}
              </button>
            ))}
          </div>

          <p className="news-count">Знайдено: {filtered.length} матеріалів</p>

          <div className="news-page-grid">
            {filtered.map((article) => (
              <NewsCard
                key={article.id}
                article={article}
                onClick={() => setSelectedArticle(article)}
              />
            ))}
          </div>
        </div>
      </section>

      {selectedArticle && (
        <NewsModal
          article={selectedArticle}
          onClose={() => setSelectedArticle(null)}
        />
      )}
    </main>
  );
}
