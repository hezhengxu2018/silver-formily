# API

## Grid

### 构造函数

```ts
declare const options: IGridOptions | undefined
const grid = new Grid(options)
```

### createGrid

```ts
declare const options: IGridOptions | undefined
const grid = createGrid(options)
```

- `createGrid` 是 `new Grid(options)` 的轻量封装，他返回一个markRaw的Grid实例。

### 构造函数配置表

| 选项            | 类型                                      | 默认值              | 描述                              |
| --------------- | ----------------------------------------- | ------------------- | --------------------------------- |
| `maxRows`       | `number`                                  | `Infinity`          | 最大行数                          |
| `maxColumns`    | `number \| number[]`                      | `Infinity`          | 最大列数，可按断点提供数组        |
| `minColumns`    | `number \| number[]`                      | `1`                 | 最小列数，可按断点提供数组        |
| `maxWidth`      | `number \| number[]`                      | `Infinity`          | 列最大宽度，可按断点提供数组      |
| `minWidth`      | `number \| number[]`                      | `100`               | 列最小宽度，可按断点提供数组      |
| `breakpoints`   | `number[]`                                | `[720, 1280, 1920]` | 断点数组                          |
| `columnGap`     | `number \| number[]`                      | `8`                 | 列间距，可按断点提供数组          |
| `rowGap`        | `number \| number[]`                      | `4`                 | 行间距，可按断点提供数组          |
| `colWrap`       | `boolean \| boolean[]`                    | `true`              | 是否允许自动换列                  |
| `strictAutoFit` | `boolean`                                 | `false`             | 是否严格约束在最小/最大宽度范围内 |
| `shouldVisible` | `(node: GridNode, grid: Grid) => boolean` | -                   | 自定义节点可见性                  |
| `onDigest`      | `(grid: Grid) => void`                    | -                   | 每次布局计算后触发                |
| `onInitialized` | `(grid: Grid) => void`                    | -                   | 首次初始化完成后触发              |

### connect

```ts
declare const container: HTMLElement
const dispose = grid.connect(container)
```

- 返回 `dispose`，用于解绑 `ResizeObserver` / `MutationObserver` 与清理内部状态。

## IGridOptions

```ts
interface IGridOptions {
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

  shouldVisible?: (node: GridNode, grid: Grid<HTMLElement>) => boolean
  onDigest?: (grid: Grid<HTMLElement>) => void
  onInitialized?: (grid: Grid<HTMLElement>) => void
}
```

## GridNode

```ts
type GridNode = {
  index?: number
  visible?: boolean
  column?: number
  shadowColumn?: number
  row?: number
  shadowRow?: number
  span?: number
  originSpan?: number
  element?: HTMLElement
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

## Grid Span

`data-grid-span` 用于声明节点占列规则：

- `data-grid-span="n"`: 占 `n` 列。
- `data-grid-span="-1"`: 从当前列自动填满到本行末尾（用于尾部补齐）。

下面的 demo 可以切换 `Actions` 的 `span` 为 `-1` 或 `1`，直观看到自动补齐差异：

:::demo
gridSpan
:::
