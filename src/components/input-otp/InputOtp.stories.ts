import type { Meta, StoryObj } from '@storybook/vue3';
import InputOTP from './InputOTP.vue';
import InputOTPGroup from './InputOTPGroup.vue';
import InputOTPSeparator from './InputOTPSeparator.vue';
import InputOTPSlot from './InputOTPSlot.vue';
import { ref } from 'vue';

const meta = {
  title: 'Components/InputOtp',
  component: InputOTP,
  tags: ['autodocs'],
  argTypes: {},
  args: {},
} satisfies Meta<typeof InputOTP>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: (args) => ({
    components: { InputOTP, InputOTPGroup, InputOTPSeparator, InputOTPSlot },
    setup() {
      const value = ref('');
      return { args, value };
    },
    template: `
      <div class="flex justify-center p-10">
        <InputOTP v-bind="args" v-model="value" :maxlength="6">
          <InputOTPGroup>
            <InputOTPSlot :index="0" />
            <InputOTPSlot :index="1" />
            <InputOTPSlot :index="2" />
          </InputOTPGroup>
          <InputOTPSeparator />
          <InputOTPGroup>
            <InputOTPSlot :index="3" />
            <InputOTPSlot :index="4" />
            <InputOTPSlot :index="5" />
          </InputOTPGroup>
        </InputOTP>
      </div>
    `,
  }),
  args: {
    maxlength: 6,
  },
};
