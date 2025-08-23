import React, { useEffect, useState } from "react";
import "./ServicesPage.css"; // uses your tokens/styles below
import { API_BASE as API_BASE_FROM_CONFIG } from "../config";

const API_BASE = API_BASE_FROM_CONFIG || "http://127.0.0.1:8000";

export default function ServicesPage() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [err, setErr] = useState(null);

  const endpoint = `${API_BASE}/api/services/?ordering=order,title`;

  const media = (p) => (!p ? "" : p.startsWith("http") ? p : `${API_BASE}${p}`);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        const res = await fetch(endpoint, { headers: { Accept: "application/json" } });
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        const data = await res.json();
        const arr = Array.isArray(data) ? data : (data?.results || []);
        if (!cancelled) setItems(arr);
      } catch (e) {
        if (!cancelled) setErr(e.message || String(e));
      } finally {
        if (!cancelled) setLoading(false);
      }
    })();
    return () => { cancelled = true; };
  }, [endpoint]);

  if (loading) {
    return (
      <div className="about-page">
        <div className="about-card"><h1>Our Services</h1><div className="about-skeleton" /></div>
      </div>
    );
  }
  if (err) {
    return (
      <div className="about-page">
        <div className="about-card"><h1>Our Services</h1><p className="error">{err}</p></div>
      </div>
    );
  }

  return (
    <div className="about-page">
      <div className="about-card services-wrap">
        <h1>Our services</h1>
        <div className="services-grid">
          {items.map((s) => {
            const href = `/services/${s.slug}`;
            return (
              <article className="service-card" key={s.id || s.slug}>
                {s.image && <img className="service-img" src={media(s.image)} alt={s.title} />}
                <div className="service-body">
                  <h3 className="service-title"><a href={href}>{s.title}</a></h3>
                  {s.description && <p className="service-desc">{s.description}</p>}
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </div>
  );
}
