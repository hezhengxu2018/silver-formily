# API

`observer` 的实现原理是用 `React.memo` 包裹传入的函数组件，渲染时在包裹层内调用 `useObserver` 收集依赖，因此会额外产生一层组件（并自动提升原组件的静态属性）。在 React 中优先使用 `observer`；只有当你需要更深地控制依赖收集（例如在自定义渲染流程中）时，才需要直接使用 `useObserver`。

`observer` / `useObserver` 的 Tracker 在渲染阶段创建，通过 `useCompatFactory` 保留实例，并为未提交的渲染提供 GC 兜底。`useComputed`、`useAutorunEffect`、`useReactionWatch` 则在普通 `useEffect` 中建立追踪，清理时同步解除订阅；StrictMode 重放会先清理再重建。只有 `useCompatEffect` 会在同步重放期间保留同一份 setup 与 cleanup。

## observer <ElTag>推荐</ElTag> {#observer}

### 描述

将函数组件变成响应式组件：每次渲染收集依赖，依赖更新自动重渲染，且其他组件不受影响。返回的组件经过 `React.memo` 包裹，并提升原组件的静态属性。

### 签名

```ts
interface IObserverOptions {
  forwardRef?: boolean // 是否透传 ref，开启后包装组件接受 ref 并传给原组件
  scheduler?: (updater: () => void) => void // 调度器，可以手动控制更新时机
  displayName?: string // 包装后组件的 displayName
}

// The package declaration contains the full overloads, including generic and ref inference.
declare const observer: typeof import('@silver-formily/reactive-react').observer
```

### 组件与 ref 类型

支持普通函数组件、`memo(Component)`、`forwardRef(render)`，以及它们的嵌套组合。已有 memo 的比较函数会保留；响应式依赖变化仍能触发更新。普通函数组件的泛型调用签名和自定义静态属性会保留，`children` 应在组件 props 中显式声明。

React 19 可以直接把 ref 声明为 prop。需要同时支持 React 18 时，传入 `forwardRef` 组件或设置 `{ forwardRef: true }`；后者把 ref 合并到原函数的 props 中。声明具体的 ref 元素类型可避免传入不匹配的 ref。

```tsx
import type { Ref } from 'react'
import { observer } from '@silver-formily/reactive-react'

const Input = observer<{ value: string, ref?: Ref<HTMLInputElement> }>(
  props => <input ref={props.ref} value={props.value} readOnly />,
  { forwardRef: true },
)
```

### 用例

:::demo
observer.tsx
:::

## Observer {#observer-component}

### 描述

渲染组件，支持 render 函数或静态 children。适合只让局部 JSX 订阅响应式状态：`children` 是函数时，函数内部读取的响应式字段变化只会重渲染 `Observer` 内部，外层组件不重渲染。

### 签名

```ts
interface IObserverProps {
  children?: (() => React.ReactNode) | React.ReactNode
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

interface useObserver<T extends () => unknown> {
  (view: T, options?: IObserverOptions): ReturnType<T>
}
```

### 用例

:::demo
useObserver.tsx
:::

## useAutorunEffect <ElTag>1.0.0</ElTag> {#useautoruneffect}

组件提交后建立 `autorun`，首次建立时执行 tracker，响应式依赖变化时重跑，effect 清理时同步销毁。StrictMode 开发模式可能执行多次初始 tracker，但不会保留重复订阅。

tracker 使用最近一次提交的闭包。若 props/state 改变了追踪表达式或 observable，请通过 `options.deps` 重建追踪；只更新回调闭包不会主动触发 tracker。省略 deps 时仅在建立订阅和响应式依赖变化时执行，不会随每次渲染重建。`name` 在建立订阅时读取。

需要只在值变化时通知时使用 `useReactionWatch`。

### 签名

```ts
import type { Reaction } from '@silver-formily/reactive'
import type { DependencyList } from 'react'

interface IAutorunEffectOptions {
  name?: string // 建立订阅时传给底层 autorun
  deps?: DependencyList // 变化时重建追踪的非响应式依赖
}

declare function useAutorunEffect(tracker: Reaction, options?: IAutorunEffectOptions): void
```

### 用例

:::demo
useAutorunEffect.tsx
:::

## useReactionWatch <ElTag>1.0.0</ElTag> {#usereactionwatch}

组件提交后建立 `reaction`，effect 清理时同步销毁。默认只在 tracker 返回值变化时通知 subscriber；`fireImmediately: true` 还会在每次建立订阅时通知，`equals` 自定义相等判断。

tracker 与 subscriber 都使用最近一次提交的闭包。若只是 `onChange` 回调变化，不需要重建订阅；若切换了被观察的 store 或 tracker 依赖的 props/state，请在 `options.deps` 中声明。deps 变化会清理旧订阅、用最新选项建立新订阅，并重新建立比较基准；不会跨订阅延续 oldValue。`equals`、`name` 等选项在建立订阅时读取。

### 签名

```ts
import type { IReactionOptions } from '@silver-formily/reactive'
import type { DependencyList } from 'react'

interface IReactionWatchOptions<T> extends IReactionOptions<T> {
  deps?: DependencyList
}

declare function useReactionWatch<T>(
  tracker: () => T,
  subscriber?: (value: T, oldValue: T) => void,
  options?: IReactionWatchOptions<T>,
): void
```

### 用例

:::demo
useReactionWatch.tsx
:::

## useComputed <ElTag>1.0.0</ElTag> {#usecomputed}

把 Formily 响应式表达式桥接为组件状态：返回表达式的最新值，依赖变化时触发重渲染。适合在非 `observer` 组件中消费 Formily 响应式数据的场景。

getter 应只读取 Formily observable；读取 props/state 等非响应式数据时必须通过 `options.deps` 声明，否则闭包停留在首次渲染，看不到后续更新。其余选项（`equals`、`name`）在建立追踪时传给底层 `reaction`，deps 变化时更新。初次渲染同步计算初值，后续 deps 变化在 effect 中重建并同步当前结果，因此当前渲染可能先得到旧值。返回值可以是函数，hook 不会把它当作 state updater 执行。

`fireImmediately` 不可配置；重建追踪时始终推送当前结果。需要控制通知时机请使用 `useReactionWatch`。

### 签名

```ts
import type { IReactionOptions } from '@silver-formily/reactive'
import type { DependencyList } from 'react'

interface IComputedOptions<T> extends Omit<IReactionOptions<T>, 'fireImmediately'> {
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

为需要保留实例的集成层提供特殊的 effect 生命周期：同步 StrictMode 重放复用同一份 setup 与 cleanup，不重复创建资源。deps 变化时，在下一次 setup 前同步清理旧资源；省略 deps 时每次提交都会更新资源。最终卸载清理延迟一个微任务。依赖比较交给 React，使用逐项 `Object.is`，不会进行深比较。

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

在组件内创建带 `dispose` 方法的实例（例如 `Tracker`），组件真实卸载时自动 `dispose`。React 可能放弃尚未提交的渲染，此时不会运行 effect 清理；内部为这类实例提供 GC 兜底，回收时机不确定。已提交实例的最终卸载清理延迟一个微任务。

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
