import type { Meta, StoryObj } from '@storybook/vue3';
import { reactive, toRefs } from 'vue';
import Button from './Button.vue';

const meta = {
  title: 'Components/Button',
  component: Button,
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['default', 'destructive', 'outline', 'secondary', 'ghost', 'link'],
    },
    size: {
      control: 'select',
      options: ['default', 'sm', 'lg', 'icon'],
    },
    asChild: {
      control: 'boolean',
    },
    label: {
      control: 'text',
      description: 'Slot content (Label)',
    }
  },
  args: {
    variant: 'default',
    size: 'default',
    label: 'Button Provider',
  },
  render: (args) => ({
    components: { Button },
    setup() {
      return { args: toRefs(reactive(args)) };
    },
    template: '<Button v-bind="args">{{ args.label }}</Button>',
  }),
} satisfies Meta<typeof Button>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {},
};

export const Outline: Story = {
  args: {
    variant: 'outline',
    label: 'Outline Button',
  },
};

export const Ghost: Story = {
  args: {
    variant: 'ghost',
    label: 'Ghost Button',
  },
};

export const Destructive: Story = {
  args: {
    variant: 'destructive',
    label: 'Destructive',
  },
};

