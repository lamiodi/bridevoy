import React from 'react';
import { BRAND_EMAIL } from '../constants';

export default class ErrorBoundary extends React.Component {
    constructor(props) {
        super(props);
        this.state = { hasError: false };
    }

    static getDerivedStateFromError() {
        return { hasError: true };
    }

    componentDidCatch(error, info) {
        console.error('BrideVoy UI error:', error, info);
    }

    handleReload = () => {
        window.location.reload();
    };

    render() {
        if (this.state.hasError) {
            return (
                <div className="min-h-screen bg-[#171717] text-white flex items-center justify-center px-6 py-16">
                    <div className="max-w-xl w-full border border-white/10 bg-white/[0.04] p-8 text-center shadow-2xl">
                        <p className="font-body text-[10px] tracking-[0.4em] uppercase text-[#f9ffd6] mb-3">
                            BrideVoy
                        </p>
                        <h1 className="font-heading text-2xl sm:text-3xl mb-4 uppercase tracking-[0.12em]">
                            Something Went Wrong
                        </h1>
                        <p className="font-body text-sm sm:text-base text-white/75 leading-relaxed mb-6">
                            We couldn&apos;t load this page properly. Please refresh and try again.
                        </p>
                        <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
                            <button
                                type="button"
                                onClick={this.handleReload}
                                className="inline-flex items-center justify-center bg-[#f9ffd6] text-[#171717] px-6 py-3 text-xs tracking-[0.25em] uppercase font-body hover:bg-white transition-colors"
                            >
                                Reload Page
                            </button>
                            <a
                                href={`mailto:${BRAND_EMAIL}`}
                                className="inline-flex items-center justify-center text-xs tracking-[0.25em] uppercase font-body text-white/80 hover:text-[#f9ffd6] transition-colors px-4 py-3"
                            >
                                Email BrideVoy
                            </a>
                        </div>
                    </div>
                </div>
            );
        }

        return this.props.children;
    }
}
