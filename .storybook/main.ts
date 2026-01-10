import type { StorybookConfig } from '@storybook/vue3-vite';
import { defineComponent, h } from 'vue';

const config: StorybookConfig = {
  stories: ['../src/**/*.stories.@(js|jsx|mjs|ts|tsx)'],
  core: {
    disableWhatsNewNotifications: true,
  },
  addons: [
    '@chromatic-com/storybook',
    '@storybook/addon-vitest',
    '@storybook/addon-themes',
    {
      name: '@storybook/addon-docs',
      options: {
        codePanel: true,
        sourceLoaderOptions: {
          injectStoryParameters: true,
        },
      },
    },
  ],
  framework: {
    name: '@storybook/vue3-vite',
    options: {},
  },
  viteFinal: async (config) => {
    // Override library-specific settings for Storybook
    if (config.build) {
      delete config.build.lib;
      delete config.build.rollupOptions;
    }

    // Don't exclude dependencies in Storybook
    if (config.optimizeDeps) {
      delete config.optimizeDeps.exclude;
    }

    // Dynamically import and add Nuxt UI plugin with Liftoff-inspired theme
    // Auto-imports are disabled - all components must be explicitly imported
    const { default: ui } = await import('@nuxt/ui/vite');
    config.plugins = config.plugins || [];
    config.plugins.push(ui({
      prefix: '',
      theme: {
        colors: ['primary', 'secondary', 'success', 'info', 'warning', 'error', 'neutral', 'danger'],
      },
      ui: {
        colors: {
          primary: 'zinc',
          secondary: 'zinc',
          success: 'green',
          info: 'blue',
          warning: 'orange',
          error: 'red',
          neutral: 'zinc',
          danger: 'red',
        },
        button: {
          defaultVariants: {
            color: 'primary',
            variant: 'solid',
          },
        },
      },
      // Disable component auto-imports
      components: false,
      // Disable composable/utility auto-imports
      autoImport: false,
    }));

    // Add aliases for Nuxt-specific imports
    config.resolve = config.resolve || {};
    config.resolve.alias = {
      ...config.resolve.alias,
      '#app/components/nuxt-link': new URL('./nuxt-link-mock.ts', import.meta.url).pathname,
      '#imports': new URL('./nuxt-imports-mock.ts', import.meta.url).pathname,
    };

    return config;
  },
};
export default config;
