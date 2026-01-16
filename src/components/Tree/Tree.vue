<script setup lang="ts">
import { computed, ref } from 'vue';
import { TreeRoot, TreeItem as RekaTreeItem } from 'reka-ui';
import { cn } from '@/lib/utils';
import Icon from '../Icon.vue';
import type { TreeNode } from './types';

interface Props {
  items: TreeNode[];
  modelValue?: TreeNode | TreeNode[];
  expanded?: string[];
  multiple?: boolean;
  collapsedIcon?: string;
  expandedIcon?: string;
  fileIcon?: string;
  class?: string;
}

const props = withDefaults(defineProps<Props>(), {
  multiple: false,
  collapsedIcon: 'lucide:folder',
  expandedIcon: 'lucide:folder-open',
  fileIcon: 'lucide:file',
});

const emit = defineEmits<{
  'update:modelValue': [value: TreeNode | TreeNode[] | undefined];
  'update:expanded': [value: string[]];
  select: [node: TreeNode];
}>();

const internalSelected = ref<TreeNode | TreeNode[] | undefined>(props.modelValue);
const internalExpanded = ref<string[]>(getDefaultExpanded(props.items));

const selectedValue = computed({
  get: () => props.modelValue ?? internalSelected.value,
  set: (value) => {
    internalSelected.value = value;
    emit('update:modelValue', value);
  },
});

const expandedKeys = computed({
  get: () => props.expanded ?? internalExpanded.value,
  set: (value) => {
    internalExpanded.value = value;
    emit('update:expanded', value);
  },
});

function getDefaultExpanded(items: TreeNode[]): string[] {
  const expanded: string[] = [];
  for (const item of items) {
    if (item.defaultExpanded) {
      expanded.push(item.id);
    }
    if (item.children?.length) {
      expanded.push(...getDefaultExpanded(item.children));
    }
  }
  return expanded;
}

function getItemKey(item: TreeNode): string {
  return item.id;
}

function getItemChildren(item: TreeNode): TreeNode[] | undefined {
  return item.children;
}

function getNodeIcon(node: TreeNode, isExpanded: boolean): string {
  if (node.icon) return node.icon;
  if (node.children?.length) {
    return isExpanded ? props.expandedIcon : props.collapsedIcon;
  }
  return props.fileIcon;
}

function handleSelect(node: TreeNode) {
  emit('select', node);
}
</script>

<template>
  <TreeRoot
    v-model="selectedValue"
    v-model:expanded="expandedKeys"
    :items="items"
    :get-key="getItemKey"
    :get-children="getItemChildren"
    :multiple="multiple"
    :class="cn('text-sm', props.class)"
  >
    <template #default="{ flattenItems }">
      <div class="space-y-0.5">
        <RekaTreeItem
          v-for="item in flattenItems"
          :key="item._id"
          v-slot="{ isExpanded, isSelected }"
          :value="item.value"
          :level="item.level"
          as-child
        >
          <button
            type="button"
            :disabled="item.value.disabled"
            :class="cn(
              'flex w-full items-center gap-2 rounded-md px-2 py-1.5 text-left transition-colors',
              'hover:bg-muted focus:outline-none focus-visible:ring-2 focus-visible:ring-ring',
              isSelected && 'bg-muted',
              item.value.disabled && 'cursor-not-allowed opacity-50'
            )"
            :style="{ paddingLeft: `${(item.level - 1) * 16 + 8}px` }"
            @click="handleSelect(item.value)"
          >
            <Icon
              :name="getNodeIcon(item.value, isExpanded)"
              :class="cn(
                'size-4 shrink-0',
                item.value.children?.length ? 'text-primary' : 'text-muted-foreground'
              )"
            />
            <span class="truncate">{{ item.value.label }}</span>
            <Icon
              v-if="item.value.children?.length"
              :name="isExpanded ? 'lucide:chevron-down' : 'lucide:chevron-right'"
              class="ml-auto size-4 shrink-0 text-muted-foreground"
            />
          </button>
        </RekaTreeItem>
      </div>
    </template>
  </TreeRoot>
</template>
