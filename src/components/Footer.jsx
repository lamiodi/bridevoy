// ============================================
// BrideVoy — Footer
// 3 columns: brand, navigation, contact + social.
// Service areas + Privacy link added.
// ============================================
import { motion } from 'framer-motion';
import {
    FOOTER_LINKS,
    SERVICE_AREAS,
    BRAND_EMAIL,
    BRAND_PHONE_DISPLAY,
    HAS_PHONE_CONFIG,
    HAS_WHATSAPP_CONFIG,
    WHATSAPP_URL,
    INSTAGRAM_URL,
    INSTAGRAM_HANDLE,
    HAS_INSTAGRAM_CONFIG,
} from '../constants';
import { viewportOnce } from '../utils/animations';
import { useReducedMotion } from '../utils/useReducedMotion';
const ACCENT = '#f9ffd6';
const WHITE = '#FCFCFC';

const InstagramIcon = ({ size = 16, className = '' }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" className={className}>
        <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
        <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
        <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
    </svg>
);

const MailIcon = ({ size = 16, className = '' }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" className={className}>
        <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
        <polyline points="22,6 12,13 2,6" />
    </svg>
);

const PhoneIcon = ({ size = 16, className = '' }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" className={className}>
        <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
    </svg>
);

export default function Footer() {
    const prefersReduced = useReducedMotion();
    const year = new Date().getFullYear();

    return (
        <footer
            className="bg-[#0a0a0a] text-white pt-20 pb-10 px-6 lg:px-20"
            aria-labelledby="footer-heading"
        >
            <div className="max-w-[1200px] mx-auto">
                <h2 id="footer-heading" className="sr-only">Footer</h2>

                <motion.div
                    className="grid grid-cols-1 md:grid-cols-3 gap-10 md:gap-12 mb-14"
                    variants={!prefersReduced ? {
                        hidden: { opacity: 0, y: 12 },
                        visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
                    } : undefined}
                    initial={!prefersReduced ? 'hidden' : undefined}
                    whileInView={!prefersReduced ? 'visible' : undefined}
                    viewport={viewportOnce}
                >
                    {/* Column 1 — Brand */}
                    <div>
                        <div className="flex items-center gap-3 mb-4">
                            <span
                                aria-hidden="true"
                                className="inline-flex items-center justify-center rounded-full"
                                style={{ width: 44, height: 44, border: `1px solid ${ACCENT}` }}
                            >
                                <span
                                    className="font-heading font-semibold leading-none"
                                    style={{ fontSize: 20, color: ACCENT, letterSpacing: '0.05em' }}
                                >
                                    B
                                </span>
                            </span>
                            <span className="flex flex-col leading-none">
                                <span
                                    className="font-heading font-semibold uppercase"
                                    style={{ fontSize: 16, letterSpacing: '0.28em', color: WHITE }}
                                >
                                    BrideVoy
                                </span>
                                <span
                                    className="font-body uppercase mt-1"
                                    style={{ fontSize: 9, letterSpacing: '0.4em', color: 'rgba(255,255,255,0.55)' }}
                                >
                                    Chauffeur · Lagos
                                </span>
                            </span>
                        </div>
                        <p className="font-body text-sm text-white/65 leading-relaxed max-w-xs">
                            Luxury wedding chauffeur in Lagos. Calm coordination, elegant presentation, and a single car given our full attention.
                        </p>

                        {/* Social row */}
                        <div className="mt-6 flex items-center gap-3">
                            {HAS_INSTAGRAM_CONFIG && (
                                <a
                                    href={INSTAGRAM_URL}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    aria-label={`${INSTAGRAM_HANDLE} on Instagram`}
                                    className="inline-flex items-center justify-center w-9 h-9 border border-white/20 text-white/70 hover:text-[#171717] hover:bg-[#f9ffd6] hover:border-[#f9ffd6] transition-colors"
                                >
                                    <InstagramIcon size={16} />
                                </a>
                            )}
                            <a
                                href={`mailto:${BRAND_EMAIL}`}
                                aria-label={`Email ${BRAND_EMAIL}`}
                                className="inline-flex items-center justify-center w-9 h-9 border border-white/20 text-white/70 hover:text-[#171717] hover:bg-[#f9ffd6] hover:border-[#f9ffd6] transition-colors"
                            >
                                <MailIcon size={16} />
                            </a>
                            {HAS_WHATSAPP_CONFIG && (
                                <a
                                    href={WHATSAPP_URL}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    aria-label="Chat on WhatsApp"
                                    className="inline-flex items-center justify-center w-9 h-9 border border-white/20 text-white/70 hover:text-[#171717] hover:bg-[#f9ffd6] hover:border-[#f9ffd6] transition-colors"
                                >
                                    <PhoneIcon size={16} />
                                </a>
                            )}
                        </div>
                    </div>

                    {/* Column 2 — Links + service areas */}
                    <div>
                        <h3 className="font-heading text-xs tracking-[0.3em] uppercase mb-5" style={{ color: ACCENT }}>
                            Navigate
                        </h3>
                        <ul className="flex flex-col gap-3 list-none p-0 m-0">
                            {FOOTER_LINKS.map((link) => (
                                <li key={link.href}>
                                    <a
                                        href={link.href}
                                        className="font-body text-sm text-white/70 hover:text-white transition-colors"
                                    >
                                        {link.label}
                                    </a>
                                </li>
                            ))}
                            <li>
                                <a
                                    href="/privacy.html"
                                    className="font-body text-sm text-white/70 hover:text-white transition-colors"
                                >
                                    Privacy
                                </a>
                            </li>
                        </ul>

                        <h3 className="font-heading text-xs tracking-[0.3em] uppercase mt-8 mb-3" style={{ color: ACCENT }}>
                            Service Areas
                        </h3>
                        <ul className="flex flex-wrap gap-2 list-none p-0 m-0">
                            {SERVICE_AREAS.map((a) => (
                                <li key={a}>
                                    <span className="inline-flex items-center gap-2 px-2.5 py-1 border border-white/15 font-body text-[10px] tracking-[0.18em] uppercase text-white/65">
                                        <span
                                            aria-hidden="true"
                                            className="w-1 h-1 rounded-full"
                                            style={{ backgroundColor: ACCENT }}
                                        />
                                        {a}
                                    </span>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Column 3 — Contact */}
                    <div>
                        <h3 className="font-heading text-xs tracking-[0.3em] uppercase mb-5" style={{ color: ACCENT }}>
                            Booking Desk
                        </h3>
                        <ul className="flex flex-col gap-3 list-none p-0 m-0 font-body text-sm">
                            <li>
                                <a
                                    href={`mailto:${BRAND_EMAIL}`}
                                    className="inline-flex items-center gap-3 text-white/80 hover:text-white transition-colors"
                                >
                                    <MailIcon size={16} className="text-white/50" />
                                    {BRAND_EMAIL}
                                </a>
                            </li>
                            {HAS_PHONE_CONFIG && (
                                <li>
                                    <a
                                        href={`tel:${BRAND_PHONE_DISPLAY.replace(/[^\d+]/g, '')}`}
                                        className="inline-flex items-center gap-3 text-white/80 hover:text-white transition-colors"
                                    >
                                        <PhoneIcon size={16} className="text-white/50" />
                                        {BRAND_PHONE_DISPLAY}
                                    </a>
                                </li>
                            )}
                            {HAS_WHATSAPP_CONFIG && (
                                <li>
                                    <a
                                        href={WHATSAPP_URL}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="inline-flex items-center gap-3 text-white/80 hover:text-white transition-colors"
                                    >
                                        <PhoneIcon size={16} className="text-white/50" />
                                        Chat on WhatsApp
                                    </a>
                                </li>
                            )}
                        </ul>

                        <div className="mt-6 inline-block border-l-2 pl-4 py-1" style={{ borderColor: ACCENT }}>
                            <p className="font-body text-[11px] tracking-[0.2em] uppercase text-white/55">
                                Response window
                            </p>
                            <p className="font-body text-sm text-white mt-1">
                                Reply within 4 business hours.
                            </p>
                        </div>
                    </div>
                </motion.div>

                {/* Bottom strip */}
                <div
                    className="pt-6 border-t border-white/10 flex flex-col-reverse sm:flex-row items-center justify-between gap-4 text-center sm:text-left"
                >
                    <p className="font-body text-[11px] tracking-[0.2em] uppercase text-white/40">
                        © {year} BrideVoy. All rights reserved.
                    </p>
                    <div className="flex items-center gap-4 font-body text-[11px] tracking-[0.2em] uppercase text-white/40">
                        <a href="/privacy.html" className="hover:text-white transition-colors">Privacy</a>
                        <span aria-hidden="true">·</span>
                        <span>Made for Lagos weddings</span>
                    </div>
                </div>
            </div>
        </footer>
    );
}
