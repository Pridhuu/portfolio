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
        <div className="work-container" style={{ height: '100vh', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', padding: '156px', gap: '54px' }}>
            <div className='heading-container' style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', width: '100%' }}>


                <div className={`my-text ${italicFont.className}`} style={{ fontSize: 'clamp(24px, 12vw, 56px)', fontWeight: 500, letterSpacing: '-0.04em', lineHeight: 1, textAlign: 'left', width: '100%', color: 'red', marginBottom: '12px' }}>
                    Best
                </div>

                <div className={`tool-text ${heroFont.className}`} style={{ fontSize: 'clamp(28px, 8vw, 48px)', fontWeight: 500, letterSpacing: '-0.04em', lineHeight: 1, textTransform: 'uppercase', textAlign: 'left', width: '100%' }}>
                    PROJECTS
                </div>
            </div>


            <WorkCarousel />


            <Link href="/works" style={{ textDecoration: 'none', display: 'flex', marginLeft: 'auto' }}>
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
                    <img src="/arrowButton.svg" alt="arrowButton" style={{ width: '32px', height: '32px' }} />
                </div>
            </Link>
        </div>
    );
}   