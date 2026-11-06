# FormGrid

> FormGrid 组件

::: warning 特别说明：与官方实现的差异

- 参考本仓库 Element Plus 的 FormGrid 封装，使用 `@silver-formily/grid` 运行时，默认最小列数为 1；断点按容器宽度计算。
- `gridSpan={-1}` 表示填满当前行的剩余列，不是始终独占一整行。普通跨列在默认模式下会被限制到当前行剩余列数。
- 传入 `grid` 时，以该实例的配置为准，其余网格配置不覆盖外部实例。一个实例应只连接一个已挂载的 FormGrid。
- 内部样式使用 `silver-formily-form-grid` ，不随 ConfigProvider 的前缀改变，不兼容旧 Less 样式覆盖。挂载后才连接 DOM 观察器，服务端首屏不会测量容器。

:::

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

::: tip 示例适配说明
沿用官方的外部网格实例、展开收起和操作栏补位逻辑。日期查询使用 DatePicker 与 RangePicker，字段值为 Dayjs，保留字段数量及跨列配置。隐藏查询项只影响布局，字段值仍保留在表单模型中。
:::

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

## SSR 与水合

与 Element Plus 封装一样，布局依赖挂载后的真实容器宽度。需要稳定首屏列数时，同时设置相等的 `minColumns` 和 `maxColumns`。未连接时使用最后一个断点桶作为首屏回退；响应式数组或 `gridSpan={-1}` 的落位可能在测量后改变。

## 文档来源

介绍和示例主体来自 [Alibaba Formily FormGrid 中文文档](https://github.com/alibaba/formily/blob/d9a46442a575aa5f0fc1bd945e34d9a85d191d0e/packages/antd/docs/components/FormGrid.zh-CN.md)，遵循 [MIT 许可](/licenses/formily-MIT.txt)。API 根据本仓库实际实现整理；封装参考 `packages/element-plus/src/form-grid`。
