# SSR Guide

This page focuses on recommended `@silver-formily/grid` practices during SSR/Hydration.

## Background

Grid relies on container width to compute final columns, and real measurements are only available on the client. Without fallback, first paint may be incorrect and then get corrected after client render.

## Recommended Setup

```ts
const grid = new Grid({
  ssrColumns: 3,
  ssrTemplateColumns: 'repeat(3,minmax(0,1fr))',
  deferVisibilityUntilHydration: true,
})
```

## Options

| Option                          | Type      | Default | Description                                                  |
| ------------------------------- | --------- | ------- | ------------------------------------------------------------ |
| `ssrColumns`                    | `number`  | `1`     | Fallback value for `grid.columns` when `ready=false`         |
| `ssrTemplateColumns`            | `string`  | -       | Fallback value for `grid.templateColumns` when `ready=false` |
| `deferVisibilityUntilHydration` | `boolean` | `true`  | Whether to defer `shouldVisible` DOM visibility side effects |

## Examples

### 1. SSR fallback template columns

:::demo
ssrFallback
:::

### 2. Visibility timing before/after hydration

:::demo
deferVisibility
:::

## shouldVisible Notes

- Treat `shouldVisible` as a post-layout adjustment mechanism.
- If some nodes must be excluded in SSR first paint, prefer handling it at template/data level (for example via `v-if`).
