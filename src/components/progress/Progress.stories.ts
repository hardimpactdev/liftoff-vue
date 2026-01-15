import type { Meta, StoryObj } from '@storybook/vue3';
import Progress from './Progress.vue';
import { ref, onMounted, onUnmounted } from 'vue';

const meta = {
  title: 'Components/Progress',
  component: Progress,
  tags: ['autodocs'],
  argTypes: {
    // Add props controls here
  },
  args: {
    // Add default props here
  },
} satisfies Meta<typeof Progress>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: (args) => ({
    components: { Progress },
    setup() {
      const progress = ref(13);
      let timer: ReturnType<typeof setTimeout>;

      onMounted(() => {
        timer = setInterval(() => {
          progress.value = Math.min(100, progress.value + 5);
        }, 500);
      });

      onUnmounted(() => {
        clearInterval(timer);
      });

      return { args, progress };
    },
    template: `
      <div class="w-[60%] p-10 mx-auto">
        <Progress v-model="progress" v-bind="args" />
      </div>
    `,
  }),
  args: {},
};
