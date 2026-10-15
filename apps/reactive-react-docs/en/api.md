# API

`observer` wraps your function component with `React.memo` and calls `useObserver` inside that wrapper, which inserts one extra level into the tree (static members of the original component are hoisted automatically). In React, `observer` should be your first choice; reach for `useObserver` directly only when you need finer control over dependency collection, for example inside a custom render pipeline.

`observer` / `useObserver` create a Tracker during rendering, retain it with `useCompatFactory`, and use GC as a fallback for uncommitted renders. `useComputed`, `useAutorunEffect`, and `useReactionWatch` subscribe in ordinary `useEffect` callbacks and unsubscribe synchronously during cleanup; StrictMode replay cleans up before rebuilding. Only `useCompatEffect` retains the same setup and cleanup across synchronous replay.

## observer <ElTag>Recommended</ElTag> {#observer}

### Description

Turns a function component into a reactive one: dependencies are collected on every render, and updates re-render only the components that actually depend on the changed fields. The returned component is wrapped in `React.memo` and hoists the statics of the original component.

### Signature

```ts
interface IObserverOptions {
  forwardRef?: boolean // forward refs to the wrapped component
  scheduler?: (updater: () => void) => void // optionally control when updates run
  displayName?: string // displayName of the wrapped component
}

// The package declaration contains the full overloads, including generic and ref inference.
declare const observer: typeof import('@silver-formily/reactive-react').observer
```

### Component and ref types

Accepts plain function components, `memo(Component)`, `forwardRef(render)`, and nested combinations. Existing memo comparators are preserved; reactive dependency changes can still trigger updates. Plain function component generic call signatures and custom statics are retained. Declare `children` explicitly in component props.

React 19 allows ref props directly. For React 18 compatibility, pass a `forwardRef` component or set `{ forwardRef: true }`; the latter merges the ref into the original function's props. Declare a specific ref element type to reject mismatched refs.

```tsx
import type { Ref } from 'react'
import { observer } from '@silver-formily/reactive-react'

const Input = observer<{ value: string, ref?: Ref<HTMLInputElement> }>(
  props => <input ref={props.ref} value={props.value} readOnly />,
  { forwardRef: true },
)
```

### Usage

:::demo
observer.tsx
:::

## Observer {#observer-component}

### Description

A render component accepting a render function or static children. It is handy for subscribing only a slice of JSX: when `children` is a function, the reactive fields read inside it only re-render the `Observer` subtree, leaving the parent untouched.

### Signature

```ts
interface IObserverProps {
  children?: (() => React.ReactNode) | React.ReactNode
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

interface useObserver<T extends () => unknown> {
  (view: T, options?: IObserverOptions): ReturnType<T>
}
```

### Usage

:::demo
useObserver.tsx
:::

## useAutorunEffect <ElTag>1.0.0</ElTag> {#useautoruneffect}

Creates an `autorun` after commit, runs the tracker initially and on reactive dependency changes, and disposes synchronously during effect cleanup. Development StrictMode may run the initial tracker more than once, but does not retain duplicate subscriptions.

The tracker uses the latest committed closure. Pass `options.deps` when props/state change the expression or observable being tracked; refreshing the callback alone does not run the tracker. Omitting deps subscribes on mount and reacts to observable changes without rebuilding on every render. `name` is read when subscribing.

Use `useReactionWatch` to notify only when a value changes.

### Signature

```ts
import type { Reaction } from '@silver-formily/reactive'
import type { DependencyList } from 'react'

interface IAutorunEffectOptions {
  name?: string // passed to the underlying autorun when subscribing
  deps?: DependencyList // non-observable inputs that rebuild tracking
}

declare function useAutorunEffect(tracker: Reaction, options?: IAutorunEffectOptions): void
```

### Usage

:::demo
useAutorunEffect.tsx
:::

## useReactionWatch <ElTag>1.0.0</ElTag> {#usereactionwatch}

Creates a `reaction` after commit and disposes synchronously during effect cleanup. By default the subscriber runs only when the tracker value changes. `fireImmediately: true` also notifies whenever a subscription is established; `equals` customizes equality.

Both tracker and subscriber use their latest committed closures. A changed `onChange` callback does not require resubscribing. Declare a changed store or props/state used by the tracker in `options.deps`. Dependency changes clean up the old subscription and establish a new one with the latest options and a fresh comparison baseline; oldValue is not preserved across subscriptions. Options such as `equals` and `name` are read when subscribing.

### Signature

```ts
import type { IReactionOptions } from '@silver-formily/reactive'
import type { DependencyList } from 'react'

interface IReactionWatchOptions<T> extends IReactionOptions<T> {
  deps?: DependencyList
}

declare function useReactionWatch<T>(
  tracker: () => T,
  subscriber?: (value: T, oldValue: T) => void,
  options?: IReactionWatchOptions<T>,
): void
```

### Usage

:::demo
useReactionWatch.tsx
:::

## useComputed <ElTag>1.0.0</ElTag> {#usecomputed}

Bridges a Formily reactive expression into component state: it returns the latest value of the expression and re-renders when its dependencies change. Handy for consuming Formily reactive data inside non-`observer` components.

The getter should only read Formily observables; when it reads props/state or other non-reactive data, declare them via `options.deps`, otherwise the closure stays on the first render and misses later updates. The remaining options (`equals`, `name`) are read when subscribing and refreshed when deps change. The initial value is calculated synchronously; later deps changes rebuild tracking and synchronize the result in an effect, so the current render may initially receive the old value. Results can be functions; the hook does not execute them as state updaters.

`fireImmediately` is not configurable: rebuilding always publishes the current result. Use `useReactionWatch` if you need to control notifications.

### Signature

```ts
import type { IReactionOptions } from '@silver-formily/reactive'
import type { DependencyList } from 'react'

interface IComputedOptions<T> extends Omit<IReactionOptions<T>, 'fireImmediately'> {
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

Provides a retained-resource effect lifecycle for integration layers: synchronous StrictMode replay reuses the same setup and cleanup without allocating duplicate resources. Changed deps dispose the old resource synchronously before the next setup; omitted deps refresh the resource on every commit. Final unmount cleanup is deferred by one microtask. React compares dependency entries with `Object.is`, not deep equality.

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

Creates an instance with a `dispose` method (for example a `Tracker`) inside a component and disposes it automatically when the component truly unmounts. React may abandon an uncommitted render without running effect cleanup. GC provides a fallback for those instances, with nondeterministic timing. Final unmount cleanup for committed instances is deferred by one microtask.

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
