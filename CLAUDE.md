This is a Storybook project which manages the Liftoff UI library. The library provides Vue.js components, composables, and utilities for rapidly building user interfaces with the Liftoff stack.

## Design Principles

Liftoff UI follows a set of design principles emphasizing calm, clean interfaces that don't overwhelm users.

### 1. Calm Over Loud

Interfaces should feel quiet and professional. Avoid visual noise.

- **Subtle shadows** - Use `shadow-xs` (0 1px 2px rgba(0,0,0,0.05)) instead of heavy drop shadows
- **Soft borders** - Light zinc borders (zinc-200/zinc-300) that define without dominating
- **No shadows in dark mode** - Dark interfaces feel cleaner without shadows
- **Muted colors** - Zinc neutrals over pure blacks/whites

### 2. Simplicity Over Complexity

Every element should earn its place. Remove anything that doesn't serve a purpose.

- **Single responsibility** - Each component does one thing well
- **Minimal variants** - Only add variants when there's a clear use case
- **Consistent patterns** - Same spacing, same radii, same shadows across components
- **Whitespace is design** - Let elements breathe; don't cram

### 3. Hierarchy Through Subtlety

Guide user attention without shouting.

- **Weight over color** - Use font-weight and size before reaching for color
- **Progressive disclosure** - Show what's needed, hide complexity
- **Intentional contrast** - Primary actions stand out; secondary fades back
- **Depth through borders** - Prefer borders over shadows for separation

### 4. Consistency Is Trust

Users shouldn't have to learn your UI twice.

- **Unified sizing** - Base height of 40px (h-10) for buttons, inputs, selects
- **Shared radii** - rounded-lg (8px) for containers, rounded-md (6px) for smaller elements
- **Predictable spacing** - Use Tailwind's spacing scale consistently
- **Same interactions** - Hover states, focus rings, transitions feel identical

### 5. Details Matter

Polish separates good from great.

- **Inset highlights** - Solid buttons get subtle top highlights for depth
- **Darker bottom borders** - Inputs have slightly darker bottom borders for grounding
- **Smooth transitions** - 150ms transitions for state changes
- **Accessible focus** - Clear, consistent focus rings for keyboard navigation

### Visual Reference

| Property | Value | Usage |
|----------|-------|-------|
| Base height | 40px (h-10) | Buttons, inputs, selects |
| Small height | 32px (h-8) | Compact variants |
| XS height | 24px (h-6) | Tags, small buttons |
| Base radius | 8px (rounded-lg) | Cards, modals, buttons |
| Small radius | 6px (rounded-md) | Inputs, badges |
| Card radius | 12px (rounded-xl) | Cards, modals |
| Shadow | 0 1px 2px rgba(0,0,0,0.05) | Inputs, selects, outline buttons |
| Inset shadow | inset 0 1px white/20 | All solid button variants |
| Border color | zinc-200 (light) / zinc-700 (dark) | Inputs, selects, cards |
| Bottom border | zinc-300 (light) | Inputs, selects (darker bottom) |
| Select padding-right | 40px (pe-10) | Space for chevron icon |
| Primary color | zinc-800 (light) / white (dark) | Solid buttons, links |

## Technologies Used

### Nuxt UI

