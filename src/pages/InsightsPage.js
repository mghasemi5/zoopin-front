// src/pages/InsightsPage.js
import React, { useEffect, useMemo, useState } from 'react';
import './InsightsPage.css';

import { API_BASE } from '../config';



export default function InsightsPage() {
  const [insights, setInsights] = useState([]);
  const [loading, setLoading]   = useState(true);
  const [error, setError]       = useState(null);
  const [category, setCategory] = useState('All');

  useEffect(() => {
    fetch(`${API_BASE}/api/insights/`)
      .then(res => {
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        return res.json();
      })
      .then(data => {
        setInsights(Array.isArray(data) ? data : []);
        setLoading(false);
      })
      .catch(err => {
        console.error('Failed to load insights:', err);
        setError('Could not load insights.');
        setLoading(false);
      });
  }, []);

  const categories = useMemo(() => {
    const set = new Set(insights.map(i => i.category).filter(Boolean));
    return ['All', ...Array.from(set)];
  }, [insights]);

  const filtered = useMemo(() => {
    if (category === 'All') return insights;
    return insights.filter(i => i.category === category);
  }, [insights, category]);

  if (loading) {
    return (
      <main className="insights-page">
        <h1 className="insights-title">Insights</h1>
        <p className="insights-status">Loading…</p>
      </main>
    );
  }

  if (error) {
    return (
      <main className="insights-page">
        <h1 className="insights-title">Insights</h1>
        <p className="insights-error">{error}</p>
      </main>
    );
  }

  return (
    <main className="insights-page">
      <header className="insights-header">
      <h1 className="insights-title">‌ </h1>
      <h1 className="insights-title">Insights</h1>
        <p className="insights-subtitle">Ideas, analyses, and field notes from our work.</p>
        <div className="insights-filters">
          {categories.map(cat => (
            <button
              key={cat}
              className={`filter-chip ${category === cat ? 'active' : ''}`}
              onClick={() => setCategory(cat)}
            >
              {cat}
            </button>
          ))}
        </div>
      </header>

      <section className="insights-grid">
        {filtered.map(item => {
          const imgSrc = item.image?.startsWith('http')
            ? item.image
            : `${API_BASE}${item.image || ''}`;
          const href = item.file?.startsWith('http')
            ? item.file
            : item.file ? `${API_BASE}${item.file}` : '#';

        return (
          <article className="insight-card" key={item.id}>
            {imgSrc && <img className="insight-img" src={imgSrc} alt={item.title} />}
            <div className="insight-body">
              <div className="insight-meta">
                {item.category && <span className="insight-category">{item.category}</span>}
              </div>
              <h3 className="insight-title">{item.title}</h3>
              <p className="insight-desc">{item.description}</p>
              {href !== '#' && (
                <a className="insight-link" href={href} target="_blank" rel="noopener noreferrer">
                  Download
                </a>
              )}
            </div>
          </article>
        )})}
      </section>

      {filtered.length === 0 && (
        <p className="insights-empty">No insights in this category yet.</p>
      )}
    </main>
  );
}
