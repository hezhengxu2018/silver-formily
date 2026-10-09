# API

`observer` wraps your function component with `React.memo` and calls `useObserver` inside that wrapper, which inserts one extra level into the tree (static members of the original component are hoisted automatically). In React, `observer` should be your first choice; reach for `useObserver` directly only when you need finer control over dependency collection, for example inside a custom render pipeline.

`observer`, `useObserver`, and the effect hooks (`autorunEffect`, `reactionWatch`, `useComputed`) are all StrictMode / ConcurrentMode friendly: instances are reclaimed by a garbage collector as a fallback, and effect replays never dispose subscriptions by mistake nor leave duplicate instances behind.

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

## autorunEffect <ElTag>1.0.0</ElTag>

Runs an `autorun` after the component commits and disposes it automatically on unmount. It is equivalent to setting up `autorun` inside `useEffect` by hand, except instance uniqueness is guaranteed internally: StrictMode effect replays neither dispose it by mistake nor leave duplicate instances behind.

The tracker closure is fixed to the first render, which suits trackers that only read Formily observables; use `reactionWatch` when you want to watch for value changes instead of auto-running.

### Signature

```ts
import type { Reaction } from '@silver-formily/reactive'

interface autorunEffect {
  (tracker: Reaction, name?: string): void
}
```

### Usage

:::demo
autorunEffect.tsx
:::

## reactionWatch <ElTag>1.0.0</ElTag>

Sets up a `reaction` after the component commits and disposes it automatically on unmount. Unlike `autorunEffect`, the subscriber is notified only when the tracker's return value changes, which fits a "watch" semantic. Options are forwarded to the underlying `reaction` (for example `fireImmediately`, `equals`).

### Signature

```ts
import type { IReactionOptions } from '@silver-formily/reactive'

interface reactionWatch<T> {
  (tracker: () => T, subscriber?: (value: T, oldValue: T) => void, options?: IReactionOptions<T>): void
}
```

### Usage

:::demo
reactionWatch.tsx
:::

## useComputed <ElTag>1.0.0</ElTag>

Bridges a Formily reactive expression into component state: it returns the latest value of the expression and re-renders when its dependencies change. Handy for consuming Formily reactive data inside non-`observer` components.

The getter should only read Formily observables; when it reads props/state or other non-reactive data, declare them via `options.deps`, otherwise the closure stays on the first render and misses later updates. The remaining options are forwarded to the underlying `reaction`.

### Signature

```ts
import type { IReactionOptions } from '@silver-formily/reactive'
import type { DependencyList } from 'react'

interface IComputedOptions<T> extends IReactionOptions<T> {
  deps?: DependencyList // props/state the getter depends on; changing them rebuilds tracking with the fresh getter
}

interface useComputed<T> {
  (getter: () => T, options?: IComputedOptions<T>): T
}
```

### Usage

:::demo
useComputed.tsx
:::

## useCompatEffect <ElTag>Advanced</ElTag>

A `useEffect` variant for resources created inside the effect under React 18+ StrictMode / ConcurrentMode: when `deps` are omitted or effects are replayed, cleanup timing stays aligned with real dependency changes — deferred while deps are unchanged, and immediate once they truly change or the component unmounts.

`@silver-formily/react` relies on it internally to keep Field `onMount` / `onUnmount` from being triggered by StrictMode replays. Reach for it when building your own integration layer that needs precise subscription lifecycles; regular components should just use the native `useEffect`.

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

## useCompatFactory <ElTag>Advanced</ElTag>

Creates an instance with a `dispose` method (for example a `Tracker`) inside a component and disposes it automatically when the component truly unmounts. Because StrictMode / ConcurrentMode may skip unmounting, a garbage collector reclaims the instance as a fallback.

`useFormEffects` of `@silver-formily/react` uses it to bind effect lifecycles to the component. It fits "instance + dispose" external resources (subscriptions, observers, registration handles); plain scenarios are fine with native `useEffect` cleanup.

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
