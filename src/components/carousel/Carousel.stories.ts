import type { Meta, StoryObj } from '@storybook/vue3';
import Carousel from './Carousel.vue';
import CarouselContent from './CarouselContent.vue';
import CarouselItem from './CarouselItem.vue';
import CarouselPrevious from './CarouselPrevious.vue';
import CarouselNext from './CarouselNext.vue';
import Card from '../card/Card.vue';
import CardContent from '../card/CardContent.vue';

const meta = {
  title: 'Components/Carousel',
  component: Carousel,
  tags: ['autodocs'],
  argTypes: {
    // Add props controls here
  },
  args: {
    // Add default props here
  },
} satisfies Meta<typeof Carousel>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: (args) => ({
    components: {
      Carousel,
      CarouselContent,
      CarouselItem,
      CarouselPrevious,
      CarouselNext,
      Card,
      CardContent,
    },
    setup() {
      return { args };
    },
    template: `
      <div class="flex justify-center p-12">
        <Carousel class="w-full max-w-xs" v-bind="args">
          <CarouselContent>
            <CarouselItem v-for="(_, index) in 5" :key="index">
              <div class="p-1">
                <Card>
                  <CardContent class="flex aspect-square items-center justify-center p-6">
                    <span class="text-4xl font-semibold">{{ index + 1 }}</span>
                  </CardContent>
                </Card>
              </div>
            </CarouselItem>
          </CarouselContent>
          <CarouselPrevious />
          <CarouselNext />
        </Carousel>
      </div>
    `,
  }),
  args: {},
};
