import { aboutInfo } from '../data/content';
import './About.css';

export default function About() {
  return (
    <main className="page-main">
      <section className="page-hero">
        <div className="container">
          <p className="section-label">Хто ми</p>
          <h1 className="section-title">Про науковий центр</h1>
        </div>
      </section>

      <section className="about-section">
        <div className="container about-layout">
          <div className="about-text">
            <h2 className="about-heading">Місія та цінності</h2>
            <p className="about-para">
              Науковий центр Закладу Вищої Освіти — провідна дослідницька інституція,
              заснована у <strong>{aboutInfo.founded}</strong> році. Ми об'єднуємо понад{' '}
              <strong>{aboutInfo.researchers}</strong> науковців, аспірантів та молодих
              дослідників, які працюють у <strong>{aboutInfo.labs}</strong> спеціалізованих
              лабораторіях за напрямами природничих, технічних та гуманітарних наук.
            </p>
            <p className="about-para">
              Наша місія — генерувати нові знання, що змінюють світ, виховувати наступне
              покоління вчених та впроваджувати наукові розробки в реальний сектор економіки.
              За роки роботи ми опублікували понад <strong>{aboutInfo.publications}</strong> наукових
              праць та залучили <strong>{aboutInfo.grants}</strong> активних міжнародних грантів.
            </p>
            <p className="about-para">
              Ми тісно співпрацюємо з <strong>{aboutInfo.partners}</strong> міжнародними
              науковими установами з Європи, Америки та Азії, що забезпечує нашим дослідникам
              доступ до найсучасніших ресурсів та можливостей для обміну.
            </p>
          </div>
          <div className="about-stats-col">
            <div className="about-stat-card">
              <span className="about-stat-year">{aboutInfo.founded}</span>
              <span className="about-stat-label">Рік заснування</span>
            </div>
            <div className="about-fact">
              <strong>Акредитація</strong>
              <p>Центр акредитований Національною академією наук України та входить до мережі EuroScience.</p>
            </div>
            <div className="about-fact">
              <strong>Нагороди</strong>
              <p>Лауреат Державної премії України в галузі науки та техніки (2021).</p>
            </div>
          </div>
        </div>
      </section>

      <section className="directions-section">
        <div className="container">
          <p className="section-label">Наукові напрями</p>
          <h2 className="section-title" style={{ marginBottom: '48px' }}>Що ми досліджуємо</h2>
          <div className="directions-full-grid">
            {aboutInfo.directions.map(({ icon, title, desc }) => (
              <div key={title} className="direction-full-card">
                <div className="direction-full-card__header">
                  <span className="direction-full-card__icon">{icon}</span>
                  <h3>{title}</h3>
                </div>
                <p>{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
