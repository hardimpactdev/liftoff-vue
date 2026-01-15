import type { Meta, StoryObj } from '@storybook/vue3';
import RangeCalendar from './RangeCalendar.vue';
import { ref } from 'vue';
import { getLocalTimeZone, today } from '@internationalized/date';

const meta = {
  title: 'Components/RangeCalendar',
  component: RangeCalendar,
  tags: ['autodocs'],
  argTypes: {},
  args: {},
} satisfies Meta<typeof RangeCalendar>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: (args) => ({
    components: { RangeCalendar },
    setup() {
      const start = today(getLocalTimeZone());
      const end = start.add({ days: 7 });
      const value = ref({
        start,
        end,
      });
      return { args, value };
    },
    template: `
      <div class="p-10 flex justify-center">
        <RangeCalendar v-model="value" v-bind="args" class="rounded-md border" />
      </div>
    `,
  }),
  args: {},
};
