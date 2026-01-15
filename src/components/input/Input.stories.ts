import type { Meta, StoryObj } from '@storybook/vue3';
import { ref, watch } from 'vue';
import Input from './Input.vue';

const meta = {
  title: 'Components/Input',
  component: Input,
  tags: ['autodocs'],
  argTypes: {
    modelValue: {
      control: 'text',
      description: 'The controlled value of the input',
    },
    defaultValue: {
      control: 'text',
      description: 'The default value when uncontrolled',
    },
    type: {
      control: 'select',
      options: ['text', 'password', 'email', 'number', 'tel', 'url', 'search'],
      description: 'The type of the input',
    },
    placeholder: {
      control: 'text',
      description: 'Placeholder text',
    },
    disabled: {
      control: 'boolean',
      description: 'Whether the input is disabled',
    },
  },
  args: {
    type: 'text',
    placeholder: 'Type something...',
    modelValue: '',
    disabled: false,
  },
  render: (args, { updateArgs }) => ({
    components: { Input },
    setup() {
      // Create a local ref that syncs with args
      const value = ref(args.modelValue);

      // Watch for external changes from controls
      watch(
        () => args.modelValue,
        (newVal) => {
          value.value = newVal;
        }
      );

      // Handle updates from the component
      const onUpdate = (val: string) => {
        value.value = val;
        updateArgs({ modelValue: val });
      };

      return { value, onUpdate, args };
    },
    template: `
      <Input
        :model-value="value"
        :type="args.type"
        :placeholder="args.placeholder"
        :disabled="args.disabled"
        @update:model-value="onUpdate"
      />
    `,
  }),
} satisfies Meta<typeof Input>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {},
};

export const WithValue: Story = {
  args: {
    modelValue: 'Hello World',
  },
};

export const Password: Story = {
  args: {
    type: 'password',
    placeholder: 'Enter password...',
  },
};

export const Email: Story = {
  args: {
    type: 'email',
    placeholder: 'Enter email...',
  },
};

export const Disabled: Story = {
  args: {
    disabled: true,
    modelValue: 'Disabled Input',
  },
};
