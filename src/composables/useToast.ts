import { ref, getCurrentInstance, onMounted, onUnmounted, type Ref, type InjectionKey } from 'vue';

export const toastMaxInjectionKey: InjectionKey<Ref<number | undefined>> = Symbol('toastMax');

export interface Toast {
  id: string | number;
  title?: string;
  description?: string;
  icon?: string;
  avatar?: object;
  color?: 'primary' | 'success' | 'info' | 'warning' | 'error' | 'neutral';
  close?: boolean;
  duration?: number;
  actions?: Array<{ label: string; click?: () => void; [key: string]: unknown }>;
  onClick?: (toast: Toast) => void;
}

// Use window-level globals with CustomEvent for cross-module reactivity
// CustomEvent is a reliable browser API that works across module boundaries
declare global {
  interface Window {
    __CRAFT_TOASTS_DATA__?: Toast[];
    __CRAFT_TOAST_ID__?: number;
  }
}

const TOAST_UPDATE_EVENT = 'craft:toast-update';

// SSR fallback
const ssrToasts: Toast[] = [];
let ssrToastId = 0;

function getToastsData(): Toast[] {
  if (typeof window === 'undefined') {
    return ssrToasts;
  }
  if (!window.__CRAFT_TOASTS_DATA__) {
    window.__CRAFT_TOASTS_DATA__ = [];
  }
  return window.__CRAFT_TOASTS_DATA__;
}

function notifyUpdate(): void {
  if (typeof window !== 'undefined') {
    window.dispatchEvent(new CustomEvent(TOAST_UPDATE_EVENT));
  }
}

function generateId(): number {
  if (typeof window === 'undefined') {
    return ++ssrToastId;
  }
  if (window.__CRAFT_TOAST_ID__ === undefined) {
    window.__CRAFT_TOAST_ID__ = 0;
  }
  return ++window.__CRAFT_TOAST_ID__;
}

export function useToast() {
  // Local reactive ref that syncs with global data
  const toasts = ref<Toast[]>([...getToastsData()]);

  // Sync local ref with global data
  function syncFromGlobal() {
    toasts.value = [...getToastsData()];
  }

  // Listen for toast updates using CustomEvent (browser only)
  if (typeof window !== 'undefined') {
    const handler = () => syncFromGlobal();

    // Check if we're in a Vue component context
    const instance = getCurrentInstance();

    if (instance) {
      // In a component context, use lifecycle hooks for proper cleanup
      onMounted(() => {
        window.addEventListener(TOAST_UPDATE_EVENT, handler);
        // Sync immediately on mount to catch any toasts that were added before mount
        syncFromGlobal();
      });
      onUnmounted(() => {
        window.removeEventListener(TOAST_UPDATE_EVENT, handler);
      });
    } else {
      // Not in a component context (e.g., called from a click handler)
      // Just add the listener - it won't auto-cleanup but that's fine for transient use
      window.addEventListener(TOAST_UPDATE_EVENT, handler);
    }
  }

  function add(toast: Partial<Toast>): Toast {
    const id = toast.id ?? generateId();
    const newToast: Toast = {
      ...toast,
      id,
      close: toast.close ?? true,
    };
    const data = getToastsData();
    data.push(newToast);
    notifyUpdate();
    return newToast;
  }

  function update(id: string | number, toast: Omit<Partial<Toast>, 'id'>): void {
    const data = getToastsData();
    const index = data.findIndex((t) => t.id === id);
    const existing = data[index];
    if (index !== -1 && existing) {
      data[index] = { ...existing, ...toast, id: existing.id };
      notifyUpdate();
    }
  }

  function remove(id: string | number): void {
    const data = getToastsData();
    const index = data.findIndex((t) => t.id === id);
    if (index !== -1) {
      data.splice(index, 1);
      notifyUpdate();
    }
  }

  function clear(): void {
    const data = getToastsData();
    data.length = 0;
    notifyUpdate();
  }

  return {
    toasts,
    add,
    update,
    remove,
    clear,
  };
}
