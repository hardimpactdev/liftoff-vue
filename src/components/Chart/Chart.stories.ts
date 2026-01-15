import type { Meta, StoryObj } from '@storybook/vue3';
import { Chart } from './index';

const meta = {
  title: 'Components/Chart',
  component: Chart,
  tags: ['autodocs'],
} satisfies Meta<typeof Chart>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => ({
    components: { Chart },
    template: `
      <div class="p-4">
        <p class="text-sm text-muted-foreground">Chart stories require complex data setup. Please refer to Shadcn Vue documentation for examples.</p>
      </div>
    `,
  }),
};
