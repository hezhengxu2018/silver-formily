# Type Checker

## isObservable

#### 描述

判断某个对象是否是 observable 对象

#### 签名

```ts
interface isObservable {
  (target: any): boolean
}
```

## isAnnotation

#### 什么是 Annotation

在 `define(target, annotations)` 中，Annotation 指的是一类用于声明属性或方法响应式行为的标记函数。它不是业务数据本身，而是告诉 `define` 应该怎样包装目标成员。

常见的 Annotation 包括：

- `observable` / `observable.deep`
- `observable.shallow`
- `observable.ref`
- `observable.box`
- `observable.computed`
- `action`
- `batch`

#### 描述

判断某个对象是否是 Annotation，也就是判断它能否作为 `define` 的响应式标记函数来使用

#### 签名

```ts
interface isAnnotation {
  (target: any): boolean
}
```

#### 用例

```ts
import { action, batch, isAnnotation, observable } from '@formily/reactive'

console.log(isAnnotation(observable)) // true
console.log(isAnnotation(observable.computed)) // true
console.log(isAnnotation(action)) // true
console.log(isAnnotation(batch)) // true
console.log(isAnnotation(() => {})) // false
```

## isSupportObservable

#### 描述

判断某个对象是否可以被 observable

#### 签名

```ts
interface isSupportObservable {
  (target: any): boolean
}
```
