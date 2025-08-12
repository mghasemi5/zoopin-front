import React, { useEffect, useState } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import './PartnersPage.css';
import { API_BASE } from '../config';

const mediaURL = (src) => {
  if (!src) return '';
  if (/^https?:\/\//i.test(src)) return src;
  return `${API_BASE.replace(/\/$/, '')}${src.startsWith('/') ? '' : '/'}${src}`;
};

const SkeletonGrid = ({ count = 8 }) => (
  <div className="loading-wrap">
    {Array.from({ length: count }).map((_, i) => (
      <div className="skeleton" key={i} />
    ))}
  </div>
);

const PartnersPage = () => {
  const [partners, setPartners] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`${API_BASE.replace(/\/$/, '')}/api/partners`)
      .then((res) => res.json())
      .then((data) => setPartners(Array.isArray(data) ? data : []))
      .catch((err) => console.error('Failed to load partners:', err))
      .finally(() => setLoading(false));
  }, []);

  return (
    <>
      <Header />
      <div className="partners-page">
        <div className="partners-header">
          <span className="partners-eyebrow">‌</span>
          <h1>Our Partners</h1>
          <p>Brands we build with—modern, scalable, and obsessed with quality.</p>
        </div>

        {loading ? (
          <SkeletonGrid />
        ) : (
          <div className="partners-grid">
            {partners.map((p, i) => (
              <a
                className="pp-card"
                href={p.link || '#'}
                key={`${p.name || 'partner'}-${i}`}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={p.name ? `Open ${p.name}` : 'Open partner site'}
              >
                <img
                  className="pp-media"
                  src={
                    mediaURL(p.image) ||
                    'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="600" height="750"><rect width="100%" height="100%" fill="%23e5e7eb"/><circle cx="300" cy="300" r="120" fill="%23cbd5e1"/><rect x="120" y="480" width="360" height="140" rx="12" fill="%23d1d5db"/></svg>'
                  }
                  alt={p.name || 'Partner'}
                  loading="lazy"
                />
                <div className="pp-overlay">
                  {p.name && <h3 className="pp-name">{p.name}</h3>}
                  {p.tagline && <p className="pp-tagline">{p.tagline}</p>}
                </div>
              </a>
            ))}
          </div>
        )}


      </div>
      <Footer />
    </>
  );
};

export default PartnersPage;
