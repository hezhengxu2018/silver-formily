# @silver-formily/reactive-react

[English README](./README.en.md)

## 概述

`@silver-formily/reactive-react` 实现 Silver Formily 响应式引擎与 React 渲染管线之间的桥接层，迁移自 `@formily/reactive-react@2.3.7`。它通过 `observer` 高阶组件与 `useObserver` hooks 将细粒度依赖追踪接入组件渲染。

## 运行时定位

该包位于响应式引擎与 React 渲染层之间：

- 以下层 `@silver-formily/reactive` 为状态和依赖模型
- 可直接服务于任何 React 18/19 组件或自定义 renderer

## 公开 API

- `observer` —— 高阶组件，包装函数组件获得响应式重渲染能力
- `Observer` —— 渲染组件，支持 render 函数或静态 children
- `useObserver` —— 核心 hook，在当前组件内追踪 view 函数的响应式依赖
- `useComputed` —— 返回响应式派生值，支持通过 deps 重建追踪
- `useAutorunEffect` / `useReactionWatch` —— 提交后建立副作用或值监听
- `useCompatEffect` / `useCompatFactory` —— 用于集成层实例生命周期管理的高级 hooks
- 类型：`IObserverOptions`、`IObserverProps`、`IComputedOptions`、`IAutorunEffectOptions`、`IReactionWatchOptions`

## 与上游 @formily/reactive-react 的差异

- hooks 导出**不带** `unstable_` 前缀
- peer 依赖为 `react` / `react-dom` `^18 || ^19`，移除了 `react-is`（`hoist-non-react-statics` 自带）
- 仅发布 ESM 产物（`dist/index.mjs` + `dist/index.d.ts`）

## 安装

```bash
pnpm add @silver-formily/reactive-react @silver-formily/reactive react react-dom
```

## 快速上手

```tsx
import { observable } from '@silver-formily/reactive'
import { observer } from '@silver-formily/reactive-react'

const state = observable({ count: 0 })

const Counter = observer(() => (
  <button onClick={() => state.count++}>{state.count}</button>
))
```

## Hooks 与类型约定

- `observer` 支持函数组件、`memo` 和 `forwardRef`，保留 memo 比较函数。普通函数组件的泛型签名、自定义静态属性和声明的 ref 类型会保留。React 19 可以直接声明 ref prop；React 18 需要传入 `forwardRef` 组件或设置 `{ forwardRef: true }`。
- `Observer` 的 render prop 可返回任意 `ReactNode`，包括 `null`、字符串和数组。
- `useComputed(getter, { deps, equals, name })` 返回响应式表达式的当前值，也支持函数值。`deps` 变化时使用最新 getter 和选项重建追踪；`fireImmediately` 不再是可配置选项，重建时总会同步当前值。
- `useAutorunEffect(tracker, { name, deps }?)`、`useReactionWatch(tracker, subscriber?, { deps, ...options }?)` 在 effect 提交后建立追踪，清理时同步解除订阅。回调读取最近一次提交的 props/state；如果 props/state 改变了需要追踪的 observable 或表达式，请传入 deps，以便立即重建追踪。省略 deps 不会在每次渲染时重建。
- `useCompatEffect` 用于需要保留实例的特殊场景：同步 StrictMode 重放复用同一份 setup 和 cleanup，最终清理延迟一个微任务。普通副作用应优先使用 React 的 `useEffect`。

下面的 `store` 由父组件传入，应是 Formily observable。所有 hooks 都在组件内调用。

```tsx
import { useComputed, useReactionWatch } from '@silver-formily/reactive-react'

function Price({ store, multiplier, onChange }: {
  store: { price: number }
  multiplier: number
  onChange: (price: number) => void
}) {
  useReactionWatch(() => store.price, onChange, { deps: [store] })
  const total = useComputed(() => store.price * multiplier, {
    deps: [store, multiplier],
  })
  return <output>{total}</output>
}
```

## 文档

- [中文 API 文档](https://reactive-react.silver-formily.org/api)
- [变更记录](./CHANGELOG.md)
- Repository: <https://github.com/hezhengxu2018/silver-formily>

## License

MIT
