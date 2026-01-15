import type { Meta, StoryObj } from '@storybook/vue3';
import ContextMenu from './ContextMenu.vue';
import ContextMenuCheckboxItem from './ContextMenuCheckboxItem.vue';
import ContextMenuContent from './ContextMenuContent.vue';
import ContextMenuGroup from './ContextMenuGroup.vue';
import ContextMenuItem from './ContextMenuItem.vue';
import ContextMenuLabel from './ContextMenuLabel.vue';
import ContextMenuPortal from './ContextMenuPortal.vue';
import ContextMenuRadioGroup from './ContextMenuRadioGroup.vue';
import ContextMenuRadioItem from './ContextMenuRadioItem.vue';
import ContextMenuSeparator from './ContextMenuSeparator.vue';
import ContextMenuShortcut from './ContextMenuShortcut.vue';
import ContextMenuSub from './ContextMenuSub.vue';
import ContextMenuSubContent from './ContextMenuSubContent.vue';
import ContextMenuSubTrigger from './ContextMenuSubTrigger.vue';
import ContextMenuTrigger from './ContextMenuTrigger.vue';
import { ref } from 'vue';

const meta = {
  title: 'Components/ContextMenu',
  component: ContextMenu,
  tags: ['autodocs'],
  argTypes: {
    // Add props controls here
  },
  args: {
    // Add default props here
  },
} satisfies Meta<typeof ContextMenu>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: (args) => ({
    components: {
      ContextMenu,
      ContextMenuCheckboxItem,
      ContextMenuContent,
      ContextMenuGroup,
      ContextMenuItem,
      ContextMenuLabel,
      ContextMenuPortal,
      ContextMenuRadioGroup,
      ContextMenuRadioItem,
      ContextMenuSeparator,
      ContextMenuShortcut,
      ContextMenuSub,
      ContextMenuSubContent,
      ContextMenuSubTrigger,
      ContextMenuTrigger,
    },
    setup() {
      const checkbox1 = ref(false);
      const checkbox2 = ref(true);
      const radio = ref('pedro');
      return { args, checkbox1, checkbox2, radio };
    },
    template: `
      <div class="flex h-[300px] items-center justify-center p-8">
        <ContextMenu v-bind="args">
          <ContextMenuTrigger class="flex h-[150px] w-[300px] items-center justify-center rounded-md border border-dashed text-sm">
            Right click here
          </ContextMenuTrigger>
          <ContextMenuContent class="w-64">
            <ContextMenuItem inset>
              Back
              <ContextMenuShortcut>⌘[</ContextMenuShortcut>
            </ContextMenuItem>
            <ContextMenuItem inset disabled>
              Forward
              <ContextMenuShortcut>⌘]</ContextMenuShortcut>
            </ContextMenuItem>
            <ContextMenuItem inset>
              Reload
              <ContextMenuShortcut>⌘R</ContextMenuShortcut>
            </ContextMenuItem>
            <ContextMenuSub>
              <ContextMenuSubTrigger inset>More Tools</ContextMenuSubTrigger>
              <ContextMenuSubContent class="w-48">
                <ContextMenuItem>
                  Save Page As...
                  <ContextMenuShortcut>⇧⌘S</ContextMenuShortcut>
                </ContextMenuItem>
                <ContextMenuItem>Create Shortcut...</ContextMenuItem>
                <ContextMenuItem>Name Window...</ContextMenuItem>
                <ContextMenuSeparator />
                <ContextMenuItem>Developer Tools</ContextMenuItem>
              </ContextMenuSubContent>
            </ContextMenuSub>
            <ContextMenuSeparator />
            <ContextMenuCheckboxItem v-model:checked="checkbox1" inset>
              Show Bookmarks Bar
              <ContextMenuShortcut>⌘⇧B</ContextMenuShortcut>
            </ContextMenuCheckboxItem>
            <ContextMenuCheckboxItem v-model:checked="checkbox2" inset>
              Show Full URLs
            </ContextMenuCheckboxItem>
            <ContextMenuSeparator />
            <ContextMenuRadioGroup v-model="radio">
              <ContextMenuLabel inset>People</ContextMenuLabel>
              <ContextMenuSeparator />
              <ContextMenuRadioItem value="pedro">
                Pedro Duarte
              </ContextMenuRadioItem>
              <ContextMenuRadioItem value="colm">
                Colm Tuite
              </ContextMenuRadioItem>
            </ContextMenuRadioGroup>
          </ContextMenuContent>
        </ContextMenu>
      </div>
    `,
  }),
  args: {},
};
