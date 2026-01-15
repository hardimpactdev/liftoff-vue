import type { Meta, StoryObj } from '@storybook/vue3';
import { reactive, toRefs } from 'vue';
import Switch from './Switch.vue';

const meta = {
  title: 'Components/Switch',
  component: Switch,
  tags: ['autodocs'],
  argTypes: {
    modelValue: {
      control: 'boolean',
      description: 'The controlled checked state of the switch',
    },
    defaultValue: {
      control: 'boolean',
      description: 'The default checked state when uncontrolled',
    },
    disabled: {
      control: 'boolean',
      description: 'Whether the switch is disabled',
    },
    'update:modelValue': { action: 'update:modelValue' },
  },
  args: {
    modelValue: false,
    disabled: false,
  },
  render: (args) => ({
    components: { Switch },
    setup() {
      return { args: toRefs(reactive(args)) };
    },
    template: `
      <div class="flex items-center space-x-2">
        <Switch
          id="airplane-mode"
          v-bind="args"
          @update:model-value="args['update:modelValue']"
        />
        <label
          for="airplane-mode"
          class="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
        >
          Airplane Mode
        </label>
      </div>
    `,
  }),
} satisfies Meta<typeof Switch>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const Checked: Story = {
  args: {
    modelValue: true,
  },
};

export const Disabled: Story = {
  args: {
    disabled: true,
    modelValue: false,
  },
};

export const DisabledChecked: Story = {
  args: {
    disabled: true,
    modelValue: true,
  },
};
