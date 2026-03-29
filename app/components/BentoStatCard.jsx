'use client';

import { useEffect, useRef, useState } from 'react';
import localFont from 'next/font/local';

const statFont = localFont({
    src: '../fonts/MyStatFont.woff2',
});

function Counter({ value, suffix = '' }) {
    const [count, setCount] = useState(0);
    const ref = useRef(null);

    useEffect(() => {
        const observer = new IntersectionObserver(([entry]) => {
            if (!entry.isIntersecting) return;

            let start = 0;
            const end = value;
            const duration = 1500;
            const stepTime = 16;

            const increment = end / (duration / stepTime);

            const timer = setInterval(() => {
                start += increment;

                if (start >= end) {
                    setCount(end);
                    clearInterval(timer);
                } else {
                    setCount(Math.floor(start));
                }
            }, stepTime);

            observer.disconnect();
        });

        if (ref.current) observer.observe(ref.current);

        return () => observer.disconnect();
    }, [value]);

    return <span ref={ref}>{count}{suffix}</span>;
}


export default function BentoStatCard({
    title,
    description,
    value,
    suffix = '',
    className = '',
    style = {},
}) {
    return (
        <div className={`bento-cell-left ${className}`} style={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            alignItems: 'center',
            padding: '16px 64px',
            height: '50%',
            ...style,
        }}>

            {/* Top Content */}
            <div className="bento-label-container" style={{ display: 'flex', flexDirection: 'column', width: '100%' }}>
                <div className="bento-label" style={{ fontSize: '42px', fontWeight: 500, marginBottom: '2px', letterSpacing: '-0.02em', lineHeight: 1, textAlign: 'right', width: '100%' }}>{title}</div>
                <div className="bento-desc" style={{ fontSize: '14px', textAlign: 'right', lineHeight: 1.4, width: '100%', flex: 1 }}>{description}</div>
            </div>

            {/* Bottom Value */}
            <div className={`bento-value ${statFont.className}`} style={{ fontSize: '108px', width: '100%', textAlign: 'right' }}>
                <Counter value={value} suffix={suffix} />
            </div>

        </div>
    );
}