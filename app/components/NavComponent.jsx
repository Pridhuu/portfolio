'use client';

import { useCallback } from 'react';

export default function NavLinks() {
    const links = [
        { label: 'Sofy', id: 'sofy' },
        { label: 'Home', id: 'hero' },
        { label: 'About Me', id: 'about' },
        { label: 'Works', id: 'toolkit' },
    ];

    const scrollToSection = useCallback((id) => {
        const el = document.getElementById(id);
        if (!el) return;

        el.scrollIntoView({
            behavior: 'smooth',
            block: 'start',
        });
    }, []);

    return (
        <ul className="nav-links" role="list">
            {links.map((item, i) => (
                <li
                    key={item.id}
                    style={{
                        animation: `fadeIn 0.6s ease ${0.1 + i * 0.1}s both`,
                    }}
                >
                    <a
                        href={`#${item.id}`}
                        className="hover-line"
                        onClick={(e) => {
                            e.preventDefault();
                            scrollToSection(item.id);
                        }}
                    >
                        {item.label}
                    </a>
                </li>
            ))}
        </ul>
    );
}