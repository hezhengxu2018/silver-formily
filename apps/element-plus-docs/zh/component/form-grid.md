# FormGrid

> FormGrid 组件，本组件是`@silve-fomily/grid`组件的一层封装。

::: tip 提示
在Vue中使用需要从`@silve-fomily/grid`中引入 `createGrid`，它会返回一个markRaw的formGrid实例，没有markRaw的formGrid会引起shouldVisible等监听函数无限循环执行。
:::

## Markup Schema 案例

:::demo

form-grid/markup-schema

:::

## JSON Schema 案例

:::demo

form-grid/json-schema

:::

## 原生案例

:::demo

form-grid/native

:::

## 查询表单实现案例

:::demo 这是一个简单的例子，现在可以通过 QueryForm 组件获得更好的封装。

form-grid/form

:::

## SSR / 水合稳定性建议

为了尽量减少首屏（未 connect）和水合后布局跳动，建议遵循以下规则：

1. 需要稳定列数时，优先同时设置 `minColumns` 和 `maxColumns`，并保持两者一致。
2. 使用数组断点（`minWidth`/`maxWidth`/`minColumns`/`maxColumns`）时，确保最后一项是大屏首屏的期望值。未 connect 时会按 `Infinity` 参与断点计算，通常会命中最后一个断点桶。
3. `gridSpan = -1` 的语义是“填充当前行剩余列”，不是“永远独占一整行”。如果前序单元格的占位在首屏和水合后不一致，`-1` 的落位也会变化。
4. 只配置 `minWidth`/`maxWidth` 或只配置单边列约束（仅 `minColumns` 或仅 `maxColumns`）时，布局更依赖容器真实宽度，SSR 首屏和水合后可能出现差异。若要求前后一致，建议使用固定列数策略。

## API

### FormGrid

组件继承了所有的 Grid 的配置项，详细的属性可以查看 `@silver-formily/gird`的[文档API部分](https://grid.silver-formily.org/api.html#%E6%9E%84%E9%80%A0%E5%87%BD%E6%95%B0%E9%85%8D%E7%BD%AE%E8%A1%A8)

| 属性名 | 类型   | 描述                                         | 默认值 |
| ------ | ------ | -------------------------------------------- | ------ |
| grid   | `Grid` | 外部传入 Grid 实例，用于实现更复杂的布局逻辑 | -      |

::: tip 注意

- `minWidth` 的优先级高于 `minColumns`。
- `maxWidth` 的优先级高于 `maxColumns`。
- `minWidth`/`maxWidth`/`minColumns`/`maxColumns` 的数组格式与 `breakpoints` 数组一一映射。
  :::

### FormGrid.GridColumn

| 属性名   | 类型   | 描述                                                  | 默认值 |
| -------- | ------ | ----------------------------------------------------- | ------ |
| gridSpan | number | 元素所跨列数，如果为 -1，那么会自动反向跨列填补单元格 | 1      |

### FormGrid.useFormGrid

从上下文中读取 Grid 实例

```ts
interface useFormGrid {
  (): Grid
}
```

- Grid 实例属性方法参考 [Grid 文档](https://grid.silver-formily.org/)
