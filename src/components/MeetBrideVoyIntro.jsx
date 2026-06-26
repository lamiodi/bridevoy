// ============================================
// BrideVoy — First-Visit "Meet BrideVoy" Intro Card
// A non-blocking bottom sheet that appears once
// per visitor and persists dismissal in localStorage.
// ============================================
import { useEffect, useState, useCallback, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useReducedMotion } from '../utils/useReducedMotion';

const STORAGE_KEY = 'bridevoy_meet_intro_dismissed_v1';
// 4 hours — a returning visitor within the same session
// (or shortly after) won't see it again.
const DISMISS_TTL_MS = 4 * 60 * 60 * 1000;

function isDismissedRecently() {
    try {
        const raw = localStorage.getItem(STORAGE_KEY);
        if (!raw) return false;
        const ts = Number(raw);
        if (!Number.isFinite(ts)) return false;
        return Date.now() - ts < DISMISS_TTL_MS;
    } catch {
        return false;
    }
}

function markDismissed() {
    try {
        localStorage.setItem(STORAGE_KEY, String(Date.now()));
    } catch {
        // localStorage unavailable (private mode) — silently ignore
    }
}

export default function MeetBrideVoyIntro() {
    const prefersReduced = useReducedMotion();
    const [visible, setVisible] = useState(false);
    const closeBtnRef = useRef(null);

    // Show the card after the preloader finishes + a small grace delay.
    useEffect(() => {
        if (isDismissedRecently()) return;
        // Wait for preloader to clear plus a generous 7-second grace period
        // so the user has time to read the hero section before the intro card appears.
        const t = setTimeout(() => setVisible(true), 7000);
        return () => clearTimeout(t);
    }, []);

    // After the card opens, push focus to the close button for keyboard users.
    // preventScroll: true is CRITICAL so the browser doesn't jump the page to the bottom.
    useEffect(() => {
        if (visible && closeBtnRef.current) {
            const id = setTimeout(() => closeBtnRef.current?.focus({ preventScroll: true }), 100);
            return () => clearTimeout(id);
        }
        return undefined;
    }, [visible]);

    const handleClose = useCallback(() => {
        markDismissed();
        setVisible(false);
    }, []);

    const handleBookClick = useCallback(() => {
        markDismissed();
        setVisible(false);
        // Allow the close animation to start, then jump to the booking section.
        setTimeout(() => {
            const target = document.getElementById('book');
            if (target) target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }, 150);
    }, []);

    // Escape key closes the card.
    useEffect(() => {
        if (!visible) return undefined;
        const onKey = (e) => {
            if (e.key === 'Escape') handleClose();
        };
        document.addEventListener('keydown', onKey);
        return () => document.removeEventListener('keydown', onKey);
    }, [visible, handleClose]);

    const ACCENT = '#f9ffd6';

    return (
        <AnimatePresence>
            {visible && (
                <motion.aside
                    role="region"
                    aria-label="Meet BrideVoy — quick introduction"
                    aria-modal="false"
                    initial={prefersReduced ? { opacity: 0 } : { opacity: 0, y: 80 }}
                    animate={prefersReduced ? { opacity: 1 } : { opacity: 1, y: 0 }}
                    exit={prefersReduced ? { opacity: 0 } : { opacity: 0, y: 80 }}
                    transition={{ duration: 0.45, ease: [0.25, 0.46, 0.45, 0.94] }}
                    className="fixed inset-x-0 bottom-0 z-[150] px-3 pb-3 sm:px-4 sm:pb-4 pointer-events-none"
                >
                    <div
                        className="mx-auto max-w-[720px] bg-[#171717] text-white shadow-[0_-10px_40px_rgba(0,0,0,0.45)] border border-white/10 pointer-events-auto overflow-hidden"
                        style={{
                            // Soft champagne inner glow to tie into the brand accent
                            boxShadow:
                                '0 -10px 40px rgba(0,0,0,0.45), inset 0 1px 0 rgba(249,255,214,0.15)',
                        }}
                    >
                        <div className="flex flex-col sm:flex-row items-stretch">
                            {/* Image — fixed aspect, never distorts */}
                            <div className="sm:w-[180px] sm:shrink-0 aspect-[4/3] sm:aspect-auto sm:self-stretch bg-black/30 overflow-hidden">
                                <img
                                    src="/meet-bridevoy.webp"
                                    alt="BrideVoy chauffeur opening the door for a bride in Lagos"
                                    className="w-full h-full object-cover"
                                    loading="lazy"
                                    decoding="async"
                                    width="360"
                                    height="270"
                                />
                            </div>

                            {/* Copy + actions */}
                            <div className="flex-1 p-4 sm:p-5 flex flex-col gap-3 relative">
                                {/* Close button — top-right of the card */}
                                <button
                                    ref={closeBtnRef}
                                    type="button"
                                    onClick={handleClose}
                                    aria-label="Dismiss introduction"
                                    className="absolute top-2 right-2 w-8 h-8 flex items-center justify-center rounded-full text-white/70 hover:text-[#171717] hover:bg-[#f9ffd6] focus:outline-none focus:ring-2 focus:ring-[#f9ffd6] focus:ring-offset-2 focus:ring-offset-[#171717] transition-colors"
                                >
                                    <svg
                                        width="14"
                                        height="14"
                                        viewBox="0 0 24 24"
                                        fill="none"
                                        stroke="currentColor"
                                        strokeWidth="2"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        aria-hidden="true"
                                    >
                                        <line x1="18" y1="6" x2="6" y2="18" />
                                        <line x1="6" y1="6" x2="18" y2="18" />
                                    </svg>
                                </button>

                                <div>
                                    <p
                                        className="font-body text-[10px] tracking-[0.4em] uppercase mb-1"
                                        style={{ color: ACCENT }}
                                    >
                                        Meet BrideVoy
                                    </p>
                                    <h2 className="font-heading text-base sm:text-lg leading-snug tracking-wide pr-8">
                                        The Art of Grand Arrival
                                    </h2>
                                    <p className="font-body text-[12px] sm:text-[13px] text-white/80 mt-1.5 leading-relaxed">
                                        BrideVoy is a Lagos-based luxury chauffeur service that turns
                                        wedding and VIP transportation into part of the celebration.
                                    </p>

                                    {/* Expanded website overview — what we do, who it's for, how it works */}
                                    <ul className="font-body text-[11px] sm:text-[12px] text-white/65 mt-2.5 space-y-1 leading-relaxed">
                                        <li className="flex gap-2">
                                            <span style={{ color: ACCENT }} aria-hidden="true">•</span>
                                            <span>
                                                <span className="text-white/85">Our fleet</span>
                                                {' '}— chauffeur-driven, immaculately presented, fully insured.
                                            </span>
                                        </li>
                                        <li className="flex gap-2">
                                            <span style={{ color: ACCENT }} aria-hidden="true">•</span>
                                            <span>
                                                Built for <span className="text-white/85">weddings, traditional engagements, receptions, and executive movements</span> across Lagos and beyond.
                                            </span>
                                        </li>
                                        <li className="flex gap-2">
                                            <span style={{ color: ACCENT }} aria-hidden="true">•</span>
                                            <span>
                                                Browse the site to <span className="text-white/85">view the fleet, see how booking works, read FAQs, and reserve your date</span> in minutes.
                                            </span>
                                        </li>
                                    </ul>
                                </div>

                                <div className="flex items-center gap-2 mt-auto pt-1">
                                    <button
                                        type="button"
                                        onClick={handleBookClick}
                                        className="inline-flex items-center gap-2 bg-[#f9ffd6] text-[#171717] px-4 py-2 font-body text-[10px] sm:text-[11px] tracking-[0.25em] uppercase hover:bg-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-[#171717] transition-colors"
                                    >
                                        Reserve Your Date
                                        <svg
                                            width="12"
                                            height="12"
                                            viewBox="0 0 24 24"
                                            fill="none"
                                            stroke="currentColor"
                                            strokeWidth="2.5"
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            aria-hidden="true"
                                        >
                                            <line x1="5" y1="12" x2="19" y2="12" />
                                            <polyline points="12 5 19 12 12 19" />
                                        </svg>
                                    </button>
                                    <button
                                        type="button"
                                        onClick={handleClose}
                                        className="font-body text-[10px] sm:text-[11px] tracking-[0.25em] uppercase text-white/70 hover:text-[#f9ffd6] focus:outline-none focus:ring-2 focus:ring-[#f9ffd6] focus:ring-offset-2 focus:ring-offset-[#171717] px-2 py-2 transition-colors"
                                    >
                                        Maybe Later
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </motion.aside>
            )}
        </AnimatePresence>
    );
}
