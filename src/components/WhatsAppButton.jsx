import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { WHATSAPP_URL, HAS_WHATSAPP_CONFIG } from '../constants';
import { useReducedMotion } from '../utils/useReducedMotion';

export default function WhatsAppButton() {
    const prefersReduced = useReducedMotion();
    const [isHovered, setIsHovered] = useState(false);
    const [isOpen, setIsOpen] = useState(false); // Mobile tap-to-toggle
    const [showIntro, setShowIntro] = useState(false); // First-visit hint
    const containerRef = useRef(null);

    // Brand accent color (matches --brand-accent / Tailwind `brand-accent`)
    const ACCENT = '#f9ffd6';
    const WHATSAPP_GREEN = '#25D366';

    // Show an intro tooltip on first mount (mobile) to attract attention
    useEffect(() => {
        if (prefersReduced) return;
        const t = setTimeout(() => {
            setShowIntro(true);
            // Auto-dismiss after 5s if user hasn't interacted
            setTimeout(() => setShowIntro(false), 5000);
        }, 1800);
        return () => clearTimeout(t);
    }, [prefersReduced]);

    // Close mobile popover when clicking outside
    useEffect(() => {
        if (!isOpen) return;
        const handleClickOutside = (e) => {
            if (containerRef.current && !containerRef.current.contains(e.target)) {
                setIsOpen(false);
            }
        };
        document.addEventListener('touchstart', handleClickOutside, { passive: true });
        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('touchstart', handleClickOutside);
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [isOpen]);

    // Close on scroll (mobile UX best practice)
    useEffect(() => {
        if (!isOpen) return;
        const handleScroll = () => setIsOpen(false);
        window.addEventListener('scroll', handleScroll, { passive: true });
        return () => window.removeEventListener('scroll', handleScroll);
    }, [isOpen]);

    // Tooltip is shown if: hovered (desktop) OR opened by tap (mobile) OR intro
    const tooltipVisible = isHovered || isOpen || showIntro;
    const isMobile = typeof window !== 'undefined' && window.matchMedia('(max-width: 639px)').matches;

    const handleClick = (e) => {
        // On mobile, first tap opens tooltip; second tap navigates
        if (isMobile && !isOpen) {
            e.preventDefault();
            setIsOpen(true);
        }
    };

    // Early-return AFTER all hooks (React rules of hooks).
    if (!HAS_WHATSAPP_CONFIG) return null;

    return (
        <motion.div
            ref={containerRef}
            className="fixed z-[100] flex flex-col items-end gap-3"
            style={{
                right: 'max(1.25rem, env(safe-area-inset-right))',
                bottom: 'max(1.5rem, env(safe-area-inset-bottom))',
            }}
            initial={!prefersReduced ? { opacity: 0, scale: 0.5, y: 20 } : false}
            animate={!prefersReduced ? { opacity: 1, scale: 1, y: 0 } : undefined}
            transition={{ duration: 0.4, delay: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }}
        >
            {/* Tooltip / chat preview bubble */}
            <AnimatePresence>
                {tooltipVisible && (
                    <motion.div
                        key="tooltip"
                        initial={
                            !prefersReduced
                                ? { opacity: 0, y: isMobile ? 12 : 12, scale: 0.95 }
                                : false
                        }
                        animate={!prefersReduced ? { opacity: 1, y: 0, scale: 1 } : { opacity: 1 }}
                        exit={
                            !prefersReduced
                                ? { opacity: 0, y: 12, scale: 0.95 }
                                : { opacity: 0 }
                        }
                        transition={{ duration: 0.22, ease: 'easeOut' }}
                        className="bg-primary-black text-primary-white px-4 py-3 rounded-2xl rounded-br-sm shadow-2xl w-[260px] sm:max-w-[240px] relative"
                        role="dialog"
                        aria-label="WhatsApp chat invitation"
                    >
                        {/* Close button (mobile) */}
                        <button
                            type="button"
                            onClick={(e) => {
                                e.preventDefault();
                                e.stopPropagation();
                                setIsOpen(false);
                                setShowIntro(false);
                            }}
                            aria-label="Close chat prompt"
                            className="sm:hidden absolute top-1.5 right-1.5 w-6 h-6 flex items-center justify-center rounded-full text-white/70 hover:text-white hover:bg-white/10 transition-colors"
                        >
                            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
                                <line x1="6" y1="6" x2="18" y2="18" />
                                <line x1="6" y1="18" x2="18" y2="6" />
                            </svg>
                        </button>

                        <div className="flex items-start gap-3">
                            <div
                                className="w-9 h-9 shrink-0 rounded-full flex items-center justify-center"
                                style={{ backgroundColor: WHATSAPP_GREEN }}
                                aria-hidden="true"
                            >
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    width="18"
                                    height="18"
                                    viewBox="0 0 24 24"
                                    fill={ACCENT}
                                >
                                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                                </svg>
                            </div>
                            <div className="flex-1 min-w-0">
                                <span className="block text-[10px] uppercase tracking-[0.2em] text-brand-accent font-heading mb-0.5">
                                    BrideVoy
                                </span>
                                <span className="block text-sm font-body leading-snug">
                                    Chat with us on WhatsApp
                                </span>
                                <span className="block text-[11px] text-white/60 mt-1 flex items-center gap-1.5">
                                    <span
                                        className="w-1.5 h-1.5 rounded-full inline-block"
                                        style={{ backgroundColor: WHATSAPP_GREEN }}
                                    />
                                    Typically replies in minutes
                                </span>
                            </div>
                        </div>

                        {/* Speech bubble tail pointing down-right toward button */}
                        <span
                            className="absolute -bottom-1.5 right-6 w-3 h-3 bg-primary-black rotate-45"
                            aria-hidden="true"
                        />
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Main button wrapper (anchors the pulse rings) */}
            <div className="relative w-14 h-14 sm:w-14 sm:h-14">
                {/* Pulsing rings (decorative) */}
                {!prefersReduced && (
                    <>
                        <motion.span
                            className="absolute inset-0 rounded-full pointer-events-none"
                            style={{ backgroundColor: WHATSAPP_GREEN }}
                            aria-hidden="true"
                            initial={{ opacity: 0.4, scale: 1 }}
                            animate={{ opacity: 0, scale: 1.8 }}
                            transition={{
                                duration: 2,
                                repeat: Infinity,
                                ease: 'easeOut',
                            }}
                        />
                        <motion.span
                            className="absolute inset-0 rounded-full pointer-events-none"
                            style={{ backgroundColor: WHATSAPP_GREEN }}
                            aria-hidden="true"
                            initial={{ opacity: 0.3, scale: 1 }}
                            animate={{ opacity: 0, scale: 2.4 }}
                            transition={{
                                duration: 2,
                                repeat: Infinity,
                                ease: 'easeOut',
                                delay: 0.6,
                            }}
                        />
                    </>
                )}

                <motion.a
                    href={WHATSAPP_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="Chat with BrideVoy on WhatsApp"
                    onClick={handleClick}
                    onMouseEnter={() => setIsHovered(true)}
                    onMouseLeave={() => setIsHovered(false)}
                    onFocus={() => setIsHovered(true)}
                    onBlur={() => setIsHovered(false)}
                    className="relative w-14 h-14 rounded-full flex items-center justify-center shadow-lg cursor-pointer"
                    style={{ backgroundColor: WHATSAPP_GREEN }}
                    whileHover={
                        !prefersReduced
                            ? {
                                  scale: 1.12,
                                  boxShadow: `0 12px 28px rgba(37, 211, 102, 0.45), 0 0 0 4px ${ACCENT}`,
                                  transition: { duration: 0.25, ease: 'easeOut' },
                              }
                            : { boxShadow: `0 0 0 4px ${ACCENT}` }
                    }
                    whileTap={!prefersReduced ? { scale: 0.92 } : undefined}
                >
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="28"
                        height="28"
                        viewBox="0 0 24 24"
                        fill={ACCENT}
                        aria-hidden="true"
                        style={{ filter: `drop-shadow(0 1px 1px rgba(0,0,0,0.15))` }}
                    >
                        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                    </svg>

                    {/* Online indicator dot */}
                    <span
                        className="absolute -top-0.5 -right-0.5 w-3.5 h-3.5 rounded-full border-2"
                        style={{
                            backgroundColor: ACCENT,
                            borderColor: WHATSAPP_GREEN,
                        }}
                        aria-hidden="true"
                    />
                </motion.a>
            </div>
        </motion.div>
    );
}
