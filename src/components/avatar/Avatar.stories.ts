import type { Meta, StoryObj } from '@storybook/vue3';
import { reactive, toRefs } from 'vue';
import Avatar from './Avatar.vue';
import AvatarImage from './AvatarImage.vue';
import AvatarFallback from './AvatarFallback.vue';

const meta = {
  title: 'Components/Avatar',
  component: Avatar,
  tags: ['autodocs'],
  subcomponents: { AvatarImage, AvatarFallback },
  argTypes: {
    src: {
      control: 'text',
      description: 'Image source URL',
    },
    alt: {
      control: 'text',
      description: 'Alt text for image',
    },
    fallback: {
      control: 'text',
      description: 'Fallback text (initials)',
    },
  },
  args: {
    src: 'https://github.com/shadcn.png',
    alt: '@shadcn',
    fallback: 'CN',
  },
  render: (args) => ({
    components: { Avatar, AvatarImage, AvatarFallback },
    setup() {
      return { args: toRefs(reactive(args)) };
    },
    template: `
      <Avatar>
        <AvatarImage :src="args.src" :alt="args.alt" />
        <AvatarFallback>{{ args.fallback }}</AvatarFallback>
      </Avatar>
    `,
  }),
} satisfies Meta<typeof Avatar>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {},
};

export const Fallback: Story = {
  args: {
    src: 'https://invalid-url.com/image.png', // Force fallback
    fallback: 'JD',
  },
};

