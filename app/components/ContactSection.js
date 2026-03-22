'use client';

import { useEffect, useRef, useState } from 'react';

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

// Clock SVG component
function ClockSVG() {
  const [mounted, setMounted] = useState(false);
  const [time, setTime] = useState(null);

  useEffect(() => {
    setMounted(true);
    setTime(new Date());
    const id = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(id);
  }, []);

  if (!mounted || !time) {
    return (
      <svg width="280" height="280" viewBox="0 0 280 280" fill="none" aria-label="Loading clock">
        <circle cx="140" cy="140" r="128" stroke="var(--border)" strokeWidth="1" fill="none" />
        <circle cx="140" cy="140" r="120" stroke="var(--border)" strokeWidth="0.5" fill="none" />
        <circle cx="140" cy="140" r="4" fill="var(--fg)" />
      </svg>
    );
  }

  const r = 120;
  const cx = 140;
  const cy = 140;
  const ticks = 60;

  const h = time.getHours() % 12;
  const m = time.getMinutes();
  const s = time.getSeconds();

  const secAngle = (s / 60) * 360 - 90;
  const minAngle = ((m + s / 60) / 60) * 360 - 90;
  const hrAngle = ((h + m / 60) / 12) * 360 - 90;

  const toRad = (deg) => (deg * Math.PI) / 180;
  const hand = (angle, len) => ({
    x: cx + len * Math.cos(toRad(angle)),
    y: cy + len * Math.sin(toRad(angle)),
  });

  const secEnd = hand(secAngle, r * 0.82);
  const minEnd = hand(minAngle, r * 0.72);
  const hrEnd = hand(hrAngle, r * 0.55);

  return (
    <svg
      width="280"
      height="280"
      viewBox="0 0 280 280"
      fill="none"
      aria-label="Analog clock"
      role="img"
    >
      {/* Outer circle */}
      <circle cx={cx} cy={cy} r={r + 8} stroke="var(--border)" strokeWidth="1" fill="none" />
      <circle cx={cx} cy={cy} r={r} stroke="var(--border)" strokeWidth="0.5" fill="none" />

      {/* Tick marks */}
      {Array.from({ length: ticks }).map((_, i) => {
        const angle = (i / ticks) * 360 - 90;
        const isMajor = i % 5 === 0;
        const inner = isMajor ? r - 10 : r - 5;
        const x1 = cx + inner * Math.cos(toRad(angle));
        const y1 = cy + inner * Math.sin(toRad(angle));
        const x2 = cx + r * Math.cos(toRad(angle));
        const y2 = cy + r * Math.sin(toRad(angle));
        return (
          <line
            key={i}
            x1={x1} y1={y1} x2={x2} y2={y2}
            stroke={isMajor ? 'var(--fg)' : 'var(--border)'}
            strokeWidth={isMajor ? 1.5 : 0.7}
          />
        );
      })}

      {/* Hour labels */}
      {[12, 3, 6, 9].map((num) => {
        const angle = ((num / 12) * 360 - 90);
        const lx = cx + (r - 22) * Math.cos(toRad(angle));
        const ly = cy + (r - 22) * Math.sin(toRad(angle));
        return (
          <text
            key={num}
            x={lx} y={ly}
            textAnchor="middle"
            dominantBaseline="middle"
            fontSize="9"
            fontFamily="var(--font-sans)"
            fontWeight="500"
            fill="var(--fg-light)"
          >
            {num}
          </text>
        );
      })}

      {/* Hour hand */}
      <line
        x1={cx} y1={cy}
        x2={hrEnd.x} y2={hrEnd.y}
        stroke="var(--fg)"
        strokeWidth="2.5"
        strokeLinecap="round"
        style={{ transition: 'all 0.5s cubic-bezier(0.4,0,0.2,1)' }}
      />

      {/* Minute hand */}
      <line
        x1={cx} y1={cy}
        x2={minEnd.x} y2={minEnd.y}
        stroke="var(--fg)"
        strokeWidth="1.8"
        strokeLinecap="round"
        style={{ transition: 'all 0.5s cubic-bezier(0.4,0,0.2,1)' }}
      />

      {/* Second hand */}
      <line
        x1={cx} y1={cy}
        x2={secEnd.x} y2={secEnd.y}
        stroke="var(--accent)"
        strokeWidth="1.2"
        strokeLinecap="round"
      />

      {/* Center dot */}
      <circle cx={cx} cy={cy} r="4" fill="var(--fg)" />
      <circle cx={cx} cy={cy} r="2" fill="var(--accent)" />
    </svg>
  );
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
    <section id="contact" aria-label="Contact" style={{ borderTop: '1px solid var(--border)' }}>
      {/* Works preview banner */}
      <div
        style={{
          borderBottom: '1px solid var(--border)',
          padding: '12px 28px',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          fontSize: '10px',
          color: 'var(--fg-light)',
          letterSpacing: '0.08em',
        }}
      >
        <span>SELECTED WORKS</span>
        <span
          style={{
            border: '1px solid var(--border)',
            borderRadius: '20px',
            padding: '4px 12px',
            fontSize: '9px',
            letterSpacing: '0.1em',
            fontWeight: 500,
          }}
        >
          VIEW ALL →
        </span>
      </div>

      {/* Works grid placeholder */}
      <div
        style={{
          borderBottom: '1px solid var(--border)',
          display: 'grid',
          gridTemplateColumns: '1fr 1fr 1fr 1fr',
          minHeight: '160px',
        }}
      >
        {['Brand Identity', 'UI Design', 'Development', 'Motion'].map((label, i) => (
          <div
            key={label}
            style={{
              borderRight: i < 3 ? '1px solid var(--border)' : 'none',
              padding: '24px 20px',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
              cursor: 'pointer',
              transition: 'background 0.2s ease',
            }}
            onMouseEnter={(e) => (e.currentTarget.style.background = 'rgba(0,0,0,0.02)')}
            onMouseLeave={(e) => (e.currentTarget.style.background = 'transparent')}
          >
            <span
              style={{
                fontSize: '9px',
                fontWeight: 600,
                letterSpacing: '0.12em',
                textTransform: 'uppercase',
                color: 'var(--fg-light)',
              }}
            >
              0{i + 1}
            </span>
            <div>
              <div
                style={{
                  fontSize: '12px',
                  fontWeight: 600,
                  marginBottom: '4px',
                }}
              >
                {label}
              </div>
              <div
                style={{
                  fontSize: '9px',
                  color: 'var(--fg-light)',
                }}
              >
                2024 — Present
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Contact layout */}
      <div className="contact-section">
        {/* Left: Clock */}
        <div className="contact-left">
          <ClockSVG />
        </div>

        {/* Right: Form */}
        <div
          className="contact-right"
          ref={formRef}
          style={{
            opacity: formVisible ? 1 : 0,
            transform: formVisible ? 'translateY(0)' : 'translateY(24px)',
            transition: 'opacity 0.7s ease, transform 0.7s ease',
          }}
        >
          <div className="contact-heading">
            <span className="lets">Let&apos;s</span>
            <h2>GET IN TOUCH</h2>
          </div>

          <form onSubmit={handleSubmit} aria-label="Contact form">
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
      </div>
    </section>
  );
}
