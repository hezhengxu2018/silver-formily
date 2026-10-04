# Quick Start

## Installation

::: tip Tip
`@silver-formily/reactive-react` is migrated from `@formily/reactive-react@2.3.7`.
:::

::: warning Warning

1. Peer dependencies are `react` / `react-dom` `^18 || ^19`
2. ESM-only output.

:::

::: code-group

```bash [pnpm]
pnpm add @silver-formily/reactive-react @silver-formily/reactive react react-dom
```

```bash [npm]
npm install @silver-formily/reactive-react @silver-formily/reactive react react-dom
```

:::

## Quick Start

```tsx
import { observable } from '@silver-formily/reactive'
import { observer } from '@silver-formily/reactive-react'

const state = observable({ count: 0 })

const Counter = observer(() => (
  <button onClick={() => state.count++}>{state.count}</button>
))
```

Components wrapped with `observer` collect the reactive fields they read on every render. When a field changes, only the components that depend on it re-render.
