<script setup lang="ts">
import AppContent from '@/components/AppContent.vue';
import AppHeader from '@/components/AppHeader.vue';
import AppShell from '@/components/AppShell.vue';
import type { BreadcrumbItem, NavItem, User } from '@/types';

withDefaults(
  defineProps<{
    /** Breadcrumb items */
    breadcrumbs?: BreadcrumbItem[];
    /** Main navigation items */
    mainNavItems?: NavItem[];
    /** Right side navigation items (external links) */
    rightNavItems?: NavItem[];
    /** Current user */
    user?: User;
    /** Home/dashboard URL */
    homeUrl?: string;
    /** Current active URL for highlighting */
    currentUrl?: string;
    /** Show search button */
    showSearch?: boolean;
  }>(),
  {
    breadcrumbs: () => [],
    mainNavItems: () => [],
    rightNavItems: () => [],
    homeUrl: '/',
    showSearch: false,
  }
);

const emit = defineEmits<{
  search: [];
}>();
</script>

<template>
  <AppShell variant="header">
    <AppHeader
      :breadcrumbs="breadcrumbs"
      :main-nav-items="mainNavItems"
      :right-nav-items="rightNavItems"
      :user="user"
      :home-url="homeUrl"
      :current-url="currentUrl"
      :show-search="showSearch"
      @search="emit('search')"
    >
      <template #logo>
        <slot name="logo" />
      </template>
      <template #mobile-logo>
        <slot name="mobile-logo" />
      </template>
    </AppHeader>
    <AppContent>
      <slot />
    </AppContent>
  </AppShell>
</template>
