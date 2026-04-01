'use client';

import { useEffect, useRef, useState } from 'react';
import localFont from 'next/font/local';
import Navbar from './Navbar';
import Waves from './Waves';


const heroFont = localFont({
  src: '../fonts/MyHeroFont.woff2',
  variable: '--font-hero',
});

const italicFont = localFont({
  src: '../fonts/MySelfFont.woff2',
  variable: '--font-italic',
});

// Scramble text effect
function useScramble(text, trigger) {
  const [display, setDisplay] = useState(text);
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';

  useEffect(() => {
    let iteration = 0;
    let frame;

    const animate = () => {
      setDisplay(
        text
          .split('')
          .map((char, i) => {
            if (char === ' ') return ' ';
            if (i < iteration) return text[i];
            return chars[Math.floor(Math.random() * chars.length)];
          })
          .join('')
      );

      iteration += 0.4;

      if (iteration < text.length) {
        frame = requestAnimationFrame(animate);
      } else {
        setDisplay(text);
      }
    };

    animate();

    return () => cancelAnimationFrame(frame);
  }, [trigger, text]);

  return display;
}

function scrambleLetter(el, original) {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
  let iteration = 0;

  const interval = setInterval(() => {
    el.innerText = chars[Math.floor(Math.random() * chars.length)];

    if (iteration > 5) {
      el.innerText = original;
      clearInterval(interval);
    }

    iteration++;
  }, 30);
}

export default function HeroSection() {
  const [trigger, setTrigger] = useState(0);
  const sectionRef = useRef(null);

  useEffect(() => {
    const timer = setTimeout(() => {
      setTrigger((prev) => prev + 1);
    }, 1400);

    return () => clearTimeout(timer);
  }, []);

  const name = useScramble('PRIDHU', trigger);


  return (
    <section id="hero" className="hero-section" aria-label="Hero">
      <Navbar />
      {/* Top info bar */}
      {/* <Waves
        lineColor="#262626"
        backgroundColor="rgba(255, 255, 255, 0.2)"
        waveSpeedX={0.05}
        waveSpeedY={0.01}
        waveAmpX={40}
        waveAmpY={20}
        friction={0.9}
        tension={0.01}
        maxCursorMove={120}
        xGap={12}
        yGap={36}
      /> */}
      <div className="hero-top-bar">
        <div className="hero-top-left" style={{ animation: 'slideLeft 0.8s 1.5s cubic-bezier(0.4,0,0.2,1) both' }}>
          <div style={{ fontSize: '14px', fontWeight: 500, marginBottom: '2px' }}>UI/UX Designer</div>
          <div style={{ fontSize: '14px', fontWeight: 500, marginBottom: '2px' }}>Graphic Designer</div>
          <div style={{ fontSize: '14px', fontWeight: 500, marginBottom: '2px' }}>Frontend Developer</div>
        </div>
        <div className="hero-top-right" style={{ animation: 'slideRight 0.8s 1.5s cubic-bezier(0.4,0,0.2,1) both' }}>
          <div style={{ fontSize: '14px', fontWeight: 500, marginBottom: '2px' }}>BTech</div>
          <div style={{ fontSize: '14px', fontWeight: 500, marginBottom: '2px' }}>Semester VI</div>
          <div style={{ fontSize: '14px', fontWeight: 500, marginBottom: '2px' }}>CET CSE'27</div>
        </div>
      </div>

      {/* Myself + Big Name */}
      <div
        style={{
          padding: '0 0px 0 0px',
          display: 'flex',
          flexDirection: 'column',
          flex: 1,
          justifyContent: 'flex-end',
          overflow: 'hidden',
        }}
      >
        {/* "My self" italic label */}

        {/* Big PRIDHU text */}
        <div
          className="hero-big-name"
          style={{
            padding: '0 12px 0 12px',
            animation: 'none',
            opacity: 1,
          }}
        >
          <span
            className={heroFont.className}
            // onMouseEnter={() => setTrigger((prev) => prev + 1)}
            style={{
              paddingBottom: '10px',
              display: 'block',
              overflow: 'hidden',
              animation: 'slideUp 1s 0.4s cubic-bezier(0.4,0,0.2,1) both',
              fontSize: 'clamp(56px, 19vw, 292px)',
              fontWeight: 900,
              letterSpacing: '-0.04em',
              lineHeight: 1,
              textTransform: 'uppercase',
            }}
          >
            {name.split('').map((char, i) => (
              <span
                key={i}
                className="letter"
                onMouseEnter={(e) => scrambleLetter(e.target, char)}
              >
                {char}
              </span>
            ))}
          </span>
        </div>
      </div>
    </section>
  );
}
