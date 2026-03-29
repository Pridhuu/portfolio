'use client';

import { useEffect, useRef, useState } from 'react';
import ContactForm from './Form';
import localFont from 'next/font/local';
import CursorRadial from './CursorRadial';
import SocialLinks from './SocialLinks';


const year = new Date().getFullYear();

const heroFont = localFont({
  src: '../fonts/MyHeroFont.woff2',
  variable: '--font-hero',
});

const italicFont = localFont({
  src: '../fonts/MySelfFont.woff2',
  variable: '--font-italic',
});

function useIntersect(options) {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const obs = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setVisible(true);
        obs.disconnect();
      }
    }, options);

    obs.observe(el);
    return () => obs.disconnect();
  }, [options]);

  return [ref, visible];
}

export default function ContactSection() {
  const [formRef, formVisible] = useIntersect({ threshold: 0.2 });

  return (
    <section
      id="contact"
      aria-label="Contact"
      style={{
        borderTop: '1px solid #262626',
        height: '100vh',
        display: 'grid',
        gridTemplateColumns: '1fr 2fr 1fr 2fr 1fr',
      }}
    >

      <div
        style={{
          gridColumn: '2',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          gap: '42px',
        }}
      >
        <CursorRadial />
        <SocialLinks />
      </div>

      <div
        style={{
          gridColumn: '3',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'flex-end',
          alignItems: 'center',
          gap: '36px',
        }}
      >
        <footer className="footer-root" role="contentinfo">
          <span>© {year} Pridhu. All rights reserved.</span>
        </footer>
      </div>

      <div
        ref={formRef}
        style={{
          opacity: formVisible ? 1 : 0,
          transform: formVisible ? 'translateY(0)' : 'translateY(24px)',
          transition: 'opacity 0.7s ease, transform 0.7s ease',
          gridColumn: '4',
          borderLeft: '1px solid #262626',
          borderRight: '1px solid #262626',
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        <ContactForm />
      </div>
    </section>
  );
}