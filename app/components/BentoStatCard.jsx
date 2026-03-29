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

/* Split title: space always kept, br adds line-break on mobile only */
function SplitTitle({ title }) {
    const spaceIdx = title.indexOf(' ');
    if (spaceIdx === -1) return <>{title}</>;
    return (
        <>
            {title.slice(0, spaceIdx)}
            {/* The br is shown on mobile via CSS; space is always present for desktop */}
            <span className="bento-title-space"> </span>
            <br className="bento-title-break" />
            {title.slice(spaceIdx + 1)}
        </>
    );
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
            padding: 'clamp(12px, 2.5vw, 24px) clamp(16px, 4vw, 64px)',
            ...style,
        }}>

            {/* Top Content */}
            <div className="bento-label-container" style={{ display: 'flex', flexDirection: 'column', width: '100%' }}>
                <div
                    className="bento-label"
                    style={{
                        fontWeight: 500,
                        marginBottom: '2px',
                        letterSpacing: '-0.02em',
                        lineHeight: 1.1,
                        textAlign: 'right',
                        width: '100%',
                        wordBreak: 'break-word',
                        overflowWrap: 'break-word',
                    }}
                >
                    <SplitTitle title={title} />
                </div>
                <div className="bento-desc" style={{ textAlign: 'right', lineHeight: 1.4, width: '100%', flex: 1 }}>{description}</div>
            </div>

            {/* Bottom Value */}
            <div className={`bento-value ${statFont.className}`} style={{ width: '100%', textAlign: 'right' }}>
                <Counter value={value} suffix={suffix} />
            </div>

        </div>
    );
}