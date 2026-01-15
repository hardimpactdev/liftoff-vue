import type { Meta, StoryObj } from '@storybook/vue3';
import InputGroup from './InputGroup.vue';
import InputGroupAddon from './InputGroupAddon.vue';
import InputGroupInput from './InputGroupInput.vue';
import InputGroupText from './InputGroupText.vue';
import { Mail, Search } from 'lucide-vue-next';

const meta = {
  title: 'Components/InputGroup',
  component: InputGroup,
  tags: ['autodocs'],
  argTypes: {},
  args: {},
} satisfies Meta<typeof InputGroup>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: (args) => ({
    components: { InputGroup, InputGroupAddon, InputGroupInput, InputGroupText, Mail },
    setup() {
      return { args };
    },
    template: `
      <div class="flex flex-col gap-4 p-10 max-w-sm mx-auto">
        <InputGroup>
          <InputGroupAddon>
            <Mail class="h-4 w-4" />
          </InputGroupAddon>
          <InputGroupInput placeholder="Email" />
        </InputGroup>

        <InputGroup>
          <InputGroupAddon>@</InputGroupAddon>
          <InputGroupInput placeholder="Username" />
        </InputGroup>

        <InputGroup>
          <InputGroupInput placeholder="Search..." />
          <InputGroupAddon>
             <span class="text-xs text-muted-foreground">⌘K</span>
          </InputGroupAddon>
        </InputGroup>
      </div>
    `,
  }),
  args: {},
};
