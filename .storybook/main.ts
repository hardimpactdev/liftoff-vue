import type { StorybookConfig } from '@storybook/vue3-vite';
import tailwindcss from '@tailwindcss/vite';

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
    // Add TailwindCSS plugin for Storybook
    config.plugins = config.plugins || [];
    config.plugins.push(tailwindcss());

    // Override library-specific settings for Storybook
    if (config.build) {
      delete config.build.lib;
      delete config.build.rollupOptions;
    }

    // Don't exclude dependencies in Storybook
    if (config.optimizeDeps) {
      delete config.optimizeDeps.exclude;
    }

    return config;
  },
};
export default config;
