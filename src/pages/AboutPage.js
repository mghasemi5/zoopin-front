// src/pages/AboutPage.jsx
import React, { useEffect, useState } from "react";
import "./AboutPage.css";
import { API_BASE as API_BASE_FROM_CONFIG } from "../config";

const API_BASE = API_BASE_FROM_CONFIG || "http://127.0.0.1:8000";

function AboutPage() {
  const [about, setAbout] = useState(null);
  const [loading, setLoading] = useState(true);
  const [err, setErr] = useState(null);
  const endpoint = `${API_BASE}/api/about/`;

  useEffect(() => {
    let cancelled = false;

    (async () => {
      try {
        const res = await fetch(endpoint, {
          headers: { Accept: "application/json" },
        });
        if (!res.ok) {
          const text = await res.text();
          throw new Error(`HTTP ${res.status} — ${text.slice(0, 300)}`);
        }
        const data = await res.json();
        const obj = Array.isArray(data) ? data[0] : data;
        if (!cancelled) {
          setAbout(obj || null);
          setErr(null);
        }
      } catch (e) {
        if (!cancelled) setErr(e.message || String(e));
      } finally {
        if (!cancelled) setLoading(false);
      }
    })();

    return () => {
      cancelled = true;
    };
  }, [endpoint]);

  const media = (path) =>
    !path ? "" : path.startsWith("http") ? path : `${API_BASE}${path}`;

  if (loading) return <div className="about-page">Loading...</div>;

  if (err) {
    return (
      <div className="about-page">
        <div className="about-card">
          <h1>About page error</h1>
          <pre style={{ whiteSpace: "pre-wrap" }}>{err}</pre>
          <p>
            <strong>Endpoint:</strong> {endpoint}
          </p>
        </div>
      </div>
    );
  }

  if (!about) {
    return (
      <div className="about-page">
        <div className="about-card">
          <h1>About page not found.</h1>
        </div>
      </div>
    );
  }

  return (
    <div className="about-page">
      {/* ABOUT SECTION */}
      <div className="about-card">
        {about.hero_image && (
          <img
            src={media(about.hero_image)}
            alt={about.title || "About"}
            className="about-hero"
          />
        )}
        <div className="about-info">
          {about.title && <h1>{about.title}</h1>}
          {about.tagline && <p className="tagline">{about.tagline}</p>}

          {/* ✅ Fixed body render */}
          {about.body &&
            (about.body_is_html ? (
              <div
                className="about-body is-html"
                dangerouslySetInnerHTML={{ __html: about.body }}
              />
            ) : (
              <div className="about-body">
                <p>{about.body}</p>
              </div>
            ))}

          {Array.isArray(about.highlights) && about.highlights.length > 0 && (
            <div className="about-highlights">
              {about.highlights.map((h, idx) => (
                <div className="highlight-card" key={idx}>
                  {h.title && <h3>{h.title}</h3>}
                  {h.text && <p>{h.text}</p>}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* CONTACT SECTION */}
      {about.contact && (
        <div className="contact-card">
          <h2>{about.contact.title || "Contact"}</h2>
          <div className="contact-grid">
            <div className="contact-left">
              {about.contact.email && (
                <p>
                  <strong>ایمیل: </strong>{" "}

                    {about.contact.email}

                </p>
              )}
              {about.contact.phone && (
                <p>
                  <strong>تلفن: </strong>{" "}

                    {about.contact.phone}

                </p>
              )}
              {about.contact.website && (
                <p>
                  <strong>وب سایت: </strong>{" "}
                  <a
                    href={about.contact.website}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {about.contact.website}
                  </a>
                </p>
              )}
       
              {Array.isArray(about.contact.social_links) &&
                about.contact.social_links.length > 0 && (
                  <div className="socials">
                    {about.contact.social_links.map((s, i) => (
                      <a
                        key={i}
                        href={s.url}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        {s.label || s.platform}
                      </a>
                    ))}
                  </div>
                )}
            </div>

            {about.contact.map_embed_url && (
              <div className="contact-right">
                <div className="map-embed-wrapper">
                  <iframe
                    title="Map"
                    src={about.contact.map_embed_url}
                    width="100%"
                    height="260"
                    style={{ border: 0 }}
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    allowFullScreen
                  />
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

export default AboutPage;
