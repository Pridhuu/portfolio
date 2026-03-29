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
        image: '../projects/img1.jpg',
        date: 'December, 26',
        tag: 'Figma',
        desc: 'This project includes the interface for Home, Dashboard and Favorites page.',
    },
    {
        image: '../projects/img2.jpg',
        date: 'December, 26',
        tag: 'Figma',
        desc: 'This project includes the interface for Home, Dashboard and Favorites page.',
    },
    {
        image: '../projects/img3.jpg',
        date: 'December, 26',
        tag: 'Figma',
        desc: 'This project includes the interface for Home, Dashboard and Favorites page.',
    },
    {
        image: '../projects/img4.jpg',
        date: 'December, 26',
        tag: 'Figma',
        desc: 'This project is a React-based movie listing application featuring Home, Dashboard, and Favorites pages. It allows users to browse movies, view insights, and save preferred titles. Built with reusable components and dynamic state management, it ensures a responsive, user-friendly interface while demonstrating strong frontend development skills and modern design practices.',
    },
    {
        image: '../projects/img5.jpg',
        date: 'December, 26',
        tag: 'Figma',
        desc: 'This project includes the interface for Home, Dashboard and Favorites page.',
    },
    {
        image: '../projects/img6.jpg',
        date: 'December, 26',
        tag: 'Figma',
        desc: 'This project includes the interface for Home, Dashboard and Favorites page.',
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
                            item.desc.length > 220
                                ? item.desc.slice(0, 220) + '...'
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
                                                        onClick={() => setFlippedIndex(i)}
                                                    >
                                                        {' '}view more
                                                    </span>
                                                )}
                                            </p>
                                        </div>

                                        {/* BACK */}
                                        <div className="flip-back">
                                            <h3 className="card-title">Project Overview</h3>
                                            <p className="full-desc">{item.desc}</p>

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
        </div>
    );
}