// src/components/PartnersSection.jsx
import React, { useEffect, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay, A11y } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import './PartnersSection.css';
import { API_BASE } from '../config';


// Change this later to an env var if you want:
// Vite: import.meta.env.VITE_API_BASE
const mediaURL = (img) => {
  if (!img) return '';
  if (/^https?:\/\//i.test(img)) return img;            // full URL already
  if (img.startsWith('/media/')) return `${API_BASE}${img}`;
  return `${API_BASE}/media/${img}`;                    // bare/relative path
};

const PartnersSection = () => {
  const [partners, setPartners] = useState([]);
  const [loading, setLoading] = useState(true);
  const [err, setErr] = useState('');

  useEffect(() => {
    const ctrl = new AbortController();
    (async () => {
      try {
        const res = await fetch(`${API_BASE}/api/partners/`, { signal: ctrl.signal });
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        const data = await res.json();
        setPartners(Array.isArray(data) ? data : []);
      } catch (e) {
        console.error('Error fetching partners:', e);
        setErr('Could not load partners.');
      } finally {
        setLoading(false);
      }
    })();
    return () => ctrl.abort();
  }, []);

  const slides = loading ? Array.from({ length: 6 }) : partners;

  return (
    <section className="partners-section">
      <div  className="partners-container">
        <h2 className="section-title">شرکای ما</h2>
      

        <Swiper
          modules={[Navigation, Pagination, Autoplay, A11y]}
          spaceBetween={18}
          slidesPerView={1.15}
          breakpoints={{
            520:  { slidesPerView: 2.2 },
            768:  { slidesPerView: 3.2 },
            1024: { slidesPerView: 4.2 },
          }}
          autoplay={{ delay: 2800, disableOnInteraction: false, pauseOnMouseEnter: true }}
          navigation
          pagination={{ clickable: true }}
          className="partners-swiper"
          aria-label="Partners carousel"
        >
          {slides.map((partner, idx) => (
            <SwiperSlide key={partner?.id ?? idx}>
              {loading ? (
                <div className="skel" aria-hidden="true" />
              ) : (
                <a
                  className="partner-card"
                  href={partner.link || '#'}
                  target="_blank"
                  rel="noopener noreferrer nofollow"
                  aria-label={`Open ${partner.name}`}
                >
                  

                  <img
                    loading="lazy"
                    decoding="async"
                    alt={partner.name ?? 'Partner'}
                    src={mediaURL(partner.image)}
                  />

                  <div className="partner-overlay">
                    <div className="partner-name">{partner.name}</div>
                    {partner.tagline ? (
                      <p className="partner-tag">{partner.tagline}</p>
                    ) : null}
                  </div>
                </a>
              )}
            </SwiperSlide>
          ))}
        </Swiper>

        {err && <p style={{ color: '#ef4444', marginTop: 8 }}>{err}</p>}

        <div className="view-all-wrap">
          <a className="view-all-button" href="/partners" aria-label="View all partners">
            دیدن همه
          </a>
        </div>
      </div>
    </section>
  );
};

export default PartnersSection;
