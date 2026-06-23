// ============================================
// BrideVoy — FAQ Accordion
// Premium, brand-aligned. Plus/minus icon, brand
// accent header background, accessible labels.
// ============================================
import { useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import AnimatedSection from './AnimatedSection';
import { FAQ_ITEMS } from '../constants';
import { staggerChild } from '../utils/animations';
import { useReducedMotion } from '../utils/useReducedMotion';

function PlusIcon({ open = false }) {
    return (
        <svg
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.5"
            strokeLinecap="round"
            aria-hidden="true"
            style={{
                transform: open ? 'rotate(45deg)' : 'rotate(0deg)',
                transition: 'transform .25s ease',
            }}
        >
            <line x1="12" y1="5" x2="12" y2="19" />
            <line x1="5" y1="12" x2="19" y2="12" />
        </svg>
    );
}

export default function FAQ() {
    const [activeFaq, setActiveFaq] = useState(null);
    const prefersReduced = useReducedMotion();

    const toggleFaq = useCallback((index) => {
        setActiveFaq((curr) => (curr === index ? null : index));
    }, []);

    return (
        <AnimatedSection
            id="faq"
            className="bg-[#EFEFEF] py-24 px-6 lg:px-20 text-center"
            aria-labelledby="faq-heading"
        >
            <div className="max-w-[800px] mx-auto">
                <div className="section-line-divider dark" aria-hidden="true" />

                <motion.div className="mb-12" variants={!prefersReduced ? staggerChild : undefined}>
                    <p className="font-body text-[10px] tracking-[0.4em] uppercase text-[#171717]/60 mb-3">
                        Frequently Asked
                    </p>
                    <h2
                        id="faq-heading"
                        className="font-heading text-2xl lg:text-3xl text-gray-900 mb-4 tracking-wide"
                    >
                        The Questions Worth Asking
                    </h2>
                    <p className="font-body text-gray-500 italic text-sm lg:text-base max-w-md mx-auto">
                        The questions couples and planners ask us most — answered, so you can book with confidence.
                    </p>
                </motion.div>

                <div className="flex flex-col gap-4" role="list">
                    {FAQ_ITEMS.map((faq, index) => {
                        const isOpen = activeFaq === index;
                        return (
                            <motion.div
                                key={faq.q}
                                className="bg-brand-accent overflow-hidden shadow-sm w-full"
                                variants={!prefersReduced ? staggerChild : undefined}
                                role="listitem"
                            >
                                <button
                                    className="w-full flex items-center justify-between p-6 text-left focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#171717] hover:bg-[#171717]/5 transition-colors duration-200"
                                    onClick={() => toggleFaq(index)}
                                    aria-expanded={isOpen}
                                    aria-controls={`faq-panel-${index}`}
                                    id={`faq-button-${index}`}
                                >
                                    <span className="font-body font-semibold text-gray-900 text-[15px] pr-4">
                                        {faq.q}
                                    </span>
                                    <span
                                        className="text-gray-900 ml-4 inline-flex items-center justify-center w-7 h-7 shrink-0 border border-gray-900/30 rounded-full"
                                        aria-hidden="true"
                                    >
                                        <PlusIcon open={isOpen} />
                                    </span>
                                </button>

                                <AnimatePresence initial={false}>
                                    {isOpen && (
                                        <motion.div
                                            id={`faq-panel-${index}`}
                                            role="region"
                                            aria-labelledby={`faq-button-${index}`}
                                            className="bg-white overflow-hidden"
                                            initial={{ height: 0, opacity: 0 }}
                                            animate={{ height: 'auto', opacity: 1 }}
                                            exit={{ height: 0, opacity: 0 }}
                                            transition={{ duration: 0.3, ease: [0.25, 0.46, 0.45, 0.94] }}
                                        >
                                            <p className="p-6 text-gray-600 text-sm font-body text-left leading-relaxed">
                                                {faq.a}
                                            </p>
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            </motion.div>
                        );
                    })}
                </div>
            </div>
        </AnimatedSection>
    );
}
