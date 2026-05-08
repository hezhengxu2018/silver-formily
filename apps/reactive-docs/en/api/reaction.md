# reaction

## Core Idea

reaction is the subscriber side of an observable. It accepts a tracker function. When the tracker reads observable properties, those properties become dependencies. Once any of them is written elsewhere, the tracker runs again.

Unlike autorun, reaction also performs a dirty check on the tracker result. The subscriber is called only when the tracked value actually changes, which makes reaction more suitable for precise side effects.

![reaction dependency flow](https://img.alicdn.com/imgextra/i4/O1CN01DQMGUL22mFICDsKfY_!!6000000007162-2-tps-1234-614.png)

Like autorun, reaction recollects dependencies on every run, so it should be disposed manually when it is no longer needed.

## Description

Receive a tracker function and a callback response function. If there is observable data in the tracker, the tracker function will be executed repeatedly when the data changes, but the callback execution must be executed when the tracker function return value changes.

## Signature

```ts
interface IReactionOptions<T> {
  name?: string
  equals?: (oldValue: T, newValue: T) => boolean // Dirty check
  fireImmediately?: boolean // Is it triggered by default for the first time, bypassing the dirty check
}

interface reaction<T> {
  (
    tracker: () => T,
    subscriber?: (newValue: T, oldValue: T) => void,
    options?: IReactionOptions<T>
  ): void
}
```

## Example

::: demo
api/reaction-en/basic
:::

### Example Code

```ts
import { batch, observable, reaction } from '@formily/reactive'

const obs = observable({
  aa: 1,
  bb: 2,
})

const dispose = reaction(() => {
  return obs.aa + obs.bb
}, console.log)

batch(() => {
  // Won't trigger because the value of obs.aa + obs.bb has not changed
  obs.aa = 2
  obs.bb = 1
})

obs.aa = 4

dispose()
```
