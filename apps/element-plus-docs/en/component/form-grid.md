# FormGrid

> FormGrid component, a thin wrapper around `@silver-formily/grid`.

::: tip Tip
When using this component in Vue, import `createGrid` from `@silver-formily/grid`. It returns a `markRaw` FormGrid instance. Without `markRaw`, listeners such as `shouldVisible` can fall into infinite reactive loops.
:::

## Markup Schema Example

:::demo

../../en/demos/form-grid/markup-schema

:::

## JSON Schema Example

:::demo

../../en/demos/form-grid/json-schema

:::

## Native Example

:::demo

../../en/demos/form-grid/native

:::

## Query Form Implementation Example

:::demo This is a simple example. For a higher-level abstraction, prefer the `QueryForm` component now.

../../en/demos/form-grid/form

:::

## SSR / Hydration Stability Recommendations

To reduce layout jumps between the initial SSR render and hydration, follow these rules where possible:

1. If you need a stable number of columns, set both `minColumns` and `maxColumns`, and keep them equal.
2. When using array breakpoints (`minWidth` / `maxWidth` / `minColumns` / `maxColumns`), make sure the last item matches the desired large-screen first paint. Before `connect`, `Infinity` is used for breakpoint calculation, so the last breakpoint bucket is usually matched.
3. `gridSpan = -1` means "fill the remaining columns in the current row", not "always occupy a full row". If preceding cells occupy different spans before and after hydration, the placement of `-1` can also change.
4. If you only configure `minWidth` / `maxWidth`, or only one side of the column constraints (`minColumns` or `maxColumns`), layout depends more heavily on the real container width, so SSR and hydrated layout may differ. If you need stronger consistency, prefer a fixed-column strategy.

## API

### FormGrid

The component inherits all Grid options. For the full prop list, see the [Grid API documentation](https://grid.silver-formily.org/api.html#%E6%9E%84%E9%80%A0%E5%87%BD%E6%95%B0%E9%85%8D%E7%BD%AE%E8%A1%A8) for `@silver-formily/grid`.

| Prop   | Type   | Description                                                 | Default |
| ------ | ------ | ----------------------------------------------------------- | ------- |
| `grid` | `Grid` | Externally provided Grid instance for advanced layout logic | -       |

::: tip Note

- `minWidth` takes priority over `minColumns`.
- `maxWidth` takes priority over `maxColumns`.
- Array forms of `minWidth` / `maxWidth` / `minColumns` / `maxColumns` map one-to-one to the `breakpoints` array.
  :::

### FormGrid.GridColumn

| Prop       | Type     | Description                                                                                                       | Default |
| ---------- | -------- | ----------------------------------------------------------------------------------------------------------------- | ------- |
| `gridSpan` | `number` | Number of columns spanned by the element. When set to `-1`, it back-fills the remaining space in the current row. | `1`     |

### FormGrid.useFormGrid

Reads the Grid instance from context.

```ts
interface useFormGrid {
  (): Grid
}
```

- For Grid instance methods and properties, see the [Grid documentation](https://grid.silver-formily.org/).
