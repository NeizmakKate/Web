import { Link } from 'react-router-dom';
import './Footer.css';

export default function Footer() {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer__grid">
          <div className="footer__brand">
            <div className="footer__logo">
              <div className="footer__logo-emblem">НЦ</div>
              <div>
                <div className="footer__logo-name">Науковий Центр</div>
                <div className="footer__logo-sub">Закладу Вищої Освіти</div>
              </div>
            </div>
            <p className="footer__desc">
              Провідна дослідницька інституція, що об'єднує понад 200 науковців
              у 12 спеціалізованих лабораторіях.
            </p>
            <div className="footer__social">
              <a href="#" aria-label="Facebook" className="footer__social-link">f</a>
              <a href="#" aria-label="Twitter" className="footer__social-link">𝕏</a>
              <a href="#" aria-label="YouTube" className="footer__social-link">▶</a>
            </div>
          </div>

          <div className="footer__col">
            <h4 className="footer__heading">Навігація</h4>
            <ul className="footer__links">
              <li><Link to="/">Головна</Link></li>
              <li><Link to="/about">Про центр</Link></li>
              <li><Link to="/gallery">Галерея</Link></li>
              <li><Link to="/news">Новини</Link></li>
              <li><Link to="/contacts">Контакти</Link></li>
            </ul>
          </div>

          <div className="footer__col">
            <h4 className="footer__heading">Напрями досліджень</h4>
            <ul className="footer__links">
              <li><a href="#">Квантова фізика</a></li>
              <li><a href="#">Біомедицина</a></li>
              <li><a href="#">Штучний інтелект</a></li>
              <li><a href="#">Нанотехнології</a></li>
              <li><a href="#">Відновлювана енергетика</a></li>
            </ul>
          </div>

          <div className="footer__col">
            <h4 className="footer__heading">Контакти</h4>
            <ul className="footer__contacts">
              <li>
                <span className="footer__contact-icon">📍</span>
                вул. Університетська, 1, м. Київ, 01601
              </li>
              <li>
                <span className="footer__contact-icon">📞</span>
                +38 (044) 123-45-67
              </li>
              <li>
                <span className="footer__contact-icon">✉</span>
                science@university.edu.ua
              </li>
            </ul>
          </div>
        </div>

        <div className="footer__bottom">
          <p>© {new Date().getFullYear()} Науковий центр ЗВО. Усі права захищені.</p>
          <p>Розроблено в рамках курсової роботи «Веб-програмування та веб-дизайн»</p>
        </div>
      </div>
    </footer>
  );
}
