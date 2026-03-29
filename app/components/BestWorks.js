import WorkCarousel from "./Carousel";
import localFont from 'next/font/local';
import Link from 'next/link';

const heroFont = localFont({
    src: '../fonts/MyHeroFont.woff2',
    variable: '--font-hero',
});

const italicFont = localFont({
    src: '../fonts/MySelfFont.woff2',
    variable: '--font-italic',
});

export default function BestWorks() {
    return (
        <div id="projects" aria-label="Projects" className="work-container" style={{ height: '100vh', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', paddingLeft: '218px', paddingRight: '218px', gap: '42px' }}>
            <div className='heading-container' style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', width: '100%' }}>


                <div className={`my-text ${italicFont.className}`} style={{ fontSize: 'clamp(24px, 12vw, 72px)', fontWeight: 500, letterSpacing: '-0.04em', lineHeight: 1, textAlign: 'left', width: '100%', color: '#B22222', marginBottom: '12px' }}>
                    Best
                </div>

                <div className={`tool-text ${heroFont.className}`} style={{ fontSize: 'clamp(28px, 8vw, 64px)', fontWeight: 400, letterSpacing: '-0.04em', lineHeight: 1, textTransform: 'uppercase', textAlign: 'left', width: '100%' }}>
                    PROJECTS
                </div>
            </div>


            <WorkCarousel />

            <div
                className="arrow-bottom"
                style={{
                    width: '64px',
                    height: '64px',
                    borderRadius: '50%',
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    cursor: 'pointer',
                }}
                onMouseEnter={() => {
                    const ring = document.querySelector('.cursor-ring');
                    if (ring) ring.classList.add('hovering');
                }}
                onMouseLeave={() => {
                    const ring = document.querySelector('.cursor-ring');
                    if (ring) ring.classList.remove('hovering');
                }}
                onClick={() => {
                    const section = document.getElementById('toolkit');
                    if (section) {
                        section.scrollIntoView({ behavior: 'smooth' });
                    }
                }}
            >
                <img
                    src="/arrowButton.svg"
                    alt="arrow-bottom"
                    style={{ width: '64px', height: '64px', transform: 'rotate(90deg)' }}
                />
            </div>

            {/* <Link href="/projects" style={{ textDecoration: 'none', display: 'flex', marginLeft: 'auto' }}>
                <div
                    className="view-container"
                    style={{
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        cursor: 'pointer',
                        border: '1px solid #262626',
                        gap: '12px',
                        padding: '12px 20px',
                        borderRadius: '200px',
                    }}
                >
                    <p>View all</p>
                    <img src="/arrowButton.svg" alt="arrowButton" className="arrow-icon" style={{ width: '32px', height: '32px' }} />
                </div>
            </Link> */}
        </div>
    );
}   