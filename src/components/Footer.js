import React from 'react';
import './Footer.css';

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer__top">
        {/* Logo & Tagline */}
        <div className="footer__col footer__col--brand">
          <img
            src="/assets/images/logo.png"
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
            <li><a href="/careers">services</a></li>
            <li><a href="/about">Contact</a></li>
          </ul>
        </div>


        <div className="footer__col">
          <h4>Connect</h4>
          <ul>
            <li><a href="mailto:inquiries@jumpassociates.com">contact@zoopin.co</a></li>
            <li><a href="tel:+989354384910">+98 935 438 4910</a></li>
            <li><a href="tel:+989021205666">+98 902 120 5666</a></li>
            
          </ul>
        </div>
      </div>


      <div className="footer__copy">
        © 2025 Zoopin corporation. All rights reserved.
      </div>
    </footer>
  );
}
