---
mobileDemo: grid/index.vue
---

# Grid

> `Grid` 基于 `@silver-formily/grid` 做了一层 Vue/Vant 侧封装，本质上是纯 CSS Grid 表单布局，不再复用 `VanGrid`，因此不会带上白色背景、宫格卡片等 Vant 原生视觉样式。

下面两个 demo 都只使用普通 HTML 节点，方便在移动端预览里直接观察宫格布局。

## 基础使用

<<< @/zh/demos/grid/basic.vue

## 使用 Grid.GridColumn 控制跨列

<<< @/zh/demos/grid/item.vue

## API

### 使用约定

- 普通子节点会直接作为网格项参与布局，不会再额外包一层 Vant 宫格节点
- 对 Formily 而言，可以直接在 `Grid` 内部放 `Field` / `SchemaField` 产出的子节点
- 如果需要显式控制某个子节点跨列，优先使用 `Grid.GridColumn`
- 如果只想临时调一项的跨度，也可以直接在普通节点上写 `data-grid-span`
- `data-grid-span="-1"` 表示自动铺满当前行剩余列数，比较适合操作区、说明区这类尾部块

### Grid

| 属性名          | 类型                                 | 描述                           | 默认值              |
| --------------- | ------------------------------------ | ------------------------------ | ------------------- |
| `columnGap`     | `number`                             | 列间距                         | `8`                 |
| `rowGap`        | `number`                             | 行间距                         | `4`                 |
| `minColumns`    | `number \| number[]`                 | 最小列数，可配合断点数组使用   | `1`                 |
| `maxColumns`    | `number \| number[]`                 | 最大列数，可配合断点数组使用   | `∞`                 |
| `minWidth`      | `number \| number[]`                 | 单列最小宽度                   | `100`               |
| `maxWidth`      | `number \| number[]`                 | 单列最大宽度                   | `∞`                 |
| `breakpoints`   | `number[]`                           | 响应式断点配置                 | `[720, 1280, 1920]` |
| `colWrap`       | `boolean`                            | 是否允许自动换列               | `true`              |
| `strictAutoFit` | `boolean`                            | 是否使用严格自动适配列数策略   | `false`             |
| `shouldVisible` | ^[Function]`(node, grid) => boolean` | 动态控制节点显隐               | `() => true`        |
| `grid`          | `GridInstance`                       | 直接传入外部创建好的 grid 实例 | `-`                 |

### Grid.GridColumn

| 属性名     | 类型     | 描述                                               | 默认值 |
| ---------- | -------- | -------------------------------------------------- | ------ |
| `gridSpan` | `number` | 当前节点占用的列数；传 `-1` 时自动铺满当前行剩余列 | `1`    |

### createGrid

如果你需要在组件外部预先创建并复用布局实例，可以直接从 `@silver-formily/vant` 里拿到 `createGrid`：

```ts
import { createGrid, Grid } from '@silver-formily/vant'

const grid = createGrid({
  breakpoints: [768, 1024, 1440],
  maxColumns: [2, 3, 4],
  columnGap: 12,
})
```

### 参考

布局能力来自 `@silver-formily/grid`，组件封装方式对齐 `@silver-formily/element-plus` 的 `FormGrid`。
