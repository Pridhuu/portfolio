'use client';

const links = [
    {
        name: 'LINKEDIN',
        url: 'https://linkedin.com/in/pridhu',
    },
    {
        name: 'GITHUB',
        url: 'https://github.com/pridhuu',
    },
    {
        name: 'INSTAGRAM',
        url: 'https://instagram.com/pridhuu',
    },
    {
        name: 'WHATSAPP',
        url: 'https://wa.me/918075065371',
    },
];

export default function SocialLinks() {
    return (
        <div style={styles.container}>
            {links.map((link) => (
                <a
                    key={link.name}
                    href={link.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="link"
                >
                    {link.name}
                </a>
            ))}
        </div>
    );
}

const styles = {
    container: {
        display: 'flex',
        justifyContent: 'center',
        gap: '48px',
        letterSpacing: '2px',
    },
    link: {
        fontSize: '12px',
        fontWeight: '500',
        color: '#333',
        cursor: 'pointer',
        paddingBottom: '4px',
        textDecoration: 'none',
        borderBottom: '1px solid transparent',
        transition: 'all 0.2s ease',
    },
};