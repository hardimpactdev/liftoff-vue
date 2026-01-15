import type { Meta, StoryObj } from '@storybook/vue3';
import Drawer from './Drawer.vue';
import DrawerClose from './DrawerClose.vue';
import DrawerContent from './DrawerContent.vue';
import DrawerDescription from './DrawerDescription.vue';
import DrawerFooter from './DrawerFooter.vue';
import DrawerHeader from './DrawerHeader.vue';
import DrawerTitle from './DrawerTitle.vue';
import DrawerTrigger from './DrawerTrigger.vue';
import Button from '../button/Button.vue';
import { Minus, Plus } from 'lucide-vue-next';
import { ref } from 'vue';

const meta = {
  title: 'Components/Drawer',
  component: Drawer,
  tags: ['autodocs'],
  argTypes: {
    // Add props controls here
  },
  args: {
    // Add default props here
  },
} satisfies Meta<typeof Drawer>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: (args) => ({
    components: {
      Drawer,
      DrawerClose,
      DrawerContent,
      DrawerDescription,
      DrawerFooter,
      DrawerHeader,
      DrawerTitle,
      DrawerTrigger,
      Button,
      Minus,
      Plus,
    },
    setup() {
      const goal = ref(350);
      function onClick(adjustment: number) {
        goal.value = Math.max(200, Math.min(400, goal.value + adjustment));
      }
      return { args, goal, onClick };
    },
    template: `
      <div class="flex justify-center p-20">
        <Drawer v-bind="args">
          <DrawerTrigger as-child>
            <Button variant="outline">Open Drawer</Button>
          </DrawerTrigger>
          <DrawerContent>
            <div class="mx-auto w-full max-w-sm">
              <DrawerHeader>
                <DrawerTitle>Move Goal</DrawerTitle>
                <DrawerDescription>Set your daily activity goal.</DrawerDescription>
              </DrawerHeader>
              <div class="p-4 pb-0">
                <div class="flex items-center justify-center space-x-2">
                  <Button
                    variant="outline"
                    size="icon"
                    class="h-8 w-8 shrink-0 rounded-full"
                    :disabled="goal <= 200"
                    @click="onClick(-10)"
                  >
                    <Minus class="h-4 w-4" />
                    <span class="sr-only">Decrease</span>
                  </Button>
                  <div class="flex-1 text-center">
                    <div class="text-7xl font-bold tracking-tighter">
                      {{ goal }}
                    </div>
                    <div class="text-[0.70rem] uppercase text-muted-foreground">
                      Calories/day
                    </div>
                  </div>
                  <Button
                    variant="outline"
                    size="icon"
                    class="h-8 w-8 shrink-0 rounded-full"
                    :disabled="goal >= 400"
                    @click="onClick(10)"
                  >
                    <Plus class="h-4 w-4" />
                    <span class="sr-only">Increase</span>
                  </Button>
                </div>
                <div class="mt-3 h-[120px]">
                  <!-- Chart placeholder since we don't have the chart component handy -->
                  <div class="flex h-full items-end justify-between gap-2">
                    <div v-for="i in 7" :key="i" class="w-full bg-primary/20 rounded-t" :style="{ height: Math.random() * 100 + '%' }"></div>
                  </div>
                </div>
              </div>
              <DrawerFooter>
                <Button>Submit</Button>
                <DrawerClose as-child>
                  <Button variant="outline">
                    Cancel
                  </Button>
                </DrawerClose>
              </DrawerFooter>
            </div>
          </DrawerContent>
        </Drawer>
      </div>
    `,
  }),
  args: {},
};
