'use client';

import { useEffect, useRef, useState } from 'react';
import ContactForm from './Form';
import CursorRadial from './CursorRadial';
import SocialLinks from './SocialLinks';

const year = new Date().getFullYear();

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
  }, []);

  return [ref, visible];
}

export default function ContactSection() {
  const [formRef, formVisible] = useIntersect({ threshold: 0.1 });

  return (
    <section
      id="contact"
      aria-label="Contact"
      className="contact-section-root"
    >
      {/* Left panel: radial clock + social links */}
      <div className="contact-left-panel">
        <CursorRadial />
        <SocialLinks />
      </div>

      {/* Center: footer copyright */}
      <div className="contact-center-panel">
        <footer className="footer-root" role="contentinfo">
          <span>© {year} Pridhu. All rights reserved.</span>
        </footer>
      </div>

      {/* Right panel: contact form */}
      <div
        ref={formRef}
        className="contact-right-panel"
        style={{
          opacity: formVisible ? 1 : 0,
          transform: formVisible ? 'translateY(0)' : 'translateY(24px)',
          transition: 'opacity 0.7s ease, transform 0.7s ease',
        }}
      >
        <ContactForm />
      </div>
    </section>
  );
}