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
- `useForceUpdate` — batch-safe force update hook
- `useCompatEffect` / `useCompatFactory` / `useDidUpdate` / `useLayoutEffect` — StrictMode/ConcurrentMode-compatible internal hooks (also exported publicly)
- Types: `IObserverOptions`, `IObserverProps`, `ReactFC`, etc.

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

## Documentation

- Repository: <https://github.com/hezhengxu2018/silver-formily>

## License

MIT
