import type { Meta, StoryObj } from '@storybook/vue3';
import ToggleGroup from './ToggleGroup.vue';
import ToggleGroupItem from './ToggleGroupItem.vue';
import { Bold, Italic, Underline } from 'lucide-vue-next';

const meta = {
  title: 'Components/ToggleGroup',
  component: ToggleGroup,
  tags: ['autodocs'],
  argTypes: {
    // Add props controls here
  },
  args: {
    // Add default props here
  },
} satisfies Meta<typeof ToggleGroup>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: (args) => ({
    components: {
      ToggleGroup,
      ToggleGroupItem,
      Bold,
      Italic,
      Underline,
    },
    setup() {
      return { args };
    },
    template: `
      <div class="flex justify-center p-10">
        <ToggleGroup type="multiple" v-bind="args">
          <ToggleGroupItem value="bold" aria-label="Toggle bold">
            <Bold class="h-4 w-4" />
          </ToggleGroupItem>
          <ToggleGroupItem value="italic" aria-label="Toggle italic">
            <Italic class="h-4 w-4" />
          </ToggleGroupItem>
          <ToggleGroupItem value="underline" aria-label="Toggle underline">
            <Underline class="h-4 w-4" />
          </ToggleGroupItem>
        </ToggleGroup>
      </div>
    `,
  }),
  args: {
    type: 'multiple',
  },
};
