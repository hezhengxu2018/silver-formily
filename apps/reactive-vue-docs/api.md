# API

`observer` 的实现原理是对传入的组件返回一个包裹组件（HOC），在组件内调用 `useObserver` 因此会额外产生一层组件。如果你正在封装组件，那么在组件内使用 `useObserver` 来实现响应式的同步是更直接的方式。 `observer` 本身是`@formily/vue` 为了兼容 Vue2 的实现所产生的，在 Vue3 的封装中应该优先使用 `useObserver`。

另外 `useObserver` 内部使用了 Vue3 未暴露的接口改写了内部响应式的更新方式。如果你不希望使用 hack 的方式解决响应式同步的问题，那么使用`formilyComputed`是更透明直接的选择，对于自己封装的组件基本都可以绕过`useObserver`的使用。

## observer

### 描述

在 Vue 中，将组件渲染方法变成 Reaction，每次视图重新渲染就会收集依赖，依赖更新会自动重渲染。

### 签名

```ts
interface IObserverOptions {
  scheduler?: (updater: () => void) => void // 调度器，可以手动控制更新时机
  name?: string // 包装后的组件的name
}

interface observer<T extends VueComponent> {
  (component: T, options?: IObserverOptions): T
}
```

### 用例

:::demo
observer
:::

## useObserver <ElTag>推荐</ElTag>

observer的内部实现，目前更推荐使用这种方式，可以减少不必要的组件包裹。

### 签名

```ts
// 与observer一致
interface IObserverOptions {
  scheduler?: (updater: () => void) => void
  name?: string // 包装后的组件的name
}

interface useObserver {
  (options?: IObserverOptions): void
}
```

### 用例

:::demo
useObserver
:::

## formilyComputed <ElTag>1.0.0</ElTag>

将一个 `@formily/reactive`的响应式转为 Vue3 的响应式（ComputedRef）。在Vue3中可以完全替代 `observable.computed`

### 签名

```ts
import type { IReactionOptions } from '@formily/reactive'
import type { ComputedRef } from 'vue'

// options 默认值为 { fireImmediately: true }
interface formilyComputed {
  (tracker: () => T, options?: IReactionOptions): ComputedRef<T>
}
```

### 用例

:::demo
formilyComputed
:::

## autorunEffect <ElTag>1.1.0</ElTag>

将 `autorun` 封装成 Vue 组合式函数。它会在 `setup()` 或活动中的 effect scope 内立即建立订阅，并在对应作用域释放时自动调用 `dispose`，同时返回一个可提前手动停止的清理函数。

### 签名

```ts
import type { Dispose, Reaction } from '@formily/reactive'

interface autorunEffect {
  (tracker: Reaction, name?: string): Dispose
}
```

### 用例

:::demo
autorunEffect
:::

## reactionWatch <ElTag>1.1.0</ElTag>

将 `reaction` 封装成 Vue 组合式函数。和原始 API 一样支持 `tracker`、`subscriber` 与 `options`，差别在于它会自动注册作用域清理，避免组件卸载或作用域结束后遗留订阅。

### 签名

```ts
import type { Dispose, IReactionOptions } from '@formily/reactive'

interface reactionWatch {
  <T>(
    tracker: () => T,
    subscriber?: (value: T, oldValue: T) => void,
    options?: IReactionOptions<T>,
  ): Dispose
}
```

### 用例

:::demo
reactionWatch
:::
