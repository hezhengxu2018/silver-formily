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

::: warning Vue Tip
In Vue apps, keep the `Grid` instance non-deep-reactive (for example: local variable, `shallowRef`, or `markRaw(new Grid(...))`) to avoid repeated side effects caused by reactive proxy wrapping.
:::

:::demo
basicGrid
:::

## Vue Example

This demo shows the recommended Vue integration pattern:

- Keep the instance non-deep-reactive with `markRaw(new Grid(...))`.
- Update `grid.options` via `watch` to react to UI state changes.

:::demo
vueUsage
:::

## SSR & Hydration

Detailed SSR/hydration configuration and examples are centralized in the [SSR Guide](/en/ssr).
