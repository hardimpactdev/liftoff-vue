import type { Meta, StoryObj } from '@storybook/vue3';
import ButtonGroup from './ButtonGroup.vue';
import ButtonGroupSeparator from './ButtonGroupSeparator.vue';
import Button from '../button/Button.vue';
import { Bold, Italic, Underline } from 'lucide-vue-next';

const meta = {
  title: 'Components/ButtonGroup',
  component: ButtonGroup,
  tags: ['autodocs'],
  argTypes: {},
  args: {},
} satisfies Meta<typeof ButtonGroup>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: (args) => ({
    components: { ButtonGroup, ButtonGroupSeparator, Button, Bold, Italic, Underline },
    setup() {
      return { args };
    },
    template: `
      <div class="p-10 flex justify-center">
        <ButtonGroup v-bind="args">
            <Button variant="outline" size="icon">
                <Bold class="h-4 w-4" />
            </Button>
            <ButtonGroupSeparator />
            <Button variant="outline" size="icon">
                <Italic class="h-4 w-4" />
            </Button>
            <ButtonGroupSeparator />
            <Button variant="outline" size="icon">
                <Underline class="h-4 w-4" />
            </Button>
        </ButtonGroup>
      </div>
    `,
  }),
  args: {},
};
