<script setup lang="ts">
import { ref, computed, onMounted, nextTick, useTemplateRef } from 'vue';
import {
  ToastRoot,
  ToastTitle,
  ToastDescription,
  ToastAction,
  ToastClose,
} from 'reka-ui';
import { cn } from '@/lib/utils';
import Icon from '@/components/Icon.vue';
import Button from '@nuxt/ui/components/Button.vue';

export interface ToastProps {
  as?: string;
  title?: string | object | (() => unknown);
  description?: string | object | (() => unknown);
  icon?: string;
  avatar?: object;
  color?: 'primary' | 'success' | 'info' | 'warning' | 'error' | 'neutral';
  orientation?: 'horizontal' | 'vertical';
  close?: boolean | object;
  closeIcon?: string;
  actions?: Array<{ label: string; click?: () => void; [key: string]: unknown }>;
  progress?: boolean | object;
  class?: string;
  ui?: Record<string, string>;
  defaultOpen?: boolean;
  open?: boolean;
  type?: 'foreground' | 'background';
  duration?: number;
}

const props = withDefaults(defineProps<ToastProps>(), {
  orientation: 'vertical',
  close: true,
  progress: true,
});

defineEmits<{
  escapeKeyDown: [];
  pause: [];
  resume: [];
  swipeStart: [];
  swipeMove: [];
  swipeCancel: [];
  swipeEnd: [];
  'update:open': [value: boolean];
}>();

const slots = defineSlots();

const iconColorClass = computed(() => {
  const colors: Record<string, string> = {
    primary: 'text-zinc-900 dark:text-white',
    success: 'text-green-500',
    info: 'text-blue-500',
    warning: 'text-orange-500',
    error: 'text-red-500',
    neutral: 'text-zinc-500',
  };
  return colors[props.color ?? 'neutral'] ?? colors.neutral;
});

const rootRef = useTemplateRef('rootRef');
const height = ref(0);

onMounted(() => {
  if (!rootRef.value) return;
  nextTick(() => {
    // Get the DOM element from the component reference
    const el = (rootRef.value as any)?.$el ?? rootRef.value;
    if (el && typeof el.getBoundingClientRect === 'function') {
      height.value = el.getBoundingClientRect()?.height ?? 0;
    }
  });
});

defineExpose({ height });
</script>

<template>
  <ToastRoot
    ref="rootRef"
    v-slot="{ remaining, duration: dur }"
    :as="as"
    :default-open="defaultOpen"
    :open="open"
    :duration="duration"
    :type="type"
    :data-orientation="orientation"
    data-slot="root"
    :class="
      cn(
        'relative flex gap-3 w-full p-4 overflow-hidden bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-lg shadow-lg pointer-events-auto',
        props.ui?.root,
        props.class
      )
    "
    :style="{ '--height': `${height}px` }"
    @escape-key-down="$emit('escapeKeyDown')"
    @pause="$emit('pause')"
    @resume="$emit('resume')"
    @swipe-start="$emit('swipeStart')"
    @swipe-move="$emit('swipeMove')"
    @swipe-cancel="$emit('swipeCancel')"
    @swipe-end="$emit('swipeEnd')"
    @update:open="$emit('update:open', $event)"
  >
    <slot name="leading">
      <span v-if="icon" :class="cn('shrink-0 size-5', iconColorClass, props.ui?.icon)">
        <Icon :name="icon" class="size-5" />
      </span>
    </slot>

    <div data-slot="wrapper" :class="cn('flex-1 flex flex-col gap-1 min-w-0', props.ui?.wrapper)">
      <ToastTitle
        v-if="title || !!slots.title"
        data-slot="title"
        :class="cn('text-sm font-medium text-zinc-900 dark:text-white', props.ui?.title)"
      >
        <slot name="title">
          <component :is="(title as () => unknown)()" v-if="typeof title === 'function'" />
          <component :is="title" v-else-if="typeof title === 'object'" />
          <template v-else>{{ title }}</template>
        </slot>
      </ToastTitle>

      <ToastDescription
        v-if="description || !!slots.description"
        data-slot="description"
        :class="cn('text-sm text-zinc-500 dark:text-zinc-400', props.ui?.description)"
      >
        <slot name="description">
          <component :is="(description as () => unknown)()" v-if="typeof description === 'function'" />
          <component :is="description" v-else-if="typeof description === 'object'" />
          <template v-else>{{ description }}</template>
        </slot>
      </ToastDescription>

      <div v-if="actions?.length" :class="cn('flex items-center gap-1.5 mt-2', props.ui?.actions)">
        <ToastAction
          v-for="(action, index) in actions"
          :key="index"
          :alt-text="action.label"
          as-child
        >
          <Button
            size="xs"
            :variant="index === 0 ? 'solid' : 'outline'"
            @click="action.click"
          >
            {{ action.label }}
          </Button>
        </ToastAction>
      </div>
    </div>

    <ToastClose v-if="close" as-child>
      <Button
        size="xs"
        variant="ghost"
        :icon="closeIcon || 'i-lucide-x'"
        aria-label="Close"
        :class="cn('absolute top-2 right-2', props.ui?.close)"
      />
    </ToastClose>

    <div
      v-if="progress && dur"
      :class="cn('absolute bottom-0 inset-x-0 h-1', props.ui?.progress)"
      :style="{ width: `${((remaining ?? 0) / (dur ?? 1)) * 100}%` }"
    >
      <div class="h-full bg-current opacity-20" />
    </div>
  </ToastRoot>
</template>
