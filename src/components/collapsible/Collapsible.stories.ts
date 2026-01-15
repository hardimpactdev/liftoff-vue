import type { Meta, StoryObj } from '@storybook/vue3';
import Collapsible from './Collapsible.vue';
import CollapsibleContent from './CollapsibleContent.vue';
import CollapsibleTrigger from './CollapsibleTrigger.vue';
import Button from '../button/Button.vue';
import { ChevronsUpDown } from 'lucide-vue-next';
import { ref } from 'vue';

const meta = {
  title: 'Components/Collapsible',
  component: Collapsible,
  tags: ['autodocs'],
  argTypes: {},
  args: {},
} satisfies Meta<typeof Collapsible>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: (args) => ({
    components: { Collapsible, CollapsibleContent, CollapsibleTrigger, Button, ChevronsUpDown },
    setup() {
      const isOpen = ref(false);
      return { args, isOpen };
    },
    template: `
      <div class="p-10 flex justify-center">
        <Collapsible
          v-model:open="isOpen"
          class="w-[350px] space-y-2"
          v-bind="args"
        >
          <div class="flex items-center justify-between space-x-4 px-4">
            <h4 class="text-sm font-semibold">
              @peduarte starred 3 repositories
            </h4>
            <CollapsibleTrigger as-child>
              <Button variant="ghost" size="sm" class="w-9 p-0">
                <ChevronsUpDown class="h-4 w-4" />
                <span class="sr-only">Toggle</span>
              </Button>
            </CollapsibleTrigger>
          </div>
          <div class="rounded-md border px-4 py-3 font-mono text-sm">
            @radix-ui/primitives
          </div>
          <CollapsibleContent class="space-y-2">
            <div class="rounded-md border px-4 py-3 font-mono text-sm">
              @radix-ui/colors
            </div>
            <div class="rounded-md border px-4 py-3 font-mono text-sm">
              @stitches/react
            </div>
          </CollapsibleContent>
        </Collapsible>
      </div>
    `,
  }),
  args: {},
};
