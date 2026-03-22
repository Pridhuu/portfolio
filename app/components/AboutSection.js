'use client';

import { useEffect, useRef, useState } from 'react';

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

// Animated counter
function Counter({ value, suffix = '', prefix = '' }) {
  const [count, setCount] = useState(0);
  const [ref, visible] = useIntersect({ threshold: 0.3 });

  useEffect(() => {
    if (!visible) return;
    const end = parseInt(value);
    const duration = 1600;
    const step = end / (duration / 16);
    let current = 0;
    const timer = setInterval(() => {
      current = Math.min(current + step, end);
      setCount(Math.floor(current));
      if (current >= end) clearInterval(timer);
    }, 16);
    return () => clearInterval(timer);
  }, [visible, value]);

  return (
    <span ref={ref}>
      {prefix}{count}{suffix}
    </span>
  );
}

const SKILLS = [
  { name: 'UI/UX Design', pct: 0.92 },
  { name: 'Branding', pct: 0.85 },
  { name: 'Frontend Dev', pct: 0.80 },
];

const SOCIAL_LINKS = [
  {
    name: 'LinkedIn',
    href: 'https://linkedin.com/in/pridhuu',
    icon: (
      <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
      </svg>
    ),
  },
  {
    name: 'Github',
    href: 'https://github.com/Pridhuu',
    icon: (
      <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
      </svg>
    ),
  },
  {
    name: 'Leetcode',
    href: 'https://leetcode.com/pridhuu',
    icon: (
      <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
        <path d="M13.483 0a1.374 1.374 0 0 0-.961.438L7.116 6.226l-3.854 4.126a5.266 5.266 0 0 0-1.209 2.104 5.35 5.35 0 0 0-.125.513 5.527 5.527 0 0 0 .062 2.362 5.83 5.83 0 0 0 .349 1.017 5.938 5.938 0 0 0 1.271 1.818l4.277 4.193.039.038c2.248 2.165 5.852 2.133 8.063-.074l2.396-2.392c.54-.54.54-1.414.003-1.955a1.378 1.378 0 0 0-1.951-.003l-2.396 2.392a3.021 3.021 0 0 1-4.205.038l-.02-.019-4.276-4.193c-.652-.64-.972-1.469-.948-2.263a2.68 2.68 0 0 1 .066-.523 2.545 2.545 0 0 1 .619-1.164L9.13 8.114c1.058-1.134 3.204-1.27 4.43-.278l3.501 2.831c.593.48 1.461.387 1.94-.207a1.384 1.384 0 0 0-.207-1.943l-3.5-2.831c-.8-.647-1.766-1.045-2.774-1.202l2.015-2.158A1.384 1.384 0 0 0 13.483 0zm-2.866 12.815a1.38 1.38 0 0 0-1.38 1.382 1.38 1.38 0 0 0 1.38 1.382H20.79a1.38 1.38 0 0 0 1.38-1.382 1.38 1.38 0 0 0-1.38-1.382z" />
      </svg>
    ),
  },
  {
    name: 'Behance',
    href: 'https://behance.net/pridhuu',
    icon: (
      <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
        <path d="M7.803 5.731c.589 0 1.119.051 1.605.155.483.103.895.273 1.243.508.343.235.611.547.804.939.190.391.286.871.286 1.437 0 .619-.14 1.143-.421 1.575-.279.434-.682.779-1.207 1.04.735.214 1.28.598 1.638 1.15.360.553.540 1.224.540 2.008 0 .633-.117 1.175-.353 1.634-.235.460-.556.832-.964 1.118-.411.287-.888.494-1.437.626-.549.13-1.12.196-1.712.196H0V5.731h7.803zm-.463 4.863c.482 0 .878-.119 1.186-.357.308-.238.462-.609.462-1.109 0-.267-.047-.492-.143-.678-.095-.186-.228-.339-.398-.459-.169-.120-.367-.205-.591-.256-.226-.051-.467-.076-.726-.076H2.874v2.935h4.466zm.241 5.084c.289 0 .562-.029.820-.086.258-.056.484-.153.677-.289.192-.136.346-.317.461-.543.115-.225.172-.509.172-.852 0-.678-.19-1.165-.568-1.462-.378-.295-.882-.444-1.512-.444H2.874v3.676h4.707zm9.516-8.678h5.787v1.167h-5.787V6.999zm-.191 3.833c0-.54.079-1.029.235-1.469.157-.440.386-.823.687-1.148.303-.325.669-.576 1.098-.751.428-.175.910-.263 1.441-.263.791 0 1.477.151 2.057.453.58.301 1.054.705 1.423 1.211.369.506.633 1.083.792 1.733.159.651.216 1.327.172 2.028h-5.824c0 .682.19 1.226.57 1.633.379.407.894.608 1.542.608.669 0 1.214-.149 1.637-.449.421-.3.671-.753.749-1.359h2.536c-.197.993-.661 1.752-1.394 2.277-.732.524-1.622.787-2.669.787-.726 0-1.382-.121-1.966-.362-.585-.241-1.075-.58-1.473-1.019-.4-.438-.703-.962-.912-1.571-.208-.61-.313-1.284-.313-2.021v.001zm2.594-1.225h3.192c-.05-.657-.24-1.167-.572-1.527-.332-.361-.831-.54-1.496-.54-.54 0-1.029.079-1.469.235-.44.157-.823.386-1.148.687.324-.308.838-.522 1.493-.528v-.327z" />
      </svg>
    ),
  },
];

