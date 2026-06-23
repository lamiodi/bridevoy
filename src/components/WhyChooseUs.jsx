// ============================================
// BrideVoy — Why Choose Us
// 4 base cards + 1 "Single-Vehicle Focus" card.
// Service areas strip added at the bottom.
// ============================================
import { motion } from 'framer-motion';
import AnimatedSection from './AnimatedSection';
import {
    WHY_CHOOSE_US_LEFT,
    WHY_CHOOSE_US_RIGHT,
    WHY_CHOOSE_US_EXTRA,
    SERVICE_AREAS,
} from '../constants';
import { staggerChild, viewportOnce } from '../utils/animations';
import { useReducedMotion } from '../utils/useReducedMotion';

const ACCENT = '#f9ffd6';

export default function WhyChooseUs() {
    const prefersReduced = useReducedMotion();
    return (
        <AnimatedSection
            id="fleet"
            className="bg-[#FCFCFC] py-24 px-6 lg:px-20 border-t border-[#EAEAEA]"
            aria-labelledby="why-heading"
        >
            <div className="max-w-[1200px] mx-auto">
                <motion.div
                    className="text-center mb-14"
                    variants={!prefersReduced ? staggerChild : undefined}
                    initial={!prefersReduced ? 'hidden' : undefined}
                    whileInView={!prefersReduced ? 'visible' : undefined}
                    viewport={viewportOnce}
                >
                    <p className="font-body text-[10px] tracking-[0.4em] uppercase text-[#171717]/60 mb-3">
                        The BrideVoy Difference
                    </p>
                    <h2
                        id="why-heading"
                        className="font-heading text-2xl sm:text-3xl lg:text-4xl text-[#171717] tracking-[0.12em] mb-4"
                    >
                        Why Couples &amp; Planners Choose Us
                    </h2>
                    <p className="font-body text-sm sm:text-base text-gray-500 max-w-2xl mx-auto leading-relaxed">
                        Four service standards and one operating principle — the difference between a car and a chauffeur experience.
                    </p>
                </motion.div>

                {/* 2 + 2 + 1 grid (the 5th card spans 2 columns on desktop) */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5 lg:gap-6">
                    {[...WHY_CHOOSE_US_LEFT, ...WHY_CHOOSE_US_RIGHT].map((card, idx) => (
                        <motion.article
                            key={card.title}
                            className="group relative bg-white border border-[#EAEAEA] p-7 sm:p-8 text-left shadow-sm hover:shadow-md transition-all hover:border-[#171717]/40 will-change-transform"
                            variants={!prefersReduced ? staggerChild : undefined}
                            initial={!prefersReduced ? 'hidden' : undefined}
                            whileInView={!prefersReduced ? 'visible' : undefined}
                            viewport={viewportOnce}
                            whileHover={!prefersReduced ? { y: -4, transition: { duration: 0.2 } } : undefined}
                        >
                            <span
                                aria-hidden="true"
                                className="absolute top-7 right-7 font-heading text-[11px] tracking-widest text-[#171717]/40"
                            >
                                0{idx + 1}
                            </span>
                            <div
                                aria-hidden="true"
                                className="w-10 h-px mb-5"
                                style={{ backgroundColor: ACCENT }}
                            />
                            <h3 className="font-heading text-lg text-[#171717] tracking-wider uppercase mb-3">
                                {card.title}
                            </h3>
                            <p className="font-body text-sm text-gray-600 leading-relaxed">
                                {card.description}
                            </p>
                        </motion.article>
                    ))}

                    {/* 5th "Single-Vehicle Focus" card — spans 2 columns on desktop */}
                    <motion.article
                        className="md:col-span-2 group relative bg-[#171717] text-white p-7 sm:p-9 text-left border border-[#171717] shadow-sm hover:shadow-md transition-shadow will-change-transform"
                        variants={!prefersReduced ? staggerChild : undefined}
                        initial={!prefersReduced ? 'hidden' : undefined}
                        whileInView={!prefersReduced ? 'visible' : undefined}
                        viewport={viewportOnce}
                    >
                        <span
                            aria-hidden="true"
                            className="absolute top-7 right-7 font-heading text-[11px] tracking-widest text-white/40"
                        >
                            05
                        </span>
                        <div className="flex flex-col sm:flex-row sm:items-start sm:gap-8">
                            <div className="flex-1">
                                <div
                                    aria-hidden="true"
                                    className="w-10 h-px mb-5"
                                    style={{ backgroundColor: ACCENT }}
                                />
                                <h3 className="font-heading text-lg tracking-wider uppercase mb-3">
                                    {WHY_CHOOSE_US_EXTRA.title}
                                </h3>
                                <p className="font-body text-sm text-white/70 leading-relaxed max-w-2xl">
                                    {WHY_CHOOSE_US_EXTRA.description}
                                </p>
                            </div>

                            <ul
                                className="mt-6 sm:mt-0 sm:w-auto flex flex-col gap-2"
                                aria-label="Service areas"
                            >
                                <li className="font-body text-[10px] tracking-[0.3em] uppercase text-[#f9ffd6] mb-1">
                                    Service Areas
                                </li>
                                <li className="flex flex-wrap gap-2 sm:max-w-[280px]">
                                    {SERVICE_AREAS.map((a) => (
                                        <span
                                            key={a}
                                            className="inline-flex items-center gap-2 px-3 py-1 border border-white/20 bg-white/[0.04] font-body text-[11px] tracking-[0.18em] uppercase text-white/80"
                                        >
                                            <span
                                                aria-hidden="true"
                                                className="w-1.5 h-1.5 rounded-full"
                                                style={{ backgroundColor: ACCENT }}
                                            />
                                            {a}
                                        </span>
                                    ))}
                                </li>
                            </ul>
                        </div>
                    </motion.article>
                </div>
            </div>
        </AnimatedSection>
    );
}
