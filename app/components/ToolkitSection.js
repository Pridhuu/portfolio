import Marquee from './Marquee';
import localFont from 'next/font/local';
import ToolList from './ToolList';

const heroFont = localFont({
  src: '../fonts/MyHeroFont.woff2',
  variable: '--font-hero',
});

const italicFont = localFont({
  src: '../fonts/MySelfFont.woff2',
  variable: '--font-italic',
});

const TOOLS = [
  { name: 'Illustrator', src: '/marquee/Illustrator.svg' },
  { name: 'Figma', src: '/marquee/Figma.svg' },
  { name: 'React', src: '/marquee/React.svg' },
  { name: 'GitHub', src: '/marquee/GitHubLogo.svg' },
  { name: 'Framer', src: '/marquee/Framer.svg' },
  { name: 'Photoshop', src: '/marquee/Photoshop.svg' },
  { name: 'Affinity', src: '/marquee/Affinity.svg' },
  { name: 'Blender', src: '/marquee/Blender.svg' },
  { name: 'C', src: '/marquee/C.svg' },
  { name: 'Java', src: '/marquee/Java.svg' },
  { name: 'Notion', src: '/marquee/Notion.svg' },
  { name: 'Spline', src: '/marquee/Spline.svg' },
  { name: 'SQL', src: '/marquee/SQL.svg' },
  { name: 'Vite', src: '/marquee/Vite.svg' },
  { name: 'VS Code', src: '/marquee/VSCode.svg' },
];

export default function Page() {
  return (
    <div
      id="toolkit"
      aria-label="Toolkit"
      className="main-toolkit-section"
    >
      {/* Top grid: heading centered in 4-col grid */}
      <div
        className="toolkit-section-top toolkit-top-grid"
      >
        <div className="toolkit-section toolkit-heading-cell">
          <div className="heading-container" style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
            <div
              className={`my-text ${italicFont.className}`}
              style={{ fontSize: 'clamp(36px, 6vw, 56px)', fontWeight: 500, letterSpacing: '-0.04em', lineHeight: 1, textAlign: 'left', width: '100%', color: '#b22222', marginBottom: '12px' }}
            >
              My
            </div>
            <div
              className={`tool-text ${heroFont.className}`}
              style={{ fontSize: 'clamp(28px, 5vw, 48px)', fontWeight: 600, letterSpacing: '-0.04em', lineHeight: 1, textTransform: 'uppercase', textAlign: 'left', width: '100%' }}
            >
              TOOLKIT
            </div>
          </div>
          <div className="description-container toolkit-desc">
            A curated set of technologies and tools I use to design, build, and ship digital experiences
          </div>
        </div>
      </div>

      <Marquee items={TOOLS} speed={20} direction="right" />

      {/* Bottom grid: tool list */}
      <div
        className="toolkit-section-top toolkit-bottom-grid"
      >
        <div className="toolkit-section toolkit-list-cell">
          <ToolList />
        </div>
      </div>
    </div>
  );
}