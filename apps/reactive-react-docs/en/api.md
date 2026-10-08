# API

`observer` wraps your function component with `React.memo` and calls `useObserver` inside that wrapper, which inserts one extra level into the tree (static members of the original component are hoisted automatically). In React, `observer` should be your first choice; reach for `useObserver` directly only when you need finer control over dependency collection, for example inside a custom render pipeline.

`observer`, `useObserver`, and the compatibility hooks are all StrictMode / ConcurrentMode friendly: instances are reclaimed by a garbage collector as a fallback, and effect replays never dispose subscriptions by mistake.

## observer <ElTag>Recommended</ElTag>

### Description

Turns a function component into a reactive one: dependencies are collected on every render, and updates re-render only the components that actually depend on the changed fields. The returned component is wrapped in `React.memo` and hoists the statics of the original component.

### Signature

```ts
interface IObserverOptions {
  forwardRef?: boolean // forward refs to the wrapped component
  scheduler?: (updater: () => void) => void // optionally control when updates run
  displayName?: string // displayName of the wrapped component
}

interface observer<P, Options extends IObserverOptions> {
  (component: (props: P & { children?: React.ReactNode }) => React.ReactNode, options?: Options): React.MemoExoticComponent<(props: P) => React.ReactNode>
}
```

### Usage

:::demo
observer.tsx
:::

## Observer

### Description

A render component accepting a render function or static children. It is handy for subscribing only a slice of JSX: when `children` is a function, the reactive fields read inside it only re-render the `Observer` subtree, leaving the parent untouched.

### Signature

```ts
interface IObserverProps {
  children?: (() => React.ReactElement) | React.ReactNode
}
```

### Usage

:::demo
observerComponent.tsx
:::

## useObserver

The hook that powers `observer`. It tracks the reactive dependencies of the `view` function inside the current component and returns its result.

### Signature

```ts
interface IObserverOptions {
  scheduler?: (updater: () => void) => void
  displayName?: string
}

interface useObserver<T extends () => any> {
  (view: T, options?: IObserverOptions): ReturnType<T>
}
```

### Usage

:::demo
useObserver.tsx
:::

## useForceUpdate <ElTag>1.0.0</ElTag>

Returns a function that forces the current component to re-render. It is batch-safe: multiple calls within the same event only trigger one re-render, and calls during the first render under StrictMode are deferred until after commit.

### Signature

```ts
interface useForceUpdate {
  (): () => void
}
```

### Usage

:::demo
useForceUpdate.tsx
:::

## useCompatEffect <ElTag>1.0.0</ElTag>

A compatibility wrapper around `useEffect`. It aligns dispose timing with real dependency changes across omitted `deps` and StrictMode effect replays: cleanups are deferred while deps stay unchanged, and run immediately once deps really change or the component unmounts.

### Signature

```ts
import type { DependencyList, EffectCallback } from 'react'

interface useCompatEffect {
  (effect: EffectCallback, deps?: DependencyList): void
}
```

### Usage

:::demo
useCompatEffect.tsx
:::

## useCompatFactory <ElTag>1.0.0</ElTag>

Creates an instance with a `dispose` method (for example a `Tracker`) inside a component and disposes it automatically when the component truly unmounts. Because StrictMode / ConcurrentMode may skip unmounting, a garbage collector reclaims the instance as a fallback.

### Signature

```ts
interface useCompatFactory {
  <T extends { dispose: () => void }>(factory: () => T): T
}
```

### Usage

:::demo
useCompatFactory.tsx
:::

## useDidUpdate <ElTag>1.0.0</ElTag>

A `useLayoutEffect` wrapper whose callback runs on every committed update (and once on mount).

### Signature

```ts
interface useDidUpdate {
  (callback?: () => void): void
}
```

## useLayoutEffect <ElTag>1.0.0</ElTag>

An SSR-safe `useLayoutEffect`: it uses React's `useLayoutEffect` on the client and falls back to `useEffect` on the server to avoid SSR warnings.

### Signature

```ts
interface useLayoutEffect {
  (effect: EffectCallback, deps?: DependencyList): void
}
```
