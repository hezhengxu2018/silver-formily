# 快速开始

## 安装

::: tip 提示
`@silver-formily/reactive-react` 迁移自 `@formily/reactive-react@2.3.7`。
:::

::: warning 注意

1. `@silver-formily/reactive-react`仅兼容`react` / `react-dom` `^18 || ^19`。
2. `@silver-formily/reactive-react`仅发布 ESM 产物，未考虑cjs等编译格式。

:::

::: code-group

```bash [pnpm]
pnpm add @silver-formily/reactive-react @silver-formily/reactive react react-dom
```

```bash [npm]
npm install @silver-formily/reactive-react @silver-formily/reactive react react-dom
```

:::

## 快速上手

```tsx
import { observable } from '@silver-formily/reactive'
import { observer } from '@silver-formily/reactive-react'

const state = observable({ count: 0 })

const Counter = observer(() => (
  <button onClick={() => state.count++}>{state.count}</button>
))
```

`observer` 包装的组件在每次渲染时收集用到的响应式字段，字段变化时只有当前组件重渲染，其余组件不受影响。
