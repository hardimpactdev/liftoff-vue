<script setup lang="ts">
import Separator from './separator/Separator.vue'
import UserInfo from './UserInfo.vue'
import { LogOut, Settings } from 'lucide-vue-next'

defineProps<{
  user: any
  onSettings?: () => void
  onLogout?: () => void
}>()
</script>

<template>
  <div class="p-2">
    <div class="px-1 py-1.5 text-sm text-left flex items-center gap-2">
      <UserInfo :user="user" :show-email="true" />
    </div>
  </div>

  <Separator />

  <div class="p-1">
    <button
      class="flex w-full items-center gap-2 rounded-md px-2 py-1.5 text-sm hover:bg-muted"
      @click="onSettings"
    >
      <Settings class="h-4 w-4" />
      Settings
    </button>
  </div>

  <Separator />

  <div class="p-1">
    <button
      class="flex w-full items-center gap-2 rounded-md px-2 py-1.5 text-sm hover:bg-muted"
      @click="onLogout"
    >
      <LogOut class="h-4 w-4" />
      Log out
    </button>
  </div>
</template>
