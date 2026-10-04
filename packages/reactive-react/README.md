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
- `useForceUpdate` —— 批处理安全的强制更新 hook
- `useCompatEffect` / `useCompatFactory` / `useDidUpdate` / `useLayoutEffect` —— 兼容 StrictMode/ConcurrentMode 的内部 hooks（同样公开导出）
- 类型：`IObserverOptions`、`IObserverProps`、`ReactFC` 等

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

## 文档

- Repository: <https://github.com/hezhengxu2018/silver-formily>

## License

MIT
