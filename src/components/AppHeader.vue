<script setup lang="ts">
import { Link } from '@inertiajs/vue3';
import { Menu, Search } from 'lucide-vue-next';
import AppLogo from '@/components/AppLogo.vue';
import AppLogoIcon from '@/components/AppLogoIcon.vue';
import Breadcrumbs from '@/components/Breadcrumbs.vue';
import UserMenuContent from '@/components/UserMenuContent.vue';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/avatar';
import { Button } from '@/components/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from '@/components/dropdown-menu';
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuList,
  navigationMenuTriggerStyle,
} from '@/components/navigation-menu';
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/sheet';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/tooltip';
import { useInitials } from '@/composables/useInitials';
import type { BreadcrumbItem, NavItem, User } from '@/types';

const props = withDefaults(
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

const { getInitials } = useInitials();

const isActive = (href: string) => {
  if (!props.currentUrl) return false;
  return props.currentUrl === href || props.currentUrl.startsWith(href + '/');
};

const activeItemStyles = (href: string) => {
  return isActive(href)
    ? 'text-neutral-900 dark:bg-neutral-800 dark:text-neutral-100'
    : '';
};

const toUrl = (href: string) => {
  return typeof href === 'string' ? href : '#';
};
</script>

<template>
  <div>
    <div class="border-b border-sidebar-border/80">
      <div class="mx-auto flex h-16 items-center px-4 md:max-w-7xl">
        <!-- Mobile Menu -->
        <div class="lg:hidden">
          <Sheet>
            <SheetTrigger :as-child="true">
              <Button variant="ghost" size="icon" class="mr-2 h-9 w-9">
                <Menu class="h-5 w-5" />
              </Button>
            </SheetTrigger>
            <SheetContent side="left" class="w-[300px] p-6">
              <SheetTitle class="sr-only">Navigation Menu</SheetTitle>
              <SheetHeader class="flex justify-start text-left">
                <slot name="mobile-logo">
                  <AppLogoIcon class="size-6 fill-current text-black dark:text-white" />
                </slot>
              </SheetHeader>
              <div class="flex h-full flex-1 flex-col justify-between space-y-4 py-6">
                <nav class="-mx-3 space-y-1">
                  <Link
                    v-for="item in mainNavItems"
                    :key="item.title"
                    :href="item.href"
                    class="flex items-center gap-x-3 rounded-lg px-3 py-2 text-sm font-medium hover:bg-accent"
                    :class="activeItemStyles(item.href)"
                  >
                    <component v-if="item.icon" :is="item.icon" class="h-5 w-5" />
                    {{ item.title }}
                  </Link>
                </nav>
                <div class="flex flex-col space-y-4">
                  <a
                    v-for="item in rightNavItems"
                    :key="item.title"
                    :href="toUrl(item.href)"
                    target="_blank"
                    rel="noopener noreferrer"
                    class="flex items-center space-x-2 text-sm font-medium"
                  >
                    <component v-if="item.icon" :is="item.icon" class="h-5 w-5" />
                    <span>{{ item.title }}</span>
                  </a>
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </div>

        <Link :href="homeUrl" class="flex items-center gap-x-2">
          <slot name="logo">
            <AppLogo />
          </slot>
        </Link>

        <!-- Desktop Menu -->
        <div class="hidden h-full lg:flex lg:flex-1">
          <NavigationMenu class="ml-10 flex h-full items-stretch">
            <NavigationMenuList class="flex h-full items-stretch space-x-2">
              <NavigationMenuItem
                v-for="(item, index) in mainNavItems"
                :key="index"
                class="relative flex h-full items-center"
              >
                <Link
                  :class="[
                    navigationMenuTriggerStyle(),
                    activeItemStyles(item.href),
                    'h-9 cursor-pointer px-3',
                  ]"
                  :href="item.href"
                >
                  <component v-if="item.icon" :is="item.icon" class="mr-2 h-4 w-4" />
                  {{ item.title }}
                </Link>
                <div
                  v-if="isActive(item.href)"
                  class="absolute bottom-0 left-0 h-0.5 w-full translate-y-px bg-black dark:bg-white"
                />
              </NavigationMenuItem>
            </NavigationMenuList>
          </NavigationMenu>
        </div>

        <div class="ml-auto flex items-center space-x-2">
          <div class="relative flex items-center space-x-1">
            <Button
              v-if="showSearch"
              variant="ghost"
              size="icon"
              class="group h-9 w-9 cursor-pointer"
              @click="emit('search')"
            >
              <Search class="size-5 opacity-80 group-hover:opacity-100" />
            </Button>

            <div class="hidden space-x-1 lg:flex">
              <template v-for="item in rightNavItems" :key="item.title">
                <TooltipProvider :delay-duration="0">
                  <Tooltip>
                    <TooltipTrigger>
                      <Button
                        variant="ghost"
                        size="icon"
                        as-child
                        class="group h-9 w-9 cursor-pointer"
                      >
                        <a
                          :href="toUrl(item.href)"
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          <span class="sr-only">{{ item.title }}</span>
                          <component
                            :is="item.icon"
                            class="size-5 opacity-80 group-hover:opacity-100"
                          />
                        </a>
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>{{ item.title }}</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              </template>
            </div>
          </div>

          <DropdownMenu v-if="user">
            <DropdownMenuTrigger :as-child="true">
              <Button
                variant="ghost"
                size="icon"
                class="relative size-10 w-auto rounded-full p-1 focus-within:ring-2 focus-within:ring-primary"
              >
                <Avatar class="size-8 overflow-hidden rounded-full">
                  <AvatarImage
                    v-if="user.avatar"
                    :src="user.avatar"
                    :alt="user.name"
                  />
                  <AvatarFallback
                    class="rounded-lg bg-neutral-200 font-semibold text-black dark:bg-neutral-700 dark:text-white"
                  >
                    {{ getInitials(user.name) }}
                  </AvatarFallback>
                </Avatar>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" class="w-56">
              <UserMenuContent :user="user" />
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </div>

    <div
      v-if="breadcrumbs.length > 1"
      class="flex w-full border-b border-sidebar-border/70"
    >
      <div
        class="mx-auto flex h-12 w-full items-center justify-start px-4 text-neutral-500 md:max-w-7xl"
      >
        <Breadcrumbs :breadcrumbs="breadcrumbs" />
      </div>
    </div>
  </div>
</template>
