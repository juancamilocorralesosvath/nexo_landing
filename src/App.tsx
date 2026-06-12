import Navbar from './components/Navbar';
import HeroSection from './components/HeroSection';
import DiferenciadoresSection from './components/DiferenciadoresSection';
import ServicesSection from './components/ServicesSection';
import AboutSection from './components/AboutSection';
import JobsSection from './components/JobsSection';
import ProcessSection from './components/ProcessSection';
import CtaBand from './components/CtaBand';
import Footer from './components/Footer';
import WhatsAppButton from './components/WhatsAppButton';

export default function App() {
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
      </main>
      <Footer />
      <WhatsAppButton />
    </>
  );
}
