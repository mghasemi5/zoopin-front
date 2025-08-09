import React, { useEffect, useState } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import './PartnersPage.css';
import { Link } from 'react-router-dom';
import { API_BASE } from './config';

const PartnersPage = () => {
  const [partners, setPartners] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`${API_BASE}/api/partners`)
      .then(res => res.json())
      .then(data => {
        setPartners(data);
        setLoading(false);
      })
      .catch(err => {
        console.error('Failed to load partners:', err);
        setLoading(false);
      });
  }, []);

  return (
    <>
      <Header />
      <div className="partners-page">
        <div className="partners-header">
        <h1>‌‌ ‌‌‌‌‌‌‌‌‌‌‌‌</h1>
          <h1>Our Strategic Partners</h1>
          <p>We collaborate with global leaders to drive meaningful change.</p>
        </div>

        {loading ? (
          <p className="loading-text">Loading partners...</p>
        ) : (
          <div className="partners-grid">
            {partners.map((partner, index) => (
              <a
                href={partner.link}
                className="partner-card"
                key={index}
                target="_blank"
                rel="noopener noreferrer"
              >
                <img
                  src={partner.image?.startsWith('http') ? partner.image : `http://127.0.0.1:8000${partner.image}`}
                  alt={partner.name}
                />
                <h3>{partner.name}</h3>
                <p>{partner.tagline}</p>
                <p>{partner.description}</p>
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
