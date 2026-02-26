
import React, { useState, useEffect } from 'react';
import Navigation from './components/Navigation';
import Hero from './components/Hero';
import PainPoints from './components/PainPoints';
import Services from './components/Services';
import TrustSection from './components/TrustSection';
import Portfolio from './components/Portfolio';
import ClosingManifesto from './components/ClosingManifesto';
import ConversionZone from './components/ConversionZone';
import Footer from './components/Footer';
import FloatingWhatsApp from '@/components/FloatingWhatsApp';
import StrategicChatbot from '@/components/StrategicChatbot';

const App: React.FC = () => {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="min-h-screen flex flex-col">
      <Navigation scrolled={scrolled} />
      
      <main className="flex-grow">
        <section id="inicio">
          <Hero />
        </section>

        <section id="metodologia" className="bg-gray-50">
          <PainPoints />
        </section>

        <section id="nosotros" className="bg-white">
          <TrustSection />
        </section>

        <section id="servicios">
          <Services />
        </section>

        <section id="portafolio" className="bg-gray-50">
          <Portfolio />
        </section>

        <ClosingManifesto />

        <section id="contacto">
          <ConversionZone />
        </section>
      </main>

      <Footer />
      <StrategicChatbot />
      <FloatingWhatsApp />
    </div>
  );
};

export default App;
