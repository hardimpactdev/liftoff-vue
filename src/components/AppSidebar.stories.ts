import type { Meta, StoryObj } from '@storybook/vue3';
import { h, provide, ref, computed, defineComponent, inject, reactive, toRefs } from 'vue';
import { Home, FolderOpen, Settings, HelpCircle, BookOpen } from 'lucide-vue-next';
import NavMain from './NavMain.vue';
import NavFooter from './NavFooter.vue';
import AppLogo from './AppLogo.vue';
import type { NavItem } from '@/types';
import { mockUser, mockUserWithAvatar } from '../../.storybook/inertia-mock';

// Mock UserInfo component since the file is missing
const UserInfo = defineComponent({
  name: 'UserInfo',
  props: ['user'],
  template: `
    <div class="flex items-center gap-2 text-sm font-medium">
      <div class="h-8 w-8 rounded-full bg-muted flex items-center justify-center overflow-hidden">
        <img v-if="user.avatar" :src="user.avatar" alt="Avatar" class="h-full w-full object-cover" />
        <span v-else>{{ user.initials || 'CN' }}</span>
      </div>
      <div class="grid gap-0.5 leading-none">
        <span class="font-semibold">{{ user.name }}</span>
        <span class="text-xs text-muted-foreground">{{ user.email }}</span>
      </div>
    </div>
  `
});

// Sample navigation items
const mainItems: NavItem[] = [
  { title: 'Dashboard', href: '/dashboard', icon: Home },
  { title: 'Projects', href: '/projects', icon: FolderOpen },
  { title: 'Settings', href: '/settings', icon: Settings },
];

const footerItems: NavItem[] = [
  { title: 'Documentation', href: 'https://docs.example.com', icon: BookOpen },
  { title: 'Help', href: 'https://help.example.com', icon: HelpCircle },
];

// Mock AppSidebar that doesn't use usePage()
const AppSidebarMock = defineComponent({
  name: 'AppSidebarMock',
  components: { NavMain, NavFooter, AppLogo, UserInfo },
  props: {
    mainItems: {
      type: Array as () => NavItem[],
      default: () => mainItems,
    },
    footerItems: {
      type: Array as () => NavItem[],
      default: () => footerItems,
    },
    user: {
      type: Object,
      default: () => mockUser,
    },
    dashboardHref: {
      type: String,
      default: '/dashboard',
    },
  },
  setup(props, { slots }) {
    const sidebar = inject<{
      isOpen: { value: boolean };
      isMobile: { value: boolean };
    }>('sidebar', {
      isOpen: ref(true),
      isMobile: ref(false),
    });

    const isCollapsed = computed(() => !sidebar?.isOpen?.value);

    return { isCollapsed, sidebar, props };
  },
  template: `
    <aside
      class="flex h-screen flex-col border-r bg-background transition-all duration-300"
      :class="isCollapsed ? 'w-16' : 'w-64'"
    >
      <!-- Header -->
      <div class="flex h-16 items-center border-b px-4">
        <a :href="props.dashboardHref" class="flex items-center gap-2" aria-label="Go to dashboard">
          <AppLogo :collapsed="isCollapsed" />
        </a>
      </div>

      <!-- Content -->
      <div class="flex-1 overflow-y-auto py-4">
        <NavMain :items="props.mainItems" :collapsed="isCollapsed" />
      </div>

      <!-- Footer -->
      <div class="border-t py-4">
        <NavFooter :items="props.footerItems" :collapsed="isCollapsed" />
        <div class="px-2 pt-2">
          <div
            class="flex items-center gap-2 rounded-md px-3 py-2 text-left transition-colors hover:bg-muted"
            :class="isCollapsed ? 'justify-center' : ''"
          >
            <UserInfo :user="props.user" />
          </div>
        </div>
      </div>
    </aside>

    <slot />
  `,
});

const meta: Meta<typeof AppSidebarMock> = {
  title: 'App/AppSidebar',
  component: AppSidebarMock,
  tags: ['autodocs'],
  decorators: [
    (story) => ({
      setup() {
        // Provide sidebar state that AppSidebar expects to inject
        provide('sidebar', {
          isOpen: ref(true),
          isMobile: ref(false),
          toggle: () => {},
        });
        return () => h('div', { class: 'flex h-screen' }, [h(story())]);
      },
    }),
  ],
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component: 'Collapsible sidebar navigation component. Contains AppLogo, NavMain, NavFooter, and user section. Injects sidebar state from AppShell parent. This story uses a mock version since the real component requires Inertia usePage().',
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: (args) => ({
    components: { AppSidebarMock },
    setup() {
      return { args: toRefs(reactive(args)) };
    },
    template: `
      <AppSidebarMock v-bind="args">
        <main class="flex-1 p-6 bg-zinc-50 dark:bg-zinc-900">
          <h1 class="text-xl font-semibold mb-4">Main Content</h1>
          <p class="text-muted-foreground">This is the main content area next to the sidebar.</p>
        </main>
      </AppSidebarMock>
    `,
  }),
  args: {},
};

export const Collapsed: Story = {
  decorators: [
    (story) => ({
      setup() {
        // Provide collapsed sidebar state
        provide('sidebar', {
          isOpen: ref(false),
          isMobile: ref(false),
          toggle: () => {},
        });
        return () => h('div', { class: 'flex h-screen' }, [h(story())]);
      },
    }),
  ],
  render: (args) => ({
    components: { AppSidebarMock },
    setup() {
      return { args: toRefs(reactive(args)) };
    },
    template: `
      <AppSidebarMock v-bind="args">
        <main class="flex-1 p-6 bg-zinc-50 dark:bg-zinc-900">
          <h1 class="text-xl font-semibold mb-4">Main Content</h1>
          <p class="text-muted-foreground">Sidebar is collapsed, showing only icons.</p>
        </main>
      </AppSidebarMock>
    `,
  }),
  args: {},
};

export const WithAvatar: Story = {
  render: (args) => ({
    components: { AppSidebarMock },
    setup() {
      return { args: toRefs(reactive(args)), user: mockUserWithAvatar };
    },
    template: `
      <AppSidebarMock v-bind="args" :user="user">
        <main class="flex-1 p-6 bg-zinc-50 dark:bg-zinc-900">
          <h1 class="text-xl font-semibold mb-4">Main Content</h1>
          <p class="text-muted-foreground">Sidebar with user avatar.</p>
        </main>
      </AppSidebarMock>
    `,
  }),
  args: {},
};
