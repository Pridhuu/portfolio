'use client';

import { useState, useRef, useEffect } from 'react';

const data = [
    {
        title: 'Sofy - Portfolio AI',
        image: '../projects/img1.jpg',
        date: 'March, 2026',
        tag: 'Next.js, FastAPI, RAG, Figma',
        desc: 'This project is a full-stack AI-powered portfolio application that enables users to interact with a personal profile through a conversational interface. It allows users to explore information about education, experience, projects, and roles, while also providing controlled access to the resume. Built using a React-based frontend and FastAPI backend, it integrates Retrieval-Augmented Generation (RAG) to deliver accurate, context-aware responses. With reusable UI components, structured data handling, and strict prompt control, the system ensures a responsive, user-friendly experience while demonstrating strong skills in frontend development, backend integration, and applied AI system design.',
    },
    {
        title: 'CA Firm',
        image: '../projects/img2.jpg',
        date: 'January, 2026',
        tag: 'Figma',
        desc: 'This project is a UI/UX design solution developed for a Chartered Accountants firm as part of my role as a Freelance UI/UX Designer at Flink, a creative community focused on purposeful digital experiences. The interface is crafted to reflect professionalism, clarity, and trust, using a blue-centric color system balanced with neutral tones to convey stability. Emphasizing structured layouts, ample spacing, and intuitive sectioning, the design enables users to navigate complex financial services effortlessly. Minimal typography and clean iconography ensure content remains the focus without unnecessary distraction.',
    },
    {
        title: 'Internship Cell CET',
        image: '../projects/img3.jpg',
        date: 'January, 2026',
        tag: 'Figma',
        desc: 'This project is a UI/UX design concept developed for the Internship Cell CET, focusing on usability, accessibility, and visual comfort for both students and administrators. The interface prioritizes simplicity over visual complexity, enabling users to easily explore opportunities, track applications, and stay informed without friction.',
    },
    {
        title: 'Movie Matrix',
        image: '../projects/img4.jpg',
        date: 'December, 2025',
        tag: 'React, Figma',
        desc: 'This project is a React-based movie listing application featuring Home, Dashboard, and Favorites pages. It allows users to browse movies, view insights, and save preferred titles. Built with reusable components and dynamic state management, it ensures a responsive, user-friendly interface.',
    },
    {
        title: 'Promote - Hoomans Project',
        image: '../projects/img5.jpg',
        date: 'August, 2025',
        tag: 'Figma',
        desc: 'Designed the Promote Dashboard (promote.makemypass) as part of Mellowship, collaborating within a team of three members under the guidance of a mentor as part of the Hoomans Project. The solution enables seamless event promotion through customizable social media templates.',
    },
    {
        title: 'µLearn Redesign',
        image: '../projects/img6.jpg',
        date: 'April, 2025',
        tag: 'Figma',
        desc: 'This project is a UI/UX redesign concept for µLearn, focusing on enhancing usability, accessibility, and visual clarity for students and educators. The interface prioritizes simplicity, intuitive navigation, and a clean, modern aesthetic to create a more engaging and efficient learning experience.',
    },
];

function useVisibleCount() {
    const [count, setCount] = useState(3);
    useEffect(() => {
        const update = () => {
            const w = window.innerWidth;
            if (w <= 480) setCount(1);
            else if (w <= 768) setCount(1);
            else if (w <= 1024) setCount(2);
            else setCount(3);
        };
        update();
        window.addEventListener('resize', update);
        return () => window.removeEventListener('resize', update);
    }, []);
    return count;
}

