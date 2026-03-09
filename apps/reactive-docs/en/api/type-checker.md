# Type Checker

## isObservable

#### Description

Determine whether an object is observable

#### Signature

```ts
interface isObservable {
  (target: any): boolean
}
```

## isAnnotation

#### What is an Annotation

In `define(target, annotations)`, an annotation is a marker function used to declare the reactive behavior of a property or method. It is not the business data itself. Instead, it tells `define` how the target member should be wrapped.

Common annotations include:

- `observable` / `observable.deep`
- `observable.shallow`
- `observable.ref`
- `observable.box`
- `observable.computed`
- `action`
- `batch`

#### Description

Determine whether a value is an annotation, which means it can be used as a reactive marker function in `define`

#### Signature

```ts
interface isAnnotation {
  (target: any): boolean
}
```

#### Example

```ts
import { action, batch, isAnnotation, observable } from '@formily/reactive'

console.log(isAnnotation(observable)) // true
console.log(isAnnotation(observable.computed)) // true
console.log(isAnnotation(action)) // true
console.log(isAnnotation(batch)) // true
console.log(isAnnotation(() => {})) // false
```

## isSupportObservable

#### Description

Determine whether an object can be observable

#### Signature

```ts
interface isSupportObservable {
  (target: any): boolean
}
```
