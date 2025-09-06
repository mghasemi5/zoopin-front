import React from 'react';
import './Footer.css';

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer__top">
        {/* Logo & Tagline */}
        <div className="footer__col footer__col--brand">
          <img
            src="/logo.png"
            alt="Jump Associates Logo"
            className="footer__logo"
          />
          <p className="footer__tagline">
            همراه همیشگی
          </p>
        </div>

        {/* Navigation Links */}
        <div className="footer__col">
          <h4>شرکت</h4>
          <ul>
            <li><a href="/about">درباره ما</a></li>
            <li><a href="/services">خدمات</a></li>
            <li><a href="/about">تماس</a></li>
          </ul>
        </div>


        <div className="footer__col">
          <h4>تماس</h4>
          <ul>
            <li><a href="mailto:contact@zoopin.com">contact@zoopin.co</a></li>
            
          </ul>
        </div>
      </div>


      <div className="footer__copy">
        © 2025 Zoopin corporation. All rights reserved.
      </div>
    </footer>
  );
}
