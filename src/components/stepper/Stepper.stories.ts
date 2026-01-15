import type { Meta, StoryObj } from '@storybook/vue3';
import { Check, Circle, Dot } from 'lucide-vue-next';
import Button from '../button/Button.vue';
import Stepper from './Stepper.vue';
import StepperItem from './StepperItem.vue';
import StepperTrigger from './StepperTrigger.vue';
import StepperSeparator from './StepperSeparator.vue';
import StepperTitle from './StepperTitle.vue';
import StepperDescription from './StepperDescription.vue';
import StepperIndicator from './StepperIndicator.vue';

const meta = {
  title: 'Components/Stepper',
  component: Stepper,
  tags: ['autodocs'],
  argTypes: {
    // Add props controls here
  },
  args: {
    // Add default props here
  },
} satisfies Meta<typeof Stepper>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: (args) => ({
    components: {
      Stepper,
      StepperItem,
      StepperTrigger,
      StepperSeparator,
      StepperTitle,
      StepperDescription,
      StepperIndicator,
      Button,
      Check,
      Circle,
      Dot,
    },
    setup() {
      const steps = [
        {
          step: 1,
          title: 'Your details',
          description: 'Provide your name and email',
        },
        {
          step: 2,
          title: 'Company details',
          description: 'A few details about your company',
        },
        {
          step: 3,
          title: 'Invite team',
          description: 'Start collaborating with your team',
        },
      ];
      return { args, steps };
    },
    template: `
      <div class="flex w-full items-start gap-2 p-4">
        <Stepper class="flex w-full items-start gap-2" v-bind="args">
            <StepperItem
              v-for="item in steps"
              :key="item.step"
              class="relative flex w-full flex-col items-center justify-center"
              :step="item.step"
            >
              <StepperSeparator
                v-if="item.step !== steps[steps.length - 1].step"
                class="absolute left-[calc(50%+20px)] right-[calc(-50%+10px)] top-5 block h-0.5 shrink-0 rounded-full bg-muted group-data-[state=completed]:bg-primary"
              />

              <StepperTrigger as-child>
                <div class="z-10 flex flex-col items-center rounded-md text-center bg-background">
                  <StepperIndicator
                    class="flex h-10 w-10 items-center justify-center rounded-full bg-muted group-data-[state=active]:bg-primary group-data-[state=completed]:bg-primary group-data-[state=active]:text-primary-foreground group-data-[state=completed]:text-primary-foreground transition-all duration-200"
                  >
                    <Check v-if="item.step < (args.modelValue || args.defaultValue || 1)" class="size-5" />
                    <Circle v-else class="size-5" />
                  </StepperIndicator>

                  <div class="mt-2 flex flex-col items-center text-center">
                    <StepperTitle class="text-sm font-semibold transition lg:text-base">
                      {{ item.title }}
                    </StepperTitle>
                    <StepperDescription class="text-xs text-muted-foreground lg:text-sm">
                      {{ item.description }}
                    </StepperDescription>
                  </div>
                </div>
              </StepperTrigger>
            </StepperItem>
        </Stepper>
      </div>
    `,
  }),
  args: {
    defaultValue: 1,
  },
};
