import type { Meta, StoryObj } from '@storybook/vue3';
import { reactive, toRefs } from 'vue';
import { ResizablePanelGroup, ResizablePanel, ResizableHandle } from './index';

const meta = {
  title: 'Components/Resizable',
  component: ResizablePanelGroup,
  tags: ['autodocs'],
  argTypes: {
    direction: { control: 'select', options: ['horizontal', 'vertical'] },
  },
} satisfies Meta<typeof ResizablePanelGroup>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: (args) => ({
    components: { ResizablePanelGroup, ResizablePanel, ResizableHandle },
    setup() {
      return { args: toRefs(reactive(args)) };
    },
    template: `
      <ResizablePanelGroup direction="horizontal" class="min-h-[200px] max-w-md rounded-lg border">
        <ResizablePanel :default-size="50">
          <div class="flex h-full items-center justify-center p-6">
            <span class="font-semibold">One</span>
          </div>
        </ResizablePanel>
        <ResizableHandle />
        <ResizablePanel :default-size="50">
          <ResizablePanelGroup direction="vertical">
            <ResizablePanel :default-size="25">
              <div class="flex h-full items-center justify-center p-6">
                <span class="font-semibold">Two</span>
              </div>
            </ResizablePanel>
            <ResizableHandle />
            <ResizablePanel :default-size="75">
              <div class="flex h-full items-center justify-center p-6">
                <span class="font-semibold">Three</span>
              </div>
            </ResizablePanel>
          </ResizablePanelGroup>
        </ResizablePanel>
      </ResizablePanelGroup>
    `,
  }),
};
