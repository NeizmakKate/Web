import './NewsCard.css';

export default function NewsCard({ article, featured = false, onClick }) {
  const date = new Date(article.date).toLocaleDateString('uk-UA', {
    day: 'numeric', month: 'long', year: 'numeric',
  });

  return (
    <article className={`news-card ${featured ? 'news-card--featured' : ''}`}>
      <div className="news-card__img-wrap">
        <img src={article.image} alt={article.title} loading="lazy" />
        <span className="news-card__category">{article.category}</span>
      </div>
      <div className="news-card__body">
        <time className="news-card__date">{date}</time>
        <h3 className="news-card__title">{article.title}</h3>
        <p className="news-card__excerpt">{article.excerpt}</p>
        <button className="news-card__link" onClick={onClick}>
          Читати далі <span>→</span>
        </button>
      </div>
    </article>
  );
}
