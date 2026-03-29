'use client';

import { useEffect, useRef, useState } from 'react';
import localFont from 'next/font/local';
import BentoStatCard from './BentoStatCard';
import ServiceList from './ServiceList';

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
    href: 'https://linkedin.com/in/pridhu',
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
    name: 'Behance',
    href: 'https://www.behance.net/pridhuuu',
    icon: (
      <img src="/Behance.svg" alt="Behance" width={30} height={30} />
    ),
  },
  {
    name: 'Leetcode',
    href: 'https://leetcode.com/pridhu',
    icon: (
      <img src="/Leetcode.svg" alt="Leetcode" width={30} height={30} />
    ),
  },
];

const WHITE_SOCIAL_LINKS = [
  {
    name: 'LinkedIn',
    href: 'https://linkedin.com/in/pridhu',
    icon: (
      <img src="/white-linkedin.svg" alt="LinkedIn" width={30} height={30} />
    ),
  },
  {
    name: 'Github',
    href: 'https://github.com/Pridhuu',
    icon: (
      <img src="/white-github.svg" alt="Github" width={30} height={30} />
    ),
  },
  {
    name: 'Behance',
    href: 'https://www.behance.net/pridhuuu',
    icon: (
      <img src="/white-behance.svg" alt="Behance" width={30} height={30} />
    ),
  },
  {
    name: 'Leetcode',
    href: 'https://leetcode.com/pridhuu',
    icon: (
      <img src="/white_leetcode.svg" alt="Leetcode" width={30} height={30} />
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

          <BentoStatCard className="client-bento"
            title="Client Satisfaction"
            description="Delivering consistent quality through clear communication and thoughtful execution"
            value={98}
            suffix="%"
            style={{ borderRight: '1px solid #262626', borderTop: '1px solid #262626' }}
          />

          <div className="bento-cell-left"
            style={{
              display: 'flex',
              flexDirection: 'column',
            }}>
            <div className={`bento-label ${heroFont.className}`} style={{ fontSize: '32px', fontWeight: 500, letterSpacing: '-0.02em', lineHeight: 1, textAlign: 'center', width: '100%', height: '50%', display: 'flex', justifyContent: 'center', alignItems: 'center', borderTop: '1px solid #262626', borderBottom: '1px solid #262626' }}>ABOUT ME</div>


            <div className="service-list" style={{ height: '50%' }}>
              <ServiceList />
            </div>
          </div>

          <BentoStatCard
            title="Frontend Developing"
            description="Building responsive, reliable interfaces with clean code and modern technologies"
            value={4}
            suffix="+"
            className="frontend-Bento"
            style={{ borderRight: '1px solid #262626', borderBottom: '1px solid #262626', borderTop: '1px solid #262626' }}
          />

          <BentoStatCard
            title="UI/UX Designing"
            description={
              <>
                Designing intuitive experiences through user research, clarity, and<br />
                visual balance
              </>
            }
            value={10}
            suffix="+"
            style={{ borderTop: '1px solid #262626', borderBottom: '1px solid #262626' }}
          />

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
                    <div className="social-face social-front social-row">
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
                    <div className="social-face social-bottom social-row">
                      <div className="social-row-left">
                        <div className="social-icon white-icon">
                          {WHITE_SOCIAL_LINKS.find(l => l.name === link.name)?.icon}
                        </div>
                        <div className="social-name white-text">
                          {link.name}
                        </div>
                      </div>

                      <div className="social-row-right rotate-icon">
                        <img src="/white-arrow.svg" alt="Arrow" width="35" height="35" />
                      </div>
                    </div>

                  </div>
                </div>
              </a>
            ))}
          </div>

        </div>
      </div>
    </section>
  );
}