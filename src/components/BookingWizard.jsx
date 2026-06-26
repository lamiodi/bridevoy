// ============================================
// BrideVoy — Booking Wizard
// 5-step reservation flow with autosave, manual
// fallback to mailto when FormSubmit is not configured,
// and grouped review screen.
// ============================================
import { useState, useCallback, useMemo, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import AnimatedSection from './AnimatedSection';
import {
    DURATIONS,
    ADDONS,
    EVENT_TYPES,
    FORMSUBMIT_ENDPOINT,
    HAS_FORMSUBMIT_CONFIG,
    HAS_WHATSAPP_CONFIG,
    WHATSAPP_URL,
    BRAND_EMAIL,
    STORAGE_KEYS,
    RESPONSE_TIME,
} from '../constants';
import { staggerChild, buttonHover, buttonTap } from '../utils/animations';
import { useReducedMotion } from '../utils/useReducedMotion';
import { useToast } from './Toast';

const STEP_LABELS = ['Event', 'Route', 'Duration', 'Details', 'Review'];

const stepVariants = {
    enter: { opacity: 0, x: 24 },
    center: {
        opacity: 1,
        x: 0,
        transition: { duration: 0.35, ease: [0.25, 0.46, 0.45, 0.94] },
    },
    exit: {
        opacity: 0,
        x: -24,
        transition: { duration: 0.25, ease: 'easeIn' },
    },
};

const initialFormData = {
    eventType: 'Wedding',
    eventDate: '',
    pickupTime: '',
    pickupAddress: '',
    dropoffAddress: '',
    durationIndex: 0,
    clientName: '',
    clientEmail: '',
    clientPhone: '',
    specialRequests: '',
};

const FRIENDLY = {
    eventDate: {
        required: 'Please choose a date for your event.',
        past: 'Your event date needs to be in the future — today or later works.',
    },
    pickupTime: {
        required: 'What time should we pick you up?',
    },
    pickupAddress: {
        required: 'Where should we pick you up? Please share an address or landmark.',
    },
    dropoffAddress: {
        required: 'Where are we heading? Add a drop-off address to continue.',
    },
    clientName: {
        required: 'May we have your full name?',
    },
    clientEmail: {
        required: "We'll need an email address to send your quote.",
        invalid: "That doesn't look like a valid email — could you double-check?",
    },
    clientPhone: {
        required: 'How can we reach you on WhatsApp?',
        invalid: 'Please double-check that number — it should be 10–15 digits, with country code (e.g. +234 …).',
    },
};

// Build a mailto fallback so the user always has a path
// to confirm a booking, even when FormSubmit is not configured.
function buildMailtoBody(formData, selectedAddons) {
    const lines = [
        `Hello BrideVoy,`,
        ``,
        `I would like to confirm the following reservation:`,
        ``,
        `Event type: ${formData.eventType}`,
        `Event date: ${formData.eventDate}`,
        `Pickup time: ${formData.pickupTime}`,
        `Pickup: ${formData.pickupAddress}`,
        `Drop-off: ${formData.dropoffAddress}`,
        `Duration: ${DURATIONS[formData.durationIndex].label}`,
        `Add-ons: ${Object.keys(selectedAddons).join(', ') || 'None'}`,
        ``,
        `Name: ${formData.clientName}`,
        `Email: ${formData.clientEmail}`,
        `WhatsApp: ${formData.clientPhone}`,
        formData.specialRequests ? `Notes: ${formData.specialRequests}` : '',
    ].filter(Boolean);
    return encodeURIComponent(lines.join('\n'));
}

function loadDraft() {
    try {
        const raw = sessionStorage.getItem(STORAGE_KEYS.bookingDraft);
        if (!raw) return null;
        const parsed = JSON.parse(raw);
        if (!parsed || typeof parsed !== 'object') return null;
        return parsed;
    } catch {
        return null;
    }
}

function saveDraft(state) {
    try {
        sessionStorage.setItem(STORAGE_KEYS.bookingDraft, JSON.stringify(state));
    } catch {
        // sessionStorage unavailable — silently ignore
    }
}

function clearDraft() {
    try {
        sessionStorage.removeItem(STORAGE_KEYS.bookingDraft);
    } catch {
        // ignore
    }
}

export default function BookingWizard() {
    const prefersReduced = useReducedMotion();
    const toast = useToast();
    const draftLoaded = useRef(false);

    const [currentStep, setCurrentStep] = useState(1);
    const [formData, setFormData] = useState(initialFormData);
    const [selectedAddons, setSelectedAddons] = useState({});
    const [errors, setErrors] = useState({});
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submitError, setSubmitError] = useState('');
    const [errorCount, setErrorCount] = useState(0);

    const supportFallback = HAS_WHATSAPP_CONFIG
        ? 'Please try again, or reach us on WhatsApp.'
        : `Please try again, or email us at ${BRAND_EMAIL}.`;

    // Load draft on first mount.
    useEffect(() => {
        if (draftLoaded.current) return;
        draftLoaded.current = true;
        const draft = loadDraft();
        if (draft) {
            setFormData((prev) => ({ ...prev, ...(draft.formData || {}) }));
            setSelectedAddons(draft.selectedAddons || {});
            if (draft.currentStep) {
                setCurrentStep(draft.currentStep);
                toast.info('We restored your in-progress booking.', {
                    title: 'Welcome back',
                    duration: 4000,
                });
            }
        }
    }, [toast]);

    // Persist draft on every change.
    useEffect(() => {
        if (isSubmitted) return;
        saveDraft({ formData, selectedAddons, currentStep });
    }, [formData, selectedAddons, currentStep, isSubmitted]);

    const handleInputChange = useCallback((e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
        setErrors((prev) => {
            if (!prev[name]) return prev;
            const next = { ...prev };
            delete next[name];
            return next;
        });
    }, []);

    const handleDurationChange = useCallback((e) => {
        const index = parseInt(e.target.value, 10) || 0;
        setFormData((prev) => ({ ...prev, durationIndex: index }));
    }, []);

    const handleAddonToggle = useCallback((addonName, checked) => {
        setSelectedAddons((prev) => {
            const next = { ...prev };
            if (checked) next[addonName] = true;
            else delete next[addonName];
            return next;
        });
    }, []);

    const validateStep = useCallback((step, data = formData) => {
        const newErrors = {};
        if (step === 1) {
            if (!data.eventDate) {
                newErrors.eventDate = FRIENDLY.eventDate.required;
            } else {
                const selectedDate = new Date(`${data.eventDate}T00:00:00`);
                const today = new Date();
                today.setHours(0, 0, 0, 0);
                if (selectedDate < today) {
                    newErrors.eventDate = FRIENDLY.eventDate.past;
                }
            }
            if (!data.pickupTime) newErrors.pickupTime = FRIENDLY.pickupTime.required;
        } else if (step === 2) {
            if (!data.pickupAddress.trim()) newErrors.pickupAddress = FRIENDLY.pickupAddress.required;
            if (!data.dropoffAddress.trim()) newErrors.dropoffAddress = FRIENDLY.dropoffAddress.required;
        } else if (step === 4) {
            if (!data.clientName.trim()) newErrors.clientName = FRIENDLY.clientName.required;
            if (!data.clientEmail.trim()) {
                newErrors.clientEmail = FRIENDLY.clientEmail.required;
            } else if (!/\S+@\S+\.\S+/.test(data.clientEmail)) {
                newErrors.clientEmail = FRIENDLY.clientEmail.invalid;
            }
            if (!data.clientPhone.trim()) {
                newErrors.clientPhone = FRIENDLY.clientPhone.required;
            } else {
                const digits = data.clientPhone.replace(/[^\d]/g, '');
                if (digits.length < 10 || digits.length > 15) {
                    newErrors.clientPhone = FRIENDLY.clientPhone.invalid;
                }
            }
        }
        setErrors(newErrors);
        setErrorCount(Object.keys(newErrors).length);
        return Object.keys(newErrors).length === 0;
    }, [formData]);

    const handleNextStep = useCallback(() => {
        if (validateStep(currentStep)) {
            const nextStep = currentStep + 1;
            setCurrentStep(nextStep);
            const stepNames = ['Event', 'Route', 'Duration', 'Details', 'Review'];
            toast.info(`Step ${nextStep} of 5 — ${stepNames[nextStep - 1]}`, { duration: 2200 });
        } else {
            const firstError = Object.values(errors)[0];
            toast.warning(firstError || 'Please complete the highlighted fields to continue.', {
                title: 'A few details to finish',
            });
        }
    }, [currentStep, validateStep, errors, toast]);

    const handlePrevStep = useCallback(() => {
        setCurrentStep((s) => Math.max(1, s - 1));
    }, []);

    // Allow clicking on completed steps to jump back.
    const handleStepClick = useCallback((stepNum) => {
        if (stepNum < currentStep) {
            setCurrentStep(stepNum);
            // Light validation pass for that step so users can edit
            validateStep(stepNum);
        }
    }, [currentStep, validateStep]);

    const handleFormSubmit = useCallback(async (e) => {
        e.preventDefault();

        // Validate every step before submitting from the review screen.
        let firstBad = 0;
        for (const step of [1, 2, 4]) {
            if (!validateStep(step, formData)) {
                if (firstBad === 0) firstBad = step;
            }
        }
        if (firstBad) {
            setCurrentStep(firstBad);
            toast.warning('Some details need your attention before we submit.', {
                title: 'Almost there',
            });
            return;
        }

        setIsSubmitting(true);
        setSubmitError('');
        const addonsList = Object.keys(selectedAddons).join(', ') || 'None';

        const submissionData = {
            'Event Type': formData.eventType,
            'Event Date': formData.eventDate,
            'Pickup Time': formData.pickupTime,
            'Pickup Address': formData.pickupAddress,
            'Drop-off Address': formData.dropoffAddress,
            'Selected Duration': DURATIONS[formData.durationIndex].label,
            'Selected Add-ons': addonsList,
            'Caution Fee': '₦300,000 (Fixed)',
            'Client Name': formData.clientName,
            'Client Email': formData.clientEmail,
            'WhatsApp Number': formData.clientPhone,
            'Special Requests': formData.specialRequests,
        };

        if (!HAS_FORMSUBMIT_CONFIG) {
            // No FormSubmit endpoint (no brand email) — hand off to a
            // prefilled email and treat as success.
            const body = buildMailtoBody(formData, selectedAddons);
            const href = `mailto:${BRAND_EMAIL}?subject=${encodeURIComponent('BrideVoy Reservation Request')}&body=${body}`;
            // Open the user's mail client.
            window.location.href = href;
            setIsSubmitted(true);
            setIsSubmitting(false);
            clearDraft();
            toast.success(
                `We opened your mail app to send this to ${BRAND_EMAIL}. Send the message to complete your request.`,
                { title: 'Almost there', duration: 8000 }
            );
            return;
        }

        try {
            const res = await fetch(FORMSUBMIT_ENDPOINT, {
                method: 'POST',
                body: JSON.stringify(submissionData),
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                },
            });
            if (res.ok) {
                setIsSubmitted(true);
                clearDraft();
                toast.success('Your reservation request is in. We\'ll be in touch within 24 hours.', {
                    title: 'Request received',
                    duration: 6000,
                });
            } else {
                const message = `We couldn't send your request just now. ${supportFallback}`;
                setSubmitError(message);
                toast.error(message, {
                    title: 'Submission failed',
                    duration: 6000,
                    action: {
                        label: 'Try again',
                        onClick: () => handleFormSubmit({ preventDefault: () => {} }),
                    },
                });
            }
        } catch {
            const message = `Looks like there's a connection issue. Check your network and try again — we're ready when you are. ${supportFallback}`;
            setSubmitError(message);
            toast.error(message, {
                title: 'Connection problem',
                duration: 6000,
            });
        } finally {
            setIsSubmitting(false);
        }
    }, [formData, selectedAddons, validateStep, toast, supportFallback]);

    const inputBase =
        'w-full px-4 py-3 border font-body text-sm bg-gray-50 focus:outline-none focus:border-brand-accent focus:bg-white focus:ring-2 focus:ring-[#f9ffd6]/40 transition-all rounded-none';

    // Today's date in YYYY-MM-DD for the date input min attribute.
    const todayStr = new Date().toISOString().split('T')[0];

    const stepContent = useMemo(
        () => ({
            1: (
                <div className="space-y-6">
                    <h3 className="font-heading text-lg md:text-xl border-b border-gray-100 pb-3 text-[#171717] uppercase tracking-wider">
                        Event Details
                    </h3>

                    <div className="flex flex-col gap-2">
                        <label htmlFor="event-type" className="font-body text-xs md:text-sm font-semibold tracking-wider text-[#171717] uppercase">
                            Event Type
                        </label>
                        <select
                            id="event-type"
                            name="eventType"
                            value={formData.eventType}
                            onChange={handleInputChange}
                            className={`${inputBase} border-gray-300`}
                        >
                            {EVENT_TYPES.map((t) => (
                                <option key={t} value={t}>{t}</option>
                            ))}
                        </select>
                    </div>

                    <div className="flex flex-col gap-2">
                        <label htmlFor="event-date" className="font-body text-xs md:text-sm font-semibold tracking-wider text-[#171717] uppercase">
                            Event Date
                        </label>
                        <input
                            type="date"
                            id="event-date"
                            name="eventDate"
                            value={formData.eventDate}
                            min={todayStr}
                            onChange={handleInputChange}
                            aria-invalid={!!errors.eventDate}
                            aria-describedby={errors.eventDate ? 'event-date-error' : undefined}
                            className={`${inputBase} ${errors.eventDate ? 'border-red-500' : 'border-gray-300'}`}
                        />
                        <span className="font-body text-[11px] text-gray-500">
                            Same-day requests welcome — call to confirm availability.
                        </span>
                        {errors.eventDate && (
                            <span id="event-date-error" className="flex items-start gap-2 text-[#171717] text-xs font-body mt-1 pl-2 border-l-2 border-[#f9ffd6]" role="alert">
                                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#f9ffd6" strokeWidth="2.5" strokeLinecap="round" className="shrink-0 mt-0.5" aria-hidden="true">
                                    <circle cx="12" cy="12" r="10" />
                                    <line x1="12" y1="8" x2="12" y2="12" />
                                    <line x1="12" y1="16" x2="12.01" y2="16" />
                                </svg>
                                <span>{errors.eventDate}</span>
                            </span>
                        )}
                    </div>

                    <div className="flex flex-col gap-2">
                        <label htmlFor="pickup-time" className="font-body text-xs md:text-sm font-semibold tracking-wider text-[#171717] uppercase">
                            Pickup Time
                        </label>
                        <input
                            type="time"
                            id="pickup-time"
                            name="pickupTime"
                            value={formData.pickupTime}
                            onChange={handleInputChange}
                            aria-invalid={!!errors.pickupTime}
                            aria-describedby={errors.pickupTime ? 'pickup-time-error' : undefined}
                            className={`${inputBase} ${errors.pickupTime ? 'border-red-500' : 'border-gray-300'}`}
                        />
                        {errors.pickupTime && (
                            <span id="pickup-time-error" className="flex items-start gap-2 text-[#171717] text-xs font-body mt-1 pl-2 border-l-2 border-[#f9ffd6]" role="alert">
                                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#f9ffd6" strokeWidth="2.5" strokeLinecap="round" className="shrink-0 mt-0.5" aria-hidden="true">
                                    <circle cx="12" cy="12" r="10" />
                                    <line x1="12" y1="8" x2="12" y2="12" />
                                    <line x1="12" y1="16" x2="12.01" y2="16" />
                                </svg>
                                <span>{errors.pickupTime}</span>
                            </span>
                        )}
                    </div>

                    <div className="pt-4">
                        <motion.button
                            type="button"
                            className="w-full md:w-auto px-8 py-3.5 bg-primary-black text-white font-heading text-xs tracking-widest uppercase hover:bg-[#f9ffd6] hover:text-[#171717] hover:shadow-[0_0_0_1px_#f9ffd6] transition-colors duration-300 rounded-none focus:outline-none focus:ring-2 focus:ring-[#f9ffd6] focus:ring-offset-2"
                            onClick={handleNextStep}
                            whileHover={!prefersReduced ? buttonHover : undefined}
                            whileTap={!prefersReduced ? buttonTap : undefined}
                        >
                            Next Step
                        </motion.button>
                    </div>
                </div>
            ),
            2: (
                <div className="space-y-6">
                    <h3 className="font-heading text-lg md:text-xl border-b border-gray-100 pb-3 text-[#171717] uppercase tracking-wider">
                        Route &amp; Location
                    </h3>

                    <div className="flex flex-col gap-2">
                        <label htmlFor="pickup-address" className="font-body text-xs md:text-sm font-semibold tracking-wider text-[#171717] uppercase">
                            Pickup Address
                        </label>
                        <input
                            type="text"
                            id="pickup-address"
                            name="pickupAddress"
                            value={formData.pickupAddress}
                            onChange={handleInputChange}
                            placeholder="e.g., The George Hotel, Ikoyi"
                            aria-invalid={!!errors.pickupAddress}
                            aria-describedby={errors.pickupAddress ? 'pickup-address-error' : undefined}
                            className={`${inputBase} ${errors.pickupAddress ? 'border-red-500' : 'border-gray-300'}`}
                        />
                        {errors.pickupAddress && (
                            <span id="pickup-address-error" className="flex items-start gap-2 text-[#171717] text-xs font-body mt-1 pl-2 border-l-2 border-[#f9ffd6]" role="alert">
                                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#f9ffd6" strokeWidth="2.5" strokeLinecap="round" className="shrink-0 mt-0.5" aria-hidden="true">
                                    <circle cx="12" cy="12" r="10" />
                                    <line x1="12" y1="8" x2="12" y2="12" />
                                    <line x1="12" y1="16" x2="12.01" y2="16" />
                                </svg>
                                <span>{errors.pickupAddress}</span>
                            </span>
                        )}
                    </div>

                    <div className="flex flex-col gap-2">
                        <label htmlFor="dropoff-address" className="font-body text-xs md:text-sm font-semibold tracking-wider text-[#171717] uppercase">
                            Drop-off Address
                        </label>
                        <input
                            type="text"
                            id="dropoff-address"
                            name="dropoffAddress"
                            value={formData.dropoffAddress}
                            onChange={handleInputChange}
                            placeholder="e.g., Landmark Event Centre, Victoria Island"
                            aria-invalid={!!errors.dropoffAddress}
                            aria-describedby={errors.dropoffAddress ? 'dropoff-address-error' : undefined}
                            className={`${inputBase} ${errors.dropoffAddress ? 'border-red-500' : 'border-gray-300'}`}
                        />
                        {errors.dropoffAddress && (
                            <span id="dropoff-address-error" className="flex items-start gap-2 text-[#171717] text-xs font-body mt-1 pl-2 border-l-2 border-[#f9ffd6]" role="alert">
                                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#f9ffd6" strokeWidth="2.5" strokeLinecap="round" className="shrink-0 mt-0.5" aria-hidden="true">
                                    <circle cx="12" cy="12" r="10" />
                                    <line x1="12" y1="8" x2="12" y2="12" />
                                    <line x1="12" y1="16" x2="12.01" y2="16" />
                                </svg>
                                <span>{errors.dropoffAddress}</span>
                            </span>
                        )}
                    </div>

                    <div className="flex flex-col-reverse md:flex-row justify-between gap-4 pt-4">
                        <motion.button
                            type="button"
                            className="w-full md:w-auto px-8 py-3.5 border border-primary-black text-primary-black font-heading text-xs tracking-widest uppercase hover:bg-primary-black hover:text-white hover:shadow-[0_0_0_1px_#f9ffd6] transition-all duration-300 rounded-none focus:outline-none focus:ring-2 focus:ring-[#f9ffd6] focus:ring-offset-2"
                            onClick={handlePrevStep}
                            whileHover={!prefersReduced ? buttonHover : undefined}
                            whileTap={!prefersReduced ? buttonTap : undefined}
                        >
                            Back
                        </motion.button>
                        <motion.button
                            type="button"
                            className="w-full md:w-auto px-8 py-3.5 bg-primary-black text-white font-heading text-xs tracking-widest uppercase hover:bg-[#f9ffd6] hover:text-[#171717] hover:shadow-[0_0_0_1px_#f9ffd6] transition-colors duration-300 rounded-none focus:outline-none focus:ring-2 focus:ring-[#f9ffd6] focus:ring-offset-2"
                            onClick={handleNextStep}
                            whileHover={!prefersReduced ? buttonHover : undefined}
                            whileTap={!prefersReduced ? buttonTap : undefined}
                        >
                            Next Step
                        </motion.button>
                    </div>
                </div>
            ),
            3: (
                <div className="space-y-6">
                    <h3 className="font-heading text-lg md:text-xl border-b border-gray-100 pb-3 text-[#171717] uppercase tracking-wider">
                        Duration &amp; Add-ons
                    </h3>

                    <div className="flex flex-col gap-2">
                        <label htmlFor="duration-select" className="font-body text-xs md:text-sm font-semibold tracking-wider text-[#171717] uppercase">
                            Select Duration
                        </label>
                        <select
                            id="duration-select"
                            name="durationIndex"
                            value={formData.durationIndex}
                            onChange={handleDurationChange}
                            className={`${inputBase} border-gray-300`}
                        >
                            {DURATIONS.map((duration, index) => (
                                <option key={duration.label} value={index}>
                                    {duration.label} · from {duration.startingFrom}
                                </option>
                            ))}
                        </select>
                    </div>

                    <div className="flex flex-col gap-3">
                        <span className="font-body text-xs md:text-sm font-semibold tracking-wider text-[#171717] uppercase">
                            Premium Add-ons
                        </span>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            {ADDONS.map((addon) => {
                                const checked = !!selectedAddons[addon.name];
                                return (
                                    <motion.label
                                        key={addon.name}
                                        className={`flex items-center gap-3 p-4 border transition-colors cursor-pointer select-none ${
                                            checked ? 'border-brand-accent bg-[#f9ffd6]/5' : 'border-gray-200 hover:border-gray-300'
                                        }`}
                                        whileHover={!prefersReduced ? { y: -2 } : undefined}
                                        whileTap={!prefersReduced ? { scale: 0.98 } : undefined}
                                    >
                                        <input
                                            type="checkbox"
                                            className="w-4 h-4 accent-brand-accent"
                                            checked={checked}
                                            onChange={(e) => handleAddonToggle(addon.name, e.target.checked)}
                                        />
                                        <div className="flex flex-col">
                                            <span className="font-body text-xs md:text-sm font-medium text-gray-800">
                                                {addon.label}
                                            </span>
                                            {addon.from && (
                                                <span className="font-body text-[11px] text-gray-500">
                                                    from {addon.from}
                                                </span>
                                            )}
                                        </div>
                                    </motion.label>
                                );
                            })}
                        </div>
                    </div>

                    <div className="bg-gray-50 p-6 text-left border-l-4 border-brand-accent my-8">
                        <h4 className="font-heading text-lg text-primary-black mb-2 uppercase tracking-wider">
                            Pricing &amp; Caution Fee
                        </h4>
                        <p className="font-body text-sm text-gray-600 leading-relaxed">
                            Final pricing is tailored to your route, duration, and add-ons. A fixed{' '}
                            <strong>₦300,000 caution fee</strong> applies to all bookings and is fully refundable after the rental. The caution fee is itemised on your formal invoice and is collected before your date is confirmed.
                        </p>
                    </div>

                    <div className="flex flex-col-reverse md:flex-row justify-between gap-4 pt-2">
                        <motion.button
                            type="button"
                            className="w-full md:w-auto px-8 py-3.5 border border-primary-black text-primary-black font-heading text-xs tracking-widest uppercase hover:bg-primary-black hover:text-white hover:shadow-[0_0_0_1px_#f9ffd6] transition-all duration-300 rounded-none focus:outline-none focus:ring-2 focus:ring-[#f9ffd6] focus:ring-offset-2"
                            onClick={handlePrevStep}
                            whileHover={!prefersReduced ? buttonHover : undefined}
                            whileTap={!prefersReduced ? buttonTap : undefined}
                        >
                            Back
                        </motion.button>
                        <motion.button
                            type="button"
                            className="w-full md:w-auto px-8 py-3.5 bg-primary-black text-white font-heading text-xs tracking-widest uppercase hover:bg-[#f9ffd6] hover:text-[#171717] hover:shadow-[0_0_0_1px_#f9ffd6] transition-colors duration-300 rounded-none focus:outline-none focus:ring-2 focus:ring-[#f9ffd6] focus:ring-offset-2"
                            onClick={handleNextStep}
                            whileHover={!prefersReduced ? buttonHover : undefined}
                            whileTap={!prefersReduced ? buttonTap : undefined}
                        >
                            Next Step
                        </motion.button>
                    </div>
                </div>
            ),
            4: (
                <div className="space-y-6">
                    <h3 className="font-heading text-lg md:text-xl border-b border-gray-100 pb-3 text-[#171717] uppercase tracking-wider">
                        Client Information
                    </h3>

                    <div className="flex flex-col gap-2">
                        <label htmlFor="client-name" className="font-body text-xs md:text-sm font-semibold tracking-wider text-[#171717] uppercase">
                            Full Name
                        </label>
                        <input
                            type="text"
                            id="client-name"
                            name="clientName"
                            value={formData.clientName}
                            onChange={handleInputChange}
                            placeholder="e.g., Ademola Johnson"
                            autoComplete="name"
                            aria-invalid={!!errors.clientName}
                            aria-describedby={errors.clientName ? 'client-name-error' : undefined}
                            className={`${inputBase} ${errors.clientName ? 'border-red-500' : 'border-gray-300'}`}
                        />
                        {errors.clientName && (
                            <span id="client-name-error" className="flex items-start gap-2 text-[#171717] text-xs font-body mt-1 pl-2 border-l-2 border-[#f9ffd6]" role="alert">
                                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#f9ffd6" strokeWidth="2.5" strokeLinecap="round" className="shrink-0 mt-0.5" aria-hidden="true">
                                    <circle cx="12" cy="12" r="10" />
                                    <line x1="12" y1="8" x2="12" y2="12" />
                                    <line x1="12" y1="16" x2="12.01" y2="16" />
                                </svg>
                                <span>{errors.clientName}</span>
                            </span>
                        )}
                    </div>

                    <div className="flex flex-col gap-2">
                        <label htmlFor="client-email" className="font-body text-xs md:text-sm font-semibold tracking-wider text-[#171717] uppercase">
                            Email Address
                        </label>
                        <input
                            type="email"
                            id="client-email"
                            name="clientEmail"
                            value={formData.clientEmail}
                            onChange={handleInputChange}
                            placeholder="e.g., ademola@domain.com"
                            autoComplete="email"
                            aria-invalid={!!errors.clientEmail}
                            aria-describedby={errors.clientEmail ? 'client-email-error' : undefined}
                            className={`${inputBase} ${errors.clientEmail ? 'border-red-500' : 'border-gray-300'}`}
                        />
                        {errors.clientEmail && (
                            <span id="client-email-error" className="flex items-start gap-2 text-[#171717] text-xs font-body mt-1 pl-2 border-l-2 border-[#f9ffd6]" role="alert">
                                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#f9ffd6" strokeWidth="2.5" strokeLinecap="round" className="shrink-0 mt-0.5" aria-hidden="true">
                                    <circle cx="12" cy="12" r="10" />
                                    <line x1="12" y1="8" x2="12" y2="12" />
                                    <line x1="12" y1="16" x2="12.01" y2="16" />
                                </svg>
                                <span>{errors.clientEmail}</span>
                            </span>
                        )}
                    </div>

                    <div className="flex flex-col gap-2">
                        <label htmlFor="client-phone" className="font-body text-xs md:text-sm font-semibold tracking-wider text-[#171717] uppercase">
                            WhatsApp Number
                        </label>
                        <input
                            type="tel"
                            id="client-phone"
                            name="clientPhone"
                            value={formData.clientPhone}
                            onChange={handleInputChange}
                            placeholder="e.g., +234 803 123 4567"
                            autoComplete="tel"
                            inputMode="tel"
                            aria-invalid={!!errors.clientPhone}
                            aria-describedby={errors.clientPhone ? 'client-phone-error' : undefined}
                            className={`${inputBase} ${errors.clientPhone ? 'border-red-500' : 'border-gray-300'}`}
                        />
                        {errors.clientPhone && (
                            <span id="client-phone-error" className="flex items-start gap-2 text-[#171717] text-xs font-body mt-1 pl-2 border-l-2 border-[#f9ffd6]" role="alert">
                                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#f9ffd6" strokeWidth="2.5" strokeLinecap="round" className="shrink-0 mt-0.5" aria-hidden="true">
                                    <circle cx="12" cy="12" r="10" />
                                    <line x1="12" y1="8" x2="12" y2="12" />
                                    <line x1="12" y1="16" x2="12.01" y2="16" />
                                </svg>
                                <span>{errors.clientPhone}</span>
                            </span>
                        )}
                    </div>

                    <div className="flex flex-col gap-2">
                        <label htmlFor="special-requests" className="font-body text-xs md:text-sm font-semibold tracking-wider text-[#171717] uppercase">
                            Special Requests
                        </label>
                        <textarea
                            id="special-requests"
                            name="specialRequests"
                            value={formData.specialRequests}
                            onChange={handleInputChange}
                            rows="3"
                            placeholder="e.g., Chauffeur white-glove attire, preference for particular water brand, specific route requirements."
                            className={`${inputBase} border-gray-300 resize-none`}
                        />
                    </div>

                    {submitError && (
                        <div className="bg-[#171717] text-primary-white text-sm font-body p-4 border-l-4 border-[#f9ffd6] flex items-start gap-3" role="alert">
                            <span className="w-6 h-6 shrink-0 rounded-full bg-[#f9ffd6] text-[#171717] flex items-center justify-center mt-0.5">
                                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" aria-hidden="true">
                                    <line x1="12" y1="8" x2="12" y2="12" />
                                    <line x1="12" y1="16" x2="12.01" y2="16" />
                                </svg>
                            </span>
                            <span>{submitError}</span>
                        </div>
                    )}

                    <div className="flex flex-col-reverse md:flex-row justify-between gap-4 pt-4">
                        <motion.button
                            type="button"
                            className="w-full md:w-auto px-8 py-3.5 border border-primary-black text-primary-black font-heading text-xs tracking-widest uppercase hover:bg-primary-black hover:text-white hover:shadow-[0_0_0_1px_#f9ffd6] transition-all duration-300 rounded-none focus:outline-none focus:ring-2 focus:ring-[#f9ffd6] focus:ring-offset-2"
                            onClick={handlePrevStep}
                            whileHover={!prefersReduced ? buttonHover : undefined}
                            whileTap={!prefersReduced ? buttonTap : undefined}
                        >
                            Back
                        </motion.button>
                        <motion.button
                            type="button"
                            className="w-full md:w-auto px-8 py-3.5 bg-primary-black text-white font-heading text-xs tracking-widest uppercase hover:bg-[#f9ffd6] hover:text-[#171717] hover:shadow-[0_0_0_1px_#f9ffd6] transition-colors duration-300 rounded-none focus:outline-none focus:ring-2 focus:ring-[#f9ffd6] focus:ring-offset-2"
                            onClick={handleNextStep}
                            whileHover={!prefersReduced ? buttonHover : undefined}
                            whileTap={!prefersReduced ? buttonTap : undefined}
                        >
                            Review Summary
                        </motion.button>
                    </div>
                </div>
            ),
            5: (
                <div className="space-y-6">
                    <h3 className="font-heading text-lg md:text-xl border-b border-gray-100 pb-3 text-[#171717] uppercase tracking-wider">
                        Review Your Booking
                    </h3>

                    <dl className="space-y-4">
                        <ReviewGroup
                            title="Event"
                            step={1}
                            onEdit={handleStepClick}
                            rows={[
                                { label: 'Type', value: formData.eventType },
                                { label: 'Date', value: formData.eventDate || '—' },
                                { label: 'Pickup time', value: formData.pickupTime || '—' },
                            ]}
                        />
                        <ReviewGroup
                            title="Route"
                            step={2}
                            onEdit={handleStepClick}
                            rows={[
                                { label: 'Pickup', value: formData.pickupAddress || '—' },
                                { label: 'Drop-off', value: formData.dropoffAddress || '—' },
                            ]}
                        />
                        <ReviewGroup
                            title="Duration &amp; Add-ons"
                            step={3}
                            onEdit={handleStepClick}
                            rows={[
                                { label: 'Duration', value: DURATIONS[formData.durationIndex].label },
                                {
                                    label: 'Add-ons',
                                    value: Object.keys(selectedAddons).length
                                        ? Object.keys(selectedAddons)
                                              .map((k) => ADDONS.find((a) => a.name === k)?.label || k)
                                              .join(', ')
                                        : 'None',
                                },
                            ]}
                        />
                        <ReviewGroup
                            title="Contact"
                            step={4}
                            onEdit={handleStepClick}
                            rows={[
                                { label: 'Name', value: formData.clientName },
                                { label: 'Email', value: formData.clientEmail },
                                { label: 'WhatsApp', value: formData.clientPhone },
                                { label: 'Notes', value: formData.specialRequests || '—' },
                            ]}
                        />
                    </dl>

                    {submitError && (
                        <div className="bg-[#171717] text-primary-white text-sm font-body p-4 border-l-4 border-[#f9ffd6] flex items-start gap-3" role="alert">
                            <span className="w-6 h-6 shrink-0 rounded-full bg-[#f9ffd6] text-[#171717] flex items-center justify-center mt-0.5">
                                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" aria-hidden="true">
                                    <line x1="12" y1="8" x2="12" y2="12" />
                                    <line x1="12" y1="16" x2="12.01" y2="16" />
                                </svg>
                            </span>
                            <span>{submitError}</span>
                        </div>
                    )}

                    <div className="flex flex-col-reverse md:flex-row justify-between gap-4 pt-4">
                        <motion.button
                            type="button"
                            className="w-full md:w-auto px-8 py-3.5 border border-primary-black text-primary-black font-heading text-xs tracking-widest uppercase hover:bg-primary-black hover:text-white hover:shadow-[0_0_0_1px_#f9ffd6] transition-all duration-300 rounded-none focus:outline-none focus:ring-2 focus:ring-[#f9ffd6] focus:ring-offset-2"
                            onClick={handlePrevStep}
                            whileHover={!prefersReduced ? buttonHover : undefined}
                            whileTap={!prefersReduced ? buttonTap : undefined}
                        >
                            Back
                        </motion.button>
                        <motion.button
                            type="submit"
                            className="w-full md:w-auto px-8 py-3.5 bg-primary-black text-white font-heading text-xs tracking-widest uppercase hover:bg-[#f9ffd6] hover:text-[#171717] hover:shadow-[0_0_0_1px_#f9ffd6] transition-colors duration-300 rounded-none disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-primary-black disabled:hover:text-white disabled:hover:shadow-none focus:outline-none focus:ring-2 focus:ring-[#f9ffd6] focus:ring-offset-2"
                            disabled={isSubmitting}
                            whileHover={!prefersReduced && !isSubmitting ? buttonHover : undefined}
                            whileTap={!prefersReduced && !isSubmitting ? buttonTap : undefined}
                        >
                            {isSubmitting ? 'Submitting…' : 'Submit Reservation Request'}
                        </motion.button>
                    </div>
                </div>
            ),
        }),
         
        [formData, errors, selectedAddons, isSubmitting, submitError, prefersReduced, handleInputChange, handleDurationChange, handleAddonToggle, handleNextStep, handlePrevStep, todayStr, handleStepClick]
    );

    return (
        <AnimatedSection
            id="book"
            className="bg-[#FCFCFC] py-24 px-6 md:px-12 lg:px-20 border-t border-[#EAEAEA]"
            aria-labelledby="booking-heading"
        >
            <motion.div
                className="text-center mb-8"
                variants={!prefersReduced ? staggerChild : undefined}
            >
                <h2
                    id="booking-heading"
                    className="font-heading text-3xl md:text-4xl tracking-[0.15em] mb-4 text-[#171717] uppercase"
                >
                    Reserve Your Date
                </h2>
                <p className="font-body text-sm md:text-base text-gray-500 max-w-lg mx-auto">
                    Share your event details and we&apos;ll respond with availability and a tailored quote — Reply within 4 business hours.
                </p>
            </motion.div>

            <motion.div
                className="max-w-[700px] mx-auto bg-[#FCFCFC] shadow-2xl border border-[#EAEAEA] p-6 md:p-10 relative"
                variants={!prefersReduced ? staggerChild : undefined}
            >
                {errorCount > 0 && (
                    <div
                        role="alert"
                        className="mb-6 bg-[#171717] text-white p-3 border-l-4 border-[#f9ffd6] font-body text-sm"
                    >
                        Please review the {errorCount} highlighted {errorCount === 1 ? 'field' : 'fields'} before continuing.
                    </div>
                )}

                {!isSubmitted && (
                    <ol
                        className="flex justify-between items-start gap-1 sm:gap-2 mb-10 list-none"
                        aria-label="Booking progress"
                    >
                        {STEP_LABELS.map((label, i) => {
                            const stepNum = i + 1;
                            const isCompleted = currentStep > stepNum;
                            const isCurrent = currentStep === stepNum;
                            const isLast = i === STEP_LABELS.length - 1;
                            const isClickable = isCompleted;
                            return (
                                <li
                                    key={label}
                                    className="flex-1 flex flex-col items-center text-center min-w-0"
                                    aria-current={isCurrent ? 'step' : undefined}
                                >
                                    <div className="flex items-center w-full">
                                        <div
                                            className={`flex-1 h-px transition-colors duration-500 ${
                                                isCompleted || isCurrent ? 'bg-brand-accent' : 'bg-gray-200'
                                            }`}
                                            aria-hidden="true"
                                        />
                                        {isClickable ? (
                                            <button
                                                type="button"
                                                onClick={() => handleStepClick(stepNum)}
                                                aria-label={`Go back to step ${stepNum}: ${label.replace(/^\d+\.\s*/, '')}`}
                                                className={`relative shrink-0 w-9 h-9 md:w-10 md:h-10 rounded-full flex items-center justify-center font-heading text-xs md:text-sm transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-[#f9ffd6] focus:ring-offset-2 ${
                                                    isCompleted
                                                        ? 'bg-[#171717] text-white hover:bg-[#171717]/80'
                                                        : isCurrent
                                                            ? 'bg-brand-accent text-[#171717] ring-4 ring-[#f9ffd6]/30'
                                                            : 'bg-white border border-gray-200 text-gray-400'
                                                }`}
                                            >
                                                {isCompleted ? (
                                                    <svg
                                                        className="w-4 h-4 md:w-5 md:h-5"
                                                        fill="none"
                                                        stroke="currentColor"
                                                        viewBox="0 0 24 24"
                                                        aria-hidden="true"
                                                    >
                                                        <path
                                                            strokeLinecap="round"
                                                            strokeLinejoin="round"
                                                            strokeWidth="2.5"
                                                            d="M5 13l4 4L19 7"
                                                        />
                                                    </svg>
                                                ) : (
                                                    <span className="font-semibold">{stepNum}</span>
                                                )}
                                            </button>
                                        ) : (
                                            <motion.div
                                                className={`relative shrink-0 w-9 h-9 md:w-10 md:h-10 rounded-full flex items-center justify-center font-heading text-xs md:text-sm transition-colors duration-300 ${
                                                    isCompleted
                                                        ? 'bg-[#171717] text-white'
                                                        : isCurrent
                                                            ? 'bg-brand-accent text-[#171717] ring-4 ring-[#f9ffd6]/30'
                                                            : 'bg-white border border-gray-200 text-gray-400'
                                                }`}
                                                animate={
                                                    isCurrent && !prefersReduced
                                                        ? { scale: [1, 1.08, 1] }
                                                        : { scale: 1 }
                                                }
                                                transition={
                                                    isCurrent && !prefersReduced
                                                        ? { duration: 2, repeat: Infinity, ease: 'easeInOut' }
                                                        : { duration: 0.3 }
                                                }
                                            >
                                                {isCompleted ? (
                                                    <svg
                                                        className="w-4 h-4 md:w-5 md:h-5"
                                                        fill="none"
                                                        stroke="currentColor"
                                                        viewBox="0 0 24 24"
                                                        aria-hidden="true"
                                                    >
                                                        <path
                                                            strokeLinecap="round"
                                                            strokeLinejoin="round"
                                                            strokeWidth="2.5"
                                                            d="M5 13l4 4L19 7"
                                                        />
                                                    </svg>
                                                ) : (
                                                    <span className="font-semibold">{stepNum}</span>
                                                )}
                                            </motion.div>
                                        )}
                                        <div
                                            className={`flex-1 h-px transition-colors duration-500 ${
                                                isCompleted ? 'bg-brand-accent' : 'bg-gray-200'
                                            } ${isLast ? 'invisible' : ''}`}
                                            aria-hidden="true"
                                        />
                                    </div>
                                    <span
                                        className={`mt-2 md:mt-3 font-body text-[10px] md:text-[11px] tracking-[0.12em] uppercase leading-tight transition-colors duration-300 px-1 ${
                                            isCurrent
                                                ? 'text-[#171717] font-semibold'
                                                : isCompleted
                                                    ? 'text-[#171717]'
                                                    : 'text-gray-400'
                                        }`}
                                    >
                                        {label.replace(/^\d+\.\s*/, '')}
                                    </span>
                                </li>
                            );
                        })}
                    </ol>
                )}

                {!HAS_FORMSUBMIT_CONFIG && (
                    <div className="mb-8 bg-[#171717] text-white p-4 border-l-4 border-[#f9ffd6]">
                        <p className="font-body text-sm leading-relaxed">
                            Online booking is currently routed manually. Submitting will open your mail app addressed to{' '}
                            <a href={`mailto:${BRAND_EMAIL}`} className="text-[#f9ffd6] underline underline-offset-4">
                                {BRAND_EMAIL}
                            </a>
                            .
                        </p>
                    </div>
                )}

                {!isSubmitted ? (
                    <form
                        id="booking-form"
                        action={FORMSUBMIT_ENDPOINT}
                        method="POST"
                        onSubmit={handleFormSubmit}
                        noValidate
                    >
                        <AnimatePresence mode="wait" initial={false}>
                            <motion.div
                                key={currentStep}
                                variants={!prefersReduced ? stepVariants : undefined}
                                initial="enter"
                                animate="center"
                                exit="exit"
                            >
                                {stepContent[currentStep]}
                            </motion.div>
                        </AnimatePresence>
                    </form>
                ) : (
                    <SuccessState
                        isFallback={!HAS_FORMSUBMIT_CONFIG}
                        whatsappUrl={WHATSAPP_URL}
                        hasWhatsapp={HAS_WHATSAPP_CONFIG}
                    />
                )}
            </motion.div>
        </AnimatedSection>
    );
}

