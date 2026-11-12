# FormGrid

> Form表单Grid布局组件

## Markup Schema 案例

:::demo
form-grid/markup-schema.tsx
:::

## JSON Schema 案例

:::demo
form-grid/json-schema.tsx
:::

## 原生案例

:::demo
form-grid/native.tsx
:::

## 查询表单实现案例

:::demo
form-grid/query-form.tsx
:::

## API

### FormGrid

`IFormGridProps` 继承 `@silver-formily/grid` 的 `IGridOptions` 和 React 的 `HTMLAttributes<HTMLDivElement>`，支持 `children`、`className`、`style`、事件以及 `data-*` / `aria-*`。

| 属性          | 类型                                                   | 描述                                                 | 默认值              |
| ------------- | ------------------------------------------------------ | ---------------------------------------------------- | ------------------- |
| minWidth      | `number \| number[]`                                   | 单元格最小宽度，单位 px                              | `100`               |
| maxWidth      | `number \| number[]`                                   | 单元格最大宽度                                       | `Infinity`          |
| minColumns    | `number \| number[]`                                   | 最小列数                                             | `1`                 |
| maxColumns    | `number \| number[]`                                   | 最大列数                                             | `Infinity`          |
| breakpoints   | `number[]`                                             | 容器宽度断点                                         | `[720, 1280, 1920]` |
| columnGap     | `number`                                               | 列间距，单位 px                                      | `8`                 |
| rowGap        | `number`                                               | 行间距，单位 px                                      | `4`                 |
| colWrap       | `boolean`                                              | 是否自动换行；关闭时按子项原始跨列总数布局           | `true`              |
| strictAutoFit | `boolean`                                              | 严格按配置的宽度范围布局                             | `false`             |
| maxRows       | `number`                                               | 供外部折叠逻辑读取的最大行数；需要配合 shouldVisible | `Infinity`          |
| shouldVisible | `(node: GridNode, grid: Grid<HTMLElement>) => boolean` | 按网格节点信息控制显示                               | 不额外隐藏          |
| onInitialized | `(grid: Grid<HTMLElement>) => void`                    | 首次连接并初始化后调用                               | —                   |
| onDigest      | `(grid: Grid<HTMLElement>) => void`                    | 每次测量、重新计算后调用                             | —                   |
| grid          | `Grid<HTMLElement>`                                    | 外部实例，优先于其他网格配置                         | —                   |

数组配置与容器断点对应；高于最后一个断点时，运行时使用数组第一项。数组长度不足时，命中的桶使用数组最后一项。详情见 [Grid 配置与断点文档](https://grid.silver-formily.org/)。

网格会直接管理子项的 `gridColumn` 和 `display`，不要同时手动覆盖这些样式。`FormItem` 可通过 `gridSpan` 直接跨列，不必再包一层 GridColumn。

### FormGrid.GridColumn / GridColumn

| 属性     | 类型     | 描述                          | 默认值 |
| -------- | -------- | ----------------------------- | ------ |
| gridSpan | `number` | 跨列数；`-1` 填满当前行剩余列 | `1`    |

其余属性透传至 div，包括 `children`、`className`、`style`、事件及自定义 data 属性。使用 `data-grid-span` 与运行时同步跨度。

### FormGrid.createFormGrid / createFormGrid

```ts
import type { Grid, IGridOptions } from '@silver-formily/grid'

declare function createFormGrid(options?: IGridOptions): Grid<HTMLElement>
```

创建独立网格实例。React 中请用 `useMemo` 或 `useState` 保持实例稳定，再传给 `grid`。实例的响应式属性可以直接修改；需要读取并渲染它们的组件应使用 `@silver-formily/reactive-react` 的 `observer` 包装。

### FormGrid.useFormGrid / useFormGrid

```ts
declare function useFormGrid(): Grid<HTMLElement> | undefined
```

读取最近一层 FormGrid 的实例，在网格之外返回 undefined。
