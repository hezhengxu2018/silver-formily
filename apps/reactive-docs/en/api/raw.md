# raw

## Description

Obtain the source data from the observable object. Generally, this API is not recommended

:::warning
Note: Only the source data of the current object can be obtained, excluding deep object properties
:::

## Signature

```ts
interface raw<T extends object> {
  (target: T): T
}
```

## Example

::: demo
api/raw-en/basic
:::

### Example Code

```ts
import { observable, raw } from '@formily/reactive'

const obs = observable({})

obs.aa = { bb: 123 }

console.log(raw(obs))
console.log(raw(obs.aa))
```
