import type { Meta, StoryObj } from '@storybook/vue3';
import { h, provide, ref } from 'vue';
import { LayoutGrid, Settings, Users, BookOpen, Folder } from 'lucide-vue-next';
import AppHeaderLayout from './AppHeaderLayout.vue';
import AppSidebarLayout from './AppSidebarLayout.vue';
import { mockUser, mockUserWithAvatar } from '../../../.storybook/inertia-mock';
import type { NavItem, BreadcrumbItem } from '@/types';

// Mock logo component
const MockLogo = {
  template: `
    <div class="flex items-center gap-2">
      <svg class="size-6 fill-current" viewBox="0 0 40 40" xmlns="http://www.w3.org/2000/svg">
        <path d="M20 4L4 12v16l16 8 16-8V12L20 4zm0 4l12 6-12 6-12-6 12-6zm-14 10l12 6v10l-12-6V18zm28 0v10l-12 6V24l12-6z"/>
      </svg>
      <span class="font-semibold">Acme Inc</span>
    </div>
  `,
};

// Sample navigation items
const mainNavItems: NavItem[] = [
  { title: 'Dashboard', href: '/dashboard', icon: LayoutGrid },
  { title: 'Users', href: '/users', icon: Users },
  { title: 'Settings', href: '/settings', icon: Settings },
];

const footerNavItems: NavItem[] = [
  { title: 'Documentation', href: 'https://docs.example.com', icon: BookOpen },
  { title: 'Repository', href: 'https://github.com/example', icon: Folder },
];

const breadcrumbs: BreadcrumbItem[] = [
  { title: 'Dashboard', href: '/dashboard' },
  { title: 'Users', href: '/users' },
];

// Base meta
const baseMeta = {
  tags: ['autodocs'],
  parameters: {
    layout: 'fullscreen',
  },
};

// ===== AppHeaderLayout =====
const headerLayoutMeta: Meta<typeof AppHeaderLayout> = {
  ...baseMeta,
  title: 'Layouts/App/AppHeaderLayout',
  component: AppHeaderLayout,
  parameters: {
    ...baseMeta.parameters,
    docs: {
      description: {
        component: 'Application layout with a top header navigation. Best for simpler apps or when horizontal space is at a premium.',
      },
    },
  },
};

export default headerLayoutMeta;
type HeaderLayoutStory = StoryObj<typeof headerLayoutMeta>;

export const HeaderLayout: HeaderLayoutStory = {
  args: {
    mainNavItems,
    rightNavItems: footerNavItems,
    user: mockUserWithAvatar,
    homeUrl: '/dashboard',
    currentUrl: '/dashboard',
    showSearch: true,
  },
  render: (args) => ({
    components: { AppHeaderLayout, MockLogo },
    setup() {
      return { args };
    },
    template: `
      <AppHeaderLayout v-bind="args">
        <template #logo>
          <MockLogo />
        </template>
        <div class="p-6">
          <h1 class="text-2xl font-bold mb-4">Dashboard</h1>
          <p class="text-muted-foreground">Welcome to your dashboard. This is the main content area.</p>
        </div>
      </AppHeaderLayout>
    `,
  }),
};

export const HeaderLayoutWithBreadcrumbs: HeaderLayoutStory = {
  args: {
    mainNavItems,
    rightNavItems: footerNavItems,
    user: mockUser,
    breadcrumbs,
    homeUrl: '/dashboard',
    currentUrl: '/users',
  },
  render: (args) => ({
    components: { AppHeaderLayout, MockLogo },
    setup() {
      return { args };
    },
    template: `
      <AppHeaderLayout v-bind="args">
        <template #logo>
          <MockLogo />
        </template>
        <div class="p-6">
          <h1 class="text-2xl font-bold mb-4">Users</h1>
          <p class="text-muted-foreground">Manage your users here.</p>
        </div>
      </AppHeaderLayout>
    `,
  }),
};

// ===== AppSidebarLayout =====
const sidebarLayoutMeta: Meta<typeof AppSidebarLayout> = {
  ...baseMeta,
  title: 'Layouts/App/AppSidebarLayout',
  component: AppSidebarLayout,
  decorators: [
    (story) => ({
      setup() {
        // Provide sidebar state
        provide('sidebar', {
          isOpen: ref(true),
          isMobile: ref(false),
          toggle: () => {},
        });
        return () => h(story());
      },
    }),
  ],
  parameters: {
    ...baseMeta.parameters,
    docs: {
      description: {
        component: 'Application layout with a collapsible sidebar navigation. Best for complex apps with many navigation items.',
      },
    },
  },
};

export const SidebarLayout: StoryObj<typeof sidebarLayoutMeta> = {
  args: {
    mainNavItems,
    footerNavItems,
    user: mockUserWithAvatar,
    homeUrl: '/dashboard',
  },
  render: (args) => ({
    components: { AppSidebarLayout, MockLogo },
    setup() {
      return { args };
    },
    template: `
      <AppSidebarLayout v-bind="args">
        <template #logo>
          <MockLogo />
        </template>
        <div class="p-6">
          <h1 class="text-2xl font-bold mb-4">Dashboard</h1>
          <p class="text-muted-foreground">Welcome to your dashboard. This is the main content area.</p>
        </div>
      </AppSidebarLayout>
    `,
  }),
};

export const SidebarLayoutWithBreadcrumbs: StoryObj<typeof sidebarLayoutMeta> = {
  args: {
    mainNavItems,
    footerNavItems,
    user: mockUser,
    breadcrumbs,
    homeUrl: '/dashboard',
  },
  render: (args) => ({
    components: { AppSidebarLayout, MockLogo },
    setup() {
      return { args };
    },
    template: `
      <AppSidebarLayout v-bind="args">
        <template #logo>
          <MockLogo />
        </template>
        <div class="p-6">
          <h1 class="text-2xl font-bold mb-4">Users</h1>
          <p class="text-muted-foreground">Manage your users here.</p>
        </div>
      </AppSidebarLayout>
    `,
  }),
};
