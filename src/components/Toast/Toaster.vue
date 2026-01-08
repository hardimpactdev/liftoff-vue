<script setup lang="ts">
import { ref, computed, toRef, provide } from 'vue';
import { ToastProvider, ToastViewport, ToastPortal, useForwardProps } from 'reka-ui';
import { reactivePick } from '@vueuse/core';
import { useToast, toastMaxInjectionKey } from '@/composables/useToast';
import { cn } from '@/lib/utils';
import Toast from './Toast.vue';

type Position =
  | 'top-left'
  | 'top-center'
  | 'top-right'
  | 'bottom-left'
  | 'bottom-center'
  | 'bottom-right';

interface Props {
  position?: Position;
  expand?: boolean;
  progress?: boolean;
  portal?: boolean | string;
  max?: number;
  class?: string;
  ui?: Record<string, string>;
  label?: string;
  duration?: number;
  disableSwipe?: boolean;
  swipeThreshold?: number;
}

const props = withDefaults(defineProps<Props>(), {
  position: 'bottom-right',
  expand: true,
  progress: true,
  portal: true,
  max: 5,
  duration: 5000,
});

defineSlots<{
  default?: () => unknown;
}>();

const { toasts, remove } = useToast();

provide(toastMaxInjectionKey, toRef(() => props.max));

const providerProps = useForwardProps(
  reactivePick(props, 'duration', 'label', 'swipeThreshold', 'disableSwipe')
);

const swipeDirection = computed(() => {
  switch (props.position) {
    case 'top-center':
      return 'up';
    case 'top-right':
    case 'bottom-right':
      return 'right';
    case 'bottom-center':
      return 'down';
    case 'top-left':
    case 'bottom-left':
      return 'left';
  }
  return 'right';
});

const positionClasses = computed(() => {
  const classes: Record<Position, string> = {
    'top-left': 'top-0 left-0 items-start',
    'top-center': 'top-0 left-1/2 -translate-x-1/2 items-center',
    'top-right': 'top-0 right-0 items-end',
    'bottom-left': 'bottom-0 left-0 items-start',
    'bottom-center': 'bottom-0 left-1/2 -translate-x-1/2 items-center',
    'bottom-right': 'bottom-0 right-0 items-end',
  };
  return classes[props.position];
});

function onUpdateOpen(value: boolean, id: string | number) {
  if (value) return;
  remove(id);
}

const hovered = ref(false);
const expanded = computed(() => props.expand || hovered.value);
const refs = ref<Array<{ height: number }>>([]);

function getOffset(index: number) {
  return refs.value.slice(index + 1).reduce((acc, { height: h }) => acc + h + 16, 0);
}
</script>

<template>
  <ToastProvider :swipe-direction="swipeDirection" v-bind="providerProps">
    <slot />

    <Toast
      v-for="(toast, index) of toasts"
      :key="toast.id"
      ref="refs"
      :open="true"
      :progress="progress"
      :title="toast.title"
      :description="toast.description"
      :icon="toast.icon as string"
      :avatar="toast.avatar"
      :color="(toast.color as 'primary' | 'success' | 'info' | 'warning' | 'error' | 'neutral')"
      :actions="(toast.actions as any)"
      :close="toast.close"
      :duration="toast.duration"
      :data-expanded="expanded"
      :data-front="!expanded && index === toasts.length - 1"
      :style="{
        '--index': index - toasts.length + toasts.length,
        '--before': toasts.length - 1 - index,
        '--offset': getOffset(index),
        '--scale': expanded ? '1' : 'calc(1 - var(--before) * var(--scale-factor))',
        '--translate': expanded
          ? 'calc(var(--offset) * var(--translate-factor))'
          : 'calc(var(--before) * var(--gap))',
        '--transform': 'translateY(var(--translate)) scale(var(--scale))',
      }"
      data-slot="base"
      :class="cn(props.ui?.base, (toast as any).onClick ? 'cursor-pointer' : undefined)"
      @update:open="onUpdateOpen($event, toast.id)"
      @click="(toast as any).onClick && (toast as any).onClick(toast)"
    />

    <ToastPortal :to="typeof portal === 'string' ? portal : undefined" :disabled="!portal">
      <ToastViewport
        data-slot="viewport"
        :class="
          cn(
            'fixed z-50 flex flex-col p-4 gap-4 w-full max-w-sm pointer-events-none',
            positionClasses,
            props.ui?.root,
            props.class
          )
        "
        @mouseenter="hovered = true"
        @mouseleave="hovered = false"
      />
    </ToastPortal>
  </ToastProvider>
</template>
