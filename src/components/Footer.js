import React from 'react';
import './Footer.css';

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer__top">
        {/* Logo & Tagline */}
        <div className="footer__col footer__col--brand">
          <img
            src="/assets/images/logo-white.png"
            alt="Jump Associates Logo"
            className="footer__logo"
          />
          <p className="footer__tagline">
            Strategy &amp; innovation for future-focused leaders
          </p>
        </div>

        {/* Navigation Links */}
        <div className="footer__col">
          <h4>Company</h4>
          <ul>
            <li><a href="/about">About</a></li>
            <li><a href="/careers">Careers</a></li>
            <li><a href="/contact">Contact</a></li>
            <li><a href="/press">Press</a></li>
          </ul>
        </div>

        <div className="footer__col">
          <h4>Services</h4>
          <ul>
            <li><a href="/services/strategy">Strategy</a></li>
            <li><a href="/services/culture">Culture</a></li>
            <li><a href="/services/leadership">Leadership</a></li>
            <li><a href="/services/innovation">Innovation</a></li>
          </ul>
        </div>

        <div className="footer__col">
          <h4>Connect</h4>
          <ul>
            <li><a href="mailto:inquiries@jumpassociates.com">inquiries@jumpassociates.com</a></li>
            <li><a href="tel:+1234567890">+1 (234) 567-890</a></li>
            <li>1234 Innovation Drive<br/>San Francisco, CA</li>
          </ul>
        </div>
      </div>


      <div className="footer__copy">
        © 2025 Zoopin corporation. All rights reserved.
      </div>
    </footer>
  );
}
