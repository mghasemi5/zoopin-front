import React, { useEffect, useState } from 'react';
import './ArticlesSection.css';
import { API_BASE } from '../config';


export default function ArticlesSection() {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading]   = useState(true);
  const [error, setError]       = useState(null);

  useEffect(() => {
    fetch(`${API_BASE}/api/insights/`)
      .then(res => {
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        return res.json();
      })
      .then(data => {
        setArticles(Array.isArray(data) ? data : []);
        setLoading(false);
      })
      .catch(err => {
        console.error('Failed to load insights:', err);
        setError('Could not load insights.');
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <section className="articles-section">
        <h2 className="section-title">Featured Insights</h2>
        <p>Loading…</p>
      </section>
    );
  }

  if (error) {
    return (
      <section className="articles-section">
        <h2 className="section-title">Featured Insights</h2>
        <p className="error">{error}</p>
      </section>
    );
  }

  return (
    <section className="articles-section">
      <h2 className="section-title">Featured Insights</h2>
      <div className="articles-grid">
        {articles.slice(-4).map(a => {
          const imgSrc = a.image?.startsWith('http')
            ? a.image
            : `http://127.0.0.1:8000${a.image || ''}`;

          const readMoreHref = a.file?.startsWith('http')
            ? a.file
            : a.file
              ? `http://127.0.0.1:8000${a.file}`
              : '#';

          return (
            <div className="article-card" key={a.id}>
              {imgSrc && <img src={imgSrc} alt={a.title} className="article-img" />}
              <div className="article-body">
                <h3 className="article-title">
                  <a href={readMoreHref} target="_blank" rel="noopener noreferrer">
                    {a.title} 
                  </a>
                </h3>
                <p className="article-summary">{a.description}</p>
                <div className="article-footer">
                  {a.category && <span className="article-category">{a.category}</span>}
                  <a href={readMoreHref} className="read-more" target="_blank" rel="noopener noreferrer">
                    download
                  </a>
                </div>
              </div>
            </div>
          );
        })}
      </div>
      <a href="/insights" className="view-all-articles">
        View All Insights
      </a>
    </section>
  );
}
