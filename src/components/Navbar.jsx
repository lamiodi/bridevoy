// ============================================
// BrideVoy — Navbar (Tailwind + Framer Motion)
// No MUI. Plain semantic HTML for easier debugging.
// ============================================
import { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence, useScroll, useSpring } from 'framer-motion';
import {
    NAV_LINKS,
    WHATSAPP_URL,
    HAS_WHATSAPP_CONFIG,
} from '../constants';
import { useReducedMotion } from '../utils/useReducedMotion';

// ----------------------------------------------------------------
// Brand palette
// ----------------------------------------------------------------
const ACCENT = '#f9ffd6';
const BLACK = '#171717';
const WHITE = '#FCFCFC';

// ----------------------------------------------------------------
// Inline SVG icons (lucide-flavored, but local — keeps bundle
// small and easy to tweak). All inherit color from `currentColor`.
// ----------------------------------------------------------------
const MenuRoundedIcon = ({ size = 22, className = '' }) => (
    <svg
        width={size}
        height={size}
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
        className={className}
    >
        <line x1="3" y1="6" x2="21" y2="6" />
        <line x1="3" y1="12" x2="21" y2="12" />
        <line x1="3" y1="18" x2="21" y2="18" />
    </svg>
);

const CloseRoundedIcon = ({ size = 22, className = '' }) => (
    <svg
        width={size}
        height={size}
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
        className={className}
    >
        <line x1="18" y1="6" x2="6" y2="18" />
        <line x1="6" y1="6" x2="18" y2="18" />
    </svg>
);

const ArrowForwardRoundedIcon = ({ size = 16, className = '' }) => (
    <svg
        width={size}
        height={size}
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
        className={className}
    >
        <line x1="5" y1="12" x2="19" y2="12" />
        <polyline points="12 5 19 12 12 19" />
    </svg>
);

const WhatsAppIcon = ({ size = 18, className = '' }) => (
    <svg
        width={size}
        height={size}
        viewBox="0 0 24 24"
        fill="currentColor"
        aria-hidden="true"
        className={className}
    >
        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
    </svg>
);

// ----------------------------------------------------------------
// Animation variants
// ----------------------------------------------------------------
const menuItemVariants = {
    hidden: { opacity: 0, y: 24 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.4, ease: [0.25, 0.46, 0.45, 0.94] } },
    exit: { opacity: 0, y: -10, transition: { duration: 0.15 } },
};

const drawerVariants = {
    hidden: { x: '100%' },
    visible: { x: 0, transition: { type: 'tween', duration: 0.4, ease: [0.25, 0.46, 0.45, 0.94] } },
    exit: { x: '100%', transition: { type: 'tween', duration: 0.3, ease: [0.4, 0, 0.6, 1] } },
};

const backdropVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { duration: 0.3 } },
    exit: { opacity: 0, transition: { duration: 0.25 } },
};

