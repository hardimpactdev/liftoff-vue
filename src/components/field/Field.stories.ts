import type { Meta, StoryObj } from '@storybook/vue3';
import Field from './Field.vue'; // Assuming generic Field wrapper if exists, or just use FieldSet
import FieldSet from './FieldSet.vue';
import FieldLegend from './FieldLegend.vue';
import FieldGroup from './FieldGroup.vue';
import FieldLabel from './FieldLabel.vue';
import FieldDescription from './FieldDescription.vue';
import FieldError from './FieldError.vue';
import Input from '../input/Input.vue'; // Assuming Input exists and is simple

// Field component likely acts as a form field wrapper.
// Based on file list: FieldContent, FieldDescription, FieldError, FieldGroup, FieldLabel, FieldLegend, FieldSeparator, FieldSet, FieldTitle, Field.
// I'll create a comprehensive form example.

const meta = {
  title: 'Components/Field',
  component: Field,
  tags: ['autodocs'],
  argTypes: {},
  args: {},
} satisfies Meta<typeof Field>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: (args) => ({
    components: { FieldSet, FieldLegend, FieldGroup, FieldLabel, FieldDescription, Input, FieldError },
    setup() {
      return { args };
    },
    template: `
      <div class="p-10 max-w-sm mx-auto">
        <FieldSet class="space-y-4">
            <FieldLegend>Profile Details</FieldLegend>
            <FieldGroup>
                <FieldLabel>Username</FieldLabel>
                <Input placeholder="Enter username" />
                <FieldDescription>This is your public display name.</FieldDescription>
            </FieldGroup>
            <FieldGroup>
                <FieldLabel>Email</FieldLabel>
                <Input placeholder="Enter email" />
                <FieldError>Email is invalid (Example error)</FieldError>
            </FieldGroup>
        </FieldSet>
      </div>
    `,
  }),
  args: {},
};
