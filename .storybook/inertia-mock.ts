/**
 * Inertia.js Mocks for Storybook
 *
 * This file provides mock data and components for testing Vue components
 * that depend on Inertia.js (usePage, useForm, Link, etc.)
 *
 * Usage in stories:
 * ```typescript
 * import { mockUser, mockSharedData } from '../../.storybook/inertia-mock';
 *
 * // Use mockUser for components expecting user data
 * const MyComponentMock = defineComponent({
 *   props: { user: { type: Object, default: () => mockUser } },
 *   // ...
 * });
 * ```
 *
 * For components using usePage() directly, create a mock version that
 * accepts the data as props instead. See write-component-tests.md skill.
 */

import { defineComponent, h, type Component } from 'vue';
import type { User, SharedData, NavItem } from '../src/types/index.d';

// Mock User for stories
export const mockUser: User = {
  id: 1,
  name: 'John Doe',
  email: 'john@example.com',
  avatar: undefined,
  email_verified_at: '2024-01-01T00:00:00.000Z',
  created_at: '2024-01-01T00:00:00.000Z',
  updated_at: '2024-01-01T00:00:00.000Z',
  permissions: ['view-dashboard', 'manage-settings'],
};

export const mockUserWithAvatar: User = {
  ...mockUser,
  avatar: 'https://i.pravatar.cc/150?u=john@example.com',
};

// Mock SharedData for components that use usePage()
export const mockSharedData: SharedData = {
  name: 'Craft App',
  quote: { message: 'Build something great', author: 'Craft Team' },
  auth: { user: mockUser },
  location: { current: '/dashboard', previous: '/' },
  navigation: {
    app: {
      default: '/dashboard',
      logout: '/logout',
      settings: '/settings',
      main: { items: [] },
      footer: { items: [] },
    },
  },
  sidebarOpen: true,
};

// Mock Inertia Link component for Storybook
export const MockLink: Component = defineComponent({
  name: 'MockLink',
  props: {
    href: { type: [String, Object], required: true },
    method: { type: String, default: 'get' },
    as: { type: String, default: 'a' },
    prefetch: { type: Boolean, default: false },
  },
  setup(props, { slots }) {
    return () => {
      const href = typeof props.href === 'string' ? props.href : props.href.url;
      return h(
        props.as === 'button' ? 'button' : 'a',
        {
          href: props.as === 'button' ? undefined : href,
          onClick: (e: Event) => {
            e.preventDefault();
            console.log(`[Mock Link] Navigation to: ${href} (method: ${props.method})`);
          },
        },
        slots.default?.()
      );
    };
  },
});

// Mock usePage for components that need it
export const createMockUsePage = (overrides: Partial<SharedData> = {}) => {
  const data = { ...mockSharedData, ...overrides };
  return () => ({
    props: data,
    url: data.location?.current || '/dashboard',
    component: 'Dashboard',
    version: '1.0.0',
  });
};

// Sample navigation items for stories
export const sampleNavItems: NavItem[] = [
  { title: 'Dashboard', href: '/dashboard' },
  { title: 'Projects', href: '/projects' },
  { title: 'Settings', href: '/settings' },
];

export const sampleFooterItems: NavItem[] = [
  { title: 'Documentation', href: 'https://docs.example.com' },
  { title: 'Support', href: 'https://support.example.com' },
];
