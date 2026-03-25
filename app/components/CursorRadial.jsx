'use client';
import { useEffect, useRef, useState } from 'react';

const TOTAL_LINES = 24; // like minutes (you can make 60 if needed)
const RADIUS = 156;

export default function CursorClock() {
    const containerRef = useRef(null);
    const [activeIndex, setActiveIndex] = useState(0);

    useEffect(() => {
        const handleMouseMove = (e) => {
            const rect = containerRef.current.getBoundingClientRect();
            const cx = rect.left + rect.width / 2;
            const cy = rect.top + rect.height / 2;

            const dx = e.clientX - cx;
            const dy = e.clientY - cy;

            // angle in radians
            let angle = Math.atan2(dy, dx);

            // convert to degrees (0° at right)
            let deg = (angle * 180) / Math.PI;

            // shift so 0° is at top like a clock
            deg = (deg + 90 + 360) % 360;

            const slice = 360 / TOTAL_LINES;
            const index = Math.round(deg / slice) % TOTAL_LINES;

            setActiveIndex(index);
        };

        window.addEventListener('mousemove', handleMouseMove);
        return () => window.removeEventListener('mousemove', handleMouseMove);
    }, []);

    const lines = [];

    for (let i = 0; i < TOTAL_LINES; i++) {
        const angle = (i / TOTAL_LINES) * 360;
        const isActive = i === activeIndex;

        lines.push(
            <div
                key={i}
                style={{
                    position: 'absolute',
                    left: '50%',
                    top: '50%',
                    width: '1.5px',
                    height: '32px',
                    background: isActive ? 'red' : '#333',
                    transform: `
                        translate(-50%, -50%)
                        rotate(${angle}deg)
                        translateY(-${RADIUS}px)
                    `,
                    transformOrigin: 'center center',
                    transition: 'all 0.15s ease',
                }}
            >
                {isActive && (
                    <div
                        style={{
                            width: '6px',
                            height: '6px',
                            background: 'red',
                            borderRadius: '50%',
                            position: 'absolute',
                            top: '-3px',
                            left: '50%',
                            transform: 'translateX(-50%)',
                        }}
                    />
                )}
            </div>
        );
    }

    return (
        <div
            ref={containerRef}
            style={{
                width: '380px',
                height: '380px',
                position: 'relative',
            }}
        >
            {lines}
        </div>
    );
}