function ReviewGroup({ title, step, onEdit, rows }) {
    return (
        <div className="bg-gray-50 border border-gray-200 p-4 sm:p-5 text-left">
            <div className="flex items-center justify-between mb-3">
                <h4
                    className="font-heading text-sm uppercase tracking-wider text-[#171717]"
                    dangerouslySetInnerHTML={{ __html: title }}
                />
                <button
                    type="button"
                    onClick={() => onEdit(step)}
                    className="font-body text-[11px] tracking-[0.18em] uppercase text-[#171717]/70 hover:text-[#171717] underline-offset-4 hover:underline transition-colors"
                >
                    Edit
                </button>
            </div>
            <dl className="divide-y divide-gray-200">
                {rows.map((r) => (
                    <div key={r.label} className="flex justify-between py-2 gap-4">
                        <dt className="font-body text-[11px] uppercase tracking-wider text-gray-500">
                            {r.label}
                        </dt>
                        <dd className="font-body text-sm text-[#171717] text-right max-w-[60%] break-words">
                            {r.value}
                        </dd>
                    </div>
                ))}
            </dl>
        </div>
    );
}

function SuccessState({ isFallback, whatsappUrl, hasWhatsapp }) {
    return (
        <motion.div
            id="booking-success"
            className="text-center py-12 px-4"
            role="status"
            aria-live="polite"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
        >
            <div className="w-16 h-16 bg-[#f9ffd6] text-[#171717] rounded-full flex items-center justify-center mx-auto mb-6">
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                </svg>
            </div>
            <h2 className="font-heading text-2xl mb-4 text-[#171717] tracking-wider uppercase">
                {isFallback ? 'Almost There' : 'Request Received'}
            </h2>
            <p className="font-body text-sm md:text-base text-gray-600 leading-relaxed max-w-md mx-auto mb-6">
                {isFallback
                    ? 'We opened your mail app to send the request. After sending, our team will review it and follow up with availability and a tailored quote via email or WhatsApp.'
                    : 'Thank you. Your reservation request has been received and our team will review it shortly. We\u2019ll follow up with availability and a tailored quote via email or WhatsApp.'}
            </p>

            <div className="bg-gray-50 border-l-2 border-[#f9ffd6] p-4 max-w-md mx-auto mb-6 text-left">
                <p className="font-body text-sm text-[#171717] leading-relaxed">
                    <strong>Next:</strong> {RESPONSE_TIME} on business days. A fixed{' '}
                    <strong>₦300,000 caution fee</strong> applies to all bookings. Your date is only secured once payment is confirmed.
                </p>
            </div>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
                {hasWhatsapp && (
                    <a
                        href={whatsappUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 bg-[#25D366] text-white px-6 py-3 text-xs tracking-[0.2em] uppercase font-heading hover:bg-[#1da851] transition-colors"
                    >
                        Chat on WhatsApp
                    </a>
                )}
                <a
                    href="#home"
                    className="inline-flex items-center gap-2 border border-[#171717] text-[#171717] px-6 py-3 text-xs tracking-[0.2em] uppercase font-heading hover:bg-[#171717] hover:text-white transition-colors"
                >
                    Back to top
                </a>
            </div>
        </motion.div>
    );
}
