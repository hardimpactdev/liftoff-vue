import type { Meta, StoryObj } from '@storybook/vue3';
import { reactive, toRefs } from 'vue';
import Table from './Table.vue';
import TableHeader from './TableHeader.vue';
import TableHead from './TableHead.vue';
import TableBody from './TableBody.vue';
import TableRow from './TableRow.vue';
import TableCell from './TableCell.vue';
import TableCaption from './TableCaption.vue';

const meta = {
  title: 'Components/Table',
  component: Table,
  tags: ['autodocs'],
  subcomponents: { TableHeader, TableHead, TableBody, TableRow, TableCell, TableCaption },
  argTypes: {
    caption: {
       control: 'text',
       description: 'Table caption text',
    },
  },
} satisfies Meta<typeof Table>;

export default meta;
type Story = StoryObj<typeof meta>;

const invoices = [
  {
    invoice: "INV001",
    paymentStatus: "Paid",
    totalAmount: "$250.00",
    paymentMethod: "Credit Card",
  },
  {
    invoice: "INV002",
    paymentStatus: "Pending",
    totalAmount: "$150.00",
    paymentMethod: "PayPal",
  },
  {
    invoice: "INV003",
    paymentStatus: "Unpaid",
    totalAmount: "$350.00",
    paymentMethod: "Bank Transfer",
  },
  {
    invoice: "INV004",
    paymentStatus: "Paid",
    totalAmount: "$450.00",
    paymentMethod: "Credit Card",
  },
  {
    invoice: "INV005",
    paymentStatus: "Paid",
    totalAmount: "$550.00",
    paymentMethod: "PayPal",
  },
]

export const Default: Story = {
  args: {
    caption: 'A list of your recent invoices.',
  },
  render: (args) => ({
    components: { Table, TableHeader, TableHead, TableBody, TableRow, TableCell, TableCaption },
    setup() {
      return { args: toRefs(reactive(args)), invoices };
    },
    template: `
      <Table>
        <TableCaption>{{ args.caption }}</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead class="w-[100px]">Invoice</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Method</TableHead>
            <TableHead class="text-right">Amount</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          <TableRow v-for="invoice in invoices" :key="invoice.invoice">
            <TableCell class="font-medium">{{ invoice.invoice }}</TableCell>
            <TableCell>{{ invoice.paymentStatus }}</TableCell>
            <TableCell>{{ invoice.paymentMethod }}</TableCell>
            <TableCell class="text-right">{{ invoice.totalAmount }}</TableCell>
          </TableRow>
        </TableBody>
      </Table>
    `,
  }),
};

