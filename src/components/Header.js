import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import './Header.css';

export default function Header() {
  const location = useLocation();
  const isHome = location.pathname === '/';

  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    if (!isHome) return;
    const onScroll = () => {
      setScrolled(window.scrollY > window.innerHeight * 0.8);
    };
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, [isHome]);

  const solid = !isHome || scrolled;

  return (
    <header className={`header${solid ? ' header--solid' : ''}`}>
      <div className="header__inner">
        <div className="logo">
          <a href="/">
            <img src="/logo.png" alt="لوگوی زوپین" />
         
          </a>
        </div>
        <nav className="nav">
          <Link to="/about">درباره ما</Link>
          <Link to="/services">خدمات</Link>
          <Link to="/insights">مقالات</Link>
          <Link to="/partners">شرکا</Link>
        </nav>
      </div>
    </header>
  );
}
