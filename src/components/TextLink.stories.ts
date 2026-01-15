import type { Meta, StoryObj } from '@storybook/vue3';
import { defineComponent, h, reactive, toRefs } from 'vue';

// Since we can't easily swap out the Inertia Link at runtime,
// we create a mock component that mimics the TextLink styling
const TextLinkMock = defineComponent({
  name: 'TextLinkMock',
  props: {
    href: { type: String, default: '#' },
  },
  setup(props, { slots }) {
    return () =>
      h(
        'a',
        {
          href: props.href,
          onClick: (e: Event) => {
            e.preventDefault();
            console.log(`[Mock TextLink] Navigation to: ${props.href}`);
          },
          class:
            'text-foreground underline decoration-neutral-300 underline-offset-4 transition-colors duration-300 ease-out hover:decoration-current! dark:decoration-neutral-500',
        },
        slots.default?.()
      );
  },
});

const meta: Meta<typeof TextLinkMock> = {
  title: 'Components/TextLink',
  component: TextLinkMock,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component:
          'A styled text link component that wraps Inertia\'s Link. Features subtle underline styling with smooth hover transitions. In production, this uses @inertiajs/vue3 Link for SPA navigation.',
      },
    },
  },
  argTypes: {
    href: {
      control: 'text',
      description: 'The URL to navigate to. Can be a string or an object with url and method properties.',
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    href: '/example',
  },
  render: (args) => ({
    components: { TextLinkMock },
    setup() {
      return { args: toRefs(reactive(args)) };
    },
    template: '<TextLinkMock v-bind="args">Click here</TextLinkMock>',
  }),
};

export const MultipleWords: Story = {
  args: {
    href: '/documentation',
  },
  render: (args) => ({
    components: { TextLinkMock },
    setup() {
      return { args: toRefs(reactive(args)) };
    },
    template: '<TextLinkMock v-bind="args">View the full documentation</TextLinkMock>',
  }),
};

export const InParagraph: Story = {
  args: {
    href: '/terms',
  },
  decorators: [
    () => ({
      template: '<div class="max-w-prose text-muted-foreground"><story /></div>',
    }),
  ],
  render: (args) => ({
    components: { TextLinkMock },
    setup() {
      return { args: toRefs(reactive(args)) };
    },
    template: `
      <p>
        By creating an account, you agree to our
        <TextLinkMock v-bind="args">Terms of Service</TextLinkMock>
        and acknowledge that you have read our
        <TextLinkMock href="/privacy">Privacy Policy</TextLinkMock>.
      </p>
    `,
  }),
};
