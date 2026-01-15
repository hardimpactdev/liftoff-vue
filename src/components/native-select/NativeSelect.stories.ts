import type { Meta, StoryObj } from '@storybook/vue3';
import NativeSelect from './NativeSelect.vue';
import NativeSelectOption from './NativeSelectOption.vue';
import NativeSelectOptGroup from './NativeSelectOptGroup.vue';
import { ref } from 'vue';

const meta = {
  title: 'Components/NativeSelect',
  component: NativeSelect,
  tags: ['autodocs'],
  argTypes: {},
  args: {},
} satisfies Meta<typeof NativeSelect>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: (args) => ({
    components: { NativeSelect, NativeSelectOption, NativeSelectOptGroup },
    setup() {
      const selected = ref('');
      return { args, selected };
    },
    template: `
      <div class="p-10 max-w-sm mx-auto">
        <NativeSelect v-model="selected" v-bind="args">
          <NativeSelectOption value="" disabled selected>Select a fruit</NativeSelectOption>
          <NativeSelectOption value="apple">Apple</NativeSelectOption>
          <NativeSelectOption value="banana">Banana</NativeSelectOption>
          <NativeSelectOption value="orange">Orange</NativeSelectOption>
          <NativeSelectOptGroup label="Vegetables">
             <NativeSelectOption value="carrot">Carrot</NativeSelectOption>
             <NativeSelectOption value="potato">Potato</NativeSelectOption>
          </NativeSelectOptGroup>
        </NativeSelect>
      </div>
    `,
  }),
  args: {},
};
