import { useState, useEffect, useCallback } from 'react';
import { sliderSlides } from '../data/content';
import './Slider.css';

export default function Slider() {
  const [current, setCurrent] = useState(0);
  const [transitioning, setTransitioning] = useState(false);

  const go = useCallback((idx) => {
    if (transitioning) return;
    setTransitioning(true);
    setTimeout(() => {
      setCurrent(idx);
      setTransitioning(false);
    }, 300);
  }, [transitioning]);

  const next = useCallback(() => {
    go((current + 1) % sliderSlides.length);
  }, [current, go]);

  const prev = useCallback(() => {
    go((current - 1 + sliderSlides.length) % sliderSlides.length);
  }, [current, go]);

  useEffect(() => {
    const timer = setInterval(next, 5500);
    return () => clearInterval(timer);
  }, [next]);

  const slide = sliderSlides[current];

  return (
    <section className="slider">
      <div
        className={`slider__bg ${transitioning ? 'slider__bg--fade' : ''}`}
        style={{ backgroundImage: `url(${slide.image})` }}
      />
      <div className="slider__overlay" />

      <div className="container slider__content">
        <div className={`slider__text ${transitioning ? 'slider__text--fade' : ''}`}>
          <p className="section-label">{slide.subtitle}</p>
          <h1 className="slider__title">{slide.title}</h1>
          <p className="slider__desc">{slide.text}</p>
          <a href="#news" className="btn-primary">{slide.cta}</a>
        </div>
      </div>

      <div className="slider__controls">
        <button className="slider__arrow" onClick={prev} aria-label="Назад">
          ←
        </button>
        <div className="slider__dots">
          {sliderSlides.map((_, i) => (
            <button
              key={i}
              className={`slider__dot ${i === current ? 'slider__dot--active' : ''}`}
              onClick={() => go(i)}
              aria-label={`Слайд ${i + 1}`}
            />
          ))}
        </div>
        <button className="slider__arrow" onClick={next} aria-label="Далі">
          →
        </button>
      </div>

      <div className="slider__progress">
        <div
          className="slider__progress-bar"
          style={{ animationDuration: '5.5s', animationPlayState: transitioning ? 'paused' : 'running' }}
          key={current}
        />
      </div>
    </section>
  );
}
