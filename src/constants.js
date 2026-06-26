// ============================================
// BrideVoy — Centralized Data Constants
// ============================================

// Nav links. NOTE: "fleet" is kept as a label but points to the
// WhyChooseUs section (id="fleet"). The primary CTA is a button
// in the navbar, not a regular nav item.
export const NAV_LINKS = [
    { label: 'HOME', href: '#home' },
    { label: 'THE FLEET', href: '#fleet' },
    { label: 'PROCESS', href: '#process' },
    { label: 'FAQ', href: '#faq' },
];

export const WHY_CHOOSE_US_LEFT = [
    {
        title: 'Impeccable Punctuality',
        description: 'Our chauffeurs arrive early, ensuring your timeline flows perfectly without the stress of Lagos traffic.',
    },
    {
        title: 'Discreet Professionals',
        description: 'Trained, sharply dressed chauffeurs who understand etiquette, opening doors and offering quiet assistance.',
    },
];

export const WHY_CHOOSE_US_RIGHT = [
    {
        title: 'Pristine Vehicle Prep',
        description: 'Every S-Class is rigorously detailed, climate-controlled, and stocked with water and mints before arrival.',
    },
    {
        title: 'Wedding Coordination',
        description: 'We communicate directly with your planners to coordinate pick-ups, photography stops, and venue drops.',
    },
];

// A 5th "trust" card shown in the section intro / mobile rotator.
export const WHY_CHOOSE_US_EXTRA = {
    title: 'Single-Vehicle Focus',
    description: 'We operate one S-Class by choice — every booking gets our undivided attention and our flagship vehicle.',
};

export const JOURNEY_STEPS = [
    {
        title: 'Share Your Date',
        description: 'Tell us your event date, pickup time, and the type of occasion you are planning.',
    },
    {
        title: 'Confirm Your Route',
        description: 'We review your pickup, ceremony, photo stop, and reception locations to build a clean movement plan.',
    },
    {
        title: 'Choose Your Duration',
        description: 'Select the 6-hour, 8-hour, or 12-hour duration and add-ons that match your timeline, presentation needs, and guest experience.',
    },
    {
        title: 'Receive Your Quote',
        description: 'We respond with availability and a tailored quote. Once you confirm, we send a formal invoice with secure payment details.',
    },
];

export const SERVICE_AREAS = [
    'Ikoyi',
    'Victoria Island',
    'Lekki',
    'Ikeja GRA',
    'Banana Island',
    'Parkview Estate',
    'Oniru',
];

// Expanded FAQ list. Includes 2 new high-intent questions
// (see the car + cancellation policy) that planners ask on WhatsApp.
export const FAQ_ITEMS = [
    {
        q: 'What is included in the rental?',
        a: 'Every rental includes a professional chauffeur, fuel for the agreed journey, and complimentary refreshments.',
    },
    {
        q: 'How far in advance should I book?',
        a: 'We recommend booking at least 2–3 months in advance, especially for peak wedding seasons between October and April.',
    },
    {
        q: 'Are there any hidden charges?',
        a: 'No. A fixed ₦300,000 caution fee applies to all bookings and is clearly itemised in your final invoice.',
    },
    {
        q: 'When is the caution fee refunded?',
        a: 'The caution fee is refunded within 5–7 business days after the rental, once the vehicle is returned in its original condition.',
    },
    {
        q: 'Which Lagos service areas do you cover?',
        a: 'We cover Ikoyi, Victoria Island, Lekki, Ikeja GRA, and surrounding premium districts. Travel outside these areas can be arranged on request.',
    },
    {
        q: 'How long do you hold a date before payment?',
        a: 'We hold a requested date for 48 hours while payment is in progress. The date is not secured until payment is confirmed.',
    },
    {
        q: 'What happens if my event runs late?',
        a: 'Overtime is billed at a transparent hourly rate, communicated in advance. We also offer standby hours at a discounted rate if you want guaranteed extra time.',
    },
    {
        q: 'Do you provide standby chauffeurs?',
        a: 'Yes. A standby chauffeur can be added to any booking on request, ideal for multi-day or large-scale events.',
    },
    {
        q: 'What is your cancellation policy?',
        a: 'Cancellations made 30+ days before the event receive a full caution-fee refund. Within 30 days, a 50% retention applies to cover reservation costs.',
    },
    {
        q: 'Do you offer airport pickups to weddings?',
        a: 'Yes. We can collect VIP guests from Murtala Muhammed Airport and deliver them to your venue, hotel, or residence with luggage assistance.',
    },
    {
        q: 'Is gratuity included?',
        a: 'Gratuity is not included and is at your discretion. A 10% tip is customary for exceptional service and is appreciated by our chauffeurs.',
    },
];

