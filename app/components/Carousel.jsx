'use client';

import { useState, useRef, useEffect } from 'react';

const styles = {
    wrapper: {
        width: '100%',
        height: '572px',
        maxWidth: '1608px',
        margin: '0 auto',
        padding: '20px',
        // backgroundColor: 'red',
    },

    carousel: {
        overflow: 'hidden',
        border: '1px solid #c8c5be',
        position: 'relative',
    },

    track: {
        display: 'flex',
        transition: 'transform 0.6s cubic-bezier(0.22, 1, 0.36, 1)', // smooth easing
    },

    slide: {
        minWidth: '33.3333%', // 🔥 3 cards visible
        padding: '20px',
        boxSizing: 'border-box',
    },

    card: {
        width: '100%',
        borderRight: '1px solid #c8c5be',
        paddingRight: '16px',
    },

    image: {
        width: '100%',
        height: '180px',
        objectFit: 'cover',
        marginBottom: '12px',
    },

    meta: {
        display: 'flex',
        justifyContent: 'space-between',
        fontSize: '10px',
        color: '#555',
        marginBottom: '8px',
    },

    desc: {
        fontSize: '11px',
        color: '#777',
        lineHeight: '1.6',
    },

    dots: {
        display: 'flex',
        justifyContent: 'center',
        gap: '6px',
        marginTop: '12px',
    },

    dot: {
        width: '6px',
        height: '6px',
        borderRadius: '50%',
        background: '#000',
        cursor: 'pointer',
    },
};

const data = [
    {
        image: '/img1.jpg',
        date: 'December, 26',
        tag: 'Figma',
        desc: 'This project includes the interface for Home, Dashboard and Favorites page.',
    },
    {
        image: '/img2.jpg',
        date: 'December, 26',
        tag: 'Figma',
        desc: 'This project includes the interface for Home, Dashboard and Favorites page.',
    },
    {
        image: '/img3.jpg',
        date: 'December, 26',
        tag: 'Figma',
        desc: 'This project includes the interface for Home, Dashboard and Favorites page.',
    },
    {
        image: '/img4.jpg',
        date: 'December, 26',
        tag: 'Figma',
        desc: 'This project includes the interface for Home, Dashboard and Favorites page.',
    },
    {
        image: '/img5.jpg',
        date: 'December, 26',
        tag: 'Figma',
        desc: 'This project includes the interface for Home, Dashboard and Favorites page.',
    },
];

export default function WorkCarousel() {
    const [index, setIndex] = useState(0);
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
                    {data.map((item, i) => (
                        <div key={i} style={styles.slide}>
                            <div style={styles.card}>
                                <img src={item.image} style={styles.image} />

                                <div style={styles.meta}>
                                    <span>{item.date}</span>
                                    <span>{item.tag}</span>
                                </div>

                                <p style={styles.desc}>{item.desc}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}