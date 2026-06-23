// ============================================
// BrideVoy — Motion / accessibility utilities
// ============================================
import { useEffect, useState } from 'react';

/**
 * Returns true when the user has requested reduced motion via
 * OS-level "prefers-reduced-motion: reduce".
 */
export function useReducedMotion() {
    const [reduced, setReduced] = useState(false);

    useEffect(() => {
        if (typeof window === 'undefined') return undefined;
        const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
        const update = () => setReduced(mq.matches);
        update();
        // Both modern and legacy event names for older browsers.
        mq.addEventListener?.('change', update);
        mq.addListener?.(update);
        return () => {
            mq.removeEventListener?.('change', update);
            mq.removeListener?.(update);
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
