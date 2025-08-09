// src/pages/HomePage.js
import React from 'react';
import Hero from '../components/Hero';
import Slider from '../components/Slider';
import InfoBlocks from '../components/InfoBlocks';
import ClientsSection from '../components/ClientsSection';
import ArticlesSection from '../components/ArticlesSection';
import TestimonialsSection from '../components/TestimonialsSection';

export default function HomePage() {
  return (
    <>
      <Hero />
      <Slider />
      <InfoBlocks />
      <ClientsSection />
      <ArticlesSection />
      <TestimonialsSection />
    </>
  );
}
