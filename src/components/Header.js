import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import './Header.css';

export default function Header() {
  const location = useLocation();
  const isHome = location.pathname === '/';

  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    if (!isHome) return;                   // only listen on home
    const onScroll = () => {
      setScrolled(window.scrollY > window.innerHeight * 0.8);
    };
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, [isHome]);

  // if we’re not on the home page, always show solid.
  const solid = !isHome || scrolled;

  return (
    <header className={`header${solid ? ' header--solid' : ''}`}>
      <div className="header__inner">
        <div className="logo">
          <Link to="/">Zoopin</Link>
        </div>
        <nav className="nav">
          <Link to="/">About</Link>
          <Link to="/services">Services</Link>
          <Link to="/insights">Insights</Link>
          <Link to="/partners">Partners</Link>
        </nav>
      </div>
    </header>
  );
}