// ----------------------------------------------------------------
// Navbar
// ----------------------------------------------------------------
export default function Navbar() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [activeSection, setActiveSection] = useState('home');
    const prefersReduced = useReducedMotion();

    // Top scroll progress bar
    const { scrollYProgress } = useScroll();
    const scrollProgress = useSpring(scrollYProgress, {
        stiffness: 120,
        damping: 30,
        restDelta: 0.001,
    });

    // Scroll-spy: track which section is in view
    useEffect(() => {
        const sectionIds = NAV_LINKS.map((l) => l.href.replace('#', ''));
        const observer = new IntersectionObserver(
            (entries) => {
                const visible = entries
                    .filter((e) => e.isIntersecting)
                    .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
                if (visible) setActiveSection(visible.target.id);
            },
            { rootMargin: '-40% 0px -55% 0px', threshold: [0, 0.25, 0.5, 0.75, 1] }
        );
        sectionIds.forEach((id) => {
            const el = document.getElementById(id);
            if (el) observer.observe(el);
        });
        return () => observer.disconnect();
    }, []);

    const toggleMenu = useCallback(() => setIsMenuOpen((prev) => !prev), []);
    const closeMenu = useCallback(() => setIsMenuOpen(false), []);

    // Close menu on Escape
    useEffect(() => {
        const handleEscape = (e) => {
            if (e.key === 'Escape' && isMenuOpen) closeMenu();
        };
        document.addEventListener('keydown', handleEscape);
        return () => document.removeEventListener('keydown', handleEscape);
    }, [isMenuOpen, closeMenu]);

    // Lock body scroll while the drawer is open
    useEffect(() => {
        if (isMenuOpen) {
            const prev = document.body.style.overflow;
            document.body.style.overflow = 'hidden';
            return () => {
                document.body.style.overflow = prev;
            };
        }
        return undefined;
    }, [isMenuOpen]);

    // The navbar is permanently in its "solid / scrolled" state.
    // The page sits on a near-white hero, so a transparent state
    // would not be visually distinct anyway.
    const headerClass = [
        'fixed top-0 left-0 right-0 z-50',
        'transition-all duration-500 ease-out',
        'bg-primary-white/80 backdrop-blur-md border-b border-black/5 shadow-[0_2px_24px_rgba(0,0,0,0.04)]',
    ].join(' ');

    // Color tokens (always dark-on-light now)
    const logoColor = BLACK;
    const ringColor = 'rgba(23,23,23,0.25)';
    const ringBg = 'transparent';
    const subTextColor = 'rgba(23,23,23,0.6)';
    const navIdleColor = 'rgba(23,23,23,0.7)';
    const buttonBg = 'rgba(252,252,252,0.85)';
    const buttonBorder = 'rgba(23,23,23,0.85)';

    return (
        <>
            {/* Skip link for keyboard users */}
            <a
                href="#main-content"
                className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-[300] focus:bg-white focus:px-4 focus:py-2 focus:text-black focus:shadow-lg focus:outline-none focus:ring-2 focus:ring-[#f9ffd6]"
            >
                Skip to main content
            </a>

            {/* Top scroll progress bar */}
            {!prefersReduced && (
                <motion.div
                    className="fixed top-0 left-0 right-0 h-[2px] origin-left z-[60]"
                    style={{
                        scaleX: scrollProgress,
                        background: `linear-gradient(90deg, ${BLACK} 0%, ${ACCENT} 100%)`,
                    }}
                    aria-hidden="true"
                />
            )}

            {/* App bar */}
            <header className={headerClass} style={{ backdropFilter: 'blur(14px)' }}>
                <div className="w-full px-5 sm:px-8 lg:px-12">
                    <div className="flex justify-between items-center min-h-[74px] md:min-h-[96px]">
                        {/* Logo — refined horizontal wordmark */}
                        <motion.a
                            href="#home"
                            whileHover={!prefersReduced ? { scale: 1.015 } : undefined}
                            transition={{ duration: 0.2 }}
                            className="relative flex items-center gap-3 sm:gap-5 no-underline"
                            style={{ color: 'inherit' }}
                            aria-label="BrideVoy — go to top"
                        >
                            <span
                                aria-hidden="true"
                                className="relative inline-flex items-center justify-center rounded-full flex-shrink-0 transition-all duration-400"
                                style={{
                                    width: 'clamp(42px, 5vw, 56px)',
                                    height: 'clamp(42px, 5vw, 56px)',
                                    border: `1px solid ${ringColor}`,
                                    background: ringBg,
                                }}
                            >
                                <span
                                    className="font-heading font-semibold leading-none"
                                    style={{
                                        fontSize: 'clamp(18px, 1.8vw, 24px)',
                                        letterSpacing: '0.05em',
                                        color: logoColor,
                                        transition: 'color .4s ease',
                                    }}
                                >
                                    B
                                </span>
                                <span
                                    aria-hidden="true"
                                    className="absolute rounded-full"
                                    style={{
                                        top: 'clamp(4px, 0.6vw, 6px)',
                                        left: '50%',
                                        transform: 'translateX(-50%)',
                                        width: 4,
                                        height: 4,
                                        background: ACCENT,
                                    }}
                                />
                            </span>

                            <span className="flex flex-col leading-none min-w-0">
                                <span
                                    className="font-heading font-semibold uppercase whitespace-nowrap"
                                    style={{
                                        fontSize: 'clamp(12px, 1.4vw, 19px)',
                                        letterSpacing: 'clamp(0.22em, 0.3vw, 0.32em)',
                                        color: logoColor,
                                        transition: 'color .4s ease',
                                    }}
                                >
                                    BrideVoy
                                </span>
                                <span
                                    className="hidden sm:block font-body uppercase mt-1"
                                    style={{
                                        fontSize: 'clamp(8px, 0.8vw, 10px)',
                                        letterSpacing: '0.42em',
                                        color: subTextColor,
                                        transition: 'color .4s ease',
                                    }}
                                >
                                    Chauffeur · Lagos
                                </span>
                            </span>
                        </motion.a>

                        {/* Desktop Nav */}
                        <nav
                            aria-label="Primary"
                            className="hidden md:flex items-center gap-1 lg:gap-2"
                        >
                            {NAV_LINKS.map((link) => {
                                const isActive = activeSection === link.href.replace('#', '');
                                return (
                                    <motion.div
                                        key={link.href}
                                        className="relative"
                                        whileHover={!prefersReduced ? { y: -2 } : undefined}
                                        transition={{ duration: 0.15 }}
                                    >
                                        <a
                                            href={link.href}
                                            className="relative block py-2 px-3 lg:px-4 no-underline transition-colors duration-300"
                                            style={{
                                                color: isActive ? logoColor : navIdleColor,
                                                fontSize: 12,
                                                letterSpacing: '0.2em',
                                                textTransform: 'uppercase',
                                                fontFamily: 'Raleway, sans-serif',
                                            }}
                                            onMouseEnter={(e) => (e.currentTarget.style.color = logoColor)}
                                            onMouseLeave={(e) => (e.currentTarget.style.color = isActive ? logoColor : navIdleColor)}
                                            aria-current={isActive ? 'page' : undefined}
                                        >
                                            {link.label}
                                            <AnimatePresence>
                                                {isActive && (
                                                    <motion.span
                                                        aria-hidden="true"
                                                        initial={{ scale: 0, opacity: 0 }}
                                                        animate={{ scale: 1, opacity: 1 }}
                                                        exit={{ scale: 0, opacity: 0 }}
                                                        transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                                                        className="absolute rounded-full"
                                                        style={{
                                                            top: 4,
                                                            left: '50%',
                                                            transform: 'translateX(-50%)',
                                                            width: 4,
                                                            height: 4,
                                                            background: ACCENT,
                                                        }}
                                                    />
                                                )}
                                            </AnimatePresence>
                                        </a>

                                        {!prefersReduced && (
                                            <motion.span
                                                aria-hidden="true"
                                                initial={false}
                                                animate={{ scaleX: isActive ? 1 : 0 }}
                                                whileHover={{ scaleX: 1 }}
                                                transition={{ duration: 0.3, ease: 'easeOut' }}
                                                className="absolute block"
                                                style={{
                                                    left: 12,
                                                    right: 12,
                                                    bottom: 2,
                                                    height: 1.5,
                                                    background: ACCENT,
                                                    transformOrigin: 'left',
                                                }}
                                            />
                                        )}
                                    </motion.div>
                                );
                            })}

                            <div className="ml-2 lg:ml-4">
                                <a
                                    href="#book"
                                    className="group relative inline-flex items-center gap-2 no-underline transition-all duration-400"
                                    style={{
                                        fontSize: 12,
                                        letterSpacing: '0.2em',
                                        textTransform: 'uppercase',
                                        fontFamily: 'Raleway, sans-serif',
                                        padding: '10px 18px',
                                        border: `1px solid ${buttonBorder}`,
                                        color: logoColor,
                                        background: buttonBg,
                                        backdropFilter: 'blur(6px)',
                                        WebkitBackdropFilter: 'blur(6px)',
                                        transition: 'all .4s ease',
                                        isolation: 'isolate',
                                    }}
                                    onMouseEnter={(e) => {
                                        const fill = e.currentTarget.querySelector('[data-hover-fill]');
                                        if (fill) fill.style.backgroundColor = ACCENT;
                                        const arrow = e.currentTarget.querySelector('[data-arrow]');
                                        if (arrow) arrow.style.transform = 'translateX(3px)';
                                    }}
                                    onMouseLeave={(e) => {
                                        const fill = e.currentTarget.querySelector('[data-hover-fill]');
                                        if (fill) fill.style.backgroundColor = 'transparent';
                                        const arrow = e.currentTarget.querySelector('[data-arrow]');
                                        if (arrow) arrow.style.transform = 'translateX(0)';
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
                                    <span>Reserve Your Date</span>
                                    <span data-arrow style={{ transition: 'transform .3s ease', display: 'inline-flex' }}>
                                        <ArrowForwardRoundedIcon size={16} />
                                    </span>
                                </a>
                            </div>
                        </nav>

                        {/* Mobile Toggle */}
                        <div className="md:hidden flex items-center">
                            <button
                                onClick={toggleMenu}
                                type="button"
                                aria-label={isMenuOpen ? 'Close menu' : 'Open menu'}
                                aria-expanded={isMenuOpen}
                                aria-controls="mobile-menu"
                                className="relative inline-flex items-center justify-center transition-all duration-400"
                                style={{
                                    width: 48,
                                    height: 48,
                                    letterSpacing: '0.22em',
                                    textTransform: 'uppercase',
                                    fontFamily: 'Raleway, sans-serif',
                                    border: `1px solid ${buttonBorder}`,
                                    color: logoColor,
                                    background: buttonBg,
                                    backdropFilter: 'blur(6px)',
                                    WebkitBackdropFilter: 'blur(6px)',
                                    transition: 'all .4s ease',
                                    isolation: 'isolate',
                                }}
                                onMouseEnter={(e) => {
                                    const fill = e.currentTarget.querySelector('[data-hover-fill]');
                                    if (fill) fill.style.backgroundColor = ACCENT;
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
                                <span>
                                    {isMenuOpen
                                        ? <CloseRoundedIcon size={22} />
                                        : <MenuRoundedIcon size={22} />}
                                </span>
                            </button>
                        </div>
                    </div>
                </div>
            </header>

            {/* Mobile Drawer */}
            <AnimatePresence>
                {isMenuOpen && (
                    <div
                        id="mobile-menu"
                        className="md:hidden fixed inset-0 z-[70]"
                        role="dialog"
                        aria-modal="true"
                        aria-label="Mobile navigation"
                    >
                        <motion.div
                            variants={backdropVariants}
                            initial="hidden"
                            animate="visible"
                            exit="exit"
                            onClick={closeMenu}
                            className="absolute inset-0"
                            style={{
                                backgroundColor: 'rgba(0,0,0,0.4)',
                                backdropFilter: 'blur(4px)',
                                WebkitBackdropFilter: 'blur(4px)',
                            }}
                            aria-hidden="true"
                        />

                        <motion.aside
                            variants={!prefersReduced ? drawerVariants : undefined}
                            initial="hidden"
                            animate="visible"
                            exit="exit"
                            className="absolute top-0 right-0 h-full w-[85vw] max-w-[360px] flex flex-col"
                            style={{ background: WHITE }}
                        >
                            <div
                                aria-hidden="true"
                                className="h-1 w-full"
                                style={{
                                    background: `linear-gradient(90deg, ${BLACK} 0%, ${ACCENT} 50%, ${BLACK} 100%)`,
                                }}
                            />

                            <div className="flex-1 flex flex-col px-8 pt-16 pb-10">
                                <motion.div
                                    variants={!prefersReduced ? menuItemVariants : undefined}
                                    initial="hidden"
                                    animate="visible"
                                    exit="exit"
                                    className="flex flex-col h-full"
                                >
                                    <div className="flex justify-end mb-8">
                                        <button
                                            onClick={closeMenu}
                                            type="button"
                                            aria-label="Close menu"
                                            className="relative inline-flex items-center justify-center transition-all duration-400"
                                            style={{
                                                width: 48,
                                                height: 48,
                                                border: `1px solid rgba(23,23,23,0.25)`,
                                                color: BLACK,
                                                background: 'transparent',
                                                transition: 'all .4s ease',
                                                isolation: 'isolate',
                                            }}
                                            onMouseEnter={(e) => {
                                                const fill = e.currentTarget.querySelector('[data-hover-fill]');
                                                if (fill) fill.style.backgroundColor = ACCENT;
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
                                            <CloseRoundedIcon size={22} />
                                        </button>
                                    </div>

                                    <div className="mb-8">
                                        <img
                                            src="/logo.webp"
                                            alt="BrideVoy Logo"
                                            className="w-[120px] h-[120px] object-contain mx-auto mb-4"
                                            loading="lazy"
                                            decoding="async"
                                        />
                                        <p
                                            className="font-heading mb-1 text-center"
                                            style={{
                                                fontSize: 10,
                                                letterSpacing: '0.3em',
                                                textTransform: 'uppercase',
                                                color: 'rgba(23,23,23,0.6)',
                                            }}
                                        >
                                            Menu
                                        </p>
                                    </div>
                                    <div
                                        aria-hidden="true"
                                        className="h-px mb-6"
                                        style={{ backgroundColor: 'rgba(23,23,23,0.12)' }}
                                    />

                                    <ul className="flex flex-col gap-1 list-none p-0 m-0">
                                        {NAV_LINKS.map((link) => {
                                            const isActive = activeSection === link.href.replace('#', '');
                                            return (
                                                <motion.li
                                                    key={link.href}
                                                    variants={!prefersReduced ? menuItemVariants : undefined}
                                                >
                                                    <a
                                                        href={link.href}
                                                        onClick={closeMenu}
                                                        className="flex items-center py-3 no-underline"
                                                        aria-current={isActive ? 'page' : undefined}
                                                    >
                                                        <span
                                                            aria-hidden="true"
                                                            className="rounded-full mr-3"
                                                            style={{
                                                                width: 6,
                                                                height: 6,
                                                                backgroundColor: isActive ? '#171717' : 'rgba(23,23,23,0.25)',
                                                                transform: isActive ? 'scale(1)' : 'scale(0.75)',
                                                                transition: 'all .3s ease',
                                                            }}
                                                        />
                                                        <span
                                                            className="font-body"
                                                            style={{
                                                                fontSize: 22,
                                                                letterSpacing: '0.14em',
                                                                textTransform: 'uppercase',
                                                                color: isActive ? BLACK : 'inherit',
                                                                fontWeight: 500,
                                                            }}
                                                        >
                                                            {link.label}
                                                        </span>
                                                    </a>
                                                </motion.li>
                                            );
                                        })}
                                    </ul>

                                    <div className="mt-8">
                                        <a
                                            href="#book"
                                            onClick={closeMenu}
                                            className="block w-full text-center no-underline transition-colors duration-300"
                                            style={{
                                                padding: '14px 20px',
                                                fontSize: 14,
                                                letterSpacing: '0.2em',
                                                textTransform: 'uppercase',
                                                fontFamily: 'Raleway, sans-serif',
                                                background: BLACK,
                                                color: WHITE,
                                            }}
                                            onMouseEnter={(e) => {
                                                e.currentTarget.style.background = ACCENT;
                                                e.currentTarget.style.color = BLACK;
                                            }}
                                            onMouseLeave={(e) => {
                                                e.currentTarget.style.background = BLACK;
                                                e.currentTarget.style.color = WHITE;
                                            }}
                                        >
                                            Reserve Your Date
                                        </a>
                                    </div>

                                    {HAS_WHATSAPP_CONFIG && (
                                        <div
                                            className="mt-auto pt-8"
                                            style={{ borderTop: '1px solid rgba(23,23,23,0.12)' }}
                                        >
                                            <a
                                                href={WHATSAPP_URL}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                onClick={closeMenu}
                                                className="inline-flex items-center gap-3 no-underline transition-colors duration-200"
                                                style={{ color: '#25D366', fontSize: 14 }}
                                                onMouseEnter={(e) => (e.currentTarget.style.color = '#1da851')}
                                                onMouseLeave={(e) => (e.currentTarget.style.color = '#25D366')}
                                                title="Chat on WhatsApp"
                                            >
                                                <span
                                                    className="inline-flex items-center justify-center rounded-full"
                                                    style={{
                                                        width: 36,
                                                        height: 36,
                                                        background: '#25D366',
                                                    }}
                                                >
                                                    <WhatsAppIcon size={18} style={{ color: ACCENT }} />
                                                </span>
                                                <span style={{ fontFamily: 'Raleway, sans-serif' }}>
                                                    Chat on WhatsApp
                                                </span>
                                            </a>
                                        </div>
                                    )}
                                </motion.div>
                            </div>
                        </motion.aside>
                    </div>
                )}
            </AnimatePresence>
        </>
    );
}
