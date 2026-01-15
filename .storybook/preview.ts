import type { Preview } from '@storybook/vue3-vite';
import { defineComponent, h } from 'vue';
import { TooltipProvider } from 'reka-ui';
import { setup } from '@storybook/vue3-vite';
import { withThemeByClassName } from '@storybook/addon-themes';
import { createRouter, createMemoryHistory } from 'vue-router';
import NuxtLinkMock from './nuxt-link-mock';
import '../src/style.css';
import 'vue-sonner/style.css';

// Create a mock router for Storybook (Nuxt UI Link component uses vue-router)
const mockRouter = createRouter({
  history: createMemoryHistory(),
  routes: [
    { path: '/', component: { template: '<div />' } },
    { path: '/:pathMatch(.*)*', component: { template: '<div />' } },
  ],
});

// Register NuxtLink mock and vue-router globally
setup((app) => {
  // app.component('NuxtLink', NuxtLinkMock);
  app.use(mockRouter);
});

// Global decorator to wrap all stories with TooltipProvider for Nuxt UI components
const withTooltipProvider = (story: any) => {
  return defineComponent({
    components: { TooltipProvider },
    setup() {
      const Story = story();
      return () => h(TooltipProvider, null, () => h(Story));
    },
  });
};

const preview: Preview = {
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
  },
  decorators: [
    withTooltipProvider,
    withThemeByClassName({
      themes: {
        light: '',
        dark: 'dark',
      },
      defaultTheme: 'light',
    }),
  ],
};

export default preview;
