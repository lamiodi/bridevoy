// ============================================
// BrideVoy — Toast Notification System
// Theme-aligned (black / brand-accent / white)
// ============================================
import { createContext, useCallback, useContext, useState, useRef } from 'react';
import { AnimatePresence, motion } from 'framer-motion';

const ToastContext = createContext(null);

const ACCENT = '#f9ffd6';

const VARIANTS = {
    hidden: { opacity: 0, y: -16, scale: 0.96 },
    visible: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.28, ease: [0.25, 0.46, 0.45, 0.94] } },
    exit: { opacity: 0, x: 24, scale: 0.96, transition: { duration: 0.22, ease: 'easeIn' } },
};

const TONE_STYLES = {
    success: {
        bar: '#22c55e',
        ring: 'rgba(34, 197, 94, 0.25)',
        icon: (
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <path d="M5 13l4 4L19 7" />
            </svg>
        ),
    },
    error: {
        bar: '#ef4444',
        ring: 'rgba(239, 68, 68, 0.25)',
        icon: (
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <line x1="6" y1="6" x2="18" y2="18" />
                <line x1="6" y1="18" x2="18" y2="6" />
            </svg>
        ),
    },
    info: {
        bar: ACCENT,
        ring: 'rgba(249, 255, 214, 0.35)',
        icon: (
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <circle cx="12" cy="12" r="10" />
                <line x1="12" y1="16" x2="12" y2="12" />
                <line x1="12" y1="8" x2="12.01" y2="8" />
            </svg>
        ),
    },
    warning: {
        bar: '#f59e0b',
        ring: 'rgba(245, 158, 11, 0.25)',
        icon: (
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z" />
                <line x1="12" y1="9" x2="12" y2="13" />
                <line x1="12" y1="17" x2="12.01" y2="17" />
            </svg>
        ),
    },
};

function ToastItem({ toast, onDismiss }) {
    const tone = TONE_STYLES[toast.tone] || TONE_STYLES.info;

    return (
        <motion.div
            layout
            variants={VARIANTS}
            initial="hidden"
            animate="visible"
            exit="exit"
            role={toast.tone === 'error' || toast.tone === 'warning' ? 'alert' : 'status'}
            aria-live={toast.tone === 'error' ? 'assertive' : 'polite'}
            className="relative w-[min(360px,calc(100vw-2rem))] bg-primary-black text-primary-white shadow-2xl border border-white/10 overflow-hidden pointer-events-auto"
            style={{
                boxShadow: `0 12px 32px rgba(0,0,0,0.35), 0 0 0 1px ${tone.ring}`,
            }}
        >
            {/* Accent left bar */}
            <div
                className="absolute left-0 top-0 bottom-0 w-1"
                style={{ backgroundColor: tone.bar }}
                aria-hidden="true"
            />

            <div className="flex items-start gap-3 pl-5 pr-3 py-4">
                {/* Icon */}
                <div
                    className="shrink-0 w-9 h-9 rounded-full flex items-center justify-center mt-0.5"
                    style={{ backgroundColor: tone.bar, color: '#171717' }}
                    aria-hidden="true"
                >
                    {tone.icon}
                </div>

                {/* Body */}
                <div className="flex-1 min-w-0">
                    {toast.title && (
                        <p className="font-heading text-sm tracking-[0.15em] uppercase text-[#f9ffd6] mb-1">
                            {toast.title}
                        </p>
                    )}
                    <p className="font-body text-[13px] leading-snug text-white/90 break-words">
                        {toast.message}
                    </p>
                    {toast.action && (
                        <button
                            type="button"
                            onClick={() => {
                                toast.action.onClick?.();
                                onDismiss(toast.id);
                            }}
                            className="mt-2 text-[11px] tracking-[0.2em] uppercase text-[#f9ffd6] hover:text-white transition-colors font-heading"
                        >
                            {toast.action.label} →
                        </button>
                    )}
                </div>

                {/* Close */}
                <button
                    type="button"
                    onClick={() => onDismiss(toast.id)}
                    aria-label="Dismiss notification"
                    className="shrink-0 w-7 h-7 flex items-center justify-center rounded-full text-white/60 hover:text-white hover:bg-white/10 transition-colors"
                >
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" aria-hidden="true">
                        <line x1="6" y1="6" x2="18" y2="18" />
                        <line x1="6" y1="18" x2="18" y2="6" />
                    </svg>
                </button>
            </div>

            {/* Progress bar for auto-dismiss */}
            {toast.duration !== Infinity && (
                <motion.div
                    className="absolute bottom-0 left-0 h-0.5"
                  style={{ backgroundColor: tone.bar, width: '100%' }}
                    initial={{ scaleX: 1 }}
                    animate={{ scaleX: 0 }}
                    transition={{ duration: (toast.duration || 4500) / 1000, ease: 'linear' }}
                />
            )}
        </motion.div>
    );
}

export function ToastProvider({ children }) {
    const [toasts, setToasts] = useState([]);
    const idCounter = useRef(0);

    const dismiss = useCallback((id) => {
        setToasts((prev) => prev.filter((t) => t.id !== id));
    }, []);

    const showToast = useCallback((options) => {
        const id = ++idCounter.current;
        const toast = {
            id,
            tone: 'info',
            duration: 4500,
            ...options,
        };
        setToasts((prev) => {
            // Cap at 4 visible toasts, drop the oldest
            const next = [...prev, toast];
            return next.slice(-4);
        });

        if (toast.duration && toast.duration !== Infinity) {
            setTimeout(() => dismiss(id), toast.duration);
        }
        return id;
    }, [dismiss]);

    const value = {
        show: showToast,
        success: (msg, opts = {}) => showToast({ tone: 'success', message: msg, ...opts }),
        error: (msg, opts = {}) => showToast({ tone: 'error', message: msg, ...opts }),
        info: (msg, opts = {}) => showToast({ tone: 'info', message: msg, ...opts }),
        warning: (msg, opts = {}) => showToast({ tone: 'warning', message: msg, ...opts }),
        dismiss,
    };

    return (
        <ToastContext.Provider value={value}>
            {children}
            <div
                className="fixed top-4 right-4 z-[1000] flex flex-col gap-3 pointer-events-none"
                style={{
                    right: 'max(1rem, env(safe-area-inset-right))',
                    top: 'max(1rem, env(safe-area-inset-top))',
                }}
                aria-label="Notifications"
            >
                <AnimatePresence initial={false}>
                    {toasts.map((t) => (
                        <ToastItem key={t.id} toast={t} onDismiss={dismiss} />
                    ))}
                </AnimatePresence>
            </div>
        </ToastContext.Provider>
    );
}

export function useToast() {
    const ctx = useContext(ToastContext);
    if (!ctx) {
        throw new Error('useToast must be used within a ToastProvider');
    }
    return ctx;
}
