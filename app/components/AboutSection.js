'use client';

import { useEffect, useRef, useState } from 'react';
import localFont from 'next/font/local';

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

const italicFont = localFont({
  src: '../fonts/MySelfFont.woff2',
  variable: '--font-italic',
});

const heroFont = localFont({
  src: '../fonts/MyHeroFont.woff2',
  variable: '--font-hero',
});

const SOCIAL_LINKS = [
  {
    name: 'LinkedIn',
    href: 'https://linkedin.com/in/pridhuu',
    icon: (
      <img src="/LinkedIn.svg" alt="LinkedIn" width={30} height={30} />
    ),
  },
  {
    name: 'Github',
    href: 'https://github.com/Pridhuu',
    icon: (
      <img src="/Github.svg" alt="Github" width={30} height={30} />
    ),
  },
  {
    name: 'Leetcode',
    href: 'https://leetcode.com/pridhuu',
    icon: (
      <img src="/Leetcode.svg" alt="Leetcode" width={30} height={30} />
    ),
  },
  {
    name: 'Behance',
    href: 'https://www.behance.net/pridhuuu',
    icon: (
      <img src="/Behance.svg" alt="Behance" width={30} height={30} />
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
      <div className="bento-main">

        {/* LEFT SIDE */}
        <div className="bento-left">

          <div className="bento-cell-left">
            <div className="bento-label">Client Satisfaction</div>
            <div className="bento-desc">Delivering consistent quality through clear communication</div>
            <div className="bento-value">98%</div>
          </div>

          <div className="bento-cell-left">
            <div className="bento-label">About Me</div>
            <div className="bento-desc">Delivering consistent quality through clear communication</div>
            <div className="bento-value">98%</div>
          </div>

          <div className="bento-cell-left">
            <div className="bento-label">Frontend Developing</div>
            <div className="bento-desc">Clean, scalable interfaces</div>
            <div className="bento-value">4+</div>
          </div>

          <div className="bento-cell-left">
            <div className="bento-label">UI/UX Designing</div>
            <div className="bento-desc">User-focused design systems</div>
            <div className="bento-value">10+</div>
          </div>

        </div>

        {/* RIGHT SIDE */}
        <div className="bento-right">

          <div className="bento-about">
            <span className={`im-label ${italicFont.className}`} style={{ color: "#a02820", fontSize: "84px" }}>I’m</span>
            <div className={`im-name ${heroFont.className}`}><img src="/logoPRIDHU.svg" alt="PRIDHU" width={"720px"} /></div>

            <p className="about-text" style={{ textAlign: "justify" }}>
              a designer and developer who loves transforming ideas into meaningful digital experiences. I blend creative design with functional development to craft interfaces that are intuitive, visually compelling, and user focused. Driven by curiosity and constant learning, I strive to create products that not only look great but also solve real problems and elevate the way people interact with technology.
            </p>
          </div>

          <div className="bento-socials">
            {SOCIAL_LINKS.map((link) => (
              <a key={link.name} href={link.href} className="social-row-new">
                <div className="social-3d">
                  <div className="social-cube">

                    {/* FRONT FACE */}
                    <div className="social-row">
                      <div className="social-row-left">
                        <div className="social-icon">
                          {link.icon}
                        </div>
                        <div className="social-name">
                          {link.name}
                        </div>
                      </div>
                      <div className="social-row-right">
                        <img src="/arrow.svg" alt="Arrow" width={"35px"} height={"35px"} />
                      </div>
                    </div>

                    {/* BOTTOM FACE */}
                    <div className="social-face social-bottom">
                      <span>Open Profile</span>
                    </div>

                  </div>
                </div>
              </a>
            ))}
          </div>

        </div>
      </div>
      <div className="social-3d">
        <div className="social-cube">

          {/* FRONT FACE */}
          <div className="social-face social-front">
            <span>LinkedIn</span>
            <span>↗</span>
          </div>

          {/* BOTTOM FACE */}
          <div className="social-face social-bottom">
            <span>Open Profile</span>
          </div>

        </div>
      </div>
    </section>
  );
}
