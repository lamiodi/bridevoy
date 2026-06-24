// ============================================
// BrideVoy — Logo Preloader Component
// Luxury intro animation before page reveal
// ============================================
import { motion } from 'framer-motion';

export default function Preloader({ onComplete }) {
    return (
        <motion.div
            role="status"
            aria-live="polite"
            aria-busy="true"
            aria-label="Loading BrideVoy"
            className="preloader"
            initial={{ opacity: 1 }}
            exit={{
                opacity: 0,
                transition: { duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] },
            }}
            style={{
                position: 'fixed',
                inset: 0,
                zIndex: 9999,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                background: '#171717',
            }}
        >
            {/* Logo Container */}
            <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
                style={{
                    background: '#FCFCFC',
                    padding: '20px 28px',
                    display: 'inline-flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                }}
            >
                <img
                    src="/logo.webp"
                    alt="BrideVoy"
                    style={{ height: '70px', objectFit: 'contain' }}
                />
            </motion.div>

            {/* Tagline */}
            <motion.p
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.5, ease: 'easeOut' }}
                style={{
                    fontFamily: "'Cinzel', serif",
                    fontSize: '14px',
                    letterSpacing: '0.25em',
                    color: '#999',
                    marginTop: '24px',
                    textTransform: 'uppercase',
                }}
            >
                The Art of Grand Arrival
            </motion.p>

            {/* Loading Bar */}
            <div style={{
                width: '160px',
                height: '2px',
                background: '#333',
                marginTop: '32px',
                borderRadius: '1px',
                overflow: 'hidden',
            }}>
                <motion.div
                    initial={{ width: '0%' }}
                    animate={{ width: '100%' }}
                    transition={{ duration: 1.5, ease: [0.25, 0.46, 0.45, 0.94] }}
                    onAnimationComplete={onComplete}
                    style={{
                        height: '100%',
                        background: 'linear-gradient(90deg, #555, #FCFCFC)',
                        borderRadius: '1px',
                    }}
                />
            </div>
        </motion.div>
    );
}
