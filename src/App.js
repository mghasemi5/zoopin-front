import React, { useState, useEffect } from 'react';
import './App.css';
import Header from './components/Header';
import Slider from './components/Slider';
import InfoBlocks from './components/InfoBlocks';
import ClientsSection from './components/ClientsSection';
import PartnersSection from './components/PartnersSection';
import ArticlesSection from './components/ArticlesSection';
import TestimonialsSection from './components/TestimonialsSection';
import Footer from './components/Footer';
import { Routes, Route, useLocation } from 'react-router-dom';
import PartnersPage from './pages/PartnersPage';
import PartnerDetailPage from './pages/PartnerDetailPage';
import AdminPartnersPage from './cms/AdminPartnersPage';
import InsightsPage from './pages/InsightsPage';
import AboutPage from './pages/AboutPage';
import ServicesPage from './pages/ServicesPage';

function App() {
  const [isOnHero, setIsOnHero] = useState(true);
  const location = useLocation();
  const onPartnersPage = location.pathname === '/partners';

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const heroHeight = window.innerHeight;
      setIsOnHero(scrollY < heroHeight - 60);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="App">
      <Header faded={isOnHero && !onPartnersPage} />

      <Routes>
        <Route
          path="/"
          element={
            <>
              <Slider />
              <InfoBlocks />

              <PartnersSection />
              <TestimonialsSection />
              <ArticlesSection />
            </>
          }
        />
        <Route path="/partners" element={<PartnersPage />} />
        <Route path="/partners/:slug" element={<PartnerDetailPage />} />
        <Route path="/admin/partners" element={<AdminPartnersPage />} />
        <Route path="/insights" element={<InsightsPage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/services" element={<ServicesPage />} />

      </Routes>

      <Footer />
    </div>
  );
}

export default App;
