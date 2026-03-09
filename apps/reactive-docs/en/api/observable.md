# observable

> Mainly used to create observable objects with different responsive behaviors, and can be used as an annotation to define to mark responsive attributes

## Core Idea

observable is the foundation of the reactive model. By creating a subscribable object, @formily/reactive can collect dependencies when a property is read and notify subscribers when a property is written. Internally it is mainly implemented with ES Proxy, so data operations on objects can be intercepted completely.

Besides using the observable APIs directly, you can also build domain models with [define](/en/api/define) and [model](/en/api/model). Under the hood, they are still combining observable, computed, and action/batch capabilities.

## observable/observable.deep

### Description

Create deep hijacking responsive objects

### Signature

```ts
interface observable<T extends object> {
  (target: T): T
}

interface deep<T extends object> {
  (target: T): T
}
```

### Example

```ts
import { autorun, observable } from '@formily/reactive'

const obs = observable({
  aa: {
    bb: 123,
  },
})

autorun(() => {
  console.log(obs.aa.bb)
})

obs.aa.bb = 321
```

## observable.shallow

### Description

Create shallow hijacking responsive objects, that is, only respond to the first-level attribute operations of the target object

### Signature

```ts
interface shallow<T extends object> {
  (target: T): T
}
```

### Example

```ts
import { autorun, observable } from '@formily/reactive'

const obs = observable.shallow({
  aa: {
    bb: 111,
  },
})

autorun(() => {
  console.log(obs.aa.bb)
})

obs.aa.bb = 222 // will not respond
obs.aa = { bb: 333 } // can respond
```

## observable.computed

### Description

Create a calculation buffer

### Core Idea

computed can be understood as a cached reaction. As long as the observable data it depends on does not change, it keeps reusing the previous calculation result. It only recalculates when its dependencies change.

That also means a computed function should stay pure whenever possible. Its dependencies should be observable data or external constants. If it depends on ordinary external variables, changing those variables will not trigger a recalculation.

### Signature

```ts
interface computed {
  <T extends () => any>(target: T): { value: ReturnType<T> }
  <T extends { get?: () => any, set?: (value: any) => void }>(target: T): {
    value: ReturnType<T['get']>
  }
}
```

### Example

```ts
import { autorun, observable } from '@formily/reactive'

const obs = observable({
  aa: 11,
  bb: 22,
})

const computed = observable.computed(() => obs.aa + obs.bb)

autorun(() => {
  console.log(computed.value)
})

obs.aa = 33
```

## observable.ref

### Description

Create reference hijacking responsive objects

### Signature

```ts
interface ref<T extends object> {
  (target: T): { value: T }
}
```

### Example

```ts
import { autorun, observable } from '@formily/reactive'

const ref = observable.ref(1)

autorun(() => {
  console.log(ref.value)
})

ref.value = 2
```

## observable.box

### Description

Similar to ref, except that the data is read and written through the get/set method

### Signature

```ts
interface box<T extends object> {
  (target: T): { get: () => T, set: (value: T) => void }
}
```

### Example

```ts
import { autorun, observable } from '@formily/reactive'

const box = observable.box(1)

autorun(() => {
  console.log(box.get())
})

box.set(2)
```
