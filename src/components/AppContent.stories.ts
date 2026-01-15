import type { Meta, StoryObj } from '@storybook/vue3';
import { reactive, toRefs } from 'vue';
import AppContent from './AppContent.vue';

const meta: Meta<typeof AppContent> = {
  title: 'App/AppContent',
  component: AppContent,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component: 'Main content wrapper component with support for different layout variants.',
      },
    },
  },
  argTypes: {
    variant: {
      control: 'select',
      options: ['header', 'sidebar'],
      description: 'Layout variant - determines padding and max-width behavior',
    },
    class: {
      control: 'text',
      description: 'Additional CSS classes to apply',
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: (args) => ({
    components: { AppContent },
    setup() {
      return { args: toRefs(reactive(args)) };
    },
    template: `
      <div class="h-96 bg-neutral-100 dark:bg-neutral-900">
        <AppContent v-bind="args">
          <div class="p-6 bg-white dark:bg-neutral-800 rounded-lg shadow">
            <h1 class="text-2xl font-bold mb-4">Sample Content</h1>
            <p class="text-neutral-600 dark:text-neutral-400">
              This is an example of content inside the AppContent wrapper.
              The default variant centers content with a max-width constraint.
            </p>
          </div>
        </AppContent>
      </div>
    `,
  }),
};

export const SidebarVariant: Story = {
  args: {
    variant: 'sidebar',
  },
  render: (args) => ({
    components: { AppContent },
    setup() {
      return { args: toRefs(reactive(args)) };
    },
    template: `
      <div class="h-96 bg-neutral-100 dark:bg-neutral-900">
        <AppContent v-bind="args">
          <div class="bg-white dark:bg-neutral-800 rounded-lg shadow p-6">
            <h1 class="text-2xl font-bold mb-4">Sidebar Variant</h1>
            <p class="text-neutral-600 dark:text-neutral-400">
              The sidebar variant applies padding and allows content to fill the available width.
              This is typically used alongside a sidebar navigation.
            </p>
          </div>
        </AppContent>
      </div>
    `,
  }),
};

export const HeaderVariant: Story = {
  args: {
    variant: 'header',
  },
  render: (args) => ({
    components: { AppContent },
    setup() {
      return { args: toRefs(reactive(args)) };
    },
    template: `
      <div class="h-96 bg-neutral-100 dark:bg-neutral-900">
        <AppContent v-bind="args">
          <div class="p-6 bg-white dark:bg-neutral-800 rounded-lg shadow">
            <h1 class="text-2xl font-bold mb-4">Header Variant</h1>
            <p class="text-neutral-600 dark:text-neutral-400">
              The header variant centers content with a max-width constraint and rounded corners.
              This is typically used with a top navigation header.
            </p>
          </div>
        </AppContent>
      </div>
    `,
  }),
};
