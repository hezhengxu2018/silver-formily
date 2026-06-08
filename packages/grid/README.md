# @silver-formily/grid

> 用于响应式计算表单网格布局的 Silver Formily Grid 运行时。

::: tip 迁移说明
从 `3.x` 版本开始，`@silver-formily/grid` 的响应式依赖已经完全迁移到 `@silver-formily/reactive`。安装、示例和工程接入都应使用 `@silver-formily/*` 命名空间。
:::

## 安装

```bash
pnpm add @silver-formily/grid @silver-formily/reactive
```

## 快速开始

```ts
import { createGrid } from '@silver-formily/grid'

const grid = createGrid({
  minColumns: 2,
  maxColumns: 4,
  minWidth: 120,
  maxWidth: 240,
})

const dispose = grid.connect(container)
```

`createGrid` 会返回一个通过 `markRaw` 处理过的实例，更适合放进 Vue 组件状态中，避免被深层代理再次包裹。
