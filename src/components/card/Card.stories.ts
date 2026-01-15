import type { Meta, StoryObj } from '@storybook/vue3';
import Card from './Card.vue';
import CardContent from './CardContent.vue';
import CardDescription from './CardDescription.vue';
import CardFooter from './CardFooter.vue';
import CardHeader from './CardHeader.vue';
import CardTitle from './CardTitle.vue';
import Button from '../button/Button.vue';
import Input from '../input/Input.vue';
import Label from '../label/Label.vue';

const meta = {
  title: 'Components/Card',
  component: Card,
  tags: ['autodocs'],
  argTypes: {
    // Add props controls here
  },
  args: {
    // Add default props here
  },
} satisfies Meta<typeof Card>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: (args) => ({
    components: {
      Card,
      CardContent,
      CardDescription,
      CardFooter,
      CardHeader,
      CardTitle,
      Button,
      Input,
      Label,
    },
    setup() {
      return { args };
    },
    template: `
      <Card class="w-[350px]" v-bind="args">
        <CardHeader>
          <CardTitle>Create project</CardTitle>
          <CardDescription>Deploy your new project in one-click.</CardDescription>
        </CardHeader>
        <CardContent>
          <form>
            <div class="grid w-full items-center gap-4">
              <div class="flex flex-col space-y-1.5">
                <Label for="name">Name</Label>
                <Input id="name" placeholder="Name of your project" />
              </div>
            </div>
          </form>
        </CardContent>
        <CardFooter class="flex justify-between">
          <Button variant="outline">Cancel</Button>
          <Button>Deploy</Button>
        </CardFooter>
      </Card>
    `,
  }),
  args: {},
};