export const DURATIONS = [
    { label: '6-Hour Booking', startingFrom: '₦250,000' },
    { label: '8-Hour Booking', startingFrom: '₦320,000' },
    { label: '12-Hour Booking', startingFrom: '₦450,000' },
];

// Addons now include a price hint so users know what changes the quote.
export const ADDONS = [
    { label: 'Champagne Upgrade', name: 'champagne', from: '₦40,000' },
    { label: 'Security Escort', name: 'security', from: '₦80,000' },
    { label: 'Floral Upgrade', name: 'floral', from: '₦35,000' },
    { label: 'Extra Stop', name: 'extra-stop', from: '₦15,000' },
];

// Expanded event-type options. The original two remain at the top
// of the list to preserve the most common flow.
export const EVENT_TYPES = [
    'Wedding',
    'Engagement / Proposal',
    'Anniversary',
    'Corporate / Executive',
    'Airport VIP Transfer',
    'Photoshoot / Film',
    'Other Celebration',
];

// Testimonials — quotes from couples and planners.
export const TESTIMONIALS = [
    {
        quote: 'Our chauffeur was already parked downstairs 20 minutes before call time. The S-Class was spotless, water was cold, and we made it to the ceremony with time to spare.',
        author: 'Adaeze & Tobi',
        role: 'Wedding Couple · Ikoyi',
    },
    {
        quote: 'BrideVoy coordinated directly with our planner on three photo-stop changes. Zero stress on the day. We use them on every premium wedding we produce.',
        author: 'Folake A.',
        role: 'Lead Planner · Lagos',
    },
    {
        quote: 'The car is the photo. Our couple asked the chauffeur to step out for a back shot and he just smiled and obliged. That is the level of service.',
        author: 'Studio Adunni',
        role: 'Wedding Photographer',
    },
];

export const FOOTER_LINKS = [
    { label: 'HOME', href: '#home' },
    { label: 'THE FLEET', href: '#fleet' },
    { label: 'PROCESS', href: '#process' },
    { label: 'FAQ', href: '#faq' },
];

const env = import.meta.env;

function getConfigValue(key, { fallback = '', invalid = [] } = {}) {
    const value = env[key];
    if (typeof value !== 'string') return fallback;
    const trimmed = value.trim();
    if (!trimmed || invalid.includes(trimmed)) return fallback;
    return trimmed;
}

export const BRAND_EMAIL = getConfigValue('VITE_BRAND_EMAIL', {
    fallback: 'reservations@bridevoy.com',
});
export const BRAND_PHONE_DISPLAY = getConfigValue('VITE_BRAND_PHONE_DISPLAY');
export const BRAND_PHONE_LINK = BRAND_PHONE_DISPLAY.replace(/[^\d+]/g, '');
// WhatsApp number is also used for the mobile navbar direct action.
export const WHATSAPP_NUMBER = getConfigValue('VITE_WHATSAPP_NUMBER');
export const WHATSAPP_MESSAGE = getConfigValue('VITE_WHATSAPP_MESSAGE', {
    fallback: 'Hello BrideVoy, I would like to inquire about your luxury chauffeur services.',
});
export const WHATSAPP_URL = WHATSAPP_NUMBER
    ? `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(WHATSAPP_MESSAGE)}`
    : '';
export const INSTAGRAM_URL = getConfigValue('VITE_INSTAGRAM_URL', {
    fallback: 'https://instagram.com/bridevoy',
});
export const INSTAGRAM_HANDLE = getConfigValue('VITE_INSTAGRAM_HANDLE', {
    fallback: '@bridevoy',
});
// FormSubmit is a no-signup form-to-email service.
// The endpoint is auto-derived from BRAND_EMAIL — just set
// VITE_BRAND_EMAIL and bookings are delivered straight to the inbox.
// Docs: https://formsubmit.co
export const FORMSUBMIT_ENDPOINT = BRAND_EMAIL
    ? `https://formsubmit.co/ajax/${BRAND_EMAIL}`
    : '';

// Booking commitments (used in hero + wizard success).
export const RESPONSE_TIME = 'Reply within 4 business hours';
export const STARTING_PRICE = '₦250,000';

// Storage keys (used for autosave / preloader gating).
export const STORAGE_KEYS = {
    preloaderSeen: 'bridevoy_preloader_seen_v1',
    bookingDraft: 'bridevoy_booking_draft_v1',
};

export const HAS_PHONE_CONFIG = Boolean(BRAND_PHONE_DISPLAY && BRAND_PHONE_LINK);
export const HAS_WHATSAPP_CONFIG = Boolean(WHATSAPP_URL);
export const HAS_INSTAGRAM_CONFIG = Boolean(INSTAGRAM_URL);
export const HAS_FORMSUBMIT_CONFIG = Boolean(FORMSUBMIT_ENDPOINT);
