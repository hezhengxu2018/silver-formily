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

#### 描述

判断某个对象是否是 Annotation，也就是判断它能否作为 `define` 的响应式标记函数来使用。

参考[define中相应章节](/api/define.html#annotations)的介绍

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
