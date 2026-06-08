# Quick Start

## Installation

::: tip Migration Note
Starting with `2.x`, the Reactive Vue docs and demos use `@silver-formily/reactive` by default. Treat older `@formily/reactive` snippets as pre-migration context, not the recommended setup.
:::

::: code-group

```bash [pnpm]
pnpm add @silver-formily/reactive-vue @silver-formily/reactive
```

```bash [npm]
npm install @silver-formily/reactive-vue @silver-formily/reactive
```

:::

## Key Changes

1. Removed `vue-demi`. The wrapper now targets Vue 3 exclusively.
2. Added several hooks. In Vue 3 components, these hooks automatically dispose subscriptions on unmount, which reduces the mental overhead.
3. Since `2.x`, the underlying reactivity dependency is fully migrated to `@silver-formily/reactive`, aligning this package with the rest of the Silver Formily stack.
