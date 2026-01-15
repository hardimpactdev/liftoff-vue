import type { Meta, StoryObj } from '@storybook/vue3';
import PinInput from './PinInput.vue';
import PinInputGroup from './PinInputGroup.vue';
import PinInputSeparator from './PinInputSeparator.vue';
import PinInputSlot from './PinInputSlot.vue';
import { ref } from 'vue';

const meta = {
  title: 'Components/PinInput',
  component: PinInput,
  tags: ['autodocs'],
  args: {
    // Add default props here
  },
} satisfies Meta<any>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: (args) => ({
    components: { PinInput, PinInputGroup, PinInputSeparator, PinInputSlot },
    setup() {
      const value = ref([]);
      return { args, value };
    },
    template: `
      <div class="flex justify-center p-10">
        <PinInput v-model="value" placeholder="○" v-bind="args">
          <PinInputGroup>
            <PinInputSlot :index="0" />
            <PinInputSlot :index="1" />
            <PinInputSlot :index="2" />
            <PinInputSlot :index="3" />
          </PinInputGroup>
        </PinInput>
      </div>
    `,
  }),
  args: {
    // Provide some default args to satisfy types if needed, though PinInput usually takes optional props
  },
};
