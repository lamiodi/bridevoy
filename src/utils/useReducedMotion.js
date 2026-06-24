// ============================================
// BrideVoy — Motion / accessibility utilities
// ============================================
import { useEffect, useState } from 'react';

/**
 * Returns true when the user has requested reduced motion via
 * OS-level "prefers-reduced-motion: reduce".
 */
export function useReducedMotion() {
    const [reduced, setReduced] = useState(() => {
        if (typeof window === 'undefined') return false;
        const osReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
        const isMobile = window.innerWidth < 768;
        return osReduced || isMobile;
    });

    useEffect(() => {
        if (typeof window === 'undefined') return undefined;
        const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
        
        const update = () => {
            const isMobile = window.innerWidth < 768;
            setReduced(mq.matches || isMobile);
        };
        
        update();
        mq.addEventListener?.('change', update);
        mq.addListener?.(update);
        window.addEventListener('resize', update);
        
        return () => {
            mq.removeEventListener?.('change', update);
            mq.removeListener?.(update);
            window.removeEventListener('resize', update);
        };
    }, []);

    return reduced;
}

/**
 * Returns true when the supplied media query matches.
 * Useful for viewport-aware tweaks (mobile vs. desktop motion).
 */
export function useMediaQuery(query) {
    const [matches, setMatches] = useState(() => {
        if (typeof window === 'undefined') return false;
        return window.matchMedia(query).matches;
    });

    useEffect(() => {
        if (typeof window === 'undefined') return undefined;
        const mq = window.matchMedia(query);
        const update = () => setMatches(mq.matches);
        update();
        mq.addEventListener?.('change', update);
        mq.addListener?.(update);
        return () => {
            mq.removeEventListener?.('change', update);
            mq.removeListener?.(update);
        };
    }, [query]);

    return matches;
}
