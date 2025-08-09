import React, { useEffect, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Autoplay } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import './Slider.css';
import { API_BASE } from './config';




function Slider() {
  const [slides, setSlides] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`${API_BASE}/api/slider/`)
      .then(res => {
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        return res.json();
      })
      .then(data => {
        const normalized = (Array.isArray(data) ? data : []).map(s => ({
          id: s.id,
          // your API already serves absolute URLs; keep a guard in case it changes
          image: s.image?.startsWith('http') ? s.image : `${API_BASE}${s.image || ''}`,
          caption: s.caption || '',
        }));
        setSlides(normalized);
        setLoading(false);
      })
      .catch(err => {
        console.error('Failed to load slider:', err);
        setSlides([]);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <div className="slider-container">
        <div className="slide loading">
          <div className="hero-overlay">
            <h1 className="hero-headline">Loading…</h1>
          </div>
        </div>
      </div>
    );
  }

  if (!slides.length) {
    return null; // or show a tasteful fallback
  }

  return (
    <div className="slider-container">
      <Swiper
        modules={[Navigation, Autoplay]}
        navigation
        loop
        autoplay={{ delay: 5000, disableOnInteraction: false }}
        spaceBetween={0}
        slidesPerView={1}
      >
        {slides.map(item => (
          <SwiperSlide key={item.id}>
            <div
              className="slide"
              style={{ backgroundImage: `url(${item.image})` }}
              role="img"
              aria-label={item.caption || 'Slide'}
            >
              {item.caption && (
                <div className="hero-overlay">
                  <h1 className="hero-headline">{item.caption}</h1>
                </div>
              )}
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}

export default Slider;
