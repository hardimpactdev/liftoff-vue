import type { Meta, StoryObj } from '@storybook/vue3';
import Sonner from './Sonner.vue';

const meta = {
  title: 'Components/Sonner',
  component: Sonner,
  tags: ['autodocs'],
  argTypes: {
    // Add props controls here
  },
  args: {
    // Add default props here
  },
} satisfies Meta<typeof Sonner>;

export default meta;
type Story = StoryObj<typeof meta>;

import { toast } from 'vue-sonner';
import Button from '../button/Button.vue';

export const Default: Story = {
  render: (args) => ({
    components: { Sonner, Button },
    setup() {
      return { args, toast };
    },
    template: `
      <div class="flex flex-col items-center gap-4 p-8">
        <Sonner v-bind="args" />
        <Button @click="() => toast('Event has been created', {
          description: 'Sunday, December 03, 2023 at 9:00 AM',
          action: {
            label: 'Undo',
            onClick: () => console.log('Undo'),
          },
        })">
          Show Toast
        </Button>
      </div>
    `,
  }),
  args: {},
};
