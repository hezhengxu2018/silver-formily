# API

`observer` 的实现原理是用 `React.memo` 包裹传入的函数组件，渲染时在包裹层内调用 `useObserver` 收集依赖，因此会额外产生一层组件（并自动提升原组件的静态属性）。在 React 中优先使用 `observer`；只有当你需要更深地控制依赖收集（例如在自定义渲染流程中）时，才需要直接使用 `useObserver`。

`observer`、`useObserver` 与各个副作用 hooks（`autorunEffect`、`reactionWatch`、`useComputed`）都针对 StrictMode / ConcurrentMode 做了处理：实例通过垃圾回收机制兜底销毁，effect 重放不会误清理订阅，也不会残留重复实例。

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
  (component: (props: P & { children?: React.ReactNode }) => React.ReactNode, options?: Options): React.MemoExoticComponent<(props: P) => React.ReactNode>
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

## autorunEffect <ElTag>1.0.0</ElTag>

在组件提交后运行 `autorun`，组件卸载时自动销毁。等价于在 `useEffect` 里手动建立 `autorun`，但实例唯一性由包内部保证：StrictMode 重放 effect 时既不会误销毁，也不会残留重复实例。

tracker 闭包固定为首次渲染，适合只读取 Formily observable 的场景；需要"监听值变化"而非"自动运行"时用 `reactionWatch`。

### 签名

```ts
import type { Reaction } from '@silver-formily/reactive'

interface autorunEffect {
  (tracker: Reaction, name?: string): void
}
```

### 用例

:::demo
autorunEffect.tsx
:::

## reactionWatch <ElTag>1.0.0</ElTag>

在组件提交后建立 `reaction`，组件卸载时自动销毁。与 `autorunEffect` 的区别：只在 tracker 返回值变化时通知 subscriber，适合"监听"语义。options 透传给底层 `reaction`（如 `fireImmediately`、`equals`）。

### 签名

```ts
import type { IReactionOptions } from '@silver-formily/reactive'

interface reactionWatch<T> {
  (tracker: () => T, subscriber?: (value: T, oldValue: T) => void, options?: IReactionOptions<T>): void
}
```

### 用例

:::demo
reactionWatch.tsx
:::

## useComputed <ElTag>1.0.0</ElTag>

把 Formily 响应式表达式桥接为组件状态：返回表达式的最新值，依赖变化时触发重渲染。适合在非 `observer` 组件中消费 Formily 响应式数据的场景。

getter 应只读取 Formily observable；读取 props/state 等非响应式数据时必须通过 `options.deps` 声明，否则闭包停留在首次渲染，看不到后续更新。options 其余字段透传给底层 `reaction`。

### 签名

```ts
import type { IReactionOptions } from '@silver-formily/reactive'
import type { DependencyList } from 'react'

interface IComputedOptions<T> extends IReactionOptions<T> {
  deps?: DependencyList // getter 依赖的 props/state，变化时用新 getter 重建追踪
}

interface useComputed<T> {
  (getter: () => T, options?: IComputedOptions<T>): T
}
```

### 用例

:::demo
useComputed.tsx
:::

## useCompatEffect <ElTag>高级</ElTag>

`useEffect` 的兼容版本。在省略 `deps` 与 StrictMode 重放等场景下保证清理函数的执行时机与真实依赖变化对齐：依赖未变化时延迟清理，依赖真实变化或组件卸载时立即清理。

`@silver-formily/react` 内部用它保证 Field 的 `onMount` / `onUnmount` 不被 StrictMode 重放误触发。适合在编写自己的集成层、需要精确控制订阅生命周期时使用；普通业务组件直接用原生 `useEffect` 即可。

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

## useCompatFactory <ElTag>高级</ElTag>

在组件内创建带 `dispose` 方法的实例（例如 `Tracker`），组件真实卸载时自动 `dispose`。由于 StrictMode / ConcurrentMode 下 React 可能不触发卸载，内部通过垃圾回收机制兜底销毁实例。

`@silver-formily/react` 的 `useFormEffects` 用它把 effects 的生命周期绑定到组件上。适合"实例 + dispose"模式的外部资源（订阅、观察者、注册句柄）；普通场景用原生 `useEffect` 清理即可。

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
