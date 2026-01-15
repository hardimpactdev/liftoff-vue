<script setup lang="ts">
interface User {
  name?: string
  email?: string
  avatar?: string
}

defineProps<{
  user: User
  showEmail?: boolean
}>()
</script>

<template>
  <div class="flex items-center gap-2">
    <div v-if="user.avatar" class="h-8 w-8 overflow-hidden rounded-full">
      <img :src="user.avatar" alt="Avatar" class="h-full w-full object-cover">
    </div>
    <div v-else class="bg-muted flex h-8 w-8 items-center justify-center rounded-full">
      {{ user.name?.[0] || '?' }}
    </div>
    <div class="flex flex-col">
      <span class="font-medium">{{ user.name }}</span>
      <span v-if="showEmail" class="text-muted-foreground text-xs">{{ user.email }}</span>
    </div>
  </div>
</template>
