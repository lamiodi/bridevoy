import { motion } from 'framer-motion';
import AnimatedSection from './AnimatedSection';
import { JOURNEY_STEPS } from '../constants';
import { staggerChild, cardTap } from '../utils/animations';
import { useReducedMotion } from '../utils/useReducedMotion';

const ACCENT = '#f9ffd6';

export default function HowItWorks() {
    const prefersReduced = useReducedMotion();

    return (
        <AnimatedSection
            id="process"
            className="relative isolate pt-20 pb-24 md:pt-32 md:pb-36 px-5 sm:px-6 lg:px-20 overflow-hidden"
            aria-labelledby="how-heading"
        >
            {/* Background image with darkening */}
            <div className="absolute inset-0 -z-10" aria-hidden="true">
                <div
                    className="absolute inset-0 bg-cover bg-center"
                    style={{
                        backgroundImage: "url('/howitworks-car.png')",
                        backgroundPosition: 'center 30%',
                    }}
                />
                <div className="absolute inset-0 bg-gradient-to-b from-[#0e0e0e]/85 via-[#171717]/80 to-[#0e0e0e]/90" />
                <div
                    className="absolute inset-0 opacity-30"
                    style={{
                        background:
                            'radial-gradient(ellipse at top, rgba(249,255,214,0.18), transparent 60%)',
                    }}
                />
            </div>

            <div className="max-w-[1100px] mx-auto relative">
                {/* Top divider */}
                <motion.div
                    className="flex items-center justify-center gap-4 mb-14"
                    initial={!prefersReduced ? { opacity: 0 } : false}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true, amount: 0.2 }}
                    transition={{ duration: 0.5 }}
                >
                    <div className="h-px w-16 sm:w-24 bg-white/15" />
                    <span className="font-body text-[10px] tracking-[0.4em] uppercase text-[#f9ffd6]">
                        Journey
                    </span>
                    <div className="h-px w-16 sm:w-24 bg-white/15" />
                </motion.div>

                <motion.div
                    className="text-center mb-16 md:mb-20"
                    variants={!prefersReduced ? staggerChild : undefined}
                >
                    <h2
                        id="how-heading"
                        className="font-heading text-2xl sm:text-3xl lg:text-4xl text-white tracking-[0.12em] mb-3"
                    >
                        How It Works
                    </h2>
                    <p className="font-body italic text-sm sm:text-base text-white/60 max-w-md mx-auto">
                        Simple Steps To Rent Your Luxury Car
                    </p>
                </motion.div>

                <div className="relative w-full max-w-[640px] mx-auto">
                    {/* Vertical timeline line (centered) */}
                    <div
                        className="absolute top-0 bottom-0 left-6 sm:left-8 lg:left-1/2 w-px lg:-translate-x-1/2 z-0"
                        style={{
                            background:
                                'linear-gradient(to bottom, transparent, rgba(249,255,214,0.5) 12%, rgba(249,255,214,0.5) 88%, transparent)',
                        }}
                        aria-hidden="true"
                    />

                    <div className="flex flex-col gap-10 sm:gap-14">
                        {JOURNEY_STEPS.map((step, index) => {
                            const num = index + 1;
                            return (
                                <div
                                    className="relative flex items-stretch w-full"
                                    key={step.title}
                                >
                                    {/* Mobile / tablet layout */}
                                    <motion.div
                                        className="flex items-stretch w-full"
                                        variants={!prefersReduced ? staggerChild : undefined}
                                    >
                                        <div className="flex flex-col items-center mr-4 sm:mr-6 shrink-0">
                                            <div
                                                className="w-12 h-12 sm:w-14 sm:h-14 rounded-full flex items-center justify-center font-heading text-base sm:text-lg text-[#171717] shrink-0"
                                                style={{
                                                    backgroundColor: ACCENT,
                                                    boxShadow: '0 0 0 4px rgba(249,255,214,0.2)',
                                                }}
                                                aria-hidden="true"
                                            >
                                                {num}
                                            </div>
                                            {index < JOURNEY_STEPS.length - 1 && (
                                                <div
                                                    className="w-px flex-1 bg-white/15 my-2"
                                                    aria-hidden="true"
                                                />
                                            )}
                                        </div>
                                        <motion.div
                                            className="flex-1 bg-white/[0.06] backdrop-blur-md border border-white/10 p-5 sm:p-7 shadow-2xl will-change-transform"
                                            whileHover={
                                                !prefersReduced
                                                    ? {
                                                          y: -4,
                                                          boxShadow: '0 20px 40px rgba(0,0,0,0.4), 0 0 0 1px rgba(249,255,214,0.3)',
                                                          transition: { duration: 0.25 },
                                                      }
                                                    : undefined
                                            }
                                            whileTap={!prefersReduced ? cardTap : undefined}
                                        >
                                            <h3 className="font-heading text-lg sm:text-xl mb-2 sm:mb-3 text-white tracking-wide">
                                                {step.title}
                                            </h3>
                                            <p className="font-body text-[13px] sm:text-sm text-white/70 leading-relaxed">
                                                {step.description}
                                            </p>
                                        </motion.div>
                                    </motion.div>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </div>
        </AnimatedSection>
    );
}
