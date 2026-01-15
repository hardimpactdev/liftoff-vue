import type { Meta, StoryObj } from '@storybook/vue3';
import Popover from './Popover.vue';
import PopoverContent from './PopoverContent.vue';
import PopoverTrigger from './PopoverTrigger.vue';
import Button from '../button/Button.vue';
import Input from '../input/Input.vue';
import Label from '../label/Label.vue';

const meta = {
  title: 'Components/Popover',
  component: Popover,
  tags: ['autodocs'],
  argTypes: {
    // Add props controls here
  },
  args: {
    // Add default props here
  },
} satisfies Meta<typeof Popover>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: (args) => ({
    components: {
      Popover,
      PopoverContent,
      PopoverTrigger,
      Button,
      Input,
      Label,
    },
    setup() {
      return { args };
    },
    template: `
      <div class="flex justify-center p-20">
        <Popover v-bind="args">
          <PopoverTrigger as-child>
            <Button variant="outline">
              Open popover
            </Button>
          </PopoverTrigger>
          <PopoverContent class="w-80">
            <div class="grid gap-4">
              <div class="space-y-2">
                <h4 class="font-medium leading-none">
                  Dimensions
                </h4>
                <p class="text-sm text-muted-foreground">
                  Set the dimensions for the layer.
                </p>
              </div>
              <div class="grid gap-2">
                <div class="grid grid-cols-3 items-center gap-4">
                  <Label for="width">Width</Label>
                  <Input
                    id="width"
                    type="text"
                    default-value="100%"
                    class="col-span-2 h-8"
                  />
                </div>
                <div class="grid grid-cols-3 items-center gap-4">
                  <Label for="maxWidth">Max. width</Label>
                  <Input
                    id="maxWidth"
                    type="text"
                    default-value="300px"
                    class="col-span-2 h-8"
                  />
                </div>
                <div class="grid grid-cols-3 items-center gap-4">
                  <Label for="height">Height</Label>
                  <Input
                    id="height"
                    type="text"
                    default-value="25px"
                    class="col-span-2 h-8"
                  />
                </div>
                <div class="grid grid-cols-3 items-center gap-4">
                  <Label for="maxHeight">Max. height</Label>
                  <Input
                    id="maxHeight"
                    type="text"
                    default-value="none"
                    class="col-span-2 h-8"
                  />
                </div>
              </div>
            </div>
          </PopoverContent>
        </Popover>
      </div>
    `,
  }),
  args: {},
};
