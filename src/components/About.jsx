import { motion } from 'framer-motion';
import AnimatedSection from './AnimatedSection';
import { staggerChild, slideInLeft, slideInRight, viewportOnce } from '../utils/animations';
import { useCounter } from '../utils/useCounter';
import { useReducedMotion } from '../utils/useReducedMotion';

export default function About() {
    const prefersReduced = useReducedMotion();
    const { count: weddingCount, ref: counterRef } = useCounter(50, 2000, true);

    return (
        <AnimatedSection id="about" className="bg-[#171717] py-24 px-6 lg:px-20 text-[#FCFCFC] relative border-b border-[#333]">
            <div className="max-w-[1200px] mx-auto flex flex-col lg:flex-row items-center justify-between gap-16 relative">
                {/* Left text block with styling */}
                <motion.div
                    className="lg:w-1/2 flex gap-8"
                    variants={!prefersReduced ? slideInLeft : undefined}
                    initial={!prefersReduced ? 'hidden' : undefined}
                    whileInView={!prefersReduced ? 'visible' : undefined}
                    viewport={viewportOnce}
                >
                    {/* Vertical ornamental line */}
                    <div className="hidden lg:flex flex-col items-center mt-2" aria-hidden="true">
                        <div className="w-[6px] h-[6px] bg-[#CCC] rotate-45" />
                        <div className="w-[1px] h-full bg-[#555] my-2" />
                        <div className="w-[4px] h-[4px] bg-[#CCC] rounded-full" />
                    </div>
                    <div className="flex-1">
                        <motion.h2
                            className="font-heading text-2xl lg:text-3xl mb-8 uppercase tracking-widest text-white"
                            variants={!prefersReduced ? staggerChild : undefined}
                        >
                            About BrideVoy
                        </motion.h2>
                        <motion.div
                            className="font-body text-gray-400 space-y-6 text-sm lg:text-[15px] leading-relaxed tracking-wide font-light"
                            variants={!prefersReduced ? staggerChild : undefined}
                        >
                            <p>BrideVoy is a Lagos-based chauffeur service built for weddings, executive movements, and unforgettable arrivals. We bring calm coordination, elegant presentation, and precise timing to every booking.</p>

                            {/* Available Fleet Card */}
                            <motion.div
                                className="my-8 p-5 border border-[#333] bg-[#1e1e1e] rounded-lg"
                                variants={!prefersReduced ? staggerChild : undefined}
                            >
                                <h3 className="font-heading text-sm uppercase tracking-[0.2em] text-white mb-4">Our Available Cars</h3>
                                {/* Mercedes-Benz S-Class — Available */}
                                <div className="flex items-center gap-4">
                                    <div className="w-12 h-12 rounded-full bg-[#2a2a2a] border border-[#444] flex items-center justify-center shrink-0">
                                        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#f9ffd6" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                                            <path d="M5 17h14M5 17l-1-5a2 2 0 0 1 .5-1.7L7 8h10l2.5 2.3A2 2 0 0 1 20 12l-1 5" />
                                            <circle cx="7" cy="17" r="1.5" />
                                            <circle cx="17" cy="17" r="1.5" />
                                            <path d="M9 17v2M15 17v2" />
                                        </svg>
                                    </div>
                                    <div className="flex-1 min-w-0">
                                        <p className="font-body text-white text-sm tracking-wide">Mercedes-Benz S-Class</p>
                                        <p className="font-body text-gray-400 text-[11px] tracking-[0.15em] uppercase mt-0.5">2022 · Chauffeur-Driven</p>
                                    </div>
                                    <span className="hidden sm:inline-flex items-center gap-1.5 font-body text-[10px] tracking-[0.2em] uppercase text-[#f9ffd6] bg-[#f9ffd6]/10 px-3 py-1.5 rounded-full border border-[#f9ffd6]/20">
                                        <span className="w-1.5 h-1.5 rounded-full bg-[#f9ffd6]" aria-hidden="true" />
                                        Available
                                    </span>
                                </div>

                                {/* Divider */}
                                <div className="my-4 border-t border-[#333]" />

                                {/* Other Fleet Vehicles — Unavailable */}
                                <div className="flex items-center gap-4 opacity-60">
                                    <div className="w-12 h-12 rounded-full bg-[#2a2a2a] border border-[#444] flex items-center justify-center shrink-0">
                                        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#888" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                                            <path d="M5 17h14M5 17l-1-5a2 2 0 0 1 .5-1.7L7 8h10l2.5 2.3A2 2 0 0 1 20 12l-1 5" />
                                            <circle cx="7" cy="17" r="1.5" />
                                            <circle cx="17" cy="17" r="1.5" />
                                            <path d="M9 17v2M15 17v2" />
                                        </svg>
                                    </div>
                                    <div className="flex-1 min-w-0">
                                        <p className="font-body text-white text-sm tracking-wide">Other Fleet Vehicles</p>
                                        <p className="font-body text-gray-500 text-[11px] tracking-[0.15em] uppercase mt-0.5">Sedans & SUVs · Temporarily Unavailable</p>
                                    </div>
                                    <span className="hidden sm:inline-flex items-center gap-1.5 font-body text-[10px] tracking-[0.2em] uppercase text-[#888] bg-[#888]/10 px-3 py-1.5 rounded-full border border-[#888]/20">
                                        Unavailable
                                    </span>
                                </div>
                            </motion.div>

                            <p>Our fleet experience is reserved for clients who value comfort, discretion, and punctuality in a city where the smallest delay matters. BrideVoy turns transportation into part of the celebration itself.</p>
                            <p className="font-body text-gray-400 text-sm leading-relaxed mt-3">We do not drive through flooded or unsafe roads — your safety always comes first. Routes are assessed in advance, and alternatives are planned where necessary.</p>
                        </motion.div>

                        <motion.div
                            className="mt-8 grid grid-cols-2 gap-6 max-w-md"
                            variants={!prefersReduced ? staggerChild : undefined}
                        >
                            <div>
                                <p className="font-heading text-2xl text-white leading-none">50+</p>
                                <p className="font-body text-[11px] tracking-[0.2em] uppercase text-gray-400 mt-2">Weddings served</p>
                            </div>
                            <div>
                                <p className="font-heading text-2xl text-white leading-none">10+</p>
                                <p className="font-body text-[11px] tracking-[0.2em] uppercase text-gray-400 mt-2">Planner partners</p>
                            </div>
                        </motion.div>

                        <motion.p
                            className="font-heading text-white italic mt-10 text-lg text-center lg:text-left"
                            variants={!prefersReduced ? staggerChild : undefined}
                        >
                            The Art of Grand Arrival
                        </motion.p>
                        <motion.img
                            src="/signature.webp"
                            alt="BrideVoy signature"
                            className="w-[180px] mt-4 opacity-90 mx-auto lg:mx-0"
                            loading="lazy"
                            variants={!prefersReduced ? staggerChild : undefined}
                        />
                    </div>
                </motion.div>

                {/* Right Car block */}
                <motion.div
                    className="lg:w-1/2 flex flex-col items-center w-full justify-center"
                    variants={!prefersReduced ? slideInRight : undefined}
                    initial={!prefersReduced ? 'hidden' : undefined}
                    whileInView={!prefersReduced ? 'visible' : undefined}
                    viewport={viewportOnce}
                >
                    {/* Car image with refined frame */}
                    <div className="relative w-full max-w-[800px] mx-auto aspect-[3/2] overflow-hidden border border-[#2a2a2a] shadow-[0_20px_60px_rgba(0,0,0,0.5)] group">
                        <img src="/image.png" alt="Luxury fleet vehicle front view" className=" w-full h-full object-cover object-center transition-transform duration-700 group-hover:scale-105" loading="lazy" />
                        {/* Subtle gradient overlay for depth */}
                        <div className="absolute inset-0 bg-gradient-to-t from-[#171717]/40 via-transparent to-transparent pointer-events-none" aria-hidden="true" />
                        {/* Corner accents */}
                        <span className="absolute top-0 left-0 w-4 h-4 border-t-2 border-l-2 border-[#FCFCFC]/60" aria-hidden="true" />
                        <span className="absolute bottom-0 right-0 w-4 h-4 border-b-2 border-r-2 border-[#FCFCFC]/60" aria-hidden="true" />
                    </div>

                    {/* Stats centered below image */}
                    <div className="text-center lg:text-right mt-8 w-full" ref={counterRef}>
                        <p className="font-body text-gray-400 text-sm tracking-wider">
                            <span className="text-white font-semibold text-lg">{weddingCount}+</span> Weddings Completed
                        </p>
                        <p className="font-body text-gray-400 text-sm tracking-wider mt-1">Our Fleet</p>
                    </div>

                    {/* Enhanced trust line with planner names strip */}
                    <div className="mt-8 flex flex-col items-center lg:items-end w-full max-w-[480px]">
                        <div className="flex items-center gap-3 mb-3 w-full">
                            <span className="flex-1 h-[1px] bg-gradient-to-r from-transparent to-[#555]" aria-hidden="true" />
                            <span className="w-1.5 h-1.5 bg-[#FCFCFC] rotate-45" aria-hidden="true" />
                            <span className="flex-1 h-[1px] bg-gradient-to-l from-transparent to-[#555]" aria-hidden="true" />
                        </div>
                        <p className="font-body text-[#BFBFBF] text-[11px] tracking-[0.2em] uppercase text-center lg:text-right leading-relaxed">
                            Trusted by Lagos wedding planners<br className="lg:hidden" /> for premium chauffeur coordination
                        </p>

                        {/* Planner name strip — add real partner names here */}
                    </div>
                </motion.div>
            </div>
        </AnimatedSection>
    );
}
