# Type Checker

## isObservable

### Description

Determine whether an object is observable

### Signature

```ts
interface isObservable {
  (target: any): boolean
}
```

## isAnnotation

### Description

Determine whether a value is an annotation, which means it can be used as a reactive marker function in `define`.

See the [corresponding section in `define`](/en/api/define.html#annotations) for details.

### Signature

```ts
interface isAnnotation {
  (target: any): boolean
}
```

### Example

```ts
import { action, batch, isAnnotation, observable } from '@formily/reactive'

console.log(isAnnotation(observable)) // true
console.log(isAnnotation(observable.computed)) // true
console.log(isAnnotation(action)) // true
console.log(isAnnotation(batch)) // true
console.log(isAnnotation(() => {})) // false
```

## isSupportObservable

### Description

Determine whether an object can be observable

### Signature

```ts
interface isSupportObservable {
  (target: any): boolean
}
```
