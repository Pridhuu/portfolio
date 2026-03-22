'use client';

import { useEffect, useRef } from 'react';

const LINKS = ['Home', 'About Me', 'Works'];

const SOCIALS = [
  {
    label: 'Resume',
    href: '/resume.pdf',
    icon: (
      <img src="/Document.svg" alt="Document" width={26} height={26} />
    ),
  },
  {
    label: 'LinkedIn',
    href: 'https://linkedin.com/in/pridhu',
    icon: (
      <img src="/linkedin.svg" alt="LinkedIn" width={26} height={26} />
    ),
  },
  {
    label: 'GitHub',
    href: 'https://github.com/Pridhuu',
    icon: (
      <img src="/github.svg" alt="GitHub" width={26} height={26} />
    ),
  },
  {
    label: 'Behance',
    href: 'https://www.behance.net/pridhuuu',
    icon: (
      <img src="/Behance.svg" alt="Behance" width={30} height={30} />
    ),
  },
  {
    label: 'Leetcode',
    href: 'https://leetcode.com/u/pridhu/',
    icon: (
      <img src="/Leetcode.svg" alt="Leetcode" width={26} height={26} className="leetcode-icon" />
    ),
  },
];

export default function Navbar() {
  const navRef = useRef(null);

  useEffect(() => {
    const handleScroll = () => {
      if (navRef.current) {
        navRef.current.classList.toggle('scrolled', window.scrollY > 40);
      }
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollTo = (id) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <nav ref={navRef} className="nav-root" role="navigation" aria-label="Main navigation">
      <div className="nav-inner">
        {/* Logo */}
        <span className="nav-logo" style={{ animation: 'fadeIn 0.8s ease both' }}>
          <img src="/logoPRIDHU.svg" alt="Logo" width={180} height={24} />
        </span>

        {/* Nav Links */}
        <ul className="nav-links" role="list">
          {[
            { label: 'Home', id: 'hero' },
            { label: 'About Me', id: 'about' },
            { label: 'Works', id: 'toolkit' },
          ].map((item, i) => (
            <li key={item.id} style={{ animation: `fadeIn 0.6s ease ${0.1 + i * 0.1}s both` }}>
              <a
                href={`#${item.id}`}
                className="hover-line"
                onClick={(e) => {
                  e.preventDefault();
                  scrollTo(item.id);
                }}
              >
                {item.label}
              </a>
            </li>
          ))}
        </ul>

        {/* Social Icons */}
        <div className="nav-socials" aria-label="Social links">
          {SOCIALS.slice(0, 5).map((s, i) => (
            <a
              key={s.label}
              href={s.href}
              target={s.label === 'Resume' ? '_self' : '_blank'}
              rel="noopener noreferrer"
              title={s.label}
              aria-label={s.label}
              download={s.label === 'Resume'}
            >
              {s.icon}
            </a>
          ))}
        </div>
      </div>
    </nav>
  );
}
