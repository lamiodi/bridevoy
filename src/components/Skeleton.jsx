// ============================================
// BrideVoy — Reusable Skeleton Loading Component
// Shimmer animation with Framer Motion
// ============================================
import { motion } from 'framer-motion';

const variantStyles = {
    text: { borderRadius: '4px' },
    card: { borderRadius: '8px' },
    circle: { borderRadius: '50%' },
    rect: { borderRadius: '0px' },
};

export default function Skeleton({
    width = '100%',
    height = '20px',
    variant = 'text',
    className = '',
    count = 1,
}) {
    const style = variantStyles[variant] || variantStyles.text;

    const items = Array.from({ length: count }, (_, i) => (
        <div
            key={i}
            className={`skeleton-wrapper ${className}`}
            style={{
                width,
                height,
                backgroundColor: '#1a1a1a',
                overflow: 'hidden',
                position: 'relative',
                ...style,
                marginBottom: count > 1 && i < count - 1 ? '12px' : '0',
            }}
        >
            <motion.div
                initial={{ x: '-100%' }}
                animate={{ x: '100%' }}
                transition={{
                    repeat: Infinity,
                    duration: 1.5,
                    ease: 'linear',
                }}
                style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: 0,
                    background: 'linear-gradient(90deg, transparent 0%, #2a2a2a 50%, transparent 100%)',
                }}
            />
        </div>
    ));

    return count === 1 ? items[0] : <div>{items}</div>;
}
