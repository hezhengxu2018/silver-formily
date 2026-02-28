# Quick Start

`@silver-formily/grid` builds responsive layouts from container size and child `span` metadata.

## Installation

::: code-group

```bash [pnpm]
pnpm add @silver-formily/grid @formily/reactive
```

```bash [npm]
npm install @silver-formily/grid @formily/reactive
```

:::

## Basic Usage

```ts
import { Grid } from '@silver-formily/grid'

const grid = new Grid({
  minColumns: 2,
  maxColumns: 4,
  minWidth: 120,
  maxWidth: 220,
})

const dispose = grid.connect(container)
```

:::demo
basicGrid
:::

## Vue Example

This demo shows the recommended Vue integration pattern:

- Use `new Grid(...)` directly. The instance already skips Vue deep proxy wrapping.
- Update `grid.options` via `watch` to react to UI state changes.

:::demo
vueUsage
:::

## Breaking Changes

- `Grid` instances are now automatically marked as raw on construction (via Vue `__v_skip`), so manual `markRaw` is usually unnecessary.

- The ResizeObserver polyfill was removed during the refactor. The package now relies on the native browser ResizeObserver, so make sure your target browsers support it.

- The library now has limited SSR handling, but this is not a full SSR-first layout engine. Its core behavior still depends on runtime DOM measurements.

## SSR Guide

During SSR, the container is treated as infinitely wide. Because server rendering cannot know the real client viewport width, breakpoint-driven layouts can still mismatch between server output and client hydration. If SSR consistency is required, avoid breakpoint-dependent grid rules or use this package in client-only rendering.
