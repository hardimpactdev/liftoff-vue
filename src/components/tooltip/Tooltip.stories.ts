import type { Meta, StoryObj } from '@storybook/vue3';
import Tooltip from './Tooltip.vue';
import TooltipContent from './TooltipContent.vue';
import TooltipProvider from './TooltipProvider.vue';
import TooltipTrigger from './TooltipTrigger.vue';
import Button from '../button/Button.vue';

const meta = {
  title: 'Components/Tooltip',
  component: Tooltip,
  tags: ['autodocs'],
  argTypes: {
    // Add props controls here
  },
  args: {
    // Add default props here
  },
} satisfies Meta<typeof Tooltip>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: (args) => ({
    components: {
      Tooltip,
      TooltipContent,
      TooltipProvider,
      TooltipTrigger,
      Button,
    },
    setup() {
      return { args };
    },
    template: `
      <div class="flex justify-center p-20">
        <TooltipProvider>
          <Tooltip v-bind="args">
            <TooltipTrigger as-child>
              <Button variant="outline">
                Hover me
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              <p>Add to library</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </div>
    `,
  }),
  args: {},
};
