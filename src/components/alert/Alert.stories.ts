import type { Meta, StoryObj } from '@storybook/vue3';
import Alert from './Alert.vue';
import AlertTitle from './AlertTitle.vue';
import AlertDescription from './AlertDescription.vue';
import { Terminal } from 'lucide-vue-next';

const meta = {
  title: 'Components/Alert',
  component: Alert,
  tags: ['autodocs'],
  argTypes: {
    // Add props controls here
  },
  args: {
    // Add default props here
  },
} satisfies Meta<typeof Alert>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: (args) => ({
    components: { Alert, AlertTitle, AlertDescription, Terminal },
    setup() {
      return { args };
    },
    template: `
      <div class="p-10">
        <Alert v-bind="args">
          <Terminal class="h-4 w-4" />
          <AlertTitle>Heads up!</AlertTitle>
          <AlertDescription>
            You can add components to your app using the cli.
          </AlertDescription>
        </Alert>
      </div>
    `,
  }),
  args: {},
};
