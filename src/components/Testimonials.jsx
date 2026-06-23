// ============================================
// BrideVoy — Testimonials Carousel
// Quote cards with attribution. Auto-rotates
// on mobile, manual on desktop.
// ============================================
import { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import AnimatedSection from './AnimatedSection';
import { TESTIMONIALS } from '../constants';
import { useReducedMotion } from '../utils/useReducedMotion';
import { useMediaQuery } from '../utils/useReducedMotion';

const ACCENT = '#f9ffd6';

export default function Testimonials() {
    const prefersReduced = useReducedMotion();
    const isMobile = useMediaQuery('(max-width: 767px)');
    const [index, setIndex] = useState(0);
    const [paused, setPaused] = useState(false);

    const next = useCallback(() => {
        setIndex((i) => (i + 1) % TESTIMONIALS.length);
    }, []);
    const prev = useCallback(() => {
        setIndex((i) => (i - 1 + TESTIMONIALS.length) % TESTIMONIALS.length);
    }, []);

    // Auto-rotate on mobile (only).
    useEffect(() => {
        if (!isMobile || prefersReduced || paused) return undefined;
        const id = setInterval(next, 5500);
        return () => clearInterval(id);
    }, [isMobile, prefersReduced, paused, next]);

    const current = TESTIMONIALS[index];

    return (
        <AnimatedSection
            id="testimonials"
            className="bg-[#171717] py-24 px-6 lg:px-20 text-white relative overflow-hidden"
            aria-labelledby="testimonials-heading"
        >
            {/* Subtle background flourish */}
            <div
                aria-hidden="true"
                className="absolute inset-0 opacity-30 pointer-events-none"
                style={{
                    background:
                        'radial-gradient(ellipse at center, rgba(249,255,214,0.08), transparent 65%)',
                }}
            />

            <div className="max-w-[900px] mx-auto relative z-10 text-center">
                <motion.div
                    className="flex items-center justify-center gap-4 mb-8"
                    initial={!prefersReduced ? { opacity: 0 } : false}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true, amount: 0.5 }}
                    transition={{ duration: 0.5 }}
                    aria-hidden="true"
                >
                    <div className="h-px w-16 sm:w-24 bg-white/20" />
                    <span className="font-body text-[10px] tracking-[0.4em] uppercase text-[#f9ffd6]">
                        Trusted in Lagos
                    </span>
                    <div className="h-px w-16 sm:w-24 bg-white/20" />
                </motion.div>

                <h2
                    id="testimonials-heading"
                    className="font-heading text-2xl sm:text-3xl lg:text-4xl text-white tracking-[0.12em] uppercase mb-12"
                >
                    What Couples &amp; Planners Say
                </h2>

                <div
                    className="relative"
                    onMouseEnter={() => setPaused(true)}
                    onMouseLeave={() => setPaused(false)}
                    aria-roledescription="carousel"
                    aria-label="Customer testimonials"
                >
                    <AnimatePresence mode="wait">
                        <motion.figure
                            key={current.author}
                            initial={prefersReduced ? { opacity: 1 } : { opacity: 0, y: 16 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={prefersReduced ? { opacity: 1 } : { opacity: 0, y: -16 }}
                            transition={{ duration: 0.5, ease: 'easeInOut' }}
                            className="max-w-[720px] mx-auto"
                        >
                            <svg
                                aria-hidden="true"
                                width="42"
                                height="32"
                                viewBox="0 0 42 32"
                                fill="none"
                                className="mx-auto mb-6"
                                style={{ color: ACCENT }}
                            >
                                <path
                                    d="M0 32V18.286C0 12.952 1.143 8.762 3.428 5.714 5.714 2.667 9.333 0.762 14.286 0L16 4.571C12.952 5.333 10.762 6.667 9.428 8.571 8.095 10.476 7.428 12.762 7.428 15.428H14.286V32H0ZM25.714 32V18.286C25.714 12.952 26.857 8.762 29.143 5.714 31.428 2.667 35.048 0.762 40 0L41.714 4.571C38.667 5.333 36.476 6.667 35.143 8.571 33.81 10.476 33.143 12.762 33.143 15.428H40V32H25.714Z"
                                    fill="currentColor"
                                />
                            </svg>
                            <blockquote className="font-heading italic text-lg sm:text-xl lg:text-2xl leading-relaxed text-white/90 mb-8">
                                &ldquo;{current.quote}&rdquo;
                            </blockquote>
                            <figcaption className="font-body text-sm tracking-[0.18em] uppercase text-[#f9ffd6]">
                                <span className="text-white font-semibold">{current.author}</span>
                                <span className="text-white/50"> · {current.role}</span>
                            </figcaption>
                        </motion.figure>
                    </AnimatePresence>

                    {/* Manual controls (desktop) */}
                    <div className="hidden sm:flex items-center justify-center gap-4 mt-10">
                        <button
                            type="button"
                            onClick={prev}
                            aria-label="Previous testimonial"
                            className="w-10 h-10 flex items-center justify-center border border-white/20 text-white/70 hover:text-[#171717] hover:bg-[#f9ffd6] hover:border-[#f9ffd6] transition-colors"
                        >
                            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" aria-hidden="true">
                                <line x1="19" y1="12" x2="5" y2="12" />
                                <polyline points="12 19 5 12 12 5" />
                            </svg>
                        </button>
                        <div className="flex gap-2" aria-hidden="true">
                            {TESTIMONIALS.map((t, i) => (
                                <button
                                    key={t.author}
                                    type="button"
                                    onClick={() => setIndex(i)}
                                    aria-label={`Show testimonial ${i + 1}`}
                                    aria-current={i === index ? 'true' : undefined}
                                    className={`h-1.5 rounded-full transition-all duration-300 ${
                                        i === index
                                            ? 'w-8 bg-[#f9ffd6]'
                                            : 'w-1.5 bg-white/30 hover:bg-white/50'
                                    }`}
                                />
                            ))}
                        </div>
                        <button
                            type="button"
                            onClick={next}
                            aria-label="Next testimonial"
                            className="w-10 h-10 flex items-center justify-center border border-white/20 text-white/70 hover:text-[#171717] hover:bg-[#f9ffd6] hover:border-[#f9ffd6] transition-colors"
                        >
                            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" aria-hidden="true">
                                <line x1="5" y1="12" x2="19" y2="12" />
                                <polyline points="12 5 19 12 12 19" />
                            </svg>
                        </button>
                    </div>

                    {/* Mobile: just dots */}
                    <div className="flex sm:hidden items-center justify-center gap-2 mt-8" aria-hidden="true">
                        {TESTIMONIALS.map((t, i) => (
                            <button
                                key={t.author}
                                type="button"
                                onClick={() => setIndex(i)}
                                aria-label={`Show testimonial ${i + 1}`}
                                className={`h-1.5 rounded-full transition-all duration-300 ${
                                    i === index ? 'w-6 bg-[#f9ffd6]' : 'w-1.5 bg-white/30'
                                }`}
                            />
                        ))}
                    </div>
                </div>
            </div>
        </AnimatedSection>
    );
}
