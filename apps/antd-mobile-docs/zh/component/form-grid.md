---
mobileDemo: form-grid/index.tsx
---

# FormGrid

> `FormGrid` 是基于 `@silver-formily/grid` 的表单网格布局组件，支持列数约束、自适应宽度、间距和跨列。

普通 HTML 节点、`FormItem` 或 Schema 生成的节点都可以参与布局。它不依赖 antd-mobile 的 `Grid.Item`，也不需要 `FormProvider`，只有绑定表单字段时才需要表单上下文。

## 基础使用

参考 Vant 封装中的卡片布局，使用普通 HTML 节点展示两列网格。与 Vant 的 `Grid` 不同，`FormGrid` 没有 `columns` 属性；固定两列时，同时设置 `minColumns={2}` 和 `maxColumns={2}`。只设置 `maxColumns` 仍然允许容器变窄时减少列数。

<<< @/zh/demos/form-grid/basic.tsx

## 跨列布局

使用 `FormGrid.GridColumn` 的 `gridSpan` 控制跨度，也可以直接在普通子节点上设置 `data-grid-span`。

`-1` 表示填满**当前行剩余列数**，不强制另起一行；位于新行的第一项时才会占满整行。默认情况下，跨度超过当前行剩余列数时会收缩到剩余列数。

<<< @/zh/demos/form-grid/item.tsx

## Schema 表单

将布局节点声明为 `type: 'void'`，避免为布局增加一层表单数据。`FormItem` 自身支持 `gridSpan`，在 `x-decorator-props` 中配置即可，无需再包裹 `GridColumn`。

移动端多列表单推荐搭配 `FormLayout layout="vertical"`，避免水平标签挤占输入空间。示例同时展示如何继承 `FormLayout` 的网格间距。

<<< @/zh/demos/form-grid/schema.tsx

## API

### FormGrid

| 属性名          | 类型                                                   | 描述                                                  | 默认值               |
| --------------- | ------------------------------------------------------ | ----------------------------------------------------- | -------------------- |
| `minColumns`    | `number \| number[]`                                   | 最小列数                                              | `1`                  |
| `maxColumns`    | `number \| number[]`                                   | 最大列数                                              | `Infinity`           |
| `minWidth`      | `number \| number[]`                                   | 自适应计算的最小列宽，单位 px                         | `100`                |
| `maxWidth`      | `number \| number[]`                                   | 自适应计算的最大列宽，单位 px                         | `Infinity`           |
| `columnGap`     | `number`                                               | 列间距，单位 px；优先于 FormLayout 的 `gridColumnGap` | `8`                  |
| `rowGap`        | `number`                                               | 行间距，单位 px；优先于 FormLayout 的 `gridRowGap`    | `4`                  |
| `breakpoints`   | `number[]`                                             | 按网格容器宽度匹配的断点，单位 px                     | `[720, 1280, 1920]`  |
| `colWrap`       | `boolean`                                              | 是否允许换行；为 `false` 时按子项原始跨度总数排列     | `true`               |
| `strictAutoFit` | `boolean`                                              | 是否严格按宽度约束计算，并保留跨列项的目标跨度        | `false`              |
| `shouldVisible` | `(node: GridNode, grid: Grid<HTMLElement>) => boolean` | 控制子节点是否显示                                    | -                    |
| `onDigest`      | `(grid: Grid<HTMLElement>) => void`                    | 布局计算后的回调                                      | -                    |
| `onInitialized` | `(grid: Grid<HTMLElement>) => void`                    | 网格实例连接容器并初始化后的回调                      | -                    |
| `className`     | `string`                                               | 容器类名                                              | -                    |
| `style`         | `React.CSSProperties`                                  | 容器样式；列模板和间距由布局参数计算                  | -                    |
| `prefixCls`     | `string`                                               | 自定义样式前缀，需自行提供对应布局样式                | `'adm-formily-grid'` |

未显式设置间距时，会先继承 `FormLayout` 的 `gridColumnGap` / `gridRowGap`，再使用默认值。

列数和列宽传数组时，按 `breakpoints` 中第一个大于等于容器宽度的断点索引取值；数组长度不足时取最后一项，容器宽度超过所有断点时取第一项。固定移动端布局优先使用数字。

`Grid` 和 `GridNode` 类型可以从 `@silver-formily/grid` 导入。`maxRows` 也是底层选项，但不会单独隐藏超出行数的节点；需要折叠时，配合 `shouldVisible` 判断 `node.shadowRow` 与 `grid.maxRows`。这里只控制节点显示，不会移除字段或清空表单值。

### FormGrid.GridColumn

也可以从 `@silver-formily/antd-mobile` 单独导入 `GridColumn`。

| 属性名      | 类型                  | 描述                                        | 默认值 |
| ----------- | --------------------- | ------------------------------------------- | ------ |
| `gridSpan`  | `number`              | 占用列数，使用正整数；`-1` 填满当前行剩余列 | `1`    |
| `className` | `string`              | 网格项类名                                  | -      |
| `style`     | `React.CSSProperties` | 网格项样式                                  | -      |

### 使用约定

- 布局以容器的直接 DOM 子节点为网格项；额外的包装节点会作为一个整体参与布局。
- `GridColumn` 渲染为 `div`，需要放在 `FormGrid` 内才能由布局引擎处理跨度。
- `FormItem` 的 `gridSpan`、`GridColumn` 的 `gridSpan` 和普通节点的 `data-grid-span` 使用相同的跨度规则。
- 子节点增删、跨度和容器尺寸变化时会重新计算布局。
- `useGridSpan`、`useGridColumn` 为已废弃的兼容方法，不用于新代码。
