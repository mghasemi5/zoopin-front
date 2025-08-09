import React, { useEffect, useState } from 'react';
import './InfoBlocks.css';
import { API_BASE } from '../config';


const InfoBlocks = () => {
  const [blocks, setBlocks] = useState([]);

  useEffect(() => {
    fetch(`${API_BASE}api/info-blocks/`)
      .then(res => res.json())
      .then(data => setBlocks(data))
      .catch(err => console.error('Error loading InfoBlocks:', err));
  }, []);

  return (
    <section className="info-blocks">
      {blocks.map((block, index) => (
        <div className="info-card" key={index}>
          <div className="icon">
            <img
              src={block.icon.startsWith('http') ? block.icon : `http://127.0.0.1:8000${block.icon}`}
              alt={block.title}
            />
          </div>
          <h3>{block.title}</h3>
          <p>{block.description}</p>
        </div>
      ))}
    </section>
  );
};

export default InfoBlocks;
