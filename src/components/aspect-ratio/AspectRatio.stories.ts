import type { Meta, StoryObj } from '@storybook/vue3';
import AspectRatio from './AspectRatio.vue';

const meta = {
  title: 'Components/AspectRatio',
  component: AspectRatio,
  tags: ['autodocs'],
  argTypes: {
    // Add props controls here
  },
  args: {
    // Add default props here
  },
} satisfies Meta<typeof AspectRatio>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: (args) => ({
    components: { AspectRatio },
    setup() {
      return { args };
    },
    template: `
      <div class="w-[450px]">
        <AspectRatio :ratio="16 / 9" class="bg-muted">
          <img
            src="https://images.unsplash.com/photo-1588345921523-c2dcdb7f1dcd?w=800&dpr=2&q=80"
            alt="Photo by Drew Beamer"
            class="h-full w-full rounded-md object-cover"
          />
        </AspectRatio>
      </div>
    `,
  }),
  args: {
    ratio: 16 / 9,
  },
};
