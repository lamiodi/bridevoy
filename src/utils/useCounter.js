// ============================================
// BrideVoy — Animated Number Counter Hook
// Smooth counting animation for metrics/stats
// ============================================
import { useState, useEffect, useRef } from 'react';

export function useCounter(end, duration = 2000, startOnView = false) {
    const [count, setCount] = useState(0);
    const [hasStarted, setHasStarted] = useState(!startOnView);
    const ref = useRef(null);

    // Intersection Observer trigger
    useEffect(() => {
        if (!startOnView || !ref.current) return;

        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setHasStarted(true);
                    observer.disconnect();
                }
            },
            { threshold: 0.3 }
        );

        observer.observe(ref.current);
        return () => observer.disconnect();
    }, [startOnView]);

    // Animate the count
    useEffect(() => {
        if (!hasStarted) return;

        let startTime;
        let animationFrame;

        const step = (timestamp) => {
            if (!startTime) startTime = timestamp;
            const progress = Math.min((timestamp - startTime) / duration, 1);

            // Ease out cubic for smooth deceleration
            const eased = 1 - Math.pow(1 - progress, 3);
            setCount(Math.floor(eased * end));

            if (progress < 1) {
                animationFrame = requestAnimationFrame(step);
            }
        };

        animationFrame = requestAnimationFrame(step);
        return () => cancelAnimationFrame(animationFrame);
    }, [end, duration, hasStarted]);

    return { count, ref };
}
