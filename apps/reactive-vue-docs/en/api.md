# API

`observer` returns a higher-order component that wraps whatever you pass in, so calling `useObserver` from inside a component still inserts an extra level in the tree. If you are building your own components, prefer calling `useObserver` directly so the reactive syncing stays local. The `observer` helper exists in `@formily/vue` primarily to keep Vue 2 compatibility, but for Vue 3-centric codebases the hook should be your first choice.

Internally, `useObserver` rewires Vue 3 reactivity with a non-public API. If you would rather avoid that hack, reach for `formilyComputed`, which exposes the Formily reaction as a standard Vue `ComputedRef` so most custom wrappers never need to touch `useObserver`.

## observer

### Description
Turns the component render function into a Formily `Reaction`. Every re-render collects dependencies, and only the exact reactive fields are tracked for updates.

### Signature
```ts
interface IObserverOptions {
  scheduler?: (updater: () => void) => void // optionally control when updates run
  name?: string // name of the wrapped component
}

interface observer<T extends VueComponent> {
  (component: T, options?: IObserverOptions): T
}
```

### Usage

:::demo
observer
:::

## useObserver <ElTag>Recommended</ElTag>

The hook that powers `observer`. Prefer calling it in `setup`/`<script setup>` to avoid extra wrapper components.

### Signature
```ts
// Same options as observer
interface IObserverOptions {
  scheduler?: (updater: () => void) => void
  name?: string
}

interface useObserver {
  (options?: IObserverOptions): void
}
```

### Usage

:::demo
useObserver
:::

## formilyComputed <ElTag>New</ElTag>

Converts a `@formily/reactive` computation into a Vue 3 `ComputedRef`. You can use it anywhere Vue expects a computed value (Pinia, props, etc.).

### Signature

```ts
import type { IReactionOptions } from '@formily/reactive'
import type { ComputedRef } from 'vue'

// options default to { fireImmediately: true }
interface formilyComputed {
  <T>(tracker: () => T, options?: IReactionOptions): ComputedRef<T>
}
```

### Usage

:::demo
formilyComputed
:::
