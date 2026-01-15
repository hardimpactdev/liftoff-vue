import type { Meta, StoryObj } from '@storybook/vue3';
import { provide, ref, defineComponent, reactive, inject, computed } from 'vue';
import { Home, FolderOpen, Settings, BookOpen, HelpCircle } from 'lucide-vue-next';
import AppShell from '@/components/AppShell.vue';
import AppContent from '@/components/AppContent.vue';
import AppSidebarHeader from '@/components/AppSidebarHeader.vue';
import NavMain from '@/components/NavMain.vue';
import NavFooter from '@/components/NavFooter.vue';
import AppLogo from '@/components/AppLogo.vue';
import UserInfo from '@/components/UserInfo.vue';
import Heading from '@/components/Heading.vue';
import HeadingSmall from '@/components/HeadingSmall.vue';
import AppearanceTabs from '@/components/AppearanceTabs.vue';
import { Input } from '@/components/input';
import { Label } from '@/components/label';
import { Button } from '@/components/button';
import { Separator } from '@/components/separator';
import type { NavItem, BreadcrumbItem } from '@/types';
import { mockUser } from '../../../.storybook/inertia-mock';

// Navigation items
const mainItems: NavItem[] = [
  { title: 'Dashboard', href: '?path=/story/pages-dashboard--default', icon: Home },
  { title: 'Projects', href: '/projects', icon: FolderOpen },
  { title: 'Settings', href: '?path=/story/pages-settings--profile', icon: Settings, isActive: true },
];

const footerItems: NavItem[] = [
  { title: 'Documentation', href: 'https://docs.example.com', icon: BookOpen },
  { title: 'Help', href: 'https://help.example.com', icon: HelpCircle },
];

// Settings nav items - using Storybook story paths
const settingsNavItems = [
  { title: 'Profile', href: '?path=/story/pages-settings--profile', storyPath: '/settings/profile' },
  { title: 'Password', href: '?path=/story/pages-settings--password', storyPath: '/settings/password' },
  { title: 'Appearance', href: '?path=/story/pages-settings--appearance', storyPath: '/settings/appearance' },
];

