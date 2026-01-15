import type { Meta, StoryObj } from '@storybook/vue3';
import { h, ref, reactive, toRefs } from 'vue';
import { within, userEvent, expect } from 'storybook/test';
import Popover from './popover/Popover.vue';
import NavUser from './NavUser.vue';
import UserInfo from './UserInfo.vue';
import UserMenuContent from './UserMenuContent.vue';
import { ChevronsUpDown } from 'lucide-vue-next';
import { mockUser, mockUserWithAvatar } from '../../.storybook/inertia-mock';

// Create a mock version of NavUser that doesn't use usePage()
const NavUserMock = {
  name: 'NavUserMock',
  components: { UserInfo, UserMenuContent, ChevronsUpDown, Popover },
  props: {
    collapsed: { type: Boolean, default: false },
    user: { type: Object, required: true },
  },
  setup(props: { collapsed: boolean; user: typeof mockUser }) {
    const isOpen = ref(false);
    return { isOpen, props };
  },
  template: `
    <div class="px-2 pt-2">
      <Popover v-model:open="isOpen">
        <button
          class="flex w-full items-center gap-2 rounded-md px-3 py-2 text-left transition-colors hover:bg-muted"
          :class="props.collapsed ? 'justify-center' : ''"
          :aria-label="'User menu for ' + props.user.name"
          @click="isOpen = !isOpen"
        >
          <UserInfo :user="props.user" />
          <ChevronsUpDown v-if="!props.collapsed" class="ml-auto h-4 w-4 text-muted-foreground" />
        </button>

        <template #content>
          <UserMenuContent :user="props.user" />
        </template>
      </Popover>
    </div>
  `,
};

const meta: Meta<typeof NavUserMock> = {
  title: 'App/NavUser',
  component: NavUserMock as any,
  tags: ['autodocs'],
  argTypes: {
    collapsed: {
      description: 'Whether the navigation is in collapsed state (shows only avatar)',
      control: 'boolean',
    },
    user: {
      description: 'User object with name, email, and optional avatar',
      control: 'object',
    },
  },
  parameters: {
    docs: {
      description: {
        component: 'User navigation button with popover dropdown. Displays user avatar and name, clicking opens a menu with settings and logout options. Uses Inertia usePage() for user data in production.',
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: (args) => ({
    components: { NavUserMock },
    setup() {
      return { args: toRefs(reactive(args)), user: mockUser };
    },
    template: `
      <div class="w-64 bg-background border rounded-lg">
        <NavUserMock :user="user" :collapsed="args.collapsed" />
      </div>
    `,
  }),
  args: {
    collapsed: false,
  },
};

export const WithAvatar: Story = {
  render: (args) => ({
    components: { NavUserMock },
    setup() {
      return { args: toRefs(reactive(args)), user: mockUserWithAvatar };
    },
    template: `
      <div class="w-64 bg-background border rounded-lg">
        <NavUserMock :user="user" :collapsed="args.collapsed" />
      </div>
    `,
  }),
  args: {
    collapsed: false,
  },
};

export const Collapsed: Story = {
  render: (args) => ({
    components: { NavUserMock },
    setup() {
      return { args: toRefs(reactive(args)), user: mockUser };
    },
    template: `
      <div class="w-16 bg-background border rounded-lg">
        <NavUserMock :user="user" :collapsed="args.collapsed" />
      </div>
    `,
  }),
  args: {
    collapsed: true,
  },
};

export const WithInteraction: Story = {
  render: (args) => ({
    components: { NavUserMock },
    setup() {
      return { args: toRefs(reactive(args)), user: mockUser };
    },
    template: `
      <div class="w-64 bg-background border rounded-lg">
        <NavUserMock :user="user" :collapsed="args.collapsed" />
      </div>
    `,
  }),
  args: {
    collapsed: false,
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // Find and click the user button to open popover
    const userButton = canvas.getByRole('button');
    await userEvent.click(userButton);

    // Wait for popover content to appear
    // The popover should show user info and menu items
    await expect(canvas.getByText('John Doe')).toBeInTheDocument();
  },
};
