import type { Meta, StoryObj } from '@storybook/vue3';
import Label from './Label.vue';
import Input from '../input/Input.vue';

const meta = {
  title: 'Components/Label',
  component: Label,
  tags: ['autodocs'],
  argTypes: {},
  args: {},
} satisfies Meta<typeof Label>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: (args) => ({
    components: { Label, Input },
    setup() {
      return { args };
    },
    template: `
      <div class="grid w-full max-w-sm items-center gap-1.5 p-10 mx-auto">
        <Label htmlFor="email" v-bind="args">Email</Label>
        <Input type="email" id="email" placeholder="Email" />
      </div>
    `,
  }),
  args: {},
};