// Mock AppSidebar that injects sidebar context
const AppSidebarMock = defineComponent({
  name: 'AppSidebarMock',
  components: { NavMain, NavFooter, AppLogo, UserInfo },
  props: {
    mainItems: { type: Array as () => NavItem[], default: () => mainItems },
    footerItems: { type: Array as () => NavItem[], default: () => footerItems },
    user: { type: Object, default: () => mockUser },
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
        <a href="?path=/story/pages-dashboard--default" class="flex items-center gap-2" aria-label="Go to dashboard">
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

// Mock Settings Layout with Storybook navigation
const SettingsLayoutMock = defineComponent({
  name: 'SettingsLayoutMock',
  components: { Heading },
  props: {
    currentPath: { type: String, default: '/settings/profile' },
  },
  setup(props) {
    const isActive = (storyPath: string) => props.currentPath === storyPath;
    return { settingsNavItems, isActive };
  },
  template: `
    <div class="px-4 py-6">
      <Heading title="Settings" description="Manage your profile and account settings" />
      <div class="flex flex-col lg:flex-row lg:space-x-12">
        <aside class="w-full max-w-xl lg:w-48">
          <nav class="flex flex-col space-y-1" aria-label="Settings">
            <a
              v-for="item in settingsNavItems"
              :key="item.storyPath"
              :href="item.href"
              class="flex h-9 items-center justify-start rounded-md px-4 py-2 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground"
              :class="{ 'bg-muted': isActive(item.storyPath) }"
            >
              {{ item.title }}
            </a>
          </nav>
        </aside>
        <div class="my-6 h-px bg-border lg:hidden" />
        <div class="flex-1 md:max-w-2xl">
          <section class="max-w-xl space-y-12">
            <slot />
          </section>
        </div>
      </div>
    </div>
  `,
});

// Profile form content with proper styled inputs
const ProfileContent = defineComponent({
  name: 'ProfileContent',
  components: { HeadingSmall, Input, Label, Button, Separator },
  setup() {
    const form = reactive({
      name: mockUser.name,
      email: mockUser.email,
    });
    const processing = ref(false);
    const recentlySuccessful = ref(false);

    const submit = () => {
      processing.value = true;
      setTimeout(() => {
        processing.value = false;
        recentlySuccessful.value = true;
        setTimeout(() => recentlySuccessful.value = false, 2000);
      }, 1000);
    };

    return { form, processing, recentlySuccessful, submit };
  },
  template: `
    <div class="space-y-6">
      <HeadingSmall
        title="Profile information"
        description="Update your account's profile information and email address."
      />
      <form @submit.prevent="submit" class="space-y-6">
        <div class="grid gap-2">
          <Label for="name">Name</Label>
          <Input
            id="name"
            v-model="form.name"
            type="text"
            autocomplete="name"
            placeholder="Full name"
          />
        </div>
        <div class="grid gap-2">
          <Label for="email">Email address</Label>
          <Input
            id="email"
            v-model="form.email"
            type="email"
            autocomplete="email"
            placeholder="Email address"
          />
        </div>
        <div class="flex items-center gap-4">
          <Button type="submit" :disabled="processing">
            {{ processing ? 'Saving...' : 'Save' }}
          </Button>
          <Transition
            enter-active-class="transition ease-in-out"
            enter-from-class="opacity-0"
            leave-active-class="transition ease-in-out"
            leave-to-class="opacity-0"
          >
            <p v-if="recentlySuccessful" class="text-sm text-muted-foreground">Saved.</p>
          </Transition>
        </div>
      </form>

      <Separator />

      <div class="space-y-6">
        <HeadingSmall
          title="Delete account"
          description="Delete your account and all of its resources"
        />
        <div class="space-y-4">
          <div class="rounded-lg border border-red-200 bg-red-50 p-4 dark:border-red-900/50 dark:bg-red-900/10">
            <p class="text-sm font-medium text-red-800 dark:text-red-200">Warning</p>
            <p class="mt-1 text-sm text-red-700 dark:text-red-300">Please proceed with caution, this cannot be undone.</p>
          </div>
          <Button variant="destructive">
            Delete account
          </Button>
        </div>
      </div>
    </div>
  `,
});

// Password form content with proper styled inputs
const PasswordContent = defineComponent({
  name: 'PasswordContent',
  components: { HeadingSmall, Input, Label, Button },
  setup() {
    const form = reactive({
      current_password: '',
      password: '',
      password_confirmation: '',
    });
    const processing = ref(false);
    const recentlySuccessful = ref(false);

    const submit = () => {
      processing.value = true;
      setTimeout(() => {
        processing.value = false;
        recentlySuccessful.value = true;
        form.current_password = '';
        form.password = '';
        form.password_confirmation = '';
        setTimeout(() => recentlySuccessful.value = false, 2000);
      }, 1000);
    };

    return { form, processing, recentlySuccessful, submit };
  },
  template: `
    <div class="space-y-6">
      <HeadingSmall
        title="Update password"
        description="Ensure your account is using a long, random password to stay secure."
      />
      <form @submit.prevent="submit" class="space-y-6">
        <div class="grid gap-2">
          <Label for="current_password">Current password</Label>
          <Input
            id="current_password"
            v-model="form.current_password"
            type="password"
            autocomplete="current-password"
            placeholder="Current password"
          />
        </div>
        <div class="grid gap-2">
          <Label for="password">New password</Label>
          <Input
            id="password"
            v-model="form.password"
            type="password"
            autocomplete="new-password"
            placeholder="New password"
          />
        </div>
        <div class="grid gap-2">
          <Label for="password_confirmation">Confirm password</Label>
          <Input
            id="password_confirmation"
            v-model="form.password_confirmation"
            type="password"
            autocomplete="new-password"
            placeholder="Confirm password"
          />
        </div>
        <div class="flex items-center gap-4">
          <Button type="submit" :disabled="processing">
            {{ processing ? 'Saving...' : 'Save password' }}
          </Button>
          <Transition
            enter-active-class="transition ease-in-out"
            enter-from-class="opacity-0"
            leave-active-class="transition ease-in-out"
            leave-to-class="opacity-0"
          >
            <p v-if="recentlySuccessful" class="text-sm text-muted-foreground">Saved.</p>
          </Transition>
        </div>
      </form>
    </div>
  `,
});

// Appearance content
const AppearanceContent = defineComponent({
  name: 'AppearanceContent',
  components: { HeadingSmall, AppearanceTabs },
  template: `
    <div class="space-y-6">
      <HeadingSmall
        title="Appearance settings"
        description="Update your account's appearance settings."
      />
      <AppearanceTabs />
    </div>
  `,
});

const meta: Meta = {
  title: 'Pages/Settings',
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component: `
Settings pages demo matching the Laravel Vue Starter Kit.

Includes:
- **Profile**: Update name, email, and delete account
- **Password**: Change password with current password verification
- **Appearance**: Light/dark/system theme selection
        `,
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Profile: Story = {
  render: () => ({
    components: {
      AppShell,
      AppSidebarMock,
      AppContent,
      AppSidebarHeader,
      SettingsLayoutMock,
      ProfileContent,
    },
    setup() {
      const isOpen = ref(true);
      const isMobile = ref(false);
      const toggle = () => { isOpen.value = !isOpen.value; };

      provide('sidebar', { isOpen, isMobile, toggle });

      const breadcrumbs: BreadcrumbItem[] = [
        { title: 'Settings', href: '?path=/story/pages-settings--profile' },
        { title: 'Profile' },
      ];

      return { breadcrumbs };
    },
    template: `
      <AppShell variant="sidebar">
        <AppSidebarMock />
        <AppContent variant="sidebar">
          <AppSidebarHeader :breadcrumbs="breadcrumbs" />
          <div class="flex-1 overflow-auto">
            <SettingsLayoutMock currentPath="/settings/profile">
              <ProfileContent />
            </SettingsLayoutMock>
          </div>
        </AppContent>
      </AppShell>
    `,
  }),
};

export const Password: Story = {
  render: () => ({
    components: {
      AppShell,
      AppSidebarMock,
      AppContent,
      AppSidebarHeader,
      SettingsLayoutMock,
      PasswordContent,
    },
    setup() {
      const isOpen = ref(true);
      const isMobile = ref(false);
      const toggle = () => { isOpen.value = !isOpen.value; };

      provide('sidebar', { isOpen, isMobile, toggle });

      const breadcrumbs: BreadcrumbItem[] = [
        { title: 'Settings', href: '?path=/story/pages-settings--profile' },
        { title: 'Password' },
      ];

      return { breadcrumbs };
    },
    template: `
      <AppShell variant="sidebar">
        <AppSidebarMock />
        <AppContent variant="sidebar">
          <AppSidebarHeader :breadcrumbs="breadcrumbs" />
          <div class="flex-1 overflow-auto">
            <SettingsLayoutMock currentPath="/settings/password">
              <PasswordContent />
            </SettingsLayoutMock>
          </div>
        </AppContent>
      </AppShell>
    `,
  }),
};

export const Appearance: Story = {
  render: () => ({
    components: {
      AppShell,
      AppSidebarMock,
      AppContent,
      AppSidebarHeader,
      SettingsLayoutMock,
      AppearanceContent,
    },
    setup() {
      const isOpen = ref(true);
      const isMobile = ref(false);
      const toggle = () => { isOpen.value = !isOpen.value; };

      provide('sidebar', { isOpen, isMobile, toggle });

      const breadcrumbs: BreadcrumbItem[] = [
        { title: 'Settings', href: '?path=/story/pages-settings--profile' },
        { title: 'Appearance' },
      ];

      return { breadcrumbs };
    },
    template: `
      <AppShell variant="sidebar">
        <AppSidebarMock />
        <AppContent variant="sidebar">
          <AppSidebarHeader :breadcrumbs="breadcrumbs" />
          <div class="flex-1 overflow-auto">
            <SettingsLayoutMock currentPath="/settings/appearance">
              <AppearanceContent />
            </SettingsLayoutMock>
          </div>
        </AppContent>
      </AppShell>
    `,
  }),
};
