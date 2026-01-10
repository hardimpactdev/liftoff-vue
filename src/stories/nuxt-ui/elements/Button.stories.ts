import type { Meta, StoryObj } from '@storybook/vue3';
import Button from '@nuxt/ui/components/Button.vue';

const meta: Meta<typeof Button> = {
  title: 'Nuxt UI/Elements/Button',
  component: Button,
  tags: ['autodocs'],
};
export default meta;
type Story = StoryObj<typeof Button>;

export const Default: Story = {
  render: () => ({
    components: { Button },
    template: `<Button>Click me</Button>`,
  }),
};

export const Colors: Story = {
  render: () => ({
    components: { Button },
    template: `
      <div class="flex items-center gap-2">
        <Button color="primary" variant="solid">Primary</Button>
        <Button color="secondary" variant="solid">Secondary</Button>
        <Button color="success" variant="solid">Success</Button>
        <Button color="info" variant="solid">Info</Button>
        <Button color="warning" variant="solid">Warning</Button>
        <Button color="error" variant="solid">Error</Button>
        <Button color="danger" variant="solid">Danger</Button>
        <Button color="neutral" variant="solid">Neutral</Button>
      </div>
    `,
  }),
};

export const Variants: Story = {
  render: () => ({
    components: { Button },
    template: `
      <div class="flex items-center gap-2">
        <Button variant="solid">Solid</Button>
        <Button variant="soft">Soft</Button>
        <Button variant="subtle">Subtle</Button>
        <Button variant="outline">Outline</Button>
        <Button variant="ghost">Ghost</Button>
        <Button variant="link">Link</Button>
      </div>
    `,
  }),
};

export const Sizes: Story = {
  render: () => ({
    components: { Button },
    template: `
      <div class="flex items-center gap-2">
        <Button size="xs">Extra Small</Button>
        <Button size="sm">Small</Button>
        <Button size="md">Medium</Button>
        <Button size="lg">Large</Button>
        <Button size="xl">Extra Large</Button>
      </div>
    `,
  }),
};

export const WithIcon: Story = {
  render: () => ({
    components: { Button },
    template: `
      <div class="flex items-center gap-2">
        <Button icon="i-lucide-plus">Add Item</Button>
        <Button icon="i-lucide-download" trailing>Download</Button>
        <Button icon="i-lucide-settings" aria-label="Settings" />
      </div>
    `,
  }),
};

export const Loading: Story = {
  render: () => ({
    components: { Button },
    template: `
      <div class="flex items-center gap-2">
        <Button loading>Loading</Button>
        <Button loading loading-auto aria-label="Loading" />
      </div>
    `,
  }),
};

export const Disabled: Story = {
  render: () => ({
    components: { Button },
    template: `
      <div class="flex items-center gap-2">
        <Button disabled>Disabled</Button>
        <Button disabled variant="outline">Disabled Outline</Button>
        <Button disabled variant="soft">Disabled Soft</Button>
      </div>
    `,
  }),
};
