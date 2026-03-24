'use client';

import { useEffect, useRef, useState } from 'react';
import localFont from 'next/font/local';

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
      if (entry.isIntersecting) { setVisible(true); obs.disconnect(); }
    }, options);
    obs.observe(el);
    return () => obs.disconnect();
  }, []);
  return [ref, visible];
}

export default function ContactSection() {
  const [formRef, formVisible] = useIntersect({ threshold: 0.2 });
  const [formData, setFormData] = useState({ name: '', email: '', phone: '', message: '' });
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    setFormData((p) => ({ ...p, [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 3000);
  };

  return (
    <section id="contact" aria-label="Contact" style={{ borderTop: '1px solid var(--border)', height: '100vh', display: 'grid', gridTemplateColumns: '2fr 1fr 1fr', gridTemplateRows: '100vh' }}>

      <div
        className="contact-right"
        ref={formRef}
        style={{
          opacity: formVisible ? 1 : 0,
          transform: formVisible ? 'translateY(0)' : 'translateY(24px)',
          transition: 'opacity 0.7s ease, transform 0.7s ease',
          gridColumn: '2',
          gridRow: '1',
          border: '1px solid var(--border)',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
        }}
      >
        <div className='heading-container' style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', backgroundColor: 'blueviolet' }}>


          <div className={`my-text ${italicFont.className}`} style={{ fontSize: 'clamp(24px, 12vw, 56px)', fontWeight: 500, letterSpacing: '-0.04em', lineHeight: 1, textAlign: 'left', width: '100%', color: 'red', marginBottom: '12px' }}>
            Let's
          </div>
          <div className={`tool-text ${heroFont.className}`} style={{ fontSize: 'clamp(12px, 8vw, 30px)', fontWeight: 500, letterSpacing: '-0.01em', lineHeight: 1, textTransform: 'uppercase', textAlign: 'left', width: '100%' }}>
            GET IN TOUCH
          </div>
        </div>

        <form onSubmit={handleSubmit} aria-label="Contact form" style={{ backgroundColor: 'blue' }}>
          {[
            { id: 'name', label: 'Name', type: 'text', placeholder: 'Name' },
            { id: 'email', label: 'Email', type: 'email', placeholder: 'Email' },
            { id: 'phone', label: 'Phone', type: 'tel', placeholder: 'Phone' },
          ].map((field, i) => (
            <div
              key={field.id}
              className="form-group"
              style={{
                transitionDelay: `${i * 0.05}s`,
                opacity: formVisible ? 1 : 0,
                transform: formVisible ? 'translateY(0)' : 'translateY(16px)',
                transition: `opacity 0.6s ease ${0.1 + i * 0.07}s, transform 0.6s ease ${0.1 + i * 0.07}s`,
              }}
            >
              <label htmlFor={field.id} style={{ display: 'none' }}>{field.label}</label>
              <input
                id={field.id}
                name={field.id}
                type={field.type}
                placeholder={field.placeholder}
                value={formData[field.id]}
                onChange={handleChange}
                required
                aria-required="true"
              />
            </div>
          ))}

          <div
            className="form-group"
            style={{
              opacity: formVisible ? 1 : 0,
              transform: formVisible ? 'translateY(0)' : 'translateY(16px)',
              transition: 'opacity 0.6s ease 0.31s, transform 0.6s ease 0.31s',
            }}
          >
            <label htmlFor="message" style={{ display: 'none' }}>Message</label>
            <textarea
              id="message"
              name="message"
              placeholder="Message"
              value={formData.message}
              onChange={handleChange}
              required
              aria-required="true"
            />
          </div>

          <button
            type="submit"
            className="submit-btn"
            aria-label="Send message"
            style={{
              opacity: formVisible ? 1 : 0,
              transform: formVisible ? 'scale(1)' : 'scale(0.8)',
              transition: 'opacity 0.6s ease 0.4s, transform 0.6s ease 0.4s, background 0.2s ease',
              background: submitted ? 'var(--fg)' : 'transparent',
              color: submitted ? 'var(--bg)' : 'var(--fg)',
            }}
          >
            {submitted ? '✓' : '→'}
          </button>
        </form>
      </div>
    </section>
  );
}
