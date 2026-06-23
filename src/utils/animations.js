// ============================================
// BrideVoy — Framer Motion Animation Presets
// Centralized animation variants & utilities
// ============================================

// ---------- Fade-Up Variants ----------
export const fadeUpVariant = {
    hidden: { opacity: 0, y: 30 },
    visible: (i = 0) => ({
        opacity: 1,
        y: 0,
        transition: {
            duration: 0.6,
            delay: i * 0.1,
            ease: [0.25, 0.46, 0.45, 0.94],
        },
    }),
};

// ---------- Staggered Container ----------
export const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: {
            staggerChildren: 0.12,
            delayChildren: 0.1,
        },
    },
};

// ---------- Staggered Child ----------
export const staggerChild = {
    hidden: { opacity: 0, y: 24 },
    visible: {
        opacity: 1,
        y: 0,
        transition: {
            duration: 0.5,
            ease: [0.25, 0.46, 0.45, 0.94],
        },
    },
};

// ---------- Scale-In Variant ----------
export const scaleInVariant = {
    hidden: { opacity: 0, scale: 0.92 },
    visible: {
        opacity: 1,
        scale: 1,
        transition: {
            duration: 0.5,
            ease: [0.25, 0.46, 0.45, 0.94],
        },
    },
};

// ---------- Slide-In from Left ----------
export const slideInLeft = {
    hidden: { opacity: 0, x: -40 },
    visible: {
        opacity: 1,
        x: 0,
        transition: {
            duration: 0.6,
            ease: [0.25, 0.46, 0.45, 0.94],
        },
    },
};

// ---------- Slide-In from Right ----------
export const slideInRight = {
    hidden: { opacity: 0, x: 40 },
    visible: {
        opacity: 1,
        x: 0,
        transition: {
            duration: 0.6,
            ease: [0.25, 0.46, 0.45, 0.94],
        },
    },
};

// ---------- Card Hover Interaction ----------
export const cardHover = {
    scale: 1.025,
    boxShadow: '0 20px 50px rgba(0, 0, 0, 0.12)',
    transition: { duration: 0.25, ease: 'easeOut' },
};

export const cardTap = {
    scale: 0.98,
};

// ---------- Button Hover Interaction ----------
export const buttonHover = {
    scale: 1.04,
    boxShadow: '0 6px 20px rgba(0, 0, 0, 0.15)',
    transition: { duration: 0.2, ease: 'easeOut' },
};

export const buttonTap = {
    scale: 0.96,
};

// ---------- Viewport Trigger Defaults ----------
export const viewportOnce = {
    once: true,
    margin: '-60px',
    amount: 0.15,
};

// ---------- Page Transition Variants ----------
export const pageTransition = {
    initial: { opacity: 0, y: 20 },
    animate: {
        opacity: 1,
        y: 0,
        transition: {
            duration: 0.5,
            ease: [0.25, 0.46, 0.45, 0.94],
        },
    },
    exit: {
        opacity: 0,
        y: -10,
        transition: {
            duration: 0.3,
            ease: 'easeIn',
        },
    },
};

// ---------- Skeleton Shimmer ----------
export const shimmerVariant = {
    initial: { x: '-100%' },
    animate: {
        x: '100%',
        transition: {
            repeat: Infinity,
            duration: 1.5,
            ease: 'linear',
        },
    },
};

// ---------- Content Reveal (post-skeleton) ----------
export const contentReveal = {
    initial: { opacity: 0, y: 20 },
    animate: {
        opacity: 1,
        y: 0,
        transition: {
            duration: 0.45,
            ease: [0.25, 0.46, 0.45, 0.94],
        },
    },
    exit: {
        opacity: 0,
        transition: { duration: 0.2 },
    },
};
