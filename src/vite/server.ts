import { loadEnv } from 'vite';
import type { ServerOptions } from 'vite';

/**
 * Configure Vite dev server for Laravel apps behind a reverse proxy (Caddy/nginx)
 *
 * Handles:
 * - HMR WebSocket connection through the proxy (wss://app.test:443)
 * - Correct origin for CORS and asset URLs
 * - Binding to all interfaces for proxy access
 */
export function getServerConfig(mode: string): ServerOptions {
    const env = loadEnv(mode, process.cwd());
    const appUrl = env.VITE_APP_URL;

    if (!appUrl) {
        return { host: '0.0.0.0' };
    }

    try {
        const url = new URL(appUrl);
        const isHttps = url.protocol === 'https:';

        return {
            // Accept connections from reverse proxy
            host: '0.0.0.0',

            // Tell Vite the public origin for asset URLs
            origin: appUrl,

            // Configure HMR to connect through the reverse proxy
            // Without this, browser would try localhost:5173 directly
            hmr: {
                host: url.hostname,
                protocol: isHttps ? 'wss' : 'ws',
                clientPort: isHttps ? 443 : (parseInt(url.port) || 80),
            },
        };
    } catch {
        return { host: '0.0.0.0' };
    }
}
