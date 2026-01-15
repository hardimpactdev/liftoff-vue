import type { Meta, StoryObj } from '@storybook/vue3';
import Pagination from './Pagination.vue';
import PaginationContent from './PaginationContent.vue';
import PaginationEllipsis from './PaginationEllipsis.vue';
import PaginationFirst from './PaginationFirst.vue';
import PaginationItem from './PaginationItem.vue';
import PaginationLast from './PaginationLast.vue';
import PaginationNext from './PaginationNext.vue';
import PaginationPrevious from './PaginationPrevious.vue';
import PaginationLink from './PaginationLink.vue';

const meta = {
  title: 'Components/Pagination',
  component: Pagination,
  tags: ['autodocs'],
  argTypes: {},
  args: {},
} satisfies Meta<typeof Pagination>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: (args) => ({
    components: {
      Pagination,
      PaginationContent,
      PaginationEllipsis,
      PaginationFirst,
      PaginationItem,
      PaginationLast,
      PaginationNext,
      PaginationPrevious,
      PaginationLink
    },
    setup() {
      return { args };
    },
    template: `
      <div class="p-10 flex justify-center">
        <Pagination :total="100" :sibling-count="1" show-edges :default-page="2" :items-per-page="10">
            <PaginationContent>
            <PaginationItem>
                <PaginationPrevious />
            </PaginationItem>
            <PaginationItem>
                <PaginationLink href="#">1</PaginationLink>
            </PaginationItem>
            <PaginationItem>
                <PaginationLink href="#" is-active>2</PaginationLink>
            </PaginationItem>
            <PaginationItem>
                <PaginationLink href="#">3</PaginationLink>
            </PaginationItem>
            <PaginationItem>
                <PaginationEllipsis />
            </PaginationItem>
            <PaginationItem>
                <PaginationNext />
            </PaginationItem>
            </PaginationContent>
        </Pagination>
      </div>
    `,
  }),
  args: {
    itemsPerPage: 10,
  },
};
