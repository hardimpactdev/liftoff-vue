import type { Meta, StoryObj } from '@storybook/vue3';
import { reactive, toRefs } from 'vue';
import Tree, { type TreeNode } from './Tree.vue';

const meta = {
  title: 'Components/Tree',
  component: Tree,
  tags: ['autodocs'],
  argTypes: {
    items: {
      control: 'object',
      description: 'The data for the tree.',
    },
    multiple: {
      control: 'boolean',
      description: 'Whether multiple items can be selected.',
    },
    modelValue: {
      control: 'object',
      description: 'The selected item(s).',
    },
    collapsedIcon: {
      control: 'text',
      description: 'Icon to show when folder is collapsed.',
    },
    expandedIcon: {
      control: 'text',
      description: 'Icon to show when folder is expanded.',
    },
    fileIcon: {
      control: 'text',
      description: 'Icon to show for file items.',
    },
    'update:modelValue': { action: 'update:modelValue' },
    'update:expanded': { action: 'update:expanded' },
    select: { action: 'select' },
  },
  args: {
    multiple: false,
    collapsedIcon: 'lucide:folder',
    expandedIcon: 'lucide:folder-open',
    fileIcon: 'lucide:file',
  },
  render: (args) => ({
    components: { Tree },
    setup() {
      return { args: toRefs(reactive(args)) };
    },
    template: '<Tree v-bind="args" @update:model-value="args[\'update:modelValue\']" @update:expanded="args[\'update:expanded\']" @select="args[\'select\']" />',
  }),
} satisfies Meta<typeof Tree>;

export default meta;
type Story = StoryObj<typeof meta>;

const sampleItems: TreeNode[] = [
  {
    id: '1',
    label: 'Documents',
    children: [
      { id: '1-1', label: 'Work', children: [
        { id: '1-1-1', label: 'Project A.docx' },
        { id: '1-1-2', label: 'Report.pdf' },
      ] },
      { id: '1-2', label: 'Personal', children: [
         { id: '1-2-1', label: 'Recipe.txt' },
      ] },
    ],
  },
  {
    id: '2',
    label: 'Images',
    children: [
      { id: '2-1', label: 'Vacation', children: [
        { id: '2-1-1', label: 'IMG_001.jpg' },
        { id: '2-1-2', label: 'IMG_002.jpg' },
      ]},
    ],
  },
  {
    id: '3',
    label: 'System',
    disabled: true,
    children: [
       { id: '3-1', label: 'Settings.ini' },
    ]
  }
];

export const Default: Story = {
  args: {
    items: sampleItems,
  },
};

