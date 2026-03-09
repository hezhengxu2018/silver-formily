# model

## Core Idea

model is an automated way to define a domain model. It is useful when you want to turn a plain object into an observable model quickly: getter/setter members become computed properties, functions become actions, and ordinary fields become deep observables.

## Description

Quickly define the domain model, and automatically declare the model attributes:

- Automatic declaration of getter/setter properties computed
- Function automatically declare action
- Common attributes are automatically declared observable

## Signature

```ts
interface model<Target extends object> {
  (target: Target): Target
}
```

## Example

```ts
import { autorun, model } from '@formily/reactive'

const obs = model({
  aa: 1,
  bb: 2,
  get cc() {
    return this.aa + this.bb
  },
  update(aa, bb) {
    this.aa = aa
    this.bb = bb
  },
})

autorun(() => {
  console.log(obs.cc)
})

obs.aa = 3

obs.update(4, 6)
```
