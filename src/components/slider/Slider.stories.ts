import type { Meta, StoryObj } from '@storybook/vue3';
import Slider from './Slider.vue';
import { ref } from 'vue';

const meta = {
  title: 'Components/Slider',
  component: Slider,
  tags: ['autodocs'],
  argTypes: {},
  args: {},
} satisfies Meta<typeof Slider>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: (args) => ({
    components: { Slider },
    setup() {
      const value = ref([50]);
      return { args, value };
    },
    template: `
      <div class="p-10 max-w-sm mx-auto">
        <Slider v-model="value" :max="100" :step="1" v-bind="args" />
      </div>
    `,
  }),
  args: {},
};
