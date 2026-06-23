import { motion } from 'framer-motion';
import AnimatedSection from './AnimatedSection';
import { staggerChild, cardTap } from '../utils/animations';
import { useReducedMotion } from '../utils/useReducedMotion';

const cards = [
    {
        title: 'The Quiet Standard',
        body: 'Calm coordination, elegant presentation, and a chauffeur team that treats your day as their own. We make transportation disappear into the celebration.',
    },
    {
        title: 'Why It Matters',
        body: 'Lagos moves fast, and the smallest delay ripples. We obsess over the details — routing, timing, and presentation — so you arrive the way the moment deserves.',
    },
];

const ACCENT = '#f9ffd6';

export default function MissionVision() {
    const prefersReduced = useReducedMotion();

    return (
        <AnimatedSection
            as="section"
            className="relative pt-20 pb-24 md:pt-28 md:pb-32 px-5 sm:px-6 lg:px-20 text-center text-white overflow-hidden"
            aria-labelledby="mission-heading"
        >
            {/* Background image (more visible than before) */}
            <div className="absolute inset-0 z-0" aria-hidden="true">
                <img
                    src="/bridge-bg.webp"
                    alt=""
                    className="w-full h-full object-cover object-center absolute top-0 left-0"
                    loading="lazy"
                    decoding="async"
                />
                {/* Lighter overlay so the bridge remains visible */}
                <div className="absolute inset-0 bg-gradient-to-b from-[#0a0a0a]/55 via-[#171717]/45 to-[#0a0a0a]/65" />
                {/* Brand-accent vignette */}
                <div
                    className="absolute inset-0 opacity-40"
                    style={{
                        background:
                            'radial-gradient(ellipse at center, rgba(249,255,214,0.12), transparent 65%)',
                    }}
                />
            </div>

            <div className="relative z-10 max-w-[1100px] mx-auto">
                {/* Section eyebrow */}
                <motion.div
                    className="flex items-center justify-center gap-4 mb-6"
                    aria-hidden="true"
                    variants={!prefersReduced ? staggerChild : undefined}
                >
                    <div className="h-px w-16 sm:w-24 bg-white/25" />
                    <span className="font-body text-[10px] tracking-[0.4em] uppercase text-[#f9ffd6]">
                        Our Promise
                    </span>
                    <div className="h-px w-16 sm:w-24 bg-white/25" />
                </motion.div>

                <motion.h2
                    id="mission-heading"
                    className="font-heading text-2xl sm:text-3xl md:text-4xl lg:text-5xl mb-4 tracking-[0.15em] text-white leading-tight"
                    variants={!prefersReduced ? staggerChild : undefined}
                >
                    Behind Every Grand Arrival
                </motion.h2>

                <motion.p
                    className="font-body text-sm sm:text-base max-w-2xl mx-auto mb-14 md:mb-20 text-white/80 leading-relaxed font-light"
                    variants={!prefersReduced ? staggerChild : undefined}
                >
                    Two small promises that shape every booking we take in Lagos.
                </motion.p>

                {/* Glassmorphism cards - clean in-flow grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8 max-w-4xl mx-auto">
                    {cards.map((c, idx) => (
                        <motion.div
                            key={c.title}
                            className="relative bg-white/[0.08] backdrop-blur-md border border-white/15 p-7 sm:p-8 md:p-10 w-full text-left shadow-2xl will-change-transform"
                            variants={!prefersReduced ? staggerChild : undefined}
                            whileHover={
                                !prefersReduced
                                    ? {
                                          y: -6,
                                          boxShadow:
                                              '0 30px 60px rgba(0,0,0,0.45), 0 0 0 1px rgba(249,255,214,0.35)',
                                          transition: { duration: 0.25 },
                                      }
                                    : undefined
                            }
                            whileTap={!prefersReduced ? cardTap : undefined}
                        >
                            {/* Accent left bar */}
                            <div
                                className="absolute left-0 top-0 bottom-0 w-1"
                                style={{ backgroundColor: ACCENT }}
                                aria-hidden="true"
                            />

                            {/* Step number marker */}
                            <div
                                className="absolute -top-3 left-7 px-3 py-1 text-[10px] tracking-[0.3em] uppercase font-heading"
                                style={{
                                    backgroundColor: ACCENT,
                                    color: '#171717',
                                }}
                            >
                                {String(idx + 1).padStart(2, '0')}
                            </div>

                            <h3 className="font-heading text-xl sm:text-2xl md:text-[26px] mb-3 md:mb-4 uppercase tracking-wider text-white">
                                {c.title}
                            </h3>
                            <p className="font-body text-sm text-white/80 leading-relaxed">{c.body}</p>
                        </motion.div>
                    ))}
                </div>
            </div>
        </AnimatedSection>
    );
}
