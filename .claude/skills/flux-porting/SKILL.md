---
name: flux-porting
description: Port Flux UI (Livewire) components to Vue 3. Use when creating new craft-ui components based on Flux UI designs.
allowed-tools: Read, Write, Edit, Glob, Grep, Bash
---

# Flux UI Porting Workflow

Port Flux UI components from Blade/Livewire to Vue 3 + Composition API.

## Source Directories

Flux Pro and Base components are located at:

```
# Flux Pro components
/Users/nckrtl/Projects/flux/vendor/livewire/flux-pro/stubs/resources/views/flux/

# Base Flux components
/Users/nckrtl/Projects/flux/vendor/livewire/flux/stubs/resources/views/flux/
```

## Porting Process

### 1. Analyze Flux Source

Read the original Blade component:
- Identify props and their defaults
- Note Alpine.js state management
- Extract Tailwind classes
- Understand slot patterns

### 2. Create Vue Component

Convert to Vue 3 Composition API:

```vue
<script setup lang="ts">
interface Props {
  // Convert Blade props to TypeScript
}

const props = withDefaults(defineProps<Props>(), {
  // Default values
})
</script>

<template>
  <!-- Port template with Vue syntax -->
</template>
```

### 3. Design Principles

Follow Flux UI design principles:

| Principle | Implementation |
|-----------|----------------|
| Calm over Loud | Subtle shadows, soft borders, muted colors |
| Simplicity | Single responsibility, minimal variants |
| Hierarchy | Weight over color, progressive disclosure |
| Consistency | Unified sizing, shared radii |
| Details | Inset highlights, smooth transitions |

### 4. Visual Reference

| Property | Value |
|----------|-------|
| Base height | 40px (h-10) |
| Small height | 32px (h-8) |
| XS height | 24px (h-6) |
| Base radius | 8px (rounded-lg) |
| Small radius | 6px (rounded-md) |
| Card radius | 12px (rounded-xl) |
| Shadow | shadow-xs (0 1px 2px rgba(0,0,0,0.05)) |
| Inset shadow | inset 0 1px white/20 |
| Border | zinc-200 (light) / zinc-700 (dark) |
| Primary | zinc-800 (light) / white (dark) |

### 5. Alpine.js to Vue

| Alpine | Vue 3 |
|--------|-------|
| `x-data` | `<script setup>` + `ref()` |
| `x-show` | `v-show` |
| `x-if` | `v-if` |
| `x-for` | `v-for` |
| `x-on:click` | `@click` |
| `x-bind:class` | `:class` |
| `$el` | `ref` + template ref |
| `$dispatch` | `emit()` |

### 6. Create Story

Add Storybook story:

```typescript
import type { Meta, StoryObj } from '@storybook/vue3'
import MyComponent from './MyComponent.vue'

const meta: Meta<typeof MyComponent> = {
  component: MyComponent,
  tags: ['autodocs'],
}
export default meta

type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    // Default props
  },
}
```

### 7. Add Tests

Write component tests:

```typescript
import { composeStories } from '@storybook/vue3'
import { render, screen } from '@testing-library/vue'
import * as stories from './MyComponent.stories'

const { Default } = composeStories(stories)

describe('MyComponent', () => {
  it('renders correctly', () => {
    render(Default())
    expect(screen.getByRole('button')).toBeInTheDocument()
  })
})
```

## Dark Mode

- No shadows in dark mode
- Flip zinc scale (zinc-200 → zinc-700)
- Use `dark:` variants for all colors
