<script setup lang="ts">
import { Link } from '@inertiajs/vue3';
import NavFooter from '@/components/NavFooter.vue';
import NavMain from '@/components/NavMain.vue';
import NavUser from '@/components/NavUser.vue';
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from '@/components/sidebar';
import AppLogo from '@/components/AppLogo.vue';
import type { NavItem, User } from '@/types';

withDefaults(
  defineProps<{
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
    mainNavItems: () => [],
    footerNavItems: () => [],
    homeUrl: '/',
  }
);
</script>

<template>
  <Sidebar collapsible="icon" variant="inset">
    <SidebarHeader>
      <SidebarMenu>
        <SidebarMenuItem>
          <SidebarMenuButton size="lg" as-child>
            <Link :href="homeUrl">
              <slot name="logo">
                <AppLogo />
              </slot>
            </Link>
          </SidebarMenuButton>
        </SidebarMenuItem>
      </SidebarMenu>
    </SidebarHeader>

    <SidebarContent>
      <NavMain :items="mainNavItems" />
    </SidebarContent>

    <SidebarFooter>
      <NavFooter :items="footerNavItems" />
      <NavUser v-if="user" :user="user" />
    </SidebarFooter>
  </Sidebar>
  <slot />
</template>
