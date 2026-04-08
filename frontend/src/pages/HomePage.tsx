import React from 'react';
import Navbar from '../components/Navbar';
import Hero from '../components/Hero';
import About from '../components/About';
import Skills from '../components/Skills';
import Experience from '../components/Experience';
import Projects from '../components/Projects';
import CodingProfiles from '../components/CodingProfiles';
import Certifications from '../components/Certifications';
import Contact from '../components/Contact';
import Footer from '../components/Footer';
import ParticleBackground from '../components/ParticleBackground';

const HomePage = () => {
  return (
    <div style={{ position: 'relative', minHeight: '100vh', backgroundColor: 'var(--bg-primary)' }}>
      {/* Global particle network — fixed layer behind everything */}
      <ParticleBackground />

      {/* All page content sits above the particle canvas */}
      <div style={{ position: 'relative', zIndex: 1 }}>
        <Navbar />
        <Hero />
        <About />
        <Skills />
        <Experience />
        <CodingProfiles />
        <Projects />
        <Certifications />
        <Contact />
        <Footer />
      </div>
    </div>
  );
};

export default HomePage;
