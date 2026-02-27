# API

## Grid

### 构造函数

```ts
declare const options: IGridOptions | undefined
const grid = new Grid(options)
```

### 构造函数配置表

| 选项            | 类型                                             | 默认值              | 描述                              |
| --------------- | ------------------------------------------------ | ------------------- | --------------------------------- |
| `ssrWidth`      | `number`                                         | -                   | SSR 预估容器宽度                  |
| `maxRows`       | `number`                                         | `Infinity`          | 最大行数                          |
| `maxColumns`    | `number \| number[]`                             | `Infinity`          | 最大列数，可按断点提供数组        |
| `minColumns`    | `number \| number[]`                             | `1`                 | 最小列数，可按断点提供数组        |
| `maxWidth`      | `number \| number[]`                             | `Infinity`          | 列最大宽度，可按断点提供数组      |
| `minWidth`      | `number \| number[]`                             | `100`               | 列最小宽度，可按断点提供数组      |
| `breakpoints`   | `number[]`                                       | `[720, 1280, 1920]` | 断点数组                          |
| `columnGap`     | `number \| number[]`                             | `8`                 | 列间距，可按断点提供数组          |
| `rowGap`        | `number \| number[]`                             | `4`                 | 行间距，可按断点提供数组          |
| `colWrap`       | `boolean \| boolean[]`                           | `true`              | 是否允许自动换列                  |
| `strictAutoFit` | `boolean`                                        | `false`             | 是否严格约束在最小/最大宽度范围内 |
| `shouldVisible` | `(node: GridVisibleNode, grid: Grid) => boolean` | -                   | 自定义节点可见性                  |
| `onDigest`      | `(grid: Grid) => void`                           | -                   | 每次布局计算后触发                |
| `onInitialized` | `(grid: Grid) => void`                           | -                   | 首次初始化完成后触发              |

### connect

```ts
declare const container: HTMLElement | { value?: HTMLElement | null } | null | undefined
const dispose = grid.connect(container)
```

- 返回 `dispose`，用于解绑 `ResizeObserver` / `MutationObserver` 与清理内部状态。
- 当 `container` 暂时为空（例如 Vue 模板 ref 尚未挂载）时，会返回空操作 `dispose`，不会抛出异常。

## IGridOptions

```ts
interface IGridOptions {
  ssrWidth?: number

  maxRows?: number
  maxColumns?: number | number[]
  minColumns?: number | number[]
  maxWidth?: number | number[]
  minWidth?: number | number[]
  breakpoints?: number[]
  columnGap?: number
  rowGap?: number
  colWrap?: boolean
  strictAutoFit?: boolean

  shouldVisible?: (node: GridVisibleNode, grid: Grid) => boolean
  onDigest?: (grid: Grid) => void
  onInitialized?: (grid: Grid) => void
}
```

## SSR Helpers

```ts
declare const node: GridSsrNodeInput
const normalized = grid.normalizeSsrNode(node) // GridSsrNode
const visible = grid.resolveSsrVisible(node) // boolean
```

- `normalizeSsrNode`：补齐 SSR 判定所需默认值（如 `span=1`、`visible=true`）。
- `resolveSsrVisible`：执行 `shouldVisible`，未配置时默认返回 `true`。

## GridNode

```ts
type GridNode = {
  index: number
  visible: boolean
  column: number
  shadowColumn: number
  row: number
  shadowRow: number
  span: number
  originSpan: number
  element: HTMLElement
}
```

## GridVisibleNode

```ts
type GridVisibleNode = GridSsrNode | GridNode
```

## GridSsrNode

```ts
type GridSsrNode = {
  index: number
  visible: boolean
  column: number
  shadowColumn: number
  row: number
  shadowRow: number
  span: number
  originSpan: number
}
```

## GridSsrNodeInput

```ts
type GridSsrNodeInput = {
  index: number
  visible?: boolean
  column?: number
  shadowColumn?: number
  row?: number
  shadowRow?: number
  span?: number
  originSpan?: number
}
```

## Grid 实例状态

| 字段              | 类型      | 说明                         |
| ----------------- | --------- | ---------------------------- |
| `width`           | `number`  | 容器宽度                     |
| `height`          | `number`  | 容器高度                     |
| `columns`         | `number`  | 当前列数                     |
| `rows`            | `number`  | 当前行数                     |
| `templateColumns` | `string`  | 当前 `grid-template-columns` |
| `gap`             | `string`  | 当前 CSS `gap`               |
| `breakpoint`      | `number`  | 当前断点索引                 |
| `ready`           | `boolean` | 是否已执行初始化布局         |
| `hydrated`        | `boolean` | 是否已进入 hydration 后阶段  |

## data-grid-span

子节点可通过 `data-grid-span` 指定占列数：

```html
<div id="grid-container">
  <div data-grid-span="1">span 1</div>
  <div data-grid-span="2">span 2</div>
  <div data-grid-span="3">span 3</div>
</div>
```

## SSR 相关配置

`ssrWidth`、`shouldVisible` 的行为说明与示例已集中到 [SSR 指南](/ssr)。
