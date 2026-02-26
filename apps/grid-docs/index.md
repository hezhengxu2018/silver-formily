# 快速开始

`@silver-formily/grid` 用于根据容器尺寸和子节点 `span` 动态计算网格布局。

## 安装

::: code-group

```bash [pnpm]
pnpm add @silver-formily/grid @formily/reactive
```

```bash [npm]
npm install @silver-formily/grid @formily/reactive
```

:::

## 基础用法

```ts
import { Grid } from '@silver-formily/grid'

const grid = new Grid({
  minColumns: 2,
  maxColumns: 4,
  minWidth: 120,
  maxWidth: 220,
})

const dispose = grid.connect(container)
```

::: warning Vue 使用提示
在 Vue 中建议将 `Grid` 实例保持为非深响应式对象（例如普通局部变量、`shallowRef`、或 `markRaw(new Grid(...))`），避免因响应式代理导致副作用回调重复触发。
:::

:::demo
basicGrid
:::

## SSR 与 Hydration

SSR / Hydration 的详细配置和示例已集中到 [SSR 指南](/ssr)。
