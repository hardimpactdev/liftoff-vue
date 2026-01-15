<script setup lang="ts">
import { useAppearance } from '@/composables/useAppearance';
import { Monitor, Moon, Sun } from 'lucide-vue-next';
import { ToggleGroup, ToggleGroupItem } from '@/components/toggle-group';

const { appearance, updateAppearance } = useAppearance();

const tabs = [
  { value: 'light', Icon: Sun, label: 'Light' },
  { value: 'dark', Icon: Moon, label: 'Dark' },
  { value: 'system', Icon: Monitor, label: 'System' },
] as const;
</script>

<template>
  <ToggleGroup type="single" :model-value="appearance" @update:model-value="(v: any) => v && updateAppearance(v)">
    <ToggleGroupItem
      v-for="{ value, Icon, label } in tabs"
      :key="value"
      :value="value"
      aria-label="label"
    >
      <component :is="Icon" class="mr-2 h-4 w-4" />
      {{ label }}
    </ToggleGroupItem>
  </ToggleGroup>
</template>
