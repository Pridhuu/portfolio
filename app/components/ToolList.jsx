'use client';

import { useEffect, useState } from 'react';

const ITEMS = [
    'Illustrator',
    'Figma',
    'React',
    'GitHub',
    'Framer',
    'Photoshop',
    'Affinity',
    'Blender',
    'C',
    'Java',
    'Notion',
    'Spline',
    'SQL',
    'Vite',
    'VS Code',
    'Illustrator',
    'Figma',
    'React',
    'GitHub',
    'Framer',
    'Photoshop',
    'Affinity',
    'Blender',
    'C',
    'Java',
    'Notion',
    'Spline',
    'SQL',
    'Vite',
    'VS Code',
];

const ITEM_HEIGHT = 24;

export default function ServiceList() {
    const [index, setIndex] = useState(0);
    const [enableTransition, setEnableTransition] = useState(true);

    const looped = [...ITEMS, ...ITEMS]; // duplicate once (enough for seamless)

    useEffect(() => {
        const interval = setInterval(() => {
            setIndex((prev) => prev + 1);
        }, 1000); // ⏸ pause duration

        return () => clearInterval(interval);
    }, []);

    useEffect(() => {
        if (index === ITEMS.length) {
            // wait for animation to finish
            setTimeout(() => {
                setEnableTransition(false);
                setIndex(0); // jump back instantly (same visual position)
            }, 600);

            setTimeout(() => {
                setEnableTransition(true);
            }, 620);
        }
    }, [index]);

    return (
        <div
            style={{
                height: `${ITEM_HEIGHT * 12}px`,
                overflow: 'hidden',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                width: '100%',
            }}
        >
            <div
                style={{
                    transform: `translateY(-${index * ITEM_HEIGHT - ITEM_HEIGHT}px)`,
                    transition: enableTransition
                        ? 'transform 0.6s ease'
                        : 'none',
                }}
            >
                {looped.map((item, i) => {
                    const centerIndex = index + 28;

                    return (
                        <div
                            key={i}
                            style={{
                                height: `${ITEM_HEIGHT}px`,
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                fontSize: '14px',
                                fontWeight:
                                    i === centerIndex ? 600 : 400,
                                opacity:
                                    i === centerIndex ? 1 : 0.3,
                                transition: 'all 0.3s ease',
                            }}
                        >
                            {item}
                        </div>
                    );
                })}
            </div>
        </div>
    );
}