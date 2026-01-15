import type { Meta, StoryObj } from '@storybook/vue3';
import Item from './Item.vue';
import { Settings } from 'lucide-vue-next';

const meta = {
  title: 'Components/Item',
  component: Item,
  tags: ['autodocs'],
  argTypes: {},
  args: {},
} satisfies Meta<typeof Item>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: (args) => ({
    components: { Item, Settings },
    setup() {
      return { args };
    },
    template: `
      <div class="p-10 max-w-sm mx-auto">
         <div class="border rounded-md p-4">
            <Item class="flex items-center gap-2 p-2 hover:bg-muted rounded-md cursor-pointer" v-bind="args">
                <Settings class="h-4 w-4" />
                <span>Settings</span>
            </Item>
         </div>
      </div>
    `,
  }),
  args: {},
};
