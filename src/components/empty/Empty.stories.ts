import type { Meta, StoryObj } from '@storybook/vue3';
import Empty from './Empty.vue';
import Button from '../button/Button.vue';
import { PackageOpen } from 'lucide-vue-next';

const meta = {
  title: 'Components/Empty',
  component: Empty,
  tags: ['autodocs'],
  argTypes: {},
  args: {},
} satisfies Meta<typeof Empty>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: (args) => ({
    components: { Empty, Button, PackageOpen },
    setup() {
      return { args };
    },
    template: `
      <div class="p-20 border rounded-md">
        <Empty v-bind="args">
            <div class="flex flex-col items-center text-center">
                <div class="flex h-20 w-20 items-center justify-center rounded-full bg-muted">
                    <PackageOpen class="h-10 w-10 text-muted-foreground" />
                </div>
                <h3 class="mt-4 text-lg font-semibold">No products created</h3>
                <p class="mb-4 mt-2 text-sm text-muted-foreground max-w-sm">
                    You haven't created any products yet. Start by adding a new product.
                </p>
                <Button>Add Product</Button>
            </div>
        </Empty>
      </div>
    `,
  }),
  args: {},
};
