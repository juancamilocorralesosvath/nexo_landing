import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import Navbar from '../components/Navbar';
import HeroSection from '../components/HeroSection';
import DiferenciadoresSection from '../components/DiferenciadoresSection';
import ServicesSection from '../components/ServicesSection';
import AboutSection from '../components/AboutSection';
import JobsSection from '../components/JobsSection';
import ProcessSection from '../components/ProcessSection';
import CtaBand from '../components/CtaBand';
import PoliciesSection from '../components/PoliciesSection';
import Footer from '../components/Footer';
import WhatsAppButton from '../components/WhatsAppButton';

export default function HomePage() {
  const { hash } = useLocation();

  // Al llegar con un ancla (p. ej. /#servicios desde otra página), desplázate a la sección.
  useEffect(() => {
    if (!hash) return;
    const el = document.querySelector(hash);
    if (el) setTimeout(() => el.scrollIntoView({ behavior: 'smooth' }), 60);
  }, [hash]);

  return (
    <>
      <Navbar />
      <main>
        <HeroSection />
        <DiferenciadoresSection />
        <ServicesSection />
        <AboutSection />
        <JobsSection />
        <ProcessSection />
        <CtaBand />
        <PoliciesSection />
      </main>
      <Footer />
      <WhatsAppButton />
    </>
  );
}
