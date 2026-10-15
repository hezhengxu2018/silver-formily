# @silver-formily/reactive-react

[中文 README](./README.md)

## Overview

`@silver-formily/reactive-react` bridges Silver Formily's reactive engine with the React render pipeline, migrated from `@formily/reactive-react@2.3.7`. It wires fine-grained dependency tracking into component rendering through the `observer` HOC and the `useObserver` hook.

## Runtime Positioning

The package sits between the reactive engine and the React rendering layer:

- Depends on `@silver-formily/reactive` for state and dependency tracking
- Serves any React 18/19 component or custom renderer directly

## Public Surface

- `observer` — HOC that wraps function components with reactive re-rendering
- `Observer` — render component accepting a render function or static children
- `useObserver` — core hook that tracks the reactive dependencies of a view function
- `useComputed` — reactive derived values with deps-based tracking rebuilds
- `useAutorunEffect` / `useReactionWatch` — effect subscriptions and value watchers
- `useCompatEffect` / `useCompatFactory` — advanced hooks for integration-layer instance lifecycles
- Types: `IObserverOptions`, `IObserverProps`, `IComputedOptions`, `IAutorunEffectOptions`, `IReactionWatchOptions`

## Divergence from upstream @formily/reactive-react

- Hooks are exported **without** the `unstable_` prefix
- Peer dependencies are `react` / `react-dom` `^18 || ^19`; `react-is` was dropped
- ESM-only output (`dist/index.mjs` + `dist/index.d.ts`)

## Installation

```bash
pnpm add @silver-formily/reactive-react @silver-formily/reactive react react-dom
```

## Quick Start

```tsx
import { observable } from '@silver-formily/reactive'
import { observer } from '@silver-formily/reactive-react'

const state = observable({ count: 0 })

const Counter = observer(() => (
  <button onClick={() => state.count++}>{state.count}</button>
))
```

## Hook and type contracts

- `observer` accepts function components, `memo`, and `forwardRef`, preserving memo comparators. Plain function component generic signatures, custom statics, and declared ref types are retained. React 19 accepts ref props directly; React 18 requires a `forwardRef` input or `{ forwardRef: true }`.
- `Observer` render functions can return any `ReactNode`, including `null`, strings, and arrays.
- `useComputed(getter, { deps, equals, name })` returns a reactive expression's current value, including function values. Changes to deps rebuild tracking with the latest getter and options. `fireImmediately` is no longer configurable: rebuilding always synchronizes the current value.
- `useAutorunEffect(tracker, { name, deps }?)` and `useReactionWatch(tracker, subscriber?, { deps, ...options }?)` subscribe after commit and unsubscribe synchronously during effect cleanup. Callbacks read the latest committed props/state. Pass deps when props/state change the observable or expression being tracked, so tracking is rebuilt immediately. Omitting deps does not rebuild on every render.
- `useCompatEffect` is for special retained-resource lifecycles: synchronous StrictMode replay reuses both setup and cleanup; final cleanup is deferred by one microtask. Prefer React's `useEffect` for ordinary side effects.

The parent supplies `store` as a Formily observable. All hooks are called inside the component.

```tsx
import { useComputed, useReactionWatch } from '@silver-formily/reactive-react'

function Price({ store, multiplier, onChange }: {
  store: { price: number }
  multiplier: number
  onChange: (price: number) => void
}) {
  useReactionWatch(() => store.price, onChange, { deps: [store] })
  const total = useComputed(() => store.price * multiplier, {
    deps: [store, multiplier],
  })
  return <output>{total}</output>
}
```

## Documentation

- [English API reference](https://reactive-react.silver-formily.org/en/api)
- [Changelog](./CHANGELOG.md)
- Repository: <https://github.com/hezhengxu2018/silver-formily>

## License

MIT
