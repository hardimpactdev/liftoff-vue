import { defineConfig } from 'vite';
import { getPlugins } from './plugins.js';
import { getServerConfig } from './server.js';
import { getResolveConfig } from './aliases.js';
import type { CraftConfigOptions } from './types.js';

// Re-export types for consumers
export type { CraftConfigOptions } from './types.js';

// Re-export individual modules for advanced customization
export { getPlugins } from './plugins.js';
export { getServerConfig } from './server.js';
export { getResolveConfig } from './aliases.js';

export function defineCraftConfig(options: CraftConfigOptions = {}) {
    return defineConfig(({ mode }) => ({
        plugins: [
            ...getPlugins(options),
            ...(options.plugins || []),
        ],
        resolve: getResolveConfig(options),
        server: getServerConfig(mode),
    }));
}
