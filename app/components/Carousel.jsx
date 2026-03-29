'use client';

import { useState, useRef, useEffect } from 'react';


const styles = {
    wrapper: {
        width: '100%',
        maxWidth: '1608px',
        margin: '0 auto',
        userSelect: 'none',
    },

    carousel: {
        borderTop: '1px solid #262626',
        borderBottom: '1px solid #262626',
        borderLeft: '1px solid #262626',
        overflow: 'hidden',
        position: 'relative',
        height: '420px'
    },

    track: {
        display: 'flex',
        transition: 'transform 0.6s cubic-bezier(0.22, 1, 0.36, 1)',
    },

    slide: {
        minWidth: '33.3333%',
        borderRight: '1px solid #262626',
        height: '420px',
    },

    card: {
        width: '100%',
        height: '100%',
        padding: '18px',
    },

    image: {
        width: '100%',
        height: '240px',
        objectFit: 'cover',
        marginBottom: '12px',
    },

    meta: {
        display: 'flex',
        justifyContent: 'space-between',
        fontSize: '12px',
        marginBottom: '24px',
    },

    desc: {
        fontSize: '12px',
        color: '#8a8a8a',
        lineHeight: '1.6',
        textAlign: 'justify',
    },
};

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
        desc: 'This project is a UI/UX design solution developed for a Chartered Accountants firm as part of my role as a Freelance UI/UX Designer at Flink, a creative community focused on purposeful digital experiences. The interface is crafted to reflect professionalism, clarity, and trust, using a blue-centric color system balanced with neutral tones to convey stability. Emphasizing structured layouts, ample spacing, and intuitive sectioning, the design enables users to navigate complex financial services effortlessly. Minimal typography and clean iconography ensure content remains the focus without unnecessary distraction. Overall, the experience delivers a composed and dependable digital presence, reinforcing credibility through consistency, clarity, and thoughtful visual hierarchy.',
    },
    {
        title: 'Internship Cell CET',
        image: '../projects/img3.jpg',
        date: 'January, 2026',
        tag: 'Figma',
        desc: 'This project is a UI/UX design concept developed for the Internship Cell CET, focusing on usability, accessibility, and visual comfort for both students and administrators. The interface prioritizes simplicity over visual complexity, enabling users to easily explore opportunities, track applications, and stay informed without friction. Designed with a minimal structure and soft pastel color palette, it ensures clarity and reduced visual strain. Student-centric dashboards streamline discovery and management of internships, while a well-defined notification system enhances application tracking. Additionally, administrative features support the creation of shareable promotional content using templates for platforms like WhatsApp and LinkedIn.',
    },
    {
        title: 'Movie Matrix',
        image: '../projects/img4.jpg',
        date: 'December, 2025',
        tag: 'React, Figma',
        desc: 'This project is a React-based movie listing application featuring Home, Dashboard, and Favorites pages. It allows users to browse movies, view insights, and save preferred titles. Built with reusable components and dynamic state management, it ensures a responsive, user-friendly interface while demonstrating strong frontend development skills and modern design practices.',
    },
    {
        title: 'Promote - Hoomans Project',
        image: '../projects/img5.jpg',
        date: 'August, 2025',
        tag: 'Figma',
        desc: 'Designed the Promote Dashboard (promote.makemypass) as part of Mellowship, collaborating within a team of three members under the guidance of a mentor as part of the Hoomans Project. The solution enables seamless event promotion through customizable social media templates, while significantly enhancing usability by reducing navigation steps and increasing user engagement, demonstrating strong collaboration, design thinking, and user-centric optimization.',
    },
    {
        title: 'µLearn Redesign',
        image: '../projects/img6.jpg',
        date: 'April, 2025',
        tag: 'Figma',
        desc: 'This project is a UI/UX redesign concept for µLearn, focusing on enhancing usability, accessibility, and visual clarity for students and educators. The interface prioritizes simplicity, intuitive navigation, and a clean, modern aesthetic to create a more engaging and efficient learning experience. By restructuring layouts, refining typography, and optimizing workflows, the redesign aims to reduce cognitive load and improve overall user satisfaction while maintaining the platform’s core functionality.',
    },
];

