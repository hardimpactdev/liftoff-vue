import type { Meta, StoryObj } from '@storybook/vue3';
import Breadcrumb from './Breadcrumb.vue';
import BreadcrumbItem from './BreadcrumbItem.vue';
import BreadcrumbLink from './BreadcrumbLink.vue';
import BreadcrumbList from './BreadcrumbList.vue';
import BreadcrumbPage from './BreadcrumbPage.vue';
import BreadcrumbSeparator from './BreadcrumbSeparator.vue';
import BreadcrumbEllipsis from './BreadcrumbEllipsis.vue';

const meta = {
  title: 'Components/Breadcrumb',
  component: Breadcrumb,
  tags: ['autodocs'],
  argTypes: {
    // Add props controls here
  },
  args: {
    // Add default props here
  },
} satisfies Meta<typeof Breadcrumb>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: (args) => ({
    components: {
      Breadcrumb,
      BreadcrumbItem,
      BreadcrumbLink,
      BreadcrumbList,
      BreadcrumbPage,
      BreadcrumbSeparator,
      BreadcrumbEllipsis,
    },
    setup() {
      return { args };
    },
    template: `
      <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink href="/">Home</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbLink href="/components">Components</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbPage>Breadcrumb</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>
    `,
  }),
  args: {},
};
