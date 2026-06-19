import { useState } from 'react';
import './Contacts.css';

const contacts = [
  { icon: '📍', label: 'Адреса', value: 'вул. Університетська, 1, м. Київ, 01601, Україна' },
  { icon: '📞', label: 'Телефон', value: '+38 (044) 123-45-67' },
  { icon: '📠', label: 'Факс', value: '+38 (044) 123-45-68' },
  { icon: '✉', label: 'Email', value: 'science@university.edu.ua' },
  { icon: '🕐', label: 'Години роботи', value: 'Пн–Пт: 9:00–18:00' },
];

export default function Contacts() {
  const [form, setForm] = useState({ name: '', email: '', subject: '', message: '' });
  const [sent, setSent] = useState(false);

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = (e) => {
    e.preventDefault();
    setSent(true);
    setForm({ name: '', email: '', subject: '', message: '' });
  };

  return (
    <main className="page-main">
      <section className="page-hero">
        <div className="container">
          <p className="section-label">Зв'яжіться з нами</p>
          <h1 className="section-title">Контакти</h1>
        </div>
      </section>

      <section className="contacts-section">
        <div className="container contacts-layout">
          {/* Info */}
          <div className="contacts-info">
            <h2 className="contacts-heading">Наші реквізити</h2>
            <ul className="contacts-list">
              {contacts.map(({ icon, label, value }) => (
                <li key={label} className="contacts-item">
                  <span className="contacts-item__icon">{icon}</span>
                  <div>
                    <span className="contacts-item__label">{label}</span>
                    <span className="contacts-item__value">{value}</span>
                  </div>
                </li>
              ))}
            </ul>

            <div className="contacts-departments">
              <h3 className="contacts-departments__title">Відділи</h3>
              {[
                { name: 'Відділ міжнародного співробітництва', email: 'international@university.edu.ua' },
                { name: 'Відділ грантів та фінансування', email: 'grants@university.edu.ua' },
                { name: 'Прес-служба', email: 'press@university.edu.ua' },
              ].map(({ name, email }) => (
                <div key={email} className="dept">
                  <strong>{name}</strong>
                  <a href={`mailto:${email}`}>{email}</a>
                </div>
              ))}
            </div>
          </div>

          {/* Form */}
          <div className="contacts-form-wrap">
            <h2 className="contacts-heading">Надіслати повідомлення</h2>
            {sent ? (
              <div className="contacts-success">
                <span className="contacts-success__icon">✓</span>
                <h3>Повідомлення надіслано!</h3>
                <p>Ми зв'яжемося з вами протягом 1–2 робочих днів.</p>
                <button className="btn-outline" onClick={() => setSent(false)}>
                  Надіслати ще
                </button>
              </div>
            ) : (
              <form className="contacts-form" onSubmit={handleSubmit}>
                <div className="form-row">
                  <div className="form-group">
                    <label htmlFor="name">Ваше ім'я *</label>
                    <input
                      id="name"
                      name="name"
                      type="text"
                      required
                      placeholder="Іван Іванченко"
                      value={form.name}
                      onChange={handleChange}
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="email">Email *</label>
                    <input
                      id="email"
                      name="email"
                      type="email"
                      required
                      placeholder="ivan@example.com"
                      value={form.email}
                      onChange={handleChange}
                    />
                  </div>
                </div>
                <div className="form-group">
                  <label htmlFor="subject">Тема</label>
                  <input
                    id="subject"
                    name="subject"
                    type="text"
                    placeholder="Тема звернення"
                    value={form.subject}
                    onChange={handleChange}
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="message">Повідомлення *</label>
                  <textarea
                    id="message"
                    name="message"
                    rows={6}
                    required
                    placeholder="Ваше повідомлення..."
                    value={form.message}
                    onChange={handleChange}
                  />
                </div>
                <button type="submit" className="btn-primary" style={{ width: '100%', justifyContent: 'center' }}>
                  Надіслати повідомлення
                </button>
              </form>
            )}
          </div>
        </div>
      </section>

      {/* Map */}
      <section className="map-section">
        <div className="container">
          <p className="section-label">Як нас знайти</p>
          <h2 className="section-title" style={{ marginBottom: '32px' }}>Ми на карті</h2>
        </div>
        <div className="map-wrapper">
          <iframe
            title="Карта наукового центру"
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2540.6557456432!2d30.517338776955217!3d50.45066197163754!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x40d4ce5bec2e2a6b%3A0x52e4e83cd28614bf!2z0JrQuNGX0LLRgdGM0LrQuNC5INC90LDRhtGW0L7QvdCw0LvRjNC90LjQuSDRg9C90ZbQstC10YDRgdC40YLQtdGC!5e0!3m2!1suk!2sua!4v1718000000000!5m2!1suk!2sua"
            width="100%"
            height="460"
            style={{ border: 0 }}
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          />
        </div>
      </section>
    </main>
  );
}
