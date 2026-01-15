import type { Meta, StoryObj } from '@storybook/vue3';
import Menubar from './Menubar.vue';
import MenubarCheckboxItem from './MenubarCheckboxItem.vue';
import MenubarContent from './MenubarContent.vue';
import MenubarGroup from './MenubarGroup.vue';
import MenubarItem from './MenubarItem.vue';
import MenubarLabel from './MenubarLabel.vue';
import MenubarMenu from './MenubarMenu.vue';
import MenubarRadioGroup from './MenubarRadioGroup.vue';
import MenubarRadioItem from './MenubarRadioItem.vue';
import MenubarSeparator from './MenubarSeparator.vue';
import MenubarShortcut from './MenubarShortcut.vue';
import MenubarSub from './MenubarSub.vue';
import MenubarSubContent from './MenubarSubContent.vue';
import MenubarSubTrigger from './MenubarSubTrigger.vue';
import MenubarTrigger from './MenubarTrigger.vue';
import { ref } from 'vue';

const meta = {
  title: 'Components/Menubar',
  component: Menubar,
  tags: ['autodocs'],
  argTypes: {
    // Add props controls here
  },
  args: {
    // Add default props here
  },
} satisfies Meta<typeof Menubar>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: (args) => ({
    components: {
      Menubar,
      MenubarCheckboxItem,
      MenubarContent,
      MenubarGroup,
      MenubarItem,
      MenubarLabel,
      MenubarMenu,
      MenubarRadioGroup,
      MenubarRadioItem,
      MenubarSeparator,
      MenubarShortcut,
      MenubarSub,
      MenubarSubContent,
      MenubarSubTrigger,
      MenubarTrigger,
    },
    setup() {
      const radio = ref('benoit');
      return { args, radio };
    },
    template: `
      <div class="flex justify-center p-8">
        <Menubar v-bind="args">
          <MenubarMenu>
            <MenubarTrigger>File</MenubarTrigger>
            <MenubarContent>
              <MenubarItem>
                New Tab <MenubarShortcut>⌘T</MenubarShortcut>
              </MenubarItem>
              <MenubarItem>
                New Window <MenubarShortcut>⌘N</MenubarShortcut>
              </MenubarItem>
              <MenubarItem disabled>
                New Incognito Window
              </MenubarItem>
              <MenubarSeparator />
              <MenubarSub>
                <MenubarSubTrigger>Share</MenubarSubTrigger>
                <MenubarSubContent>
                  <MenubarItem>Email link</MenubarItem>
                  <MenubarItem>Messages</MenubarItem>
                  <MenubarItem>Notes</MenubarItem>
                </MenubarSubContent>
              </MenubarSub>
              <MenubarSeparator />
              <MenubarItem>
                Print... <MenubarShortcut>⌘P</MenubarShortcut>
              </MenubarItem>
            </MenubarContent>
          </MenubarMenu>
          <MenubarMenu>
            <MenubarTrigger>Edit</MenubarTrigger>
            <MenubarContent>
              <MenubarItem>
                Undo <MenubarShortcut>⌘Z</MenubarShortcut>
              </MenubarItem>
              <MenubarItem>
                Redo <MenubarShortcut>⇧⌘Z</MenubarShortcut>
              </MenubarItem>
              <MenubarSeparator />
              <MenubarSub>
                <MenubarSubTrigger>Find</MenubarSubTrigger>
                <MenubarSubContent>
                  <MenubarItem>Search the web</MenubarItem>
                  <MenubarSeparator />
                  <MenubarItem>Find...</MenubarItem>
                  <MenubarItem>Find Next</MenubarItem>
                  <MenubarItem>Find Previous</MenubarItem>
                </MenubarSubContent>
              </MenubarSub>
              <MenubarSeparator />
              <MenubarItem>Cut</MenubarItem>
              <MenubarItem>Copy</MenubarItem>
              <MenubarItem>Paste</MenubarItem>
            </MenubarContent>
          </MenubarMenu>
          <MenubarMenu>
            <MenubarTrigger>View</MenubarTrigger>
            <MenubarContent>
              <MenubarCheckboxItem>Always Show Bookmarks Bar</MenubarCheckboxItem>
              <MenubarCheckboxItem checked>
                Always Show Full URLs
              </MenubarCheckboxItem>
              <MenubarSeparator />
              <MenubarItem inset>
                Reload <MenubarShortcut>⌘R</MenubarShortcut>
              </MenubarItem>
              <MenubarItem disabled inset>
                Force Reload <MenubarShortcut>⇧⌘R</MenubarShortcut>
              </MenubarItem>
              <MenubarSeparator />
              <MenubarItem inset>
                Toggle Fullscreen
              </MenubarItem>
              <MenubarSeparator />
              <MenubarItem inset>
                Hide Sidebar
              </MenubarItem>
            </MenubarContent>
          </MenubarMenu>
          <MenubarMenu>
            <MenubarTrigger>Profiles</MenubarTrigger>
            <MenubarContent>
              <MenubarRadioGroup v-model="radio">
                <MenubarRadioItem value="andy">
                  Andy
                </MenubarRadioItem>
                <MenubarRadioItem value="benoit">
                  Benoit
                </MenubarRadioItem>
                <MenubarRadioItem value="Luis">
                  Luis
                </MenubarRadioItem>
              </MenubarRadioGroup>
              <MenubarSeparator />
              <MenubarItem inset>
                Edit...
              </MenubarItem>
              <MenubarSeparator />
              <MenubarItem inset>
                Add Profile...
              </MenubarItem>
            </MenubarContent>
          </MenubarMenu>
        </Menubar>
      </div>
    `,
  }),
  args: {},
};
