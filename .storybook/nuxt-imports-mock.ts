import { reactive, ref, computed } from 'vue';

// Mock useAppConfig for Nuxt UI components that import from #imports
export function useAppConfig() {
  return reactive({
    ui: {
      colors: {
        primary: 'zinc',
        secondary: 'zinc',
        success: 'green',
        info: 'blue',
        warning: 'orange',
        error: 'red',
        neutral: 'zinc',
      },
      icons: {
        close: 'lucide:x',
      },
    },
  });
}

// Mock useNuxtApp
export function useNuxtApp() {
  return {
    $config: {
      public: {},
    },
  };
}

// Mock useRuntimeConfig
export function useRuntimeConfig() {
  return {
    public: {},
  };
}

// Mock useState
export function useState<T>(key: string, init?: () => T) {
  const state = ref(init?.());
  return state;
}

// Mock useCookie - returns a ref that persists to localStorage in browser
export function useCookie<T>(key: string, options?: { default?: () => T }) {
  const defaultValue = options?.default?.();
  const stored = typeof window !== 'undefined' ? localStorage.getItem(`cookie:${key}`) : null;
  const initial = stored ? JSON.parse(stored) : defaultValue;
  const cookie = ref<T>(initial);

  // Persist changes to localStorage
  if (typeof window !== 'undefined') {
    const originalValue = cookie.value;
    Object.defineProperty(cookie, 'value', {
      get() {
        return originalValue;
      },
      set(newValue) {
        localStorage.setItem(`cookie:${key}`, JSON.stringify(newValue));
        return newValue;
      },
    });
  }

  return cookie;
}

// Mock defineNuxtPlugin
export function defineNuxtPlugin(plugin: unknown) {
  return plugin;
}

// Mock useHead
export function useHead(_head: unknown) {
  // No-op in Storybook
}

// Mock useRoute
export function useRoute() {
  return reactive({
    path: '/',
    fullPath: '/',
    query: {},
    params: {},
    hash: '',
    name: 'index',
    matched: [],
    meta: {},
    redirectedFrom: undefined,
  });
}

// Mock useRouter
export function useRouter() {
  return {
    push: (to: unknown) => Promise.resolve(),
    replace: (to: unknown) => Promise.resolve(),
    go: (delta: number) => {},
    back: () => {},
    forward: () => {},
    currentRoute: computed(() => useRoute()),
    resolve: (to: unknown) => ({ href: '/', route: useRoute() }),
  };
}

// Mock useColorMode
export function useColorMode() {
  const preference = ref<'light' | 'dark' | 'system'>('system');
  const value = ref<'light' | 'dark'>('light');

  return reactive({
    preference,
    value,
    unknown: false,
    forced: false,
  });
}

// Mock clearError
export function clearError(_opts?: { redirect?: string }) {
  // No-op in Storybook
}

// Mock useRuntimeHook
export function useRuntimeHook(_hook: string, _fn: () => void) {
  // No-op in Storybook
}

// Mock useLocale - stub implementation for Storybook
export function useLocale() {
  return reactive({
    code: ref('en'),
    dir: ref('ltr'),
    t: (key: string, fallback?: string) => fallback || key,
  });
}

// Mock defineShortcuts - stub implementation for Storybook
export function defineShortcuts(_shortcuts: Record<string, unknown>) {
  // No-op in Storybook
}
