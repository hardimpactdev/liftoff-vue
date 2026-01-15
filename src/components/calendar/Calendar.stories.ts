import type { Meta, StoryObj } from '@storybook/vue3';
import Calendar from './Calendar.vue';
import { ref } from 'vue';
import { getLocalTimeZone, today } from '@internationalized/date';

const meta = {
  title: 'Components/Calendar',
  component: Calendar,
  tags: ['autodocs'],
  argTypes: {
    // Add props controls here
  },
  args: {
    // Add default props here
  },
} satisfies Meta<typeof Calendar>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: (args) => ({
    components: { Calendar },
    setup() {
      const date = ref(today(getLocalTimeZone()));
      return { args, date };
    },
    template: `
      <div class="flex justify-center p-10">
        <Calendar v-model="date" v-bind="args" class="rounded-md border" />
      </div>
    `,
  }),
  args: {},
};
