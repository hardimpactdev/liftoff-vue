import { defineConfig } from 'vite';
import { resolve } from 'path';
import vue from '@vitejs/plugin-vue';
import tailwindcss from '@tailwindcss/vite';
import dts from 'vite-plugin-dts';

// https://vite.dev/config/
export default defineConfig({
  plugins: [tailwindcss(), vue(), dts({ tsconfigPath: './tsconfig.app.json' })],
  build: {
    lib: {
      entry: resolve(__dirname, 'index.ts'),
      name: 'Craft UI',
      fileName: 'craft-ui',
      formats: ['es'],
    },
    rollupOptions: {
      // make sure to externalize deps that shouldn't be bundled
      // into your library
      external: ['vue', '@inertiajs/core', '@inertiajs/vue3', 'laravel-vue-i18n'],
      output: {
        // Provide global variables to use in the UMD build
        // for externalized deps
        globals: {
          vue: 'Vue',
          '@inertiajs/core': 'Inertia Core',
          '@inertiajs/vue3': 'Inertia Vue3',
          'laravel-vue-i18n': 'Laravel Vue I18n',
        },
      },
    },
  },
  optimizeDeps: {
    exclude: ['vue', '@inertiajs/core', '@inertiajs/vue3', 'laravel-vue-i18n'],
  },
  resolve: {
    alias: {
      '@': resolve(__dirname, './src'),
    },
  },
});
