import type { Meta, StoryObj } from '@storybook/vue3';
import AlertDialog from './AlertDialog.vue';
import AlertDialogAction from './AlertDialogAction.vue';
import AlertDialogCancel from './AlertDialogCancel.vue';
import AlertDialogContent from './AlertDialogContent.vue';
import AlertDialogDescription from './AlertDialogDescription.vue';
import AlertDialogFooter from './AlertDialogFooter.vue';
import AlertDialogHeader from './AlertDialogHeader.vue';
import AlertDialogTitle from './AlertDialogTitle.vue';
import AlertDialogTrigger from './AlertDialogTrigger.vue';
import Button from '../button/Button.vue';

const meta = {
  title: 'Components/AlertDialog',
  component: AlertDialog,
  tags: ['autodocs'],
  argTypes: {
    // Add props controls here
  },
  args: {
    // Add default props here
  },
} satisfies Meta<typeof AlertDialog>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: (args) => ({
    components: {
      AlertDialog,
      AlertDialogAction,
      AlertDialogCancel,
      AlertDialogContent,
      AlertDialogDescription,
      AlertDialogFooter,
      AlertDialogHeader,
      AlertDialogTitle,
      AlertDialogTrigger,
      Button,
    },
    setup() {
      return { args };
    },
    template: `
      <div class="flex justify-center p-20">
        <AlertDialog v-bind="args">
          <AlertDialogTrigger as-child>
            <Button variant="outline">
              Show Dialog
            </Button>
          </AlertDialogTrigger>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
              <AlertDialogDescription>
                This action cannot be undone. This will permanently delete your
                account and remove your data from our servers.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Cancel</AlertDialogCancel>
              <AlertDialogAction>Continue</AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </div>
    `,
  }),
  args: {},
};
