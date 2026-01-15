import type { Meta, StoryObj } from '@storybook/vue3';
import Accordion from './Accordion.vue';
import AccordionContent from './AccordionContent.vue';
import AccordionItem from './AccordionItem.vue';
import AccordionTrigger from './AccordionTrigger.vue';

const meta = {
  title: 'Components/Accordion',
  component: Accordion,
  tags: ['autodocs'],
  argTypes: {
    // Add props controls here
  },
  args: {
    // Add default props here
  },
} satisfies Meta<typeof Accordion>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: (args) => ({
    components: { Accordion, AccordionContent, AccordionItem, AccordionTrigger },
    setup() {
      const items = [
        {
          value: 'item-1',
          title: 'Is it accessible?',
          content: 'Yes. It adheres to the WAI-ARIA design pattern.',
        },
        {
          value: 'item-2',
          title: 'Is it styled?',
          content: 'Yes. It comes with default styles that matches the other components\' aesthetic.',
        },
        {
          value: 'item-3',
          title: 'Is it animated?',
          content: 'Yes. It\'s animated by default, but you can disable it if you prefer.',
        },
      ];
      return { args, items };
    },
    template: `
      <Accordion type="single" collapsible class="w-full" v-bind="args">
        <AccordionItem v-for="item in items" :key="item.value" :value="item.value">
          <AccordionTrigger>{{ item.title }}</AccordionTrigger>
          <AccordionContent>
            {{ item.content }}
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    `,
  }),
  args: {
    type: 'single',
    collapsible: true,
  },
};