export default function AboutSection() {
  const skillRefs = useRef([]);
  const [skillsRef, skillsVisible] = useIntersect({ threshold: 0.3 });
  const [aboutRef, aboutVisible] = useIntersect({ threshold: 0.2 });

  useEffect(() => {
    if (skillsVisible) {
      skillRefs.current.forEach((el, i) => {
        setTimeout(() => {
          if (el) el.classList.add('animated');
        }, i * 150);
      });
    }
  }, [skillsVisible]);

  return (
    <section id="about" aria-label="About Me">
      {/* Stats bento row */}
      <div className="bento-grid" style={{ gridTemplateColumns: 'repeat(4, 1fr)' }}>
        {/* Client Satisfaction */}
        <div
          className={`bento-cell animate-on-scroll${aboutVisible ? ' visible' : ''}`}
          ref={aboutRef}
          style={{ transitionDelay: '0s' }}
        >
          <div className="bento-label">Client Satisfaction</div>
          <div className="bento-desc" style={{ fontSize: '9px', marginBottom: '12px' }}>
            We treat our clients as if they're our friends, curating personalized solutions.
          </div>
        </div>

        {/* About Me label */}
        <div className={`bento-cell animate-on-scroll${aboutVisible ? ' visible' : ''}`} style={{ transitionDelay: '0.1s' }}>
          <div
            style={{
              fontSize: '9px',
              fontWeight: 600,
              letterSpacing: '0.18em',
              textTransform: 'uppercase',
              color: 'var(--fg-light)',
            }}
          >
            ABOUT ME
          </div>
          <div className="skill-bar-wrap" ref={skillsRef}>
            {SKILLS.map((sk, i) => (
              <div className="skill-bar" key={sk.name}>
                <span className="skill-name">{sk.name}</span>
                <div className="skill-bar-track">
                  <div
                    ref={(el) => (skillRefs.current[i] = el)}
                    className="skill-bar-fill"
                    style={{ width: `${sk.pct * 100}%` }}
                  />
                </div>
                <span className="skill-pct">{Math.round(sk.pct * 100)}%</span>
              </div>
            ))}
          </div>
        </div>

        {/* I'm PRIDHU */}
        <div
          className={`bento-cell animate-on-scroll${aboutVisible ? ' visible' : ''}`}
          style={{ transitionDelay: '0.2s', gridColumn: 'span 2', borderRight: 'none' }}
        >
          <span className="im-pridhu-label">I&apos;m</span>
          <div className="im-pridhu-name">PRIDHU</div>
          <p className="about-description">
            a designer and developer who loves transforming ideas into meaningful digital experiences across UI/UX design with functional development. I strive to push creativity and constant learning to close to create products that not only look great but also solve real problems and elevate experiences powered by technology.
          </p>
        </div>
      </div>

      {/* Stats row 2 */}
      <div className="bento-grid" style={{ gridTemplateColumns: 'repeat(4, 1fr)' }}>
        {/* 98% */}
        <div className={`bento-cell animate-on-scroll${aboutVisible ? ' visible' : ''}`} style={{ transitionDelay: '0.05s' }}>
          <div className="bento-value">
            <Counter value={98} suffix="%" />
          </div>
          <div className="bento-label" style={{ marginTop: '4px' }}>Client Satisfaction</div>
        </div>

        {/* Frontend Developing */}
        <div className={`bento-cell animate-on-scroll${aboutVisible ? ' visible' : ''}`} style={{ transitionDelay: '0.15s' }}>
          <div className="bento-label">Frontend Developing</div>
          <div className="bento-desc">
            Building responsive, accessible interfaces from scratch with modern web technologies.
          </div>
        </div>

        {/* UI/UX */}
        <div className={`bento-cell animate-on-scroll${aboutVisible ? ' visible' : ''}`} style={{ transitionDelay: '0.25s' }}>
          <div className="bento-label">UI/UX Designing</div>
          <div className="bento-desc">
            Crafting intuitive experiences through user research, prototyping, and interaction design.
          </div>
        </div>

        {/* Social links */}
        <div
          className={`bento-cell animate-on-scroll${aboutVisible ? ' visible' : ''}`}
          style={{ transitionDelay: '0.35s', padding: 0, borderRight: 'none' }}
        >
          {SOCIAL_LINKS.map((link) => (
            <a
              key={link.name}
              href={link.href}
              target="_blank"
              rel="noopener noreferrer"
              className="social-link-row"
              aria-label={`Open ${link.name} profile`}
            >
              <span className="social-link-name">
                {link.icon}
                {link.name}
              </span>
              <span className="social-arrow">↗</span>
            </a>
          ))}
        </div>
      </div>

      {/* Stats numbers row */}
      <div className="bento-grid" style={{ gridTemplateColumns: 'repeat(4, 1fr)' }}>
        <div style={{ gridColumn: 'span 2', display: 'grid', gridTemplateColumns: '1fr 1fr', borderBottom: '1px solid var(--border)' }}>
          <div className={`bento-cell animate-on-scroll${aboutVisible ? ' visible' : ''}`} style={{ transitionDelay: '0.1s', borderBottom: 'none' }}>
            <div className="bento-value">
              <Counter value={4} suffix="+" />
            </div>
            <div className="bento-label" style={{ marginTop: '4px' }}>Years Experience</div>
          </div>
          <div className={`bento-cell animate-on-scroll${aboutVisible ? ' visible' : ''}`} style={{ transitionDelay: '0.2s', borderBottom: 'none' }}>
            <div className="bento-value">
              <Counter value={10} suffix="+" />
            </div>
            <div className="bento-label" style={{ marginTop: '4px' }}>Projects Completed</div>
          </div>
        </div>

        {/* Toolkit label */}
        <div
          className={`bento-cell animate-on-scroll${aboutVisible ? ' visible' : ''}`}
          style={{ transitionDelay: '0.3s', gridColumn: 'span 2', borderRight: 'none', borderBottom: 'none' }}
        >
          <span
            style={{
              fontFamily: 'var(--font-script)',
              color: 'var(--accent)',
              fontSize: '28px',
              display: 'block',
              lineHeight: 1,
            }}
          >
            My
          </span>
          <div
            style={{
              fontFamily: 'var(--font-sans)',
              fontSize: 'clamp(28px, 5vw, 56px)',
              fontWeight: 900,
              letterSpacing: '-0.04em',
              lineHeight: 0.9,
              textTransform: 'uppercase',
            }}
          >
            TOOLKIT
          </div>
          <p
            style={{
              fontSize: '10px',
              color: 'var(--fg-light)',
              lineHeight: 1.7,
              marginTop: '12px',
              maxWidth: '260px',
            }}
          >
            The tools I use every day to produce high quality design and build a strong digital experience.
          </p>
        </div>
      </div>
    </section>
  );
}
