import type { Meta, StoryObj } from '@storybook/vue3';
import { reactive, toRefs } from 'vue';
import Toggle from './Toggle.vue';

const meta = {
  title: 'Components/Toggle',
  component: Toggle,
  tags: ['autodocs'],
  argTypes: {
    modelValue: {
      control: 'boolean',
      description: 'The controlled pressed state of the toggle',
    },
    defaultValue: {
      control: 'boolean',
      description: 'The default pressed state when uncontrolled',
    },
    disabled: {
      control: 'boolean',
      description: 'Whether the toggle is disabled',
    },
    variant: {
      control: 'select',
      options: ['default', 'outline'],
      description: 'The visual variant of the toggle',
    },
    size: {
      control: 'select',
      options: ['default', 'sm', 'lg'],
      description: 'The size of the toggle',
    },
    'update:modelValue': { action: 'update:modelValue' },
  },
  args: {
    modelValue: false,
    disabled: false,
    variant: 'default',
    size: 'default',
  },
  render: (args) => ({
    components: { Toggle },
    setup() {
      return { args: toRefs(reactive(args)) };
    },
    template: `
      <Toggle
        v-bind="args"
        aria-label="Toggle bold"
        @update:model-value="args['update:modelValue']"
      >
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="size-4"><path d="M14 12a4 4 0 0 0 0-8H6v8"/><path d="M15 20a4 4 0 0 0 0-8H6v8"/></svg>
      </Toggle>
    `,
  }),
} satisfies Meta<typeof Toggle>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {},
};

export const Pressed: Story = {
  args: {
    modelValue: true,
  },
};

export const Outline: Story = {
  args: {
    variant: 'outline',
  },
};

export const OutlinePressed: Story = {
  args: {
    variant: 'outline',
    modelValue: true,
  },
};

export const Small: Story = {
  args: {
    size: 'sm',
  },
};

export const Large: Story = {
  args: {
    size: 'lg',
  },
};

export const Disabled: Story = {
  args: {
    disabled: true,
  },
};

export const DisabledPressed: Story = {
  args: {
    disabled: true,
    modelValue: true,
  },
};
