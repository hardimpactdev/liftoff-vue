import type { Meta, StoryObj } from '@storybook/vue3';
import ScrollArea from './ScrollArea.vue';
import Separator from '../separator/Separator.vue';

const meta = {
  title: 'Components/ScrollArea',
  component: ScrollArea,
  tags: ['autodocs'],
  argTypes: {},
  args: {},
} satisfies Meta<typeof ScrollArea>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: (args) => ({
    components: { ScrollArea, Separator },
    setup() {
      const tags = Array.from({ length: 50 }).map(
        (_, i, a) => `v1.2.0-beta.${a.length - i}`
      );
      return { args, tags };
    },
    template: `
      <div class="p-10 flex justify-center">
        <ScrollArea class="h-72 w-48 rounded-md border" v-bind="args">
            <div class="p-4">
                <h4 class="mb-4 text-sm font-medium leading-none">Tags</h4>
                <div v-for="tag in tags" :key="tag">
                    <div class="text-sm">
                        {{ tag }}
                    </div>
                    <Separator class="my-2" />
                </div>
            </div>
        </ScrollArea>
      </div>
    `,
  }),
  args: {},
};
