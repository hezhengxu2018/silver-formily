# SSR Guide

This page focuses on recommended `@silver-formily/grid` practices during SSR/Hydration.

## Background

Grid relies on container width to compute final columns, and real measurements are only available on the client. Without fallback, first paint may be incorrect and then get corrected after client render.

## Recommended Setup

```ts
const grid = new Grid({
  ssrWidth: 1000,
  minColumns: [2, 3, 4, 5],
  maxColumns: [2, 3, 4, 5],
  shouldVisible: node => node.index < 5,
})
```

## Execution Timing

- `shouldVisible` triggered by `grid.connect()` runs both before and after hydration.
- If you also want the same rule to run during server template rendering, call `grid.resolveSsrVisible(...)` explicitly in SSR render logic.

## Options

| Option          | Type       | Default | Description                                                      |
| --------------- | ---------- | ------- | ---------------------------------------------------------------- |
| `ssrWidth`      | `number`   | -       | Estimated SSR container width for breakpoint and column fallback |
| `shouldVisible` | `function` | -       | Visibility rule for pre/post hydration and manual SSR rendering  |

## Examples

### 1. SSR fallback template columns

:::demo
ssrFallback
:::

### 2. Visibility rule before/after hydration

:::demo
deferVisibility
:::

## Layered Integration (Recommended)

Keep the core framework-agnostic and reuse pure visibility computation:

```ts
const visible = grid.resolveSsrVisible({ index, span, originSpan: span })
```

In Vue, filter render data before template output (for example with `computed` or a composable):

```ts
const visibleItems = computed(() =>
  items.filter((item, index) =>
    grid.resolveSsrVisible({ index, span: item.span, originSpan: item.span }),
  ),
)
```

## Vue SSR Example

```vue
<script setup lang="ts">
import { Grid } from '@silver-formily/grid'
import { computed, markRaw, onBeforeUnmount, onMounted, ref } from 'vue'

const containerRef = ref<HTMLElement | null>(null)
const templateColumns = ref('repeat(3,minmax(0,1fr))')
const items = [
  { title: 'A', span: 2 },
  { title: 'B', span: 1 },
  { title: 'C', span: 1 },
  { title: 'D', span: 2 },
]

const grid = markRaw(new Grid({
  ssrWidth: 1000,
  minColumns: [2, 3, 4, 5],
  maxColumns: [2, 3, 4, 5],
  shouldVisible: node => node.index < 3,
  onDigest(current) {
    templateColumns.value = current.templateColumns
  },
}))

const visibleItems = computed(() =>
  items.filter((item, index) =>
    grid.resolveSsrVisible({ index, span: item.span, originSpan: item.span }),
  ),
)

let dispose: (() => void) | undefined
onMounted(() => {
  if (containerRef.value) {
    dispose = grid.connect(containerRef.value)
  }
})
onBeforeUnmount(() => {
  dispose?.()
})
</script>

<template>
  <div ref="containerRef" :style="{ display: 'grid', gridTemplateColumns: templateColumns, gap: '10px' }">
    <div v-for="item in visibleItems" :key="item.title" :data-grid-span="item.span">
      {{ item.title }}
    </div>
  </div>
</template>
```

- `visibleItems` is filtered during SSR rendering, so first-paint HTML matches visibility rules.
- After client `connect()`, the same `shouldVisible` rule continues to apply.

## shouldVisible Notes

- `shouldVisible` is applied before and after hydration, and can be reused in SSR via `grid.resolveSsrVisible`.
- If your predicate needs real DOM access, guard for the existence of the `element` field first.
