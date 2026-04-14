# batch

## Core Idea

In a Proxy-based reactive system, each atomic write is treated as an individual update. If multiple observable properties are changed within the same flow, Reaction can be triggered repeatedly and waste work.

batch merges a group of updates into a single dispatch, which helps reduce unnecessary reaction executions during transactional updates.

## Description

Define batch operations, internal dependencies can be collected

## Why batch matters

### Interactive Comparison

::: demo
api/batch-en/compare
:::

Without batching, changing several properties in sequence can trigger repeated reactions:

```ts
import { autorun, observable } from '@formily/reactive'

const obs = observable({})
function handler() {
  obs.aa = 123
  obs.bb = 321
}

autorun(() => {
  console.log(obs.aa, obs.bb)
})

handler()
```

This example prints 3 times: once for the initial `autorun`, once for the `obs.aa` assignment, and once for the `obs.bb` assignment. The more atomic updates you have, the more repeated work you create.

With `batch`, the whole update group produces only one extra reaction:

```ts
import { autorun, batch, observable } from '@formily/reactive'

const obs = observable({})
function handler() {
  obs.aa = 123
  obs.bb = 321
}

autorun(() => {
  console.log(obs.aa, obs.bb)
})

batch(() => {
  handler()
})
```

## Signature

```ts
interface batch {
  <T>(callback?: () => T): T // In-place batch
  scope: <T>(callback?: () => T) => T // In-situ local batch
  bound: <T extends (...args: any[]) => any>(callback: T, context?: any) => T // High-level binding
  endpoint: (callback?: () => void) => void // Register batch endpoint callback
}
```

## Example

::: demo
api/batch-en/scope
:::

### Example Code

```ts
import { autorun, batch, observable } from '@formily/reactive'

const obs = observable({})

autorun(() => {
  console.log(obs.aa, obs.bb, obs.cc, obs.dd)
})

batch(() => {
  batch.scope(() => {
    obs.aa = 123
  })
  batch.scope(() => {
    obs.cc = 'ccccc'
  })
  obs.bb = 321
  obs.dd = 'dddd'
})
```