UI components are provided by [Nuxt UI](https://ui.nuxt.com). Components are auto-imported without the `U` prefix when using the Vite plugin.

**IMPORTANT: Avoid Nuxt-specific composables**

This library runs outside of Nuxt (in Storybook and Laravel/Inertia apps). Do NOT use Nuxt-specific composables like:
- `useLocale` - Use `laravel-vue-i18n` or plain i18n instead
- `useNuxtApp`, `useRuntimeConfig`, `useState` - Not available outside Nuxt
- `defineShortcuts` - Not available outside Nuxt

For Storybook compatibility, these are stubbed in `.storybook/nuxt-imports-mock.ts` but should never be used in actual component code.

### Storybook

Storybook v10 is being used for component documentation and development.

#### Disabling the Onboarding Checklist

Storybook 10.1 includes a checklist-based onboarding widget in the sidebar. There is no official configuration option to disable it. The checklist state is stored in `~/.storybook/settings.json` and managed at runtime via `window.__STORYBOOK_API__.internal_checklistStore`.

To disable it, all checklist items must be marked as `"skipped"` or `"done"`. Run this in the browser console:

```javascript
const api = window.__STORYBOOK_API__;
const store = api.internal_universalChecklistStore;
const openItems = Object.entries(store.getState().items)
  .filter(([_, v]) => v.status === 'open')
  .map(([k]) => k);
openItems.forEach(item => api.internal_checklistStore.skip(item));
```

This persists to `~/.storybook/settings.json` and the widget will remain hidden.

### Vue 3

All components and composables are written in Vue 3 with composition API.

### TypeScript

The components and composables use TypeScript.

### TailwindCSS 4

TailwindCSS v4 is being used.

### Runtime

The bun runtime is being used instead of node.

## Structure

- `./src/components` - Custom liftoff components (navigation, layouts, etc.)
- `./src/composables` - Vue composables (useAppearance, useInitials, useLanguage)
- `./src/layouts` - Layout components for apps
- `./src/vite` - Vite plugin configuration
- `./src/lib` - Utility functions (cn, __, can)
- `./src/stories` - Nuxt UI component stories
- `./.storybook` - Storybook configuration and mocks
- `index.ts` - Main exports

## Testing

Component tests run via Storybook's Vitest addon with Playwright browser provider.

### Running Tests

```bash
# Run all component tests
bun vitest --project=storybook --run

# Run specific story file
bun vitest --project=storybook --run src/components/MyComponent.stories.ts

# Run in watch mode
bun vitest --project=storybook
```

### Key Files

| File | Purpose |
|------|---------|
| `vitest.config.ts` | Vitest configuration with Storybook project |
| `.storybook/vitest.setup.ts` | Test setup file |
| `.storybook/inertia-mock.ts` | Mock data for Inertia-dependent components |
| `.storybook/nuxt-link-mock.ts` | Mock NuxtLink for Storybook |
| `.storybook/preview.ts` | Global setup with vue-router mock |

### Storybook Mocks

**Vue Router**: Storybook includes a mock vue-router (`createMemoryHistory`) in `preview.ts` because Nuxt UI's `<Link>` component uses `useRoute()` internally. This is set up globally - no action needed in stories.

**Inertia**: Components using `usePage()` or `useForm()` from Inertia need special handling:
- Components like `AppShell` have been made defensive - they check for injected state first, then try `usePage()` with a fallback
- For other components, create mock versions in the story file that accept props instead
- See `.claude/skills/write-component-tests.md` for patterns

### Available Mocks

Import from `.storybook/inertia-mock.ts`:
- `mockUser` / `mockUserWithAvatar` - User objects
- `mockSharedData` - Full SharedData with navigation, auth
- `sampleNavItems` / `sampleFooterItems` - Navigation items

### Accessibility Guidelines

When creating new components, apply aria labels for screen reader support:

- **Icon-only buttons**: Always add `aria-label` describing the action
  ```vue
  <Button icon="i-lucide-x" aria-label="Close dialog" />
  ```
- **Interactive elements**: Ensure visible text or `aria-label` is present
- **Form inputs**: Use `<label>` elements or `aria-label` for inputs without visible labels
- **Images**: Add `alt` text for meaningful images, empty `alt=""` for decorative ones

## UI Components

This package uses Nuxt UI for UI primitives. Components are auto-imported in consuming apps via the Vite plugin:

```vue
<template>
  <!-- No import needed, components are auto-imported -->
  <Button>Click me</Button>
  <Card>
    <Input v-model="value" />
  </Card>
</template>
```

See [Nuxt UI documentation](https://ui.nuxt.com) for available components.

## Vite Plugin

The package provides a Vite configuration helper for Laravel + Inertia + Vue apps:

```typescript
// vite.config.ts
import { defineLiftoffConfig } from '@hardimpactdev/liftoff-vue/vite';

export default defineLiftoffConfig({
  laravel: {
    input: ['resources/js/app.ts'],
  },
});
```

The plugin includes:
- Laravel Vite plugin
- Nuxt UI plugin (components without U prefix)
- TailwindCSS
- Vue dev tools
- i18n support

## Custom Components

Liftoff provides custom components built on top of Nuxt UI:

### Layout Components
- **AppShell** - Application shell with sidebar support
- **AppSidebar** - Collapsible sidebar navigation
- **AppContent** - Main content area
- **NavMain** / **NavFooter** / **NavUser** - Navigation components
- **Breadcrumbs** - Breadcrumb navigation
- **UserInfo** - User avatar and info display

### Kanban Components
Drag-and-drop kanban board powered by vue-draggable-plus.

- **Kanban** - Main container for columns
- **KanbanColumn** - Column wrapper
- **KanbanColumnHeader** - Header with title, count, badge
- **KanbanColumnCards** - Draggable cards container (use v-model)
- **KanbanColumnFooter** - Footer slot
- **KanbanCard** - Individual card (can be `as="button"` for clickable)

```vue
<Kanban>
  <KanbanColumn id="todo">
    <KanbanColumnHeader heading="To Do" :count="3" badge="New" />
    <KanbanColumnCards v-model="todoCards" group="kanban">
      <template #card="{ card }">
        <KanbanCard :id="card.id" :heading="card.title" />
      </template>
    </KanbanColumnCards>
  </KanbanColumn>
</Kanban>
```

### Command Components
Command palette wrapper around Nuxt UI's CommandPalette.

- **Command** - Standalone command palette
- **CommandModal** - Modal version with keyboard shortcut (⌘K)

```vue
<CommandModal v-model:open="isOpen" :groups="groups" @select="handleSelect" />
```

### Chart Components
Chart.js integration with Liftoff-style defaults.

- **Chart** - Generic chart (type: line, bar, area, pie, doughnut)
- **ChartLine** - Line chart
- **ChartBar** - Bar chart
- **ChartArea** - Area chart (line with fill)
- **ChartPie** - Pie chart
- **ChartDoughnut** - Doughnut chart

```vue
<ChartLine :data="{ labels: ['Jan', 'Feb'], datasets: [{ data: [10, 20] }] }" class="h-64" />
```

### Utility Components

- **PlaceholderPattern** - SVG diagonal line pattern for placeholder/empty content areas

**Important**: PlaceholderPattern uses `absolute inset-0` positioning. Parent containers must have `relative` and `overflow-hidden` to contain it properly:

```vue
<div class="relative overflow-hidden rounded-xl bg-muted/50">
  <PlaceholderPattern />
</div>
```

## Customizing Nuxt UI Components

The theme uses a clean, modern design with subtle borders and zinc neutrals.

### Architecture Overview

Nuxt UI theming involves three layers:

1. **Nuxt UI Plugin Config** (`src/vite/defineLiftoffConfig.ts` & `.storybook/main.ts`)
2. **CSS Variables** (`src/theme.css`)
3. **Component Overrides** (`src/style.css`)

### Understanding Nuxt UI Component Structure

Nuxt UI components use `data-slot` attributes and ARIA roles to identify parts. The key selectors are:

| Selector | Element | Used In |
|----------|---------|---------|
| `[data-slot="base"]` | Main interactive element | Button, Input, Checkbox, Radio |
| `[data-slot="root"]` | Wrapper container | Input, Checkbox, Card |
| `[data-slot="content"]` | Content container | Tooltip, Modal, Menu, Dropdown |
| `[data-slot="label"]` | Label element | Form fields |
| `[data-slot="item"]` | List items | Menu, Select |
| `[role="combobox"]` | Select trigger button | Select component |
| `[role="listbox"]` | Dropdown options container | Select dropdown |
| `[role="option"]` | Individual options | Select options |
| `.bg-primary`, `.bg-success`, etc. | Color variant classes | Solid buttons |
| `.bg-default` | Default background | Cards, dropdowns |
| `.rounded-sm` | Small radius (checkbox) | Checkbox |
| `.rounded-full` | Full radius (radio) | Radio, Switch |

### 1. Nuxt UI Plugin Configuration

Configure semantic colors in the Vite plugin. All semantic colors must be mapped to available Tailwind color palettes:

```typescript
// src/vite/defineLiftoffConfig.ts
ui({
  prefix: '',
  inertia: true,
  ui: {
    colors: {
      primary: 'zinc',      // Main action color (dark zinc buttons)
      secondary: 'zinc',    // Secondary actions (medium gray)
      success: 'green',     // Success states
      info: 'blue',         // Informational states
      warning: 'orange',    // Warning states
      error: 'red',         // Error states
      neutral: 'zinc',      // Neutral/default color
    },
  },
}),
```

**Available color palettes** (TailwindCSS v4 default): `blue`, `gray`, `green`, `orange`, `purple`, `red`, `zinc`

**Note:** Colors like `emerald`, `amber`, `sky` are NOT available by default in Tailwind v4. Use the base colors above.

### 2. Nuxt UI CSS Variables

Override Nuxt UI's internal variables in `src/style.css`:

```css
@layer theme {
  :host, :root, .light {
    /* Border colors */
    --ui-border: oklch(0.92 0.004 286.32);        /* Main border (zinc-200) */
    --ui-border-muted: oklch(0.94 0.002 286.32);  /* Subtle borders */
    --ui-border-accented: oklch(0.87 0.006 286);  /* Emphasized (bottom borders, zinc-300) */

    /* Background colors */
    --ui-bg: oklch(1 0 0);                        /* white */
    --ui-bg-muted: oklch(0.985 0.004 286.32);     /* zinc-50 */
    --ui-bg-elevated: oklch(1 0 0);               /* white */
    --ui-bg-accented: oklch(0.967 0.001 286.375); /* zinc-100 (hover states) */
    --ui-bg-inverted: oklch(0.274 0.006 286.033); /* zinc-800 */

    /* Text colors */
    --ui-text: oklch(0.141 0.005 285.823);        /* zinc-950 */
    --ui-text-muted: oklch(0.552 0.016 285.938);  /* zinc-500 */
    --ui-text-dimmed: oklch(0.705 0.015 286.067); /* zinc-400 (placeholder) */
    --ui-text-highlighted: oklch(0.141 0.005 285.823); /* zinc-950 */
    --ui-text-inverted: oklch(1 0 0);             /* white */

    /* Color mappings for bg-default class (dropdowns, popovers) */
    --color-default: oklch(1 0 0);                /* white */

    /* Radius */
    --ui-radius: 0.5rem;  /* Base radius (8px) */
  }

  .dark {
    /* Borders */
    --ui-border: oklch(0.370 0.013 285.805);      /* zinc-700 */
    --ui-border-muted: oklch(0.32 0.008 286);
    --ui-border-accented: oklch(0.455 0.014 285.82); /* zinc-600 */

    /* Backgrounds */
    --ui-bg: oklch(0.141 0.005 285.823);          /* zinc-950 */
    --ui-bg-muted: oklch(0.210 0.006 285.885);    /* zinc-900 */
    --ui-bg-elevated: oklch(0.274 0.006 286.033); /* zinc-800 */
    --ui-bg-accented: oklch(0.370 0.013 285.805); /* zinc-700 */
    --ui-bg-inverted: oklch(0.985 0.004 286.32);  /* zinc-50 */

    /* Text colors */
    --ui-text: oklch(0.985 0.004 286.32);         /* zinc-50 */
    --ui-text-muted: oklch(0.705 0.015 286.067);  /* zinc-400 */
    --ui-text-dimmed: oklch(0.552 0.016 285.938); /* zinc-500 */
    --ui-text-highlighted: oklch(1 0 0);          /* white */
    --ui-text-inverted: oklch(0.141 0.005 285.823); /* zinc-950 */

    /* Color mappings for bg-default class */
    --color-default: oklch(0.274 0.006 286.033);  /* zinc-800 */
  }
}
```

### 3. Component-Specific Styling

Target Nuxt UI components using `data-slot` attributes and class selectors:

#### Buttons

```css
/* All buttons - base sizing */
button[data-slot="base"] {
  min-height: 2.5rem;           /* 40px - Liftoff base height */
  padding-left: 1rem;           /* px-4 */
  padding-right: 1rem;
  border-radius: 0.5rem;        /* rounded-lg */
  font-weight: 500;             /* font-medium */
}

/* Solid variant - inset highlight for ALL color variants */
button[data-slot="base"].bg-primary,
button[data-slot="base"].bg-secondary,
button[data-slot="base"].bg-success,
button[data-slot="base"].bg-warning,
button[data-slot="base"].bg-error,
button[data-slot="base"].bg-info,
button[data-slot="base"].bg-neutral,
button[data-slot="base"].bg-inverted {
  box-shadow:
    inset 0px 1px 0px 0px rgba(255, 255, 255, 0.2),
    0 1px 2px 0 rgba(0, 0, 0, 0.05);
  border: 1px solid rgba(0, 0, 0, 0.1);
}

/* Outline variant - subtle shadow */
button[data-slot="base"].ring-accented {
  box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.05);
}

/* Dark mode - no shadows on any solid button */
.dark button[data-slot="base"].bg-primary,
.dark button[data-slot="base"].bg-secondary,
.dark button[data-slot="base"].bg-success,
.dark button[data-slot="base"].bg-warning,
.dark button[data-slot="base"].bg-error,
.dark button[data-slot="base"].bg-info,
.dark button[data-slot="base"].bg-neutral,
.dark button[data-slot="base"].bg-inverted {
  box-shadow: none;
  border: none;
}
```

#### Inputs

```css
input[data-slot="base"],
textarea[data-slot="base"] {
  min-height: 2.5rem;           /* 40px */
  border-radius: 0.5rem;        /* rounded-lg */
  box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.05);
  border: 1px solid var(--ui-border);
  border-bottom-color: var(--ui-border-accented); /* Darker bottom */
}

.dark input[data-slot="base"] {
  box-shadow: none;
  border-bottom-color: var(--ui-border);
}
```

#### Checkboxes

```css
/* Checkboxes use rounded-sm class */
button[data-slot="base"].rounded-sm {
  width: 1.125rem;              /* 18px - Liftoff size */
  height: 1.125rem;
  border-radius: 0.3rem;        /* Liftoff rounded-[.3rem] */
  box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.05);
  border: 1px solid oklch(0.752 0.012 285.895); /* zinc-300 */
}

/* Checked state */
button[data-slot="base"].rounded-sm.bg-primary {
  box-shadow: none;
  border-color: transparent;
}
```

#### Cards

```css
div[data-slot="root"].rounded-lg,
div[data-slot="root"].border,
div[data-slot="root"].bg-default {
  border-radius: 0.75rem;       /* rounded-xl */
  box-shadow: none;             /* No shadow */
  border: 1px solid var(--ui-border) !important; /* Visible border */
}

.dark div[data-slot="root"].rounded-lg,
.dark div[data-slot="root"].border {
  border-color: oklch(1 0 0 / 0.1) !important; /* white/10 */
}
```

#### Select/Dropdown

```css
/* Select trigger - uses role="combobox" */
button[data-slot="base"][role="combobox"],
button[data-slot="base"][aria-haspopup="listbox"],
button[data-slot="base"][aria-haspopup="menu"] {
  min-height: 2.5rem;
  border-radius: 0.5rem;
  box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.05) !important;
  border: 1px solid var(--ui-border) !important;
  border-bottom-color: var(--ui-border-accented) !important;
  padding-left: 0.75rem !important;
  padding-right: 2.5rem !important; /* pe-10 = 40px for chevron space */
}

/* Dropdown content - light background */
[data-slot="content"].bg-default,
[role="listbox"].bg-default {
  background-color: var(--ui-bg) !important;
  color: var(--ui-text) !important;
  border: 1px solid var(--ui-border) !important;
}

/* Option hover state */
[data-slot="content"] [role="option"]:hover,
[data-slot="content"] [role="option"][data-highlighted],
[role="listbox"] [role="option"]:hover,
[role="listbox"] [role="option"][data-highlighted] {
  background-color: var(--ui-bg-accented) !important; /* zinc-100 */
}

.dark [data-slot="content"].bg-default,
.dark [role="listbox"].bg-default {
  background-color: var(--ui-bg-elevated) !important; /* zinc-800 */
}
```

### 4. Theme CSS Variables (`src/theme.css`)

Base color palette and accent system:

```css
@theme inline {
  /* Liftoff accent color system */
  --color-accent: var(--color-zinc-800);
  --color-accent-content: var(--color-zinc-800);
  --color-accent-foreground: var(--color-white);
}

@layer theme {
  .dark {
    --color-accent: var(--color-white);
    --color-accent-content: var(--color-white);
    --color-accent-foreground: var(--color-zinc-800);
  }
}

:root {
  --background: oklch(1 0 0);                     /* white */
  --foreground: oklch(0.141 0.005 285.823);       /* zinc-950 */
  --primary: oklch(0.274 0.006 286.033);          /* zinc-800 */
  --border: oklch(0.94 0.002 286.32);             /* soft border */
  --radius: 0.5rem;                               /* 8px */
}
```

### Key Files Reference

| File | Purpose |
|------|---------|
| `src/style.css` | Nuxt UI variable overrides, component styling |
| `src/theme.css` | Base color palette, accent colors, fonts |
| `src/vite/defineLiftoffConfig.ts` | Nuxt UI plugin config for consuming apps |
| `.storybook/main.ts` | Nuxt UI plugin config for Storybook |

### Common Customization Tasks

**Change primary button color:**
1. Update `ui.colors.primary` in plugin config
2. Update `--color-accent` in `theme.css`
3. Update `--primary` in `theme.css`

**Adjust border softness:**
1. Modify `--ui-border` in `style.css`
2. Higher OKLCH lightness = softer (0.94 is very soft, 0.87 is more visible)

**Change border radius:**
1. Update `--ui-radius` in `style.css` for Nuxt UI components
2. Update `--radius` in `theme.css` for custom components

**Add/remove shadows:**
1. Target components with `[data-slot="base"]` selectors
2. Use `box-shadow: none` to remove, `shadow-xs` equivalent to add

**Modify component heights:**
1. Use `min-height` on `button[data-slot="base"]` or `input[data-slot="base"]`
2. Adjust padding accordingly

**Fix dropdown/select backgrounds:**
1. Ensure `--ui-bg` and `--color-default` are defined in `:root`
2. Target `[data-slot="content"].bg-default` for dropdown containers
3. Target `[role="option"]` for individual options

**Add button inset shadow to new color:**
1. Add the color class to the solid button selector list (e.g., `.bg-custom`)
2. Add corresponding dark mode selector to remove shadow

### Useful Resources

- [Nuxt UI Theme Docs](https://ui.nuxt.com/getting-started/theme)
- [Nuxt UI Components](https://ui.nuxt.com/components)
- [OKLCH Color Picker](https://oklch.com/) - For generating color values
- [Tailwind CSS](https://tailwindcss.com/docs) - Utility classes reference

## Publishing a New Release

**IMPORTANT**: Always use the release skill for publishing new versions.

```
/release
```

Or reference the skill documentation at `.claude/skills/release/SKILL.md`.

The release skill handles:
1. Version bumping (patch/minor/major)
2. Committing and pushing changes
3. Creating GitHub releases
4. Triggering the publish workflow to GitHub Packages

The package is published to GitHub Packages (`npm.pkg.github.com`), not npmjs.org. Consuming projects need a `.npmrc` configured for GitHub Packages authentication.
