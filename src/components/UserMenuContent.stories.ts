import type { Meta, StoryObj } from '@storybook/vue3';
import { fn, within, userEvent, expect } from 'storybook/test';
import { h, reactive, toRefs } from 'vue';
import Separator from './separator/Separator.vue';
import UserInfo from './UserInfo.vue';
import { LogOut, Settings } from 'lucide-vue-next';
import { mockUser, mockUserWithAvatar } from '../../.storybook/inertia-mock';

// Create a mock version of UserMenuContent that doesn't use usePage() or Inertia Link
const UserMenuContentMock = {
  name: 'UserMenuContentMock',
  components: { UserInfo, LogOut, Settings, Separator },
  props: {
    user: { type: Object, required: true },
    onSettings: { type: Function, default: () => {} },
    onLogout: { type: Function, default: () => {} },
  },
  template: `
    <div class="p-2">
      <div class="flex items-center gap-2 px-1 py-1.5 text-left text-sm">
        <UserInfo :user="user" :show-email="true" />
      </div>
    </div>

    <Separator />

    <div class="p-1">
      <button
        class="flex w-full items-center gap-2 rounded-md px-2 py-1.5 text-sm hover:bg-muted"
        @click="onSettings"
      >
        <Settings class="h-4 w-4" />
        Settings
      </button>
    </div>

    <Separator />

    <div class="p-1">
      <button
        class="flex w-full items-center gap-2 rounded-md px-2 py-1.5 text-sm hover:bg-muted"
        @click="onLogout"
      >
        <LogOut class="h-4 w-4" />
        Log out
      </button>
    </div>
  `,
};

const meta: Meta<typeof UserMenuContentMock> = {
  title: 'App/UserMenuContent',
  component: UserMenuContentMock as any,
  tags: ['autodocs'],
  argTypes: {
    user: {
      description: 'User object with name, email, and optional avatar',
      control: 'object',
    },
  },
  parameters: {
    docs: {
      description: {
        component: 'Dropdown menu content for user navigation. Displays user info, settings link, and logout button. Used inside NavUser popover.',
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: (args) => ({
    components: { UserMenuContentMock },
    setup() {
      return { args: toRefs(reactive(args)), user: mockUser };
    },
    template: `
      <div class="w-56 bg-background border rounded-lg shadow-lg">
        <UserMenuContentMock
          :user="user"
          :on-settings="args.onSettings"
          :on-logout="args.onLogout"
        />
      </div>
    `,
  }),
  args: {
    onSettings: fn(),
    onLogout: fn(),
  },
};

export const WithAvatar: Story = {
  render: (args) => ({
    components: { UserMenuContentMock },
    setup() {
      return { args: toRefs(reactive(args)), user: mockUserWithAvatar };
    },
    template: `
      <div class="w-56 bg-background border rounded-lg shadow-lg">
        <UserMenuContentMock
          :user="user"
          :on-settings="args.onSettings"
          :on-logout="args.onLogout"
        />
      </div>
    `,
  }),
  args: {
    onSettings: fn(),
    onLogout: fn(),
  },
};

export const WithInteraction: Story = {
  render: (args) => ({
    components: { UserMenuContentMock },
    setup() {
      return { args: toRefs(reactive(args)), user: mockUser };
    },
    template: `
      <div class="w-56 bg-background border rounded-lg shadow-lg">
        <UserMenuContentMock
          :user="user"
          :on-settings="args.onSettings"
          :on-logout="args.onLogout"
        />
      </div>
    `,
  }),
  args: {
    onSettings: fn(),
    onLogout: fn(),
  },
  play: async ({ args, canvasElement }) => {
    const canvas = within(canvasElement);

    // Click Settings button
    const settingsButton = canvas.getByRole('button', { name: /settings/i });
    await userEvent.click(settingsButton);
    await expect(args.onSettings).toHaveBeenCalled();

    // Click Logout button
    const logoutButton = canvas.getByRole('button', { name: /log out/i });
    await userEvent.click(logoutButton);
    await expect(args.onLogout).toHaveBeenCalled();
  },
};
