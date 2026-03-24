'use client';

import React from 'react';

export default function Marquee({
    items = [],
    speed = 20, // lower = faster
    direction = 'left', // 'left' | 'right'
}) {
    const doubled = [...items, ...items];

    return (
        <div style={styles.wrapper}>
            <div
                style={{
                    ...styles.track,
                    animation: `${direction === 'left' ? 'scrollLeft' : 'scrollRight'} ${speed}s linear infinite`,
                }}
            >
                {doubled.map((item, i) => (
                    <div key={i} style={styles.item}>
                        <img src={item.src} alt={item.name} style={styles.img} />
                    </div>
                ))}
            </div>

            {/* Inline styles for animation */}
            <style>
                {`
          @keyframes scrollLeft {
            0% { transform: translateX(0); }
            100% { transform: translateX(-50%); }
          }

          @keyframes scrollRight {
            0% { transform: translateX(-50%); }
            100% { transform: translateX(0); }
          }
        `}
            </style>
        </div>
    );
}

const styles = {
    wrapper: {
        width: '100%',
        overflow: 'hidden',
        position: 'relative',
    },
    track: {
        border: "1px solid var(--border)",
        height: "180px",
        display: 'flex',
        width: 'max-content',
    },
    item: {
        display: 'flex',
        alignItems: 'center',
        gap: '10px',
        padding: '0 32px',
        whiteSpace: 'nowrap',
    },
    img: {
        width: '64px',
        height: '64px',
        objectFit: 'contain',
    },
};