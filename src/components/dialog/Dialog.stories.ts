import type { Meta, StoryObj } from '@storybook/vue3';
import Dialog from './Dialog.vue';
import DialogContent from './DialogContent.vue';
import DialogDescription from './DialogDescription.vue';
import DialogFooter from './DialogFooter.vue';
import DialogHeader from './DialogHeader.vue';
import DialogTitle from './DialogTitle.vue';
import DialogTrigger from './DialogTrigger.vue';
import Button from '../button/Button.vue';
import Input from '../input/Input.vue';
import Label from '../label/Label.vue';

const meta = {
  title: 'Components/Dialog',
  component: Dialog,
  tags: ['autodocs'],
  argTypes: {
    // Add props controls here
  },
  args: {
    // Add default props here
  },
} satisfies Meta<typeof Dialog>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: (args) => ({
    components: {
      Dialog,
      DialogContent,
      DialogDescription,
      DialogFooter,
      DialogHeader,
      DialogTitle,
      DialogTrigger,
      Button,
      Input,
      Label,
    },
    setup() {
      return { args };
    },
    template: `
      <div class="flex justify-center p-20">
        <Dialog v-bind="args">
          <DialogTrigger as-child>
            <Button variant="outline">
              Edit Profile
            </Button>
          </DialogTrigger>
          <DialogContent class="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>Edit profile</DialogTitle>
              <DialogDescription>
                Make changes to your profile here. Click save when you're done.
              </DialogDescription>
            </DialogHeader>
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
            <DialogFooter>
              <Button type="submit">
                Save changes
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    `,
  }),
  args: {},
};
