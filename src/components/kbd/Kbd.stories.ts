import type { Meta, StoryObj } from '@storybook/vue3';
import Kbd from './Kbd.vue';

const meta = {
  title: 'Components/Kbd',
  component: Kbd,
  tags: ['autodocs'],
  argTypes: {},
  args: {},
} satisfies Meta<typeof Kbd>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: (args) => ({
    components: { Kbd },
    setup() {
      return { args };
    },
    template: `
      <div class="p-10 flex flex-col gap-4 items-center">
        <p class="text-sm text-muted-foreground">
          Press <Kbd>⌘</Kbd> + <Kbd>K</Kbd> to search
        </p>
        <div class="flex gap-2">
            <Kbd>Ctrl</Kbd>
            <Kbd>Shift</Kbd>
            <Kbd>Del</Kbd>
        </div>
      </div>
    `,
  }),
  args: {},
};
