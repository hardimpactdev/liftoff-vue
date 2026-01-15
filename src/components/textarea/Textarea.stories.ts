import type { Meta, StoryObj } from '@storybook/vue3';
import Textarea from './Textarea.vue';

const meta = {
  title: 'Components/Textarea',
  component: Textarea,
  tags: ['autodocs'],
  argTypes: {},
  args: {},
} satisfies Meta<typeof Textarea>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: (args) => ({
    components: { Textarea },
    setup() {
      return { args };
    },
    template: `
      <div class="p-10 max-w-sm mx-auto">
        <Textarea placeholder="Type your message here." v-bind="args" />
      </div>
    `,
  }),
  args: {},
};
