import type { Meta, StoryObj } from '@storybook/vue3';
import { reactive, toRefs } from 'vue';
import Badge from './Badge.vue';

const meta = {
  title: 'Components/Badge',
  component: Badge,
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['default', 'secondary', 'destructive', 'outline'],
    },
    default: {
      control: 'text',
      description: 'Badge content',
    },
  },
  args: {
    variant: 'default',
    default: 'Badge',
  },
  render: (args) => ({
    components: { Badge },
    setup() {
      return { args: toRefs(reactive(args)) };
    },
    template: '<Badge v-bind="args">{{ args.default }}</Badge>',
  }),
} satisfies Meta<typeof Badge>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {},
};

export const Secondary: Story = {
  args: {
    variant: 'secondary',
    default: 'Secondary',
  },
};

export const Destructive: Story = {
  args: {
    variant: 'destructive',
    default: 'Destructive',
  },
};

export const Outline: Story = {
  args: {
    variant: 'outline',
    default: 'Outline',
  },
};

