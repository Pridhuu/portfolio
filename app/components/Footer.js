export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="footer-root" role="contentinfo">
      <span>© {year} Pridhu. All rights reserved.</span>
    </footer>
  );
}
