import type { Meta, StoryObj } from '@storybook/vue3';
import Combobox from './Combobox.vue';
import ComboboxAnchor from './ComboboxAnchor.vue';
import ComboboxEmpty from './ComboboxEmpty.vue';
import ComboboxGroup from './ComboboxGroup.vue';
import ComboboxInput from './ComboboxInput.vue';
import ComboboxItem from './ComboboxItem.vue';
import ComboboxItemIndicator from './ComboboxItemIndicator.vue';
import ComboboxList from './ComboboxList.vue';
import ComboboxSeparator from './ComboboxSeparator.vue';
import ComboboxTrigger from './ComboboxTrigger.vue';
import ComboboxViewport from './ComboboxViewport.vue'; // Might be needed if not internal
import { ref } from 'vue';
import { Check, ChevronsUpDown } from 'lucide-vue-next';

// Depending on implementation, Combobox might need a Content wrapper or List acts as content.
// Based on file list: Combobox, ComboboxInput, ComboboxItem, ComboboxList, ComboboxEmpty, ComboboxGroup.
// Usually Radix Combobox: Root -> Anchor -> Input/Trigger -> Content -> Viewport -> Group -> Item.
// But files are: Combobox (~Root), ComboboxInput, ComboboxList (Content?), ComboboxItem.
// I will try a standard structure.

const meta = {
  title: 'Components/Combobox',
  component: Combobox,
  tags: ['autodocs'],
  argTypes: {},
  args: {},
} satisfies Meta<typeof Combobox>;

export default meta;
type Story = StoryObj<typeof meta>;

// Basic Frameworks example
export const Default: Story = {
  render: (args) => ({
    components: {
      Combobox,
      ComboboxInput,
      ComboboxItem,
      ComboboxList,
      ComboboxEmpty,
      ComboboxGroup,
      ComboboxTrigger,
      ComboboxAnchor,
      Check,
      ChevronsUpDown
    },
    setup() {
      const frameworks = [
        { value: 'next.js', label: 'Next.js' },
        { value: 'sveltekit', label: 'SvelteKit' },
        { value: 'nuxt.js', label: 'Nuxt.js' },
        { value: 'remix', label: 'Remix' },
        { value: 'astro', label: 'Astro' },
      ];
      const modelValue = ref(frameworks[0]);
      return { args, frameworks, modelValue };
    },
    template: `
      <div class="p-20 flex justify-center">
        <Combobox v-model="modelValue" v-bind="args">
            <div class="relative w-[200px]">
                <ComboboxAnchor class="relative">
                    <ComboboxInput class="w-full h-10 border rounded-md px-3 pr-10" placeholder="Select framework..." />
                    <ComboboxTrigger class="absolute right-0 top-0 h-full px-2">
                        <ChevronsUpDown class="h-4 w-4 text-muted-foreground" />
                    </ComboboxTrigger>
                </ComboboxAnchor>
                <ComboboxList class="absolute mt-1 w-full border bg-popover text-popover-foreground shadow-md rounded-md z-50">
                    <ComboboxEmpty class="p-2 text-sm text-center">No framework found.</ComboboxEmpty>
                    <ComboboxGroup>
                        <ComboboxItem
                            v-for="framework in frameworks"
                            :key="framework.value"
                            :value="framework.label"
                            class="flex items-center justify-between p-2 text-sm cursor-default select-none hover:bg-accent hover:text-accent-foreground"
                        >
                            {{ framework.label }}
                        </ComboboxItem>
                    </ComboboxGroup>
                </ComboboxList>
            </div>
        </Combobox>
      </div>
    `,
  }),
  args: {},
};
