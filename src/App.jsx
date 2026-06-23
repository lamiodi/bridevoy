import { useState, useEffect, useCallback } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Testimonials from './components/Testimonials';
import WhyChooseUs from './components/WhyChooseUs';
import MissionVision from './components/MissionVision';
import HowItWorks from './components/HowItWorks';
import AfterSubmit from './components/AfterSubmit';
import FAQ from './components/FAQ';
import BookingWizard from './components/BookingWizard';
import Footer from './components/Footer';
import WhatsAppButton from './components/WhatsAppButton';
import Preloader from './components/Preloader';
import MeetBrideVoyIntro from './components/MeetBrideVoyIntro';
import ErrorBoundary from './components/ErrorBoundary';
import DynamicSEO from './components/DynamicSEO';
import { ToastProvider } from './components/Toast';
import { pageTransition } from './utils/animations';
import { useReducedMotion } from './utils/useReducedMotion';
import { STORAGE_KEYS } from './constants';

function hasSeenPreloader() {
    try {
        return sessionStorage.getItem(STORAGE_KEYS.preloaderSeen) === '1';
    } catch {
        return false;
    }
}

function markPreloaderSeen() {
    try {
        sessionStorage.setItem(STORAGE_KEYS.preloaderSeen, '1');
    } catch {
        // sessionStorage unavailable (private mode) — silently ignore
    }
}

export default function App() {
    const [isLoading, setIsLoading] = useState(() => {
        // Skip preloader on first render if we've already shown it this session
        // or if the user prefers reduced motion.
        if (typeof window === 'undefined') return true;
        if (hasSeenPreloader()) return false;
        const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
        return !reduce;
    });
    const prefersReduced = useReducedMotion();

    const handlePreloaderComplete = useCallback(() => {
        markPreloaderSeen();
        setIsLoading(false);
    }, []);

    // Skip preloader if reduced motion preferred (in case the initial
    // check above missed it because of timing).
    useEffect(() => {
        if (prefersReduced && isLoading) {
            setIsLoading(false);
        }
    }, [prefersReduced, isLoading]);

    // Fallback smooth scroll handler for hash links
    useEffect(() => {
        const handleSmoothScroll = (e) => {
            const target = e.target.closest('a');
            if (target && target.getAttribute('href')?.startsWith('#')) {
                const id = target.getAttribute('href');
                if (id === '#') return;
                const el = document.querySelector(id);
                if (el) {
                    e.preventDefault();
                    el.scrollIntoView({ behavior: 'smooth', block: 'start' });
                }
            }
        };
        document.addEventListener('click', handleSmoothScroll);
        return () => document.removeEventListener('click', handleSmoothScroll);
    }, []);

    return (
        <ErrorBoundary>
            <ToastProvider>
                <DynamicSEO />
                <div className="font-body bg-primary-white text-primary-black antialiased">
                    {/* Skip to Content for Accessibility */}
                    <a href="#main-content" className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 bg-[#171717] text-white px-4 py-2 z-[200] focus:outline-none focus:ring-2 focus:ring-[#f9ffd6]">
                        Skip to main content
                    </a>

                    <AnimatePresence mode="wait">
                        {isLoading && (
                            <Preloader key="preloader" onComplete={handlePreloaderComplete} />
                        )}
                    </AnimatePresence>

                    <AnimatePresence>
                        {!isLoading && (
                            <motion.div
                                key="main-app"
                                variants={pageTransition}
                                initial="initial"
                                animate="animate"
                                exit="exit"
                            >
                                <Navbar />

                                <main id="main-content">
                                    <Hero />
                                    <About />
                                    <WhyChooseUs />
                                    <Testimonials />
                                    <MissionVision />
                                    <HowItWorks />
                                    <AfterSubmit />
                                    <FAQ />
                                    <BookingWizard />
                                </main>

                                <Footer />
                                <WhatsAppButton />
                                <MeetBrideVoyIntro />
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>
            </ToastProvider>
        </ErrorBoundary>
    );
}
