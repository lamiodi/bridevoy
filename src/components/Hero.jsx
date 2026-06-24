// ============================================
// BrideVoy — Hero Section
// Brand statement + S-Class visual + dual CTAs
// ============================================
import { motion } from 'framer-motion';
import {
    staggerContainer,
    staggerChild,
    buttonHover,
    buttonTap,
} from '../utils/animations';
import { useReducedMotion, useMediaQuery } from '../utils/useReducedMotion';

export default function Hero() {
    const prefersReduced = useReducedMotion();
    const isMobile = useMediaQuery('(max-width: 1023px)');

    // Mobile-tuned motion values: smaller offsets + tighter timing.
    const titleMotion = isMobile
        ? { initial: { opacity: 0, scale: 0.97 }, animate: { opacity: 1, scale: 1 }, transition: { duration: 0.5, delay: 0.05, ease: [0.25, 0.46, 0.45, 0.94] } }
        : { initial: { opacity: 0, scale: 0.95 }, animate: { opacity: 1, scale: 1 }, transition: { duration: 0.6, delay: 0.05, ease: [0.25, 0.46, 0.45, 0.94] } };

    const carMotion = isMobile
        ? { initial: { opacity: 0, y: 16 }, animate: { opacity: 1, y: 0 }, transition: { duration: 0.45, delay: 0.1, ease: [0.25, 0.46, 0.45, 0.94] } }
        : { initial: { opacity: 0, y: 24 }, animate: { opacity: 1, y: 0 }, transition: { duration: 0.6, delay: 0.1, ease: [0.25, 0.46, 0.45, 0.94] } };

    const containerStagger = isMobile
        ? { hidden: { opacity: 0 }, visible: { opacity: 1, transition: { staggerChildren: 0.08, delayChildren: 0.05 } } }
        : staggerContainer;

    const childStagger = isMobile
        ? { hidden: { opacity: 0, y: 16 }, visible: { opacity: 1, y: 0, transition: { duration: 0.4, ease: [0.25, 0.46, 0.45, 0.94] } } }
        : staggerChild;

    return (
        <header
            id="home"
            className="relative w-full bg-[#FCFCFC] pt-[clamp(60px,7vw,100px)] pb-6 flex flex-col items-center overflow-hidden"
        >
            {/* Visually-hidden H1 (a11y) — explains the brand in plain language. */}
            <h1 className="sr-only">
                BrideVoy — Mercedes-Benz S-Class wedding chauffeur in Lagos
            </h1>

            {/* Huge Background Title (decorative) */}
            <motion.span
                aria-hidden="true"
                className="font-heading text-[clamp(56px,17.5vw,280px)] tracking-[0.02em] leading-none absolute top-[clamp(90px,9vw,110px)] md:top-[clamp(110px,7vw,120px)] lg:top-[clamp(40px,5vw,80px)] z-30 whitespace-nowrap select-none max-[360px]:text-[14vw]"
                style={{
                    // Slightly reduced opacity so the car wins for attention.
                    background: 'linear-gradient(178.16deg, rgba(23,23,23,0.85) 14.39%, rgba(23,23,23,0.85) 61.77%, #ECECEC 78.8%)',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    backgroundClip: 'text',
                    opacity: 0.92,
                }}
                {...(!prefersReduced && titleMotion)}
            >
                BRIDEVOY
            </motion.span>

            {/* Car Image */}
            <motion.div
                className="relative z-10 w-full max-w-[1200px] -mt-[clamp(20px,3vw,40px)] flex justify-center px-4 mx-auto"
                {...(!prefersReduced && carMotion)}
            >
                <img
                    src="/hero-car.webp"
                    alt="Mercedes-Benz S-Class luxury chauffeur vehicle — BrideVoy fleet"
                    className="w-full h-auto drop-shadow-2xl scale-[1.02]"
                    fetchpriority="high"
                />
            </motion.div>

            {/* Trust + service line under the car (new). */}

            {/* Centered primary CTA — matches the corner button's design language. */}

            {/* Bottom Details */}
            <motion.div
                className="relative z-20 w-full -mt-8 lg:-mt-20 pb-6"
                variants={!prefersReduced ? containerStagger : undefined}
                initial={!prefersReduced ? 'hidden' : undefined}
                animate={!prefersReduced ? 'visible' : undefined}
            >
                <div className="relative w-full max-w-[1400px] mx-auto z-10">
                    <div className="flex flex-col lg:flex-row justify-between items-start w-full px-6 lg:px-16 z-10 relative">

                    {/* Left Side - Button and Pill Box */}
                    <motion.div className="flex flex-col items-start relative w-full lg:w-auto" variants={!prefersReduced ? childStagger : undefined}>
                        {/* CTA row: Reserve + secondary reassurance + WhatsApp */}
                        <div className="px-4 -ml-4 flex items-center flex-wrap gap-x-4 gap-y-2 h-auto lg:absolute lg:top-0 lg:left-0 z-10">
                            <motion.a
                                href="#book"
                                className="group relative inline-flex items-center gap-2 no-underline transition-all duration-400"
                                style={{
                                    fontSize: 12,
                                    letterSpacing: '0.2em',
                                    textTransform: 'uppercase',
                                    fontFamily: 'Raleway, sans-serif',
                                    padding: '10px 18px',
                                    border: '1px solid #171717',
                                    color: '#171717',
                                    background: 'transparent',
                                    transition: 'all .4s ease',
                                    isolation: 'isolate',
                                }}
                                whileHover={!prefersReduced ? buttonHover : undefined}
                                whileTap={!prefersReduced ? buttonTap : undefined}
                                onMouseEnter={(e) => {
                                    const fill = e.currentTarget.querySelector('[data-hover-fill]');
                                    if (fill) fill.style.backgroundColor = '#f9ffd6';
                                }}
                                onMouseLeave={(e) => {
                                    const fill = e.currentTarget.querySelector('[data-hover-fill]');
                                    if (fill) fill.style.backgroundColor = 'transparent';
                                }}
                            >
                                <span
                                    data-hover-fill
                                    aria-hidden="true"
                                    className="absolute pointer-events-none"
                                    style={{
                                        top: 1, right: 1, bottom: 1, left: 1,
                                        backgroundColor: 'transparent',
                                        transition: 'background-color .3s ease',
                                        zIndex: -1,
                                    }}
                                />
                                <div
                                    className="hidden md:block absolute right-full top-1/2 -translate-y-1/2 w-[100vw] h-px bg-[#171717] origin-center"
                                    style={{ transform: 'translateY(-50%) scaleY(0.5)' }}
                                    aria-hidden="true"
                                />
                                <span>Reserve Your Date</span>
                            </motion.a>

                            {/* Secondary reassurance */}

                            {/* Direct WhatsApp CTA (desktop) */}
                        </div>

                        {/* Mercedes-Benz Pill Box - Rectangle 4 Design */}
                        <motion.div
                            className="flex items-center p-2 pr-5 lg:pr-6 mt-3 lg:mt-[60px] relative z-20 w-full max-w-[500px] lg:max-w-[700px] max-[360px]:max-w-full"
                            style={{
                                background: '#171717',
                                boxShadow: '0px 4px 4px rgba(0, 0, 0, 0.25)',
                                borderRadius: '10px 80px 10px 20px',
                            }}
                            variants={!prefersReduced ? childStagger : undefined}
                            whileHover={!prefersReduced ? { scale: 1.02, transition: { duration: 0.2 } } : undefined}
                        >
                            <div
                                className="hidden md:block absolute left-[calc(100%-1px)] top-1/2 -translate-y-1/2 w-[100vw] h-px bg-[#171717] origin-center"
                                style={{ transform: 'translateY(-50%) scaleY(0.5)' }}
                                aria-hidden="true"
                            />
                            <div className="w-14 h-14 lg:w-20 lg:h-20 bg-black rounded-full flex items-center justify-center shrink-0 overflow-hidden border border-gray-700 relative z-10">
                                <img src="/mercedes-badge.webp" alt="Mercedes-Benz emblem" className="w-full h-full object-cover" loading="lazy" />
                            </div>
                            <div className="flex flex-col ml-4 lg:ml-5 flex-1 relative z-10 min-w-0">
                                <span className="font-body text-[12px] lg:text-[15px] tracking-[0.1em] text-white uppercase">MERCEDES-BENZ S-580 <span className="font-bold">AMG</span></span>
                                <div className="flex items-baseline justify-between mt-1 gap-4 flex-wrap">
                                    <span className="text-gray-400 text-[10px] lg:text-[12px] font-body tracking-widest uppercase">Quiet Luxury. Comfort.</span>
                                    <span className="text-gray-200 text-[14px] lg:text-[18px] font-heading italic leading-none">Arrive in Style</span>
                                </div>
                            </div>
                        </motion.div>
                    </motion.div>

                    {/* Right Side - BV101 Texts */}
                    <motion.div className="flex flex-col items-end relative w-full lg:w-auto h-full mt-6 lg:mt-0" variants={!prefersReduced ? childStagger : undefined}>
                        <div className="lg:absolute lg:top-0 lg:right-0 lg:-mt-2 pb-2">
                            <span className="font-heading text-3xl lg:text-[40px] text-[#171717] tracking-[0.05em] leading-none drop-shadow-[0_2px_10px_rgba(255,255,255,1)]">BV101</span>
                        </div>
                        <div className="lg:absolute lg:top-[125px] lg:right-0 mt-1 lg:mt-0">
                            <p className="font-body text-xs lg:text-[14px] text-[#171717]/70 tracking-[0.05em] font-light whitespace-nowrap">
                                S-Class Chauffeur Fleet
                            </p>
                        </div>
                    </motion.div>
                </div>
                </div>
            </motion.div>
        </header>
    );
}
