# Quick Start

## Installation

::: code-group

```bash [pnpm]
pnpm add @silver-formily/reactive-vue @formily/reactive
```

```bash [npm]
npm install @silver-formily/reactive-vue @formily/reactive
```

:::

## Key Changes

1. Removed `vue-demi`. The wrapper now targets Vue 3 exclusively.
2. Added several hooks. In Vue 3 components, these hooks automatically dispose subscriptions on unmount, which reduces the mental overhead.
