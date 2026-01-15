<script setup lang="ts">
import type { NavItem, SharedData } from '@/types';
import { Link, usePage } from '@inertiajs/vue3';
import Icon from './Icon.vue';

interface Props {
  items: NavItem[];
  collapsed?: boolean;
  label?: string;
}

const props = withDefaults(defineProps<Props>(), {
  collapsed: false,
  label: 'Platform',
});

const page = usePage<SharedData>();

// Check if an item is active
const isActive = (item: NavItem): boolean => {
  return item.href === page.url || item.isActive === true;
};
</script>

<template>
  <nav class="space-y-1 px-2" aria-label="Main navigation">
    <p v-if="!collapsed && label" class="mb-2 px-2 text-xs font-semibold uppercase text-muted-foreground">
      {{ label }}
    </p>
    <Link
      v-for="item in items"
      :key="item.title"
      :href="item.href"
      :title="collapsed ? item.title : undefined"
      :aria-label="collapsed ? item.title : undefined"
      class="flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium transition-colors"
      :class="[
        isActive(item)
          ? 'bg-primary/10 text-primary'
          : 'text-muted-foreground hover:bg-muted hover:text-foreground',
        collapsed ? 'justify-center' : ''
      ]"
    >
      <Icon
        v-if="typeof item.icon === 'string'"
        :name="item.icon"
        class="size-5 shrink-0"
      />
      <component
        v-else-if="item.icon"
        :is="item.icon"
        class="size-5 shrink-0"
      />
      <span v-if="!collapsed">{{ item.title }}</span>
    </Link>
  </nav>
</template>
