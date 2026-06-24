// ============================================
// BrideVoy — AnimatedSection Wrapper
// Scroll-triggered reveal with whileInView
// ============================================
import { motion } from 'framer-motion';
import { staggerContainer, viewportOnce } from '../utils/animations';
import { useReducedMotion } from '../utils/useReducedMotion';

export default function AnimatedSection({
    children,
    className = '',
    id,
    as = 'section',
    variants = staggerContainer,
    visible = false,
    ...rest
}) {
    const prefersReduced = useReducedMotion();
    const Component = motion[as] || motion.section;

    // If section is marked visible (above-the-fold) or user prefers
    // reduced motion, render without scroll-triggered animation.
    if (prefersReduced || visible) {
        const Tag = as;
        return (
            <Tag className={className} id={id} {...rest}>
                {children}
            </Tag>
        );
    }

    return (
        <Component
            className={className}
            id={id}
            variants={variants}
            initial="hidden"
            whileInView="visible"
            viewport={viewportOnce}
            {...rest}
        >
            {children}
        </Component>
    );
}
