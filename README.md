# Craft UI

A Vue 3 component library for building clean, calm user interfaces. Built on top of [Nuxt UI](https://ui.nuxt.com) with additional layout, navigation, and data visualization components.

## Features

- **Layout Components** - Application shells, sidebars, and navigation
- **Kanban Board** - Drag-and-drop kanban with vue-draggable-plus
- **Command Palette** - Keyboard-driven command interface
- **Charts** - Chart.js integration with clean defaults
- **Vite Plugin** - Pre-configured setup for Laravel + Inertia apps
- **Dark Mode** - Full dark mode support across all components
- **TypeScript** - Fully typed components and utilities

## Installation

```bash
npm install @hardimpactdev/craft-ui
# or
bun add @hardimpactdev/craft-ui
```

## Quick Start

### Vite Configuration

Use the provided Vite configuration helper for Laravel + Inertia + Vue apps:

```typescript
// vite.config.ts
import { defineCraftConfig } from '@hardimpactdev/craft-ui/vite';

export default defineCraftConfig({
  laravel: {
    input: ['resources/js/app.ts'],
  },
});
```

This includes:
- Laravel Vite plugin
- Nuxt UI (components without U prefix)
- TailwindCSS v4
- Vue dev tools
- i18n support

### Import Styles

```typescript
// app.ts
import '@hardimpactdev/craft-ui/style.css';
```

## Components

### Layout

```vue
<script setup>
import { AppShell, AppSidebar, AppContent } from '@hardimpactdev/craft-ui';
</script>

<template>
  <AppShell>
    <AppSidebar>
      <!-- Navigation -->
    </AppSidebar>
    <AppContent>
      <!-- Page content -->
    </AppContent>
  </AppShell>
</template>
```

### Kanban Board

```vue
<script setup>
import {
  Kanban,
  KanbanColumn,
  KanbanColumnHeader,
  KanbanColumnCards,
  KanbanCard
} from '@hardimpactdev/craft-ui';
import { ref } from 'vue';

const todoCards = ref([
  { id: 1, title: 'Task 1' },
  { id: 2, title: 'Task 2' },
]);
</script>

<template>
  <Kanban>
    <KanbanColumn id="todo">
      <KanbanColumnHeader heading="To Do" :count="todoCards.length" />
      <KanbanColumnCards v-model="todoCards" group="kanban">
        <template #card="{ card }">
          <KanbanCard :id="card.id" :heading="card.title" />
        </template>
      </KanbanColumnCards>
    </KanbanColumn>
  </Kanban>
</template>
```

### Command Palette

```vue
<script setup>
import { CommandModal } from '@hardimpactdev/craft-ui';
import { ref } from 'vue';

const isOpen = ref(false);
const groups = [
  {
    id: 'actions',
    label: 'Actions',
    items: [
      { id: 'new', label: 'New Document', icon: 'i-lucide-plus' },
      { id: 'search', label: 'Search', icon: 'i-lucide-search' },
    ],
  },
];
</script>

<template>
  <CommandModal v-model:open="isOpen" :groups="groups" />
</template>
```

### Charts

```vue
<script setup>
import { ChartLine } from '@hardimpactdev/craft-ui';

const data = {
  labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
  datasets: [{
    label: 'Revenue',
    data: [30, 40, 35, 50, 55, 60],
  }],
};
</script>

<template>
  <ChartLine :data="data" class="h-64" />
</template>
```

## Available Components

### Layout
- `AppShell` - Application shell with sidebar support
- `AppSidebar` - Collapsible sidebar navigation
- `AppSidebarHeader` - Sidebar header with logo and collapse toggle
- `AppContent` - Main content area
- `NavMain` / `NavFooter` / `NavUser` - Navigation components
- `Breadcrumbs` - Breadcrumb navigation
- `UserInfo` - User avatar and info display
- `UserMenuContent` - User dropdown menu content

### Layouts (Full Page)
- `AppLayout` - Base application layout
- `AppSidebarLayout` - Application layout with sidebar
- `AuthSimpleLayout` - Simple authentication page layout
- `SettingsLayout` - Settings page layout

### Kanban
- `Kanban` - Main container
- `KanbanColumn` - Column wrapper
- `KanbanColumnHeader` - Header with title, count, badge
- `KanbanColumnCards` - Draggable cards container
- `KanbanColumnFooter` - Footer slot
- `KanbanCard` - Individual card

### Command
- `Command` - Standalone command palette
- `CommandModal` - Modal version (⌘K shortcut)

### Toast
- `Toaster` - Toast notification container
- `useToast` - Composable for triggering toasts

```vue
<script setup>
import { Toaster, useToast } from '@hardimpactdev/craft-ui';

const toast = useToast();

function showToast() {
  toast.add({
    title: 'Success!',
    description: 'Your changes have been saved.',
    color: 'success',
  });
}
</script>

<template>
  <Toaster />
  <Button @click="showToast">Show Toast</Button>
</template>
```

### Charts
- `Chart` - Generic chart component
- `ChartLine` - Line chart
- `ChartBar` - Bar chart
- `ChartArea` - Area chart
- `ChartPie` - Pie chart
- `ChartDoughnut` - Doughnut chart

### Form Components
- `Label` - Form field label
- `InputError` - Error message display for form inputs

### Typography
- `Heading` - Page heading component
- `HeadingSmall` - Smaller heading component
- `TextLink` - Styled link component

### Utilities
- `PlaceholderPattern` - SVG pattern for empty states
- `Icon` - Icon component wrapper
- `AppLogo` - Application logo component
- `AppLogoIcon` - Icon-only logo component
- `AppearanceTabs` - Theme/appearance toggle tabs
- `DeleteUser` - User account deletion component

## Composables

- `useAppearance` - Theme/appearance management
- `useInitials` - Generate initials from names
- `useLanguage` - Language/locale utilities
- `useToast` - Toast notification management

## Utilities

- `cn` - Class name helper (clsx + tailwind-merge)
- `__` - Translation helper (from laravel-vue-i18n)
- `can` - Permission check utility

## Nuxt UI Re-exports

The library re-exports commonly used Nuxt UI components:
- `Button`, `Input`, `Checkbox`, `Select`, `Textarea`, `FormField`

## Development

```bash
# Install dependencies
bun install

# Run Storybook
bun run storybook

# Build library
bun run build

# Run tests
bun vitest --project=storybook --run
```

## Documentation

Component documentation is available in Storybook. Run `bun run storybook` to explore components with live examples.

## License

[MIT](LICENSE)