export default function WorkCarousel() {
    const [index, setIndex] = useState(0);
    const [flippedIndex, setFlippedIndex] = useState(null);
    const startX = useRef(0);
    const isDragging = useRef(false);
    const autoSlideRef = useRef(null);
    const visibleCount = useVisibleCount();

    const maxIndex = Math.max(0, data.length - visibleCount);

    // Auto slide — restart when visibleCount changes
    useEffect(() => {
        autoSlideRef.current = setInterval(() => {
            setIndex((prev) => (prev >= maxIndex ? 0 : prev + 1));
        }, 3000);
        return () => clearInterval(autoSlideRef.current);
    }, [maxIndex]);

    // Clamp index when window resizes
    useEffect(() => {
        setIndex((prev) => Math.min(prev, maxIndex));
    }, [maxIndex]);

    const handleStart = (e) => {
        clearInterval(autoSlideRef.current);
        isDragging.current = true;
        startX.current = e.touches ? e.touches[0].clientX : e.clientX;
    };

    const handleEnd = (e) => {
        if (!isDragging.current) return;
        const endX = e.changedTouches ? e.changedTouches[0].clientX : e.clientX;
        const diff = startX.current - endX;
        if (diff > 40) setIndex((prev) => (prev >= maxIndex ? 0 : prev + 1));
        else if (diff < -40) setIndex((prev) => (prev <= 0 ? maxIndex : prev - 1));
        isDragging.current = false;
    };

    const slideWidthPct = 100 / visibleCount;
    const carouselHeight = visibleCount === 1 ? 380 : 420;
    const imageHeight = visibleCount === 1 ? 260 : 240;

    return (
        <div className="carousel-wrapper" style={{
            width: '100%',
            maxWidth: '1608px',
            margin: '0 auto',
            userSelect: 'none',
        }}>
            <div
                style={{
                    borderTop: '1px solid #262626',
                    borderBottom: '1px solid #262626',
                    borderLeft: '1px solid #262626',
                    overflow: 'hidden',
                    position: 'relative',
                    height: `${carouselHeight}px`,
                }}
                onMouseDown={handleStart}
                onMouseUp={handleEnd}
                onTouchStart={handleStart}
                onTouchEnd={handleEnd}
            >
                <div
                    style={{
                        display: 'flex',
                        transition: 'transform 0.6s cubic-bezier(0.22, 1, 0.36, 1)',
                        transform: `translateX(-${index * slideWidthPct}%)`,
                    }}
                >
                    {data.map((item, i) => {
                        const isFlipped = flippedIndex === i;
                        const shortText = item.desc.length > 210
                            ? item.desc.slice(0, 210) + '...'
                            : item.desc;

                        return (
                            <div
                                key={i}
                                className="carousel-slide"
                                style={{
                                    minWidth: `${slideWidthPct}%`,
                                    borderRight: '1px solid #262626',
                                    height: `${carouselHeight}px`,
                                    flexShrink: 0,
                                }}
                            >
                                <div style={{ width: '100%', height: '100%', padding: '18px' }}>
                                    <div className={`flip-card ${isFlipped ? 'flipped' : ''}`}>

                                        {/* FRONT */}
                                        <div className="flip-front">
                                            <img
                                                src={item.image}
                                                className="carousel-image"
                                                style={{
                                                    width: '100%',
                                                    height: `${imageHeight}px`,
                                                    objectFit: 'cover',
                                                    marginBottom: '12px',
                                                }}
                                                alt={item.title}
                                            />
                                            <div style={{
                                                display: 'flex',
                                                justifyContent: 'space-between',
                                                fontSize: '12px',
                                                marginBottom: '12px',
                                            }}>
                                                <span>{item.date}</span>
                                                <span style={{ maxWidth: '55%', textAlign: 'right' }}>{item.tag}</span>
                                            </div>
                                            <p style={{ fontSize: '12px', color: '#8a8a8a', lineHeight: '1.6', textAlign: 'justify' }}>
                                                {shortText}
                                                {item.desc.length > 120 && (
                                                    <span
                                                        className="view-more"
                                                        onClick={() => setFlippedIndex(i)}
                                                    > view more</span>
                                                )}
                                            </p>
                                        </div>

                                        {/* BACK */}
                                        <div className="flip-back">
                                            <h3 className="card-title">{item.title}</h3>
                                            <p className="full-desc" style={{ fontSize: '12px', textAlign: 'justify' }}>{item.desc}</p>
                                            <button
                                                className="back-btn"
                                                onClick={() => setFlippedIndex(null)}
                                            >
                                                Back
                                            </button>
                                        </div>

                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>

            {/* Dot indicators */}
            <div style={{ display: 'flex', justifyContent: 'center', gap: '8px', marginTop: '16px' }}>
                {Array.from({ length: maxIndex + 1 }).map((_, i) => (
                    <button
                        key={i}
                        onClick={() => setIndex(i)}
                        style={{
                            width: i === index ? '24px' : '8px',
                            height: '8px',
                            borderRadius: '999px',
                            background: i === index ? '#262626' : '#c0c0c0',
                            border: 'none',
                            cursor: 'pointer',
                            transition: 'all 0.3s ease',
                            padding: 0,
                        }}
                        aria-label={`Go to slide ${i + 1}`}
                    />
                ))}
            </div>
        </div>
    );
}