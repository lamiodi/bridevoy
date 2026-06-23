// ============================================
// BrideVoy — After You Submit Reassurance
// Light card with a 3-step post-submit timeline.
// ============================================
import { motion } from 'framer-motion';
import AnimatedSection from './AnimatedSection';
import { useReducedMotion } from '../utils/useReducedMotion';
import { RESPONSE_TIME } from '../constants';

const POST_SUBMIT = [
    {
        label: 'We review your request',
        body: 'Our team checks your date, route, and timing to make sure everything is in place.',
    },
    {
        label: 'You receive a tailored quote',
        body: 'We send a quote with availability, the final caution-fee details, and a secure payment link.',
    },
    {
        label: 'Your date is secured',
        body: 'Once payment is confirmed, your chauffeur and vehicle are reserved. We coordinate details closer to the day.',
    },
];

export default function AfterSubmit() {
    const prefersReduced = useReducedMotion();

    return (
        <AnimatedSection
            id="after-submit"
            className="bg-[#FCFCFC] py-20 px-6 lg:px-20 border-t border-[#EAEAEA]"
            aria-labelledby="after-submit-heading"
        >
            <div className="max-w-[1000px] mx-auto">
                <motion.div
                    className="text-center mb-12"
                    variants={!prefersReduced ? {
                        hidden: { opacity: 0, y: 12 },
                        visible: { opacity: 1, y: 0, transition: { duration: 0.4 } },
                    } : undefined}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, amount: 0.3 }}
                >
                    <p className="font-body text-[10px] tracking-[0.4em] uppercase text-[#171717]/60 mb-3">
                        What happens after
                    </p>
                    <h2
                        id="after-submit-heading"
                        className="font-heading text-2xl sm:text-3xl text-[#171717] tracking-[0.12em] mb-3"
                    >
                        After You Submit
                    </h2>
                    <p className="font-body text-sm text-gray-500 max-w-md mx-auto">
                        A clear, three-step path from form to chauffeur. We keep you informed at every stage.
                    </p>
                </motion.div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-5 lg:gap-6">
                    {POST_SUBMIT.map((step, i) => (
                        <motion.div
                            key={step.label}
                            className="relative bg-white border border-[#EAEAEA] p-6 sm:p-7 text-left shadow-sm hover:shadow-md transition-shadow"
                            initial={!prefersReduced ? { opacity: 0, y: 12 } : false}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, amount: 0.3 }}
                            transition={{ duration: 0.4, delay: i * 0.08 }}
                        >
                            <span
                                aria-hidden="true"
                                className="absolute -top-3 -left-3 w-8 h-8 rounded-full bg-[#f9ffd6] text-[#171717] font-heading text-sm flex items-center justify-center"
                            >
                                {i + 1}
                            </span>
                            <h3 className="font-heading text-sm uppercase tracking-wider text-[#171717] mb-2 mt-1">
                                {step.label}
                            </h3>
                            <p className="font-body text-[13px] text-gray-600 leading-relaxed">
                                {step.body}
                            </p>
                        </motion.div>
                    ))}
                </div>

                <p className="font-body text-[12px] text-[#171717]/60 text-center mt-8 max-w-md mx-auto">
                    Typical response: {RESPONSE_TIME} on business days.
                </p>
            </div>
        </AnimatedSection>
    );
}
