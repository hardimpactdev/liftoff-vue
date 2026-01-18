<script setup lang="ts">
import AppContent from '@/components/AppContent.vue';
import AppShell from '@/components/AppShell.vue';
import AppSidebar from '@/components/AppSidebar.vue';
import AppSidebarHeader from '@/components/AppSidebarHeader.vue';
import type { BreadcrumbItem, NavItem, User } from '@/types';

withDefaults(
  defineProps<{
    /** Breadcrumb items */
    breadcrumbs?: BreadcrumbItem[];
    /** Main navigation items */
    mainNavItems?: NavItem[];
    /** Footer navigation items */
    footerNavItems?: NavItem[];
    /** Current user */
    user?: User;
    /** Home/dashboard URL */
    homeUrl?: string;
  }>(),
  {
    breadcrumbs: () => [],
    mainNavItems: () => [],
    footerNavItems: () => [],
    homeUrl: '/',
  }
);
</script>

<template>
  <AppShell variant="sidebar">
    <AppSidebar
      :main-nav-items="mainNavItems"
      :footer-nav-items="footerNavItems"
      :user="user"
      :home-url="homeUrl"
    >
      <template #logo>
        <slot name="logo" />
      </template>
    </AppSidebar>
    <AppContent variant="sidebar" class="overflow-x-hidden">
      <AppSidebarHeader :breadcrumbs="breadcrumbs" />
      <slot />
    </AppContent>
  </AppShell>
</template>
