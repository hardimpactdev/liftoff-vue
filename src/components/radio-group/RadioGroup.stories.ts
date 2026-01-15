import type { Meta, StoryObj } from '@storybook/vue3';
import { reactive, toRefs } from 'vue';
import RadioGroup from './RadioGroup.vue';
import RadioGroupItem from './RadioGroupItem.vue';
import Label from '../label/Label.vue';

const meta = {
  title: 'Components/RadioGroup',
  component: RadioGroup,
  tags: ['autodocs'],
  subcomponents: { RadioGroupItem, Label },
  argTypes: {
    modelValue: {
      control: 'text',
      description: 'The value of the selected radio item',
    },
    disabled: {
      control: 'boolean',
    },
    'update:modelValue': { action: 'update:modelValue' },
  },
  args: {
    modelValue: 'default',
    disabled: false,
  },
  render: (args) => ({
    components: { RadioGroup, RadioGroupItem, Label },
    setup() {
      return { args: toRefs(reactive(args)) };
    },
    template: `
      <RadioGroup v-bind="args" @update:model-value="args['update:modelValue']">
        <div class="flex items-center space-x-2">
          <RadioGroupItem id="r1" value="default" />
          <Label for="r1">Default</Label>
        </div>
        <div class="flex items-center space-x-2">
          <RadioGroupItem id="r2" value="comfortable" />
          <Label for="r2">Comfortable</Label>
        </div>
        <div class="flex items-center space-x-2">
          <RadioGroupItem id="r3" value="compact" />
          <Label for="r3">Compact</Label>
        </div>
      </RadioGroup>
    `,
  }),
} satisfies Meta<typeof RadioGroup>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {},
};