export default function WorkCarousel() {
    const [index, setIndex] = useState(0);
    const [flippedIndex, setFlippedIndex] = useState(null);
    const startX = useRef(0);
    const isDragging = useRef(false);
    const autoSlideRef = useRef(null);

    const maxIndex = data.length - 3;

    // 👉 Auto slide
    useEffect(() => {
        autoSlideRef.current = setInterval(() => {
            setIndex((prev) => (prev >= maxIndex ? 0 : prev + 1));
        }, 3000);

        return () => clearInterval(autoSlideRef.current);
    }, [maxIndex]);

    // 👉 Drag start
    const handleStart = (e) => {
        clearInterval(autoSlideRef.current);
        isDragging.current = true;
        startX.current = e.touches ? e.touches[0].clientX : e.clientX;
    };

    // 👉 Drag end
    const handleEnd = (e) => {
        if (!isDragging.current) return;

        const endX = e.changedTouches
            ? e.changedTouches[0].clientX
            : e.clientX;

        const diff = startX.current - endX;

        if (diff > 50) {
            setIndex((prev) => (prev >= maxIndex ? 0 : prev + 1));
        } else if (diff < -50) {
            setIndex((prev) => (prev <= 0 ? maxIndex : prev - 1));
        }

        isDragging.current = false;
    };

    return (
        <div style={styles.wrapper}>
            <div
                style={styles.carousel}
                onMouseDown={handleStart}
                onMouseUp={handleEnd}
                onTouchStart={handleStart}
                onTouchEnd={handleEnd}
            >
                <div
                    style={{
                        ...styles.track,
                        transform: `translateX(-${index * (100 / 3)}%)`,
                    }}
                >
                    {data.map((item, i) => {
                        const isFlipped = flippedIndex === i;
                        const shortText =
                            item.desc.length > 210
                                ? item.desc.slice(0, 210) + '...'
                                : item.desc;

                        return (
                            <div key={i} style={styles.slide}>
                                <div style={styles.card}>

                                    <div className={`flip-card ${isFlipped ? 'flipped' : ''}`}>

                                        {/* FRONT */}
                                        <div className="flip-front">
                                            <img src={item.image} style={styles.image} />

                                            <div style={styles.meta}>
                                                <span>{item.date}</span>
                                                <span>{item.tag}</span>
                                            </div>

                                            <p style={styles.desc}>
                                                {shortText}
                                                {item.desc.length > 120 && (
                                                    <span
                                                        className="view-more"
                                                        onMouseEnter={() => {
                                                            const ring = document.querySelector('.cursor-ring');
                                                            if (ring) ring.classList.add('hovering');
                                                        }}
                                                        onMouseLeave={() => {
                                                            const ring = document.querySelector('.cursor-ring');
                                                            if (ring) ring.classList.remove('hovering');
                                                        }}
                                                        onClick={() => setFlippedIndex(i)}
                                                    >
                                                        {' '}view more
                                                    </span>
                                                )}
                                            </p>
                                        </div>

                                        {/* BACK */}
                                        <div className="flip-back">
                                            <h3 className="card-title">{item.title}</h3>
                                            <p className="full-desc" style={{ fontSize: '12px', textAlign: 'justify' }}>{item.desc}</p>

                                            <button
                                                className="back-btn"
                                                onMouseEnter={() => {
                                                    const ring = document.querySelector('.cursor-ring');
                                                    if (ring) ring.classList.add('hovering');
                                                }}
                                                onMouseLeave={() => {
                                                    const ring = document.querySelector('.cursor-ring');
                                                    if (ring) ring.classList.remove('hovering');
                                                }}
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
        </div>
    );
}