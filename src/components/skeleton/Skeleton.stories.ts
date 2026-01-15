import type { Meta, StoryObj } from '@storybook/vue3';
import Skeleton from './Skeleton.vue';

const meta = {
  title: 'Components/Skeleton',
  component: Skeleton,
  tags: ['autodocs'],
  argTypes: {
    // Add props controls here
  },
  args: {
    // Add default props here
  },
} satisfies Meta<typeof Skeleton>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: (args) => ({
    components: { Skeleton },
    setup() {
      return { args };
    },
    template: `
      <div class="flex items-center space-x-4 p-10">
        <Skeleton class="h-12 w-12 rounded-full" v-bind="args" />
        <div class="space-y-2">
          <Skeleton class="h-4 w-[250px]" v-bind="args" />
          <Skeleton class="h-4 w-[200px]" v-bind="args" />
        </div>
      </div>
    `,
  }),
  args: {},
};
