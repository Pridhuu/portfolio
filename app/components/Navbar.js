'use client';

import { useEffect, useRef, useState } from 'react';
import NavLinks from './NavComponent';

const SOCIALS = [
  {
    label: 'Resume',
    href: '/resume.pdf',
    icon: <img src="/Document.svg" alt="Document" width={26} height={26} />,
  },
  {
    label: 'LinkedIn',
    href: 'https://linkedin.com/in/pridhu',
    icon: <img src="/linkedin.svg" alt="LinkedIn" width={26} height={26} />,
  },
  {
    label: 'GitHub',
    href: 'https://github.com/Pridhuu',
    icon: <img src="/github.svg" alt="GitHub" width={26} height={26} />,
  },
  {
    label: 'Behance',
    href: 'https://www.behance.net/pridhuuu',
    icon: <img src="/Behance.svg" alt="Behance" width={30} height={30} />,
  },
  {
    label: 'Leetcode',
    href: 'https://leetcode.com/u/pridhu/',
    icon: <img src="/Leetcode.svg" alt="Leetcode" width={26} height={26} className="leetcode-icon" />,
  },
];

const NAV_ITEMS = [
  { label: 'Sofy', id: 'sofy' },
  { label: 'Home', id: 'hero' },
  { label: 'About Me', id: 'about' },
  { label: 'Projects', id: 'projects' },
  { label: 'Toolkit', id: 'toolkit' },
  { label: 'Contact', id: 'contact' },
];

export default function Navbar() {
  const navRef = useRef(null);
  const [menuOpen, setMenuOpen] = useState(false);

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
    setMenuOpen(false);
  };

  return (
    <>
      <nav ref={navRef} className="nav-root" role="navigation" aria-label="Main navigation">
        <div className="nav-inner" style={{ height: '84px' }}>
          {/* Logo */}
          <span className="nav-logo" style={{ animation: 'fadeIn 0.8s ease both' }}>
            <img src="/logoPRIDHU.svg" alt="Logo" width={180} height={24} />
          </span>

          {/* Desktop Nav Links */}
          <NavLinks />
          <div>
            <img src="/HandResume.svg" alt="" width={26} height={26} />
          </div>
          {/* Social Icons + Hamburger */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <div className="nav-socials" aria-label="Social links">
              {SOCIALS.slice(0, 5).map((s) => (
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

            {/* Hamburger — only visible on mobile via CSS */}
            <button
              className="nav-hamburger"
              onClick={() => setMenuOpen((p) => !p)}
              aria-label={menuOpen ? 'Close menu' : 'Open menu'}
              aria-expanded={menuOpen}
            >
              <span className={`ham-line ${menuOpen ? 'open' : ''}`} />
              <span className={`ham-line ${menuOpen ? 'open' : ''}`} />
              <span className={`ham-line ${menuOpen ? 'open' : ''}`} />
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile slide-down menu */}
      {menuOpen && (
        <div className="nav-mobile-menu" role="dialog" aria-label="Mobile navigation">
          {NAV_ITEMS.map((item) => (
            <button
              key={item.id}
              className="nav-mobile-link"
              onClick={() => scrollTo(item.id)}
            >
              {item.label}
            </button>
          ))}
          <div className="nav-mobile-socials">
            {SOCIALS.map((s) => (
              <a
                key={s.label}
                href={s.href}
                target={s.label === 'Resume' ? '_self' : '_blank'}
                rel="noopener noreferrer"
                aria-label={s.label}
                download={s.label === 'Resume'}
              >
                {s.icon}
              </a>
            ))}
          </div>
        </div>
      )}
    </>
  );
}
