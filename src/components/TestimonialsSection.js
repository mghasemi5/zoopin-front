import React, { useEffect, useState, useMemo } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination, EffectFade } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/effect-fade';
import './TestimonialsSection.css';
import { API_BASE } from '../config';




export default function TestimonialsSection() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch & normalize (handles `qoute` typo, absolute/relative avatar)
  useEffect(() => {
    fetch(`${API_BASE}/api/testimonials/`)
      .then(res => {
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        return res.json();
      })
      .then(data => {
        const arr = Array.isArray(data) ? data : [data]; // tolerate single object
        const normalized = arr.map(x => ({
          quote: x.quote || x.qoute || '', // <-- fix API typo
          name: x.name || '',
          title: x.title || '',
          company: x.company || '',
          avatar: x.avatar?.startsWith('http') ? x.avatar : x.avatar ? `${API_BASE}${x.avatar}` : '',
        }));
        setItems(normalized);
        setLoading(false);
      })
      .catch(err => {
        console.error('Failed to load testimonials:', err);
        setItems([]);
        setLoading(false);
      });
  }, []);

  const hasData = items.length > 0;

  // For pagination bullets (use memo so renderBullet reads the latest)
  const bullets = useMemo(() => items, [items]);

  if (loading) {
    return (
      <section className="testimonials-section">
        <div className="testimonial-slide"><p className="quote">Loading…</p></div>
      </section>
    );
  }

  if (!hasData) {
    return (
      <section className="testimonials-section">
        <div className="testimonial-slide"><p className="quote">No testimonials yet.</p></div>
      </section>
    );
  }

  return (
    <section className="testimonials-section">
      <Swiper
        modules={[Autoplay, Pagination, EffectFade]}
        effect="fade"
        autoplay={{ delay: 5000, disableOnInteraction: false }}
        pagination={{
          clickable: true,
          renderBullet: (idx, className) => {
            const t = bullets[idx] || {};
            const avatar = t.avatar || '';
            const alt = t.name || `testimonial-${idx + 1}`;
            return `<span class="${className}"><img src="${avatar}" alt="${alt}" /></span>`;
          },
        }}
        loop
        className="testimonials-swiper"
      >
        {items.map((t, i) => (
          <SwiperSlide key={i}>
            <div className="testimonial-slide">
              <p className="quote">{t.quote}</p>
              <div className="author">
                {t.avatar && <img className="avatar" src={t.avatar} alt={t.name} />}
                <div className="author-info">
                  <span className="name">{t.name}</span>
                  <span className="title">
                    {t.title}{t.company ? `, ${t.company}` : ''}
                  </span>
                </div>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  );
}
