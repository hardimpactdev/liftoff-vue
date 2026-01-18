<script setup lang="ts">
import { usePage } from '@inertiajs/vue3';
import { SidebarProvider } from '@/components/sidebar';
import type { SharedData } from '@/types';

interface Props {
  variant?: 'header' | 'sidebar';
}

defineProps<Props>();

// Get initial state from Inertia props, falling back to true if unavailable
const getInitialSidebarState = (): boolean => {
  try {
    const page = usePage<SharedData>();
    return page?.props?.sidebarOpen ?? true;
  } catch {
    return true;
  }
};

const isOpen = getInitialSidebarState();
</script>

<template>
  <div v-if="variant === 'header'" class="flex min-h-screen w-full flex-col">
    <slot />
  </div>
  <SidebarProvider v-else :default-open="isOpen">
    <slot />
  </SidebarProvider>
</template>
