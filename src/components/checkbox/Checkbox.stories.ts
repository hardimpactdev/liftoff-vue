import type { Meta, StoryObj } from '@storybook/vue3';
import { reactive, toRefs } from 'vue';
import Checkbox from './Checkbox.vue';

const meta = {
  title: 'Components/Checkbox',
  component: Checkbox,
  tags: ['autodocs'],
  argTypes: {
    modelValue: {
      control: 'boolean',
      description: 'The controlled checked state of the checkbox',
    },
    defaultValue: {
      control: 'boolean',
      description: 'The default checked state when uncontrolled',
    },
    disabled: {
      control: 'boolean',
      description: 'Whether the checkbox is disabled',
    },
    'update:modelValue': { action: 'update:modelValue' },
  },
  args: {
    modelValue: false,
    disabled: false,
  },
  render: (args) => ({
    components: { Checkbox },
    setup() {
      return { args: toRefs(reactive(args)) };
    },
    template: `
      <div class="flex items-center space-x-2">
        <Checkbox
          id="terms"
          v-bind="args"
          @update:model-value="args['update:modelValue']"
        />
        <label
          for="terms"
          class="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
        >
          Accept terms and conditions
        </label>
      </div>
    `,
  }),
} satisfies Meta<typeof Checkbox>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {},
};

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
