// ============================================
// BrideVoy — Dynamic SEO schema injection
// Adds a full FAQPage JSON-LD block built from
// the FAQ_ITEMS constants. Other JSON-LD blocks
// (LocalBusiness, FAQ highlights) live in index.html.
// ============================================
import { useEffect } from 'react';
import { FAQ_ITEMS } from '../constants';

const SCHEMA_ID = 'bridevoy-faq-schema';

export default function DynamicSEO() {
    useEffect(() => {
        // Avoid double-injecting in StrictMode.
        if (typeof document === 'undefined') return;
        if (document.getElementById(SCHEMA_ID)) return;

        const script = document.createElement('script');
        script.type = 'application/ld+json';
        script.id = SCHEMA_ID;
        script.textContent = JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'FAQPage',
            mainEntity: FAQ_ITEMS.map((f) => ({
                '@type': 'Question',
                name: f.q,
                acceptedAnswer: { '@type': 'Answer', text: f.a },
            })),
        });
        document.head.appendChild(script);

        return () => {
            const el = document.getElementById(SCHEMA_ID);
            if (el) el.remove();
        };
    }, []);

    return null;
}
