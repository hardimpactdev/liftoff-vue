import type { Meta, StoryObj } from '@storybook/vue3';
import TagsInput from './TagsInput.vue';
import TagsInputInput from './TagsInputInput.vue';
import TagsInputItem from './TagsInputItem.vue';
import TagsInputItemDelete from './TagsInputItemDelete.vue';
import TagsInputItemText from './TagsInputItemText.vue';
import { ref } from 'vue';

const meta = {
  title: 'Components/TagsInput',
  component: TagsInput,
  tags: ['autodocs'],
  argTypes: {
    // Add props controls here
  },
  args: {
    // Add default props here
  },
} satisfies Meta<typeof TagsInput>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: (args) => ({
    components: {
      TagsInput,
      TagsInputInput,
      TagsInputItem,
      TagsInputItemDelete,
      TagsInputItemText,
    },
    setup() {
      const modelValue = ref(['Apple', 'Banana']);
      return { args, modelValue };
    },
    template: `
      <div class="flex justify-center p-20">
        <TagsInput v-model="modelValue" v-bind="args">
          <TagsInputItem v-for="item in modelValue" :key="item" :value="item">
            <TagsInputItemText />
            <TagsInputItemDelete />
          </TagsInputItem>
          <TagsInputInput placeholder="Fruits..." />
        </TagsInput>
      </div>
    `,
  }),
  args: {
    modelValue: ['Apple', 'Banana'],
  },
};
