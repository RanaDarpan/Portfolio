import React, { useEffect } from 'react';
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
  useEffect(() => {
    const trackVisitor = async () => {
      // Check if already tracked in this session to avoid spam
      if (sessionStorage.getItem('visitor_tracked')) return;

      try {
        // Collect basic device info
        const browser = navigator.userAgent;
        const os = navigator.platform;

        // Try to get location based on IP using a free geoip API
        let locationData = {};
        try {
          const geoRes = await fetch('https://ipapi.co/json/');
          if (geoRes.ok) {
            locationData = await geoRes.json();
          }
        } catch (geoError) {
          console.warn('Geolocation fetch tracking failed', geoError);
        }

        // Post to our backend
        const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';
        await fetch(`${API_URL}/visitors`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            ip: locationData.ip || 'Unknown',
            city: locationData.city || 'Unknown',
            region: locationData.region || 'Unknown',
            country: locationData.country_name || 'Unknown',
            browser: browser,
            os: os
          }),
        });

        // Mark as tracked for this session
        sessionStorage.setItem('visitor_tracked', 'true');
      } catch (error) {
        console.error('Failed to log visitor:', error);
      }
    };

    trackVisitor();
  }, []);
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
