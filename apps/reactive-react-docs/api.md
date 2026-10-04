# API

`observer` 的实现原理是用 `React.memo` 包裹传入的函数组件，渲染时在包裹层内调用 `useObserver` 收集依赖，因此会额外产生一层组件（并自动提升原组件的静态属性）。在 React 中优先使用 `observer`；只有当你需要更深地控制依赖收集（例如在自定义渲染流程中）时，才需要直接使用 `useObserver`。

`observer`、`useObserver` 以及各个兼容 hooks 都针对 StrictMode / ConcurrentMode 做了处理：实例通过垃圾回收机制兜底销毁，effect 重放不会误清理订阅。

## observer <ElTag>推荐</ElTag>

### 描述

将函数组件变成响应式组件：每次渲染收集依赖，依赖更新自动重渲染，且其他组件不受影响。返回的组件经过 `React.memo` 包裹，并提升原组件的静态属性。

### 签名

```ts
interface IObserverOptions {
  forwardRef?: boolean // 是否透传 ref，开启后包装组件接受 ref 并传给原组件
  scheduler?: (updater: () => void) => void // 调度器，可以手动控制更新时机
  displayName?: string // 包装后组件的 displayName
}

interface observer<P, Options extends IObserverOptions> {
  (component: ReactFC<P>, options?: Options): React.MemoExoticComponent<ReactFC<P>>
}
```

### 用例

:::demo
observer.tsx
:::

## Observer

### 描述

渲染组件，支持 render 函数或静态 children。适合只让局部 JSX 订阅响应式状态：`children` 是函数时，函数内部读取的响应式字段变化只会重渲染 `Observer` 内部，外层组件不重渲染。

### 签名

```ts
interface IObserverProps {
  children?: (() => React.ReactElement) | React.ReactNode
}
```

### 用例

:::demo
observerComponent.tsx
:::

## useObserver

`observer` 的内部实现。在当前组件内追踪 `view` 函数的响应式依赖，并把 `view` 的返回值作为渲染结果。

### 签名

```ts
interface IObserverOptions {
  scheduler?: (updater: () => void) => void
  displayName?: string
}

interface useObserver<T extends () => any> {
  (view: T, options?: IObserverOptions): ReturnType<T>
}
```

### 用例

:::demo
useObserver.tsx
:::

## useForceUpdate <ElTag>1.0.0</ElTag>

返回一个强制当前组件重渲染的函数。它对批处理是安全的：同一事件内多次调用只会触发一次重渲染；在 StrictMode 首次渲染期间调用会被推迟到提交之后。

### 签名

```ts
interface useForceUpdate {
  (): () => void
}
```

### 用例

:::demo
useForceUpdate.tsx
:::

## useCompatEffect <ElTag>1.0.0</ElTag>

`useEffect` 的兼容版本。在省略 `deps` 与 StrictMode 重放等场景下保证清理函数的执行时机与真实依赖变化对齐：依赖未变化时延迟清理，依赖真实变化或组件卸载时立即清理。

### 签名

```ts
import type { DependencyList, EffectCallback } from 'react'

interface useCompatEffect {
  (effect: EffectCallback, deps?: DependencyList): void
}
```

### 用例

:::demo
useCompatEffect.tsx
:::

## useCompatFactory <ElTag>1.0.0</ElTag>

在组件内创建带 `dispose` 方法的实例（例如 `Tracker`），组件真实卸载时自动 `dispose`。由于 StrictMode / ConcurrentMode 下 React 可能不触发卸载，内部通过垃圾回收机制兜底销毁实例。

### 签名

```ts
interface useCompatFactory {
  <T extends { dispose: () => void }>(factory: () => T): T
}
```

### 用例

:::demo
useCompatFactory.tsx
:::

## useDidUpdate <ElTag>1.0.0</ElTag>

`useLayoutEffect` 的包装，回调会在每次更新提交时执行（首次挂载时也会执行一次）。

### 签名

```ts
interface useDidUpdate {
  (callback?: () => void): void
}
```

## useLayoutEffect <ElTag>1.0.0</ElTag>

SSR 安全的 `useLayoutEffect`：在客户端环境使用 React 的 `useLayoutEffect`，在服务端回退为 `useEffect`，避免 SSR 告警。

### 签名

```ts
interface useLayoutEffect {
  (effect: EffectCallback, deps?: DependencyList): void
}
```
