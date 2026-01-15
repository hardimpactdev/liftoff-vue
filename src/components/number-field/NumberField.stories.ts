import type { Meta, StoryObj } from '@storybook/vue3';
import NumberField from './NumberField.vue';
import NumberFieldContent from './NumberFieldContent.vue';
import NumberFieldDecrement from './NumberFieldDecrement.vue';
import NumberFieldIncrement from './NumberFieldIncrement.vue';
import NumberFieldInput from './NumberFieldInput.vue';
import { ref } from 'vue';

const meta = {
  title: 'Components/NumberField',
  component: NumberField,
  tags: ['autodocs'],
  argTypes: {},
  args: {},
} satisfies Meta<typeof NumberField>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: (args) => ({
    components: {
      NumberField,
      NumberFieldContent,
      NumberFieldDecrement,
      NumberFieldIncrement,
      NumberFieldInput
    },
    setup() {
      const value = ref(10);
      return { args, value };
    },
    template: `
      <div class="p-10 max-w-[200px] mx-auto">
        <NumberField v-model="value" :min="0" v-bind="args">
          <NumberFieldContent>
            <NumberFieldDecrement />
            <NumberFieldInput />
            <NumberFieldIncrement />
          </NumberFieldContent>
        </NumberField>
      </div>
    `,
  }),
  args: {},
};
