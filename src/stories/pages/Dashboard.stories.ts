import type { Meta, StoryObj } from '@storybook/vue3';
import { h, provide, ref, defineComponent, inject, computed } from 'vue';
import { Home, FolderOpen, Settings, BookOpen, HelpCircle } from 'lucide-vue-next';
import AppShell from '@/components/AppShell.vue';
import AppContent from '@/components/AppContent.vue';
import AppSidebarHeader from '@/components/AppSidebarHeader.vue';
import NavMain from '@/components/NavMain.vue';
import NavFooter from '@/components/NavFooter.vue';
import NavUser from '@/components/NavUser.vue';
import AppLogo from '@/components/AppLogo.vue';
import UserInfo from '@/components/UserInfo.vue';
import PlaceholderPattern from '@/components/PlaceholderPattern.vue';
import Breadcrumbs from '@/components/Breadcrumbs.vue';
import type { NavItem, BreadcrumbItem } from '@/types';
import { mockUser } from '../../../.storybook/inertia-mock';

// Navigation items matching Laravel starter kit
const mainItems: NavItem[] = [
  { title: 'Dashboard', href: '/dashboard', icon: Home, isActive: true },
  { title: 'Projects', href: '/projects', icon: FolderOpen },
  { title: 'Settings', href: '/settings/profile', icon: Settings },
];

const footerItems: NavItem[] = [
  { title: 'Documentation', href: 'https://docs.example.com', icon: BookOpen },
  { title: 'Help', href: 'https://help.example.com', icon: HelpCircle },
];

const breadcrumbs: BreadcrumbItem[] = [
  { title: 'Dashboard', href: '/dashboard' },
];

// Mock AppSidebar that injects sidebar context (doesn't use usePage())
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
  },
  setup(props) {
    const sidebar = inject<{
      isOpen: { value: boolean };
      isMobile: { value: boolean };
    }>('sidebar');

    const isCollapsed = computed(() => !sidebar?.isOpen.value);

    return { isCollapsed, props };
  },
  template: `
    <aside
      class="flex h-screen flex-col border-r bg-background transition-all duration-300"
      :class="isCollapsed ? 'w-16' : 'w-64'"
    >
      <div class="flex h-16 items-center border-b px-4">
        <a href="/dashboard" class="flex items-center gap-2" aria-label="Go to dashboard">
          <AppLogo :collapsed="isCollapsed" />
        </a>
      </div>
      <div class="flex-1 overflow-y-auto py-4">
        <NavMain :items="props.mainItems" :collapsed="isCollapsed" />
      </div>
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
  `,
});

import { Card, CardContent } from '@/components/card';

// Dashboard page content component
const DashboardContent = defineComponent({
  name: 'DashboardContent',
  components: { PlaceholderPattern, Card, CardContent },
  template: `
    <div class="flex h-full flex-1 flex-col gap-4 rounded-xl p-4">
      <div class="grid auto-rows-min gap-4 md:grid-cols-3">
        <Card class="py-0">
            <CardContent class="p-0 relative aspect-video overflow-hidden rounded-xl bg-muted/50">
                 <PlaceholderPattern class="h-full w-full stroke-neutral-900/20 dark:stroke-neutral-100/20" />
            </CardContent>
        </Card>
        <Card class="py-0">
            <CardContent class="p-0 relative aspect-video overflow-hidden rounded-xl bg-muted/50">
                 <PlaceholderPattern class="h-full w-full stroke-neutral-900/20 dark:stroke-neutral-100/20" />
            </CardContent>
        </Card>
        <Card class="py-0">
            <CardContent class="p-0 relative aspect-video overflow-hidden rounded-xl bg-muted/50">
                 <PlaceholderPattern class="h-full w-full stroke-neutral-900/20 dark:stroke-neutral-100/20" />
            </CardContent>
        </Card>
      </div>
      <Card class="flex-1 py-0">
        <CardContent class="p-0 relative min-h-[50vh] h-full overflow-hidden rounded-xl bg-muted/50 md:min-h-min">
            <PlaceholderPattern class="h-full w-full stroke-neutral-900/20 dark:stroke-neutral-100/20" />
        </CardContent>
      </Card>
    </div>
  `,
});

const meta: Meta = {
  title: 'Pages/Dashboard',
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component: `
Dashboard page demo matching the Laravel Vue Starter Kit.

Features:
- Sidebar layout with navigation
- Breadcrumb navigation
- Placeholder content grid (3 cards + large section)
- Responsive design
        `,
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => ({
    components: {
      AppShell,
      AppSidebarMock,
      AppContent,
      AppSidebarHeader,
      Breadcrumbs,
      DashboardContent,
    },
    setup() {
      const isOpen = ref(true);
      const isMobile = ref(false);
      const toggle = () => { isOpen.value = !isOpen.value; };

      provide('sidebar', { isOpen, isMobile, toggle });

      return { breadcrumbs };
    },
    template: `
      <AppShell variant="sidebar">
        <AppSidebarMock />
        <AppContent variant="sidebar">
          <AppSidebarHeader :breadcrumbs="breadcrumbs" />
          <div class="flex-1 overflow-auto">
            <DashboardContent />
          </div>
        </AppContent>
      </AppShell>
    `,
  }),
};

export const CollapsedSidebar: Story = {
  render: () => ({
    components: {
      AppShell,
      AppSidebarMock,
      AppContent,
      AppSidebarHeader,
      Breadcrumbs,
      DashboardContent,
    },
    setup() {
      const isOpen = ref(false);
      const isMobile = ref(false);
      const toggle = () => { isOpen.value = !isOpen.value; };

      provide('sidebar', { isOpen, isMobile, toggle });

      return { breadcrumbs };
    },
    template: `
      <AppShell variant="sidebar">
        <AppSidebarMock />
        <AppContent variant="sidebar">
          <AppSidebarHeader :breadcrumbs="breadcrumbs" />
          <div class="flex-1 overflow-auto">
            <DashboardContent />
          </div>
        </AppContent>
      </AppShell>
    `,
  }),
};
