'use client';

import { useEffect, useRef } from 'react';
import Loader from './components/Loader';
import CustomCursor from './components/CustomCursor';
import Navbar from './components/Navbar';
import HeroSection from './components/HeroSection';
import AboutSection from './components/AboutSection';
import ToolkitSection from './components/ToolkitSection';
import ContactSection from './components/ContactSection';

export default function Home() {
  const mainRef = useRef(null);

  // Intersection observer for scroll-triggered animations
  useEffect(() => {
    const els = document.querySelectorAll(
      '.animate-on-scroll, .animate-from-left, .animate-from-right, .animate-scale'
    );

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
          }
        });
      },
      { threshold: 0.12 }
    );

    els.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  return (
    <>
      <Loader />
      <CustomCursor />
      <Navbar />
      <main ref={mainRef} id="main-content" aria-label="Main content">
        <HeroSection />
        <AboutSection />
        <ToolkitSection />
        <ContactSection />
      </main>
      {/* <Footer /> */}
    </>
  );
}
