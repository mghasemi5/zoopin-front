import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import './PartnerDetailPage.css';
import { API_BASE } from '../config';


function PartnerDetailPage() {
  const { slug } = useParams();
  const [partner, setPartner] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`${API_BASE}/api/partners/?slug=${slug}`)
      .then((res) => res.json())
      .then((data) => {
        if (data.length > 0) {
          setPartner(data[0]);
        } else {
          setPartner(null);
        }
        setLoading(false);
      })
      .catch((err) => {
        console.error('Error fetching partner:', err);
        setPartner(null);
        setLoading(false);
      });
  }, [slug]);

  if (loading) {
    return <div className="partner-page">Loading...</div>;
  }

  if (!partner) {
    return <div className="partner-not-found">Partner not found.</div>;
  }

  return (
    <div className="partner-page">
      <div className="partner-card2">
        <img
          src={partner.image?.startsWith('http') ? partner.image : `http://127.0.0.1:8000${partner.image}`}
          alt={partner.name}
          className="partner-image"
        />
        <div className="partner-info">
          <h1>{partner.name}</h1>
          <p className="tagline">{partner.tagline}</p>
          <p className="bio">{partner.bio}</p>
          <div className="contact-info">
            <h2>اطلاعات تماس</h2>
            <p><strong>Email:</strong> {partner.email}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default PartnerDetailPage;
