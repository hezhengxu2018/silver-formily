# API

## Grid

### Constructor

```ts
declare const options: IGridOptions | undefined
const grid = new Grid(options)
```

### Constructor Options Table

| Option          | Type                                      | Default             | Description                                  |
| --------------- | ----------------------------------------- | ------------------- | -------------------------------------------- |
| `maxRows`       | `number`                                  | `Infinity`          | Maximum rows                                 |
| `maxColumns`    | `number \| number[]`                      | `Infinity`          | Maximum columns, supports breakpoint arrays  |
| `minColumns`    | `number \| number[]`                      | `1`                 | Minimum columns, supports breakpoint arrays  |
| `maxWidth`      | `number \| number[]`                      | `Infinity`          | Max column width, supports breakpoint arrays |
| `minWidth`      | `number \| number[]`                      | `100`               | Min column width, supports breakpoint arrays |
| `breakpoints`   | `number[]`                                | `[720, 1280, 1920]` | Breakpoint list                              |
| `columnGap`     | `number \| number[]`                      | `8`                 | Column gap, supports breakpoint arrays       |
| `rowGap`        | `number \| number[]`                      | `4`                 | Row gap, supports breakpoint arrays          |
| `colWrap`       | `boolean \| boolean[]`                    | `true`              | Whether column wrapping is enabled           |
| `strictAutoFit` | `boolean`                                 | `false`             | Enforce strict min/max width boundaries      |
| `shouldVisible` | `(node: GridNode, grid: Grid) => boolean` | -                   | Custom node visibility rule                  |
| `onDigest`      | `(grid: Grid) => void`                    | -                   | Called after each layout digest              |
| `onInitialized` | `(grid: Grid) => void`                    | -                   | Called after initial layout completes        |

### connect

```ts
declare const container: HTMLElement
const dispose = grid.connect(container)
```

- Returns `dispose` to clean up `ResizeObserver` / `MutationObserver` and internal state.

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

## Grid Runtime State

| Field             | Type      | Description                          |
| ----------------- | --------- | ------------------------------------ |
| `width`           | `number`  | Container width                      |
| `height`          | `number`  | Container height                     |
| `columns`         | `number`  | Current columns                      |
| `rows`            | `number`  | Current rows                         |
| `templateColumns` | `string`  | Current `grid-template-columns`      |
| `gap`             | `string`  | Current CSS `gap` value              |
| `breakpoint`      | `number`  | Current breakpoint index             |
| `ready`           | `boolean` | Whether initial layout has completed |

## Grid Span

`data-grid-span` defines how many columns a node occupies:

- `data-grid-span="n"`: Occupy `n` columns.
- `data-grid-span="-1"`: Auto-fill from the current column to the end of the row.

The demo below toggles the `Actions` block between `-1` and `1` so you can compare the layout behavior:

:::demo
gridSpan
:::
