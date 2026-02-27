# API

## Grid

### Constructor

```ts
declare const options: IGridOptions | undefined
const grid = new Grid(options)
```

### Constructor Options Table

| Option          | Type                                             | Default             | Description                                  |
| --------------- | ------------------------------------------------ | ------------------- | -------------------------------------------- |
| `ssrWidth`      | `number`                                         | -                   | Estimated SSR container width                |
| `maxRows`       | `number`                                         | `Infinity`          | Maximum rows                                 |
| `maxColumns`    | `number \| number[]`                             | `Infinity`          | Maximum columns, supports breakpoint arrays  |
| `minColumns`    | `number \| number[]`                             | `1`                 | Minimum columns, supports breakpoint arrays  |
| `maxWidth`      | `number \| number[]`                             | `Infinity`          | Max column width, supports breakpoint arrays |
| `minWidth`      | `number \| number[]`                             | `100`               | Min column width, supports breakpoint arrays |
| `breakpoints`   | `number[]`                                       | `[720, 1280, 1920]` | Breakpoint list                              |
| `columnGap`     | `number \| number[]`                             | `8`                 | Column gap, supports breakpoint arrays       |
| `rowGap`        | `number \| number[]`                             | `4`                 | Row gap, supports breakpoint arrays          |
| `colWrap`       | `boolean \| boolean[]`                           | `true`              | Whether column wrapping is enabled           |
| `strictAutoFit` | `boolean`                                        | `false`             | Enforce strict min/max width boundaries      |
| `shouldVisible` | `(node: GridVisibleNode, grid: Grid) => boolean` | -                   | Custom node visibility rule                  |
| `onDigest`      | `(grid: Grid) => void`                           | -                   | Called after each layout digest              |
| `onInitialized` | `(grid: Grid) => void`                           | -                   | Called after initial layout completes        |

### connect

```ts
declare const container: HTMLElement | { value?: HTMLElement | null } | null | undefined
const dispose = grid.connect(container)
```

- Returns `dispose` to clean up `ResizeObserver` / `MutationObserver` and internal state.
- When `container` is temporarily empty (for example, a Vue template ref before mount), it returns a noop `dispose` and does not throw.

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

- `normalizeSsrNode`: fills default values required by SSR visibility checks (`span=1`, `visible=true`, etc.).
- `resolveSsrVisible`: executes `shouldVisible`, or returns `true` when no predicate is configured.

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

## Grid Runtime State

| Field             | Type      | Description                           |
| ----------------- | --------- | ------------------------------------- |
| `width`           | `number`  | Container width                       |
| `height`          | `number`  | Container height                      |
| `columns`         | `number`  | Current columns                       |
| `rows`            | `number`  | Current rows                          |
| `templateColumns` | `string`  | Current `grid-template-columns`       |
| `gap`             | `string`  | Current CSS `gap` value               |
| `breakpoint`      | `number`  | Current breakpoint index              |
| `ready`           | `boolean` | Whether initial layout has completed  |
| `hydrated`        | `boolean` | Whether hydration phase has completed |

## data-grid-span

Use `data-grid-span` on child nodes to control span:

```html
<div id="grid-container">
  <div data-grid-span="1">span 1</div>
  <div data-grid-span="2">span 2</div>
  <div data-grid-span="3">span 3</div>
</div>
```

## SSR-related Options

Behavior details and examples for `ssrWidth` and `shouldVisible` are centralized in the [SSR Guide](/en/ssr).
