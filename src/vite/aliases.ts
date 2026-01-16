import path from 'path';
import type { Alias } from 'vite';
import type { CraftConfigOptions, LocalAliasConfig } from './types.js';

/**
 * Configure Vite resolve options for the Craft stack
 *
 * Handles two scenarios:
 * 1. Normal: Just returns dedupe config and any custom aliases
 * 2. Local development: Adds aliases for symlinked craft-ui to enable HMR
 */
export function getResolveConfig(options: CraftConfigOptions) {
    const aliases: Alias[] = [...(options.aliases || [])];

    // Add local development aliases when craft-ui is symlinked
    if (isDevMode() && options.ui?.localPath) {
        aliases.push(...createLocalDevAliases(options.ui.localPath));
    }

    return {
        // Prevent duplicate instances of packages that must be singletons
        dedupe: ['@inertiajs/vue3', '@tailwindcss/vite'],
        alias: aliases,
    };
}

/**
 * Create aliases for local craft-ui development
 *
 * When craft-ui is symlinked (e.g., for development), we need to:
 *
 * 1. Redirect package imports to source files
 *    `import { Button } from '@hardimpactdev/craft-ui'`
 *    → resolves to `../craft-ui/index.ts` instead of `dist/`
 *    This enables HMR (dist files can't hot-reload)
 *
 * 2. Handle the @/ alias conflict
 *    Both the app and craft-ui use @/ as an alias:
 *    - App: @/ → ./resources/js
 *    - craft-ui: @/ → ./src
 *
 *    When a file in craft-ui imports `@/lib/utils`, we need to resolve
 *    it to craft-ui/src/lib/utils, not app/resources/js/lib/utils.
 *    The resolver checks WHERE the import comes from to decide.
 */
function createLocalDevAliases(localPath: string): Alias[] {
    const absoluteLibraryPath = path.resolve(process.cwd(), localPath);

    const configs: LocalAliasConfig[] = [
        // Handle @/ alias - resolve based on importer location
        {
            pattern: /^@\//,
            replacement: '@/',
            libraryPath: absoluteLibraryPath,
            basePaths: {
                app: './resources/js',
                library: path.join(localPath, 'src'),
            },
        },

        // Redirect package imports to source
        {
            pattern: /^@hardimpactdev\/craft-ui/,
            replacement: path.join(localPath, 'index.ts'),
        },
    ];

    return configs.map(createAliasFromConfig);
}

/**
 * Create a Vite alias from our config format
 */
function createAliasFromConfig(config: LocalAliasConfig): Alias {
    // Simple redirect (no context-aware resolution needed)
    if (!config.libraryPath || !config.basePaths) {
        return {
            find: config.pattern,
            replacement: path.resolve(process.cwd(), config.replacement),
        };
    }

    // Context-aware resolution: choose base path based on importer location
    return {
        find: config.pattern,
        replacement: config.replacement,
        customResolver: createContextAwareResolver(config),
    };
}

/**
 * Create a resolver that picks the right base path based on where the import comes from
 *
 * @example
 * // Import from app file → use app base path
 * // resources/js/pages/Home.vue imports @/lib/utils
 * // → resolves to resources/js/lib/utils
 *
 * // Import from library file → use library base path
 * // ../craft-ui/src/components/Button.vue imports @/lib/utils
 * // → resolves to ../craft-ui/src/lib/utils
 */
function createContextAwareResolver(config: LocalAliasConfig) {
    return async function customResolver(
        this: { resolve: (id: string, importer?: string) => Promise<{ id: string } | null> },
        source: string,
        importer: string | undefined
    ): Promise<string | undefined> {
        // Determine if the import is coming from the library or the app
        const isFromLibrary = importer?.includes(config.libraryPath!);
        const basePath = isFromLibrary ? config.basePaths!.library : config.basePaths!.app;

        // Build the full path by combining:
        // 1. Current working directory
        // 2. The appropriate base path (app or library)
        // 3. The import path (minus the alias prefix)
        const importPath = source.replace(config.replacement, '');
        const resolvedPath = path.resolve(process.cwd(), basePath, importPath);

        // Use Vite's resolver to get the final path (handles extensions, index files, etc.)
        const result = await this.resolve(resolvedPath);
        return result?.id;
    };
}

/**
 * Check if we're in development mode
 * Used to skip local dev aliases during production builds
 */
function isDevMode(): boolean {
    return !process.argv.includes('build');
}
