import vue from '@vitejs/plugin-vue';
import laravel from 'laravel-vite-plugin';
import { run } from 'vite-plugin-run';
import tailwindcss from '@tailwindcss/vite';
import i18n from 'laravel-vue-i18n/vite';
import vueDevTools from 'vite-plugin-vue-devtools';
import { craft } from './craftPlugin.js';
import type { CraftConfigOptions } from './types.js';

/**
 * Configure all Vite plugins for the Craft stack
 *
 * Includes:
 * - craft: Virtual module for Inertia app initialization
 * - laravel: Laravel Vite integration
 * - tailwindcss: Tailwind CSS v4
 * - i18n: Laravel Vue i18n
 * - vue: Vue 3 SFC support
 * - vueDevTools: Vue DevTools integration
 * - run: Auto-run artisan commands on file changes (dev only)
 */
export function getPlugins(options: CraftConfigOptions) {
    return [
        craft(),

        laravel({
            input: options.laravel?.input || ['resources/js/app.ts'],
            refresh: options.laravel?.refresh ?? true,
        }),

        tailwindcss(),

        i18n(),

        vue({
            template: {
                transformAssetUrls: {
                    base: null,
                    includeAbsolute: false,
                },
                compilerOptions: {
                    isCustomElement: (tag) => tag === 'trix-editor',
                },
            },
        }),

        getArtisanRunners(),

        vueDevTools({
            appendTo: 'virtual:craft',
            launchEditor: import.meta.env?.VITE_EDITOR || 'cursor',
        }),
    ].filter(Boolean);
}

/**
 * Configure artisan command runners for development
 *
 * Auto-runs:
 * - waymaker:generate on controller changes
 * - wayfinder:generate on route/controller changes
 * - typescript:transform on DTO/Enum changes
 */
function getArtisanRunners() {
    if (process.env.NODE_ENV !== 'development') {
        return null;
    }

    return run([
        {
            name: 'waymaker',
            run: ['php', 'artisan', 'waymaker:generate'],
            pattern: ['app/**/Http/**/*.php'],
        },
        {
            name: 'wayfinder',
            run: ['php', 'artisan', 'wayfinder:generate'],
            pattern: ['routes/*.php', 'app/**/Http/**/*.php'],
        },
        {
            name: 'typescript',
            run: ['php', 'artisan', 'typescript:transform'],
            pattern: ['app/{Data,Enums}/**/*.php'],
        },
    ]);
}
