import type { Meta, StoryObj } from '@storybook/vue3';
import Command from './Command.vue';
import CommandDialog from './CommandDialog.vue';
import CommandEmpty from './CommandEmpty.vue';
import CommandGroup from './CommandGroup.vue';
import CommandInput from './CommandInput.vue';
import CommandItem from './CommandItem.vue';
import CommandList from './CommandList.vue';
import CommandSeparator from './CommandSeparator.vue';
import CommandShortcut from './CommandShortcut.vue';
import { Calculator, Calendar, CreditCard, Settings, Smile, User } from 'lucide-vue-next';

const meta = {
  title: 'Components/Command',
  component: Command,
  tags: ['autodocs'],
  argTypes: {
    // Add props controls here
  },
  args: {
    // Add default props here
  },
} satisfies Meta<typeof Command>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: (args) => ({
    components: {
      Command,
      CommandDialog,
      CommandEmpty,
      CommandGroup,
      CommandInput,
      CommandItem,
      CommandList,
      CommandSeparator,
      CommandShortcut,
      Calculator,
      Calendar,
      CreditCard,
      Settings,
      Smile,
      User,
    },
    setup() {
      return { args };
    },
    template: `
      <div class="flex justify-center p-8">
        <Command class="rounded-lg border shadow-md md:min-w-[450px]" v-bind="args">
          <CommandInput placeholder="Type a command or search..." />
          <CommandList>
            <CommandEmpty>No results found.</CommandEmpty>
            <CommandGroup heading="Suggestions">
              <CommandItem value="calendar">
                <Calendar class="mr-2 h-4 w-4" />
                <span>Calendar</span>
              </CommandItem>
              <CommandItem value="search-emoji">
                <Smile class="mr-2 h-4 w-4" />
                <span>Search Emoji</span>
              </CommandItem>
              <CommandItem value="calculator">
                <Calculator class="mr-2 h-4 w-4" />
                <span>Calculator</span>
              </CommandItem>
            </CommandGroup>
            <CommandSeparator />
            <CommandGroup heading="Settings">
              <CommandItem value="profile">
                <User class="mr-2 h-4 w-4" />
                <span>Profile</span>
                <CommandShortcut>⌘P</CommandShortcut>
              </CommandItem>
              <CommandItem value="billing">
                <CreditCard class="mr-2 h-4 w-4" />
                <span>Billing</span>
                <CommandShortcut>⌘B</CommandShortcut>
              </CommandItem>
              <CommandItem value="settings">
                <Settings class="mr-2 h-4 w-4" />
                <span>Settings</span>
                <CommandShortcut>⌘S</CommandShortcut>
              </CommandItem>
            </CommandGroup>
          </CommandList>
        </Command>
      </div>
    `,
  }),
  args: {},
};
