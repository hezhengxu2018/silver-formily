# action

## Core Idea

action can be seen as a batch that does not collect dependencies. It still groups a set of writes into a single transaction, but reads inside the action do not participate in dependency tracking, which makes it a better fit for imperative update logic.

## Description

Define a batch action. The only difference with batch is that dependencies cannot be collected inside an action

## Relationship with batch

When you want to package update logic into a reusable method, `action.bound` gives you batching behavior similar to `batch`:

```ts
import { action, autorun, observable } from '@formily/reactive'

const obs = observable({})
const handler = action.bound(() => {
  obs.aa = 123
  obs.bb = 321
})

autorun(() => {
  console.log(obs.aa, obs.bb)
})

handler()
```

Only one extra reaction is triggered, even if `handler` contains more write operations.

## Signature

```ts
interface action {
  <T>(callback?: () => T): T // In-situ action
  scope: <T>(callback?: () => T) => T // In-situ local action
  bound: <T extends (...args: any[]) => any>(callback: T, context?: any) => T // High-level binding
}
```

## Example

```ts
import { action, observable } from '@formily/reactive'

const obs = observable({
  count: 0,
})

const increase = action.bound(() => {
  obs.count++
})

increase()
```
