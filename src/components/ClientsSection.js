import React, { useEffect, useState } from "react";
import "./ClientsSection.css";
import { API_BASE } from '../config';

const ClientsSection = () => {
  const [clients, setClients] = useState([]);

  useEffect(() => {
    fetch(`${API_BASE}/api/logos`)
      .then((res) => res.json())
      .then((data) => setClients(data))
      .catch((err) => console.error("Error loading client logos:", err));
  }, []);

  return (
    <section className="clients-section">

      <div className="clients-container">
        {clients.map((client, index) => (
          <div className="client-logo-box" key={index}>
            <img
              src={
                client.icon?.startsWith("http")
                  ? client.icon
                  : `http://127.0.0.1:8000/media/${client.icon}`
              }
              alt={client.description || "Client Logo"}
            />
            
          </div>
        ))}
      </div>
    </section>
  );
};

export default ClientsSection;
