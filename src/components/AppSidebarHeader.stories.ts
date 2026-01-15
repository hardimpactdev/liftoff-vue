import type { Meta, StoryObj } from '@storybook/vue3';
import { provide } from 'vue';
import AppSidebarHeader from './AppSidebarHeader.vue';
import type { BreadcrumbItemType } from '@/types';

const sidebarDecorator = () => ({
  setup() {
    provide('sidebar', {
      toggle: () => console.log('[Storybook] Sidebar toggle clicked'),
    });
  },
  template: '<story />',
});

const sampleBreadcrumbs: BreadcrumbItemType[] = [
  { title: 'Dashboard', href: '/' },
  { title: 'Settings', href: '/settings' },
];

const longPathBreadcrumbs: BreadcrumbItemType[] = [
  { title: 'Home', href: '/' },
  { title: 'Projects', href: '/projects' },
  { title: 'Craft', href: '/projects/craft' },
  { title: 'Components', href: '/projects/craft/components' },
  { title: 'Navigation', href: '/projects/craft/components/navigation' },
  { title: 'Header', href: '/projects/craft/components/navigation/header' },
];

const meta: Meta<typeof AppSidebarHeader> = {
  title: 'App/AppSidebarHeader',
  component: AppSidebarHeader,
  tags: ['autodocs'],
  decorators: [sidebarDecorator],
  argTypes: {
    breadcrumbs: {
      description: 'Array of breadcrumb items with title and href',
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    breadcrumbs: sampleBreadcrumbs,
  },
};

export const NoBreadcrumbs: Story = {
  args: {
    breadcrumbs: [],
  },
};

export const LongPath: Story = {
  args: {
    breadcrumbs: longPathBreadcrumbs,
  },
};
