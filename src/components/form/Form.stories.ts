import type { Meta, StoryObj } from '@storybook/vue3';
import { Form, Field } from 'vee-validate';
import { FormItem, FormLabel, FormControl, FormDescription, FormMessage } from './index';
import { Input } from '@/components/input';
import { Button } from '@/components/button';
import { toTypedSchema } from '@vee-validate/zod';
import * as z from 'zod';

const meta = {
  title: 'Components/Form',
  component: Form,
  tags: ['autodocs'],
} satisfies Meta<typeof Form>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => ({
    components: { Form, Field, FormItem, FormLabel, FormControl, FormDescription, FormMessage, Input, Button },
    setup() {
      const formSchema = toTypedSchema(z.object({
        username: z.string().min(2).max(50),
      }));

      function onSubmit(values: any) {
        console.log('Form submitted:', values);
      }

      return { formSchema, onSubmit };
    },
    template: `
      <Form :validation-schema="formSchema" @submit="onSubmit">
        <Field name="username" v-slot="{ componentField }">
          <FormItem>
            <FormLabel>Username</FormLabel>
            <FormControl>
              <Input type="text" placeholder="shadcn" v-bind="componentField" />
            </FormControl>
            <FormDescription>
              This is your public display name.
            </FormDescription>
            <FormMessage />
          </FormItem>
        </Field>
        <Button type="submit" class="mt-4">
          Submit
        </Button>
      </Form>
    `,
  }),
};
