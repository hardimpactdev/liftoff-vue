import type { Meta, StoryObj } from '@storybook/vue3';
import Sheet from './Sheet.vue';
import SheetClose from './SheetClose.vue';
import SheetContent from './SheetContent.vue';
import SheetDescription from './SheetDescription.vue';
import SheetFooter from './SheetFooter.vue';
import SheetHeader from './SheetHeader.vue';
import SheetTitle from './SheetTitle.vue';
import SheetTrigger from './SheetTrigger.vue';
import Button from '../button/Button.vue';
import Input from '../input/Input.vue';
import Label from '../label/Label.vue';

const meta = {
  title: 'Components/Sheet',
  component: Sheet,
  tags: ['autodocs'],
  argTypes: {
    // Add props controls here
  },
  args: {
    // Add default props here
  },
} satisfies Meta<typeof Sheet>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: (args) => ({
    components: {
      Sheet,
      SheetClose,
      SheetContent,
      SheetDescription,
      SheetFooter,
      SheetHeader,
      SheetTitle,
      SheetTrigger,
      Button,
      Input,
      Label,
    },
    setup() {
      return { args };
    },
    template: `
      <div class="flex justify-center p-20">
        <Sheet v-bind="args">
          <SheetTrigger as-child>
            <Button variant="outline">
              Open Sheet
            </Button>
          </SheetTrigger>
          <SheetContent>
            <SheetHeader>
              <SheetTitle>Edit profile</SheetTitle>
              <SheetDescription>
                Make changes to your profile here. Click save when you're done.
              </SheetDescription>
            </SheetHeader>
            <div class="grid gap-4 py-4">
              <div class="grid grid-cols-4 items-center gap-4">
                <Label for="name" class="text-right">
                  Name
                </Label>
                <Input id="name" value="Pedro Duarte" class="col-span-3" />
              </div>
              <div class="grid grid-cols-4 items-center gap-4">
                <Label for="username" class="text-right">
                  Username
                </Label>
                <Input id="username" value="@peduarte" class="col-span-3" />
              </div>
            </div>
            <SheetFooter>
              <SheetClose as-child>
                <Button type="submit">
                  Save changes
                </Button>
              </SheetClose>
            </SheetFooter>
          </SheetContent>
        </Sheet>
      </div>
    `,
  }),
  args: {},
};
