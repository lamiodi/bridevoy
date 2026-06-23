import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { readFileSync, existsSync } from 'node:fs';
import { resolve } from 'node:path';

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
    // Build-time brand values are loaded from the local .env file
    // (if present) so the generated index.html can be hydrated with
    // real contact info without a runtime JS bundle.
    const env = loadLocalEnv();
    const phone = env.VITE_BRAND_PHONE_DISPLAY?.trim() || '+234-000-000-0000';
    const email = env.VITE_BRAND_EMAIL?.trim() || 'reservations@bridevoy.com';

    return {
        plugins: [
            react(),
            {
                // Replace placeholders in index.html at build time.
                name: 'bridevoy-html-inject',
                transformIndexHtml: {
                    order: 'pre',
                    handler(html) {
                        return html
                            .replaceAll('__BRAND_PHONE__', phone)
                            .replaceAll('__BRAND_EMAIL__', email);
                    },
                },
            },
        ],
        build: {
            // Source maps help debug production errors in Vercel logs
            // without exposing the original source to end users.
            sourcemap: mode === 'production' ? 'hidden' : true,
        },
    };
});

// Minimal .env loader — reads KEY=VALUE pairs and ignores comments.
// Avoids a hard dependency on dotenv for a 2-field read.
function loadLocalEnv() {
    try {
        const envPath = resolve(process.cwd(), '.env');
        if (!existsSync(envPath)) return {};
        const text = readFileSync(envPath, 'utf8');
        const out = {};
        for (const line of text.split(/\r?\n/)) {
            const trimmed = line.trim();
            if (!trimmed || trimmed.startsWith('#')) continue;
            const eq = trimmed.indexOf('=');
            if (eq === -1) continue;
            const key = trimmed.slice(0, eq).trim();
            const value = trimmed.slice(eq + 1).trim();
            out[key] = value;
        }
        return out;
    } catch {
        return {};
    }
}
