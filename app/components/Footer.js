export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="footer-root" role="contentinfo">
      <span>© {year} PRIDHU. ALL RIGHTS RESERVED.</span>
      <div style={{ display: 'flex', gap: '24px' }}>
        {['WORKS', 'ABOUT', 'CONTACT', 'RESUME'].map((item) => (
          <span
            key={item}
            className="hover-line"
            style={{ cursor: 'pointer', fontSize: '10px', letterSpacing: '0.08em' }}
          >
            {item}
          </span>
        ))}
      </div>
    </footer>
  );
}
