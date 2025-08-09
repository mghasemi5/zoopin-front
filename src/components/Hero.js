import React from 'react';
import './Hero.css';
import heroImage from '../assets/images/hero-bg.jpg';

function Hero() {
  return (
    <section className="hero" style={{ backgroundImage: `url(${heroImage})` }}>
      <div className="hero-overlay">
        <div className="hero-content">
          <h1>
            The strategy firm for <span className="highlight">future-focused</span> leaders.
          </h1>
          <a href="mailto:inquiries@jumpassociates.com" className="hero-button">
            Start a Conversation
          </a>
        </div>
      </div>
    </section>
  );
}

export default Hero;
