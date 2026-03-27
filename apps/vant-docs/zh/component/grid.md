---
mobileDemo: grid/index.vue
---

# Grid

> `Grid` 是重新封装的轻量移动端网格布局组件。

本组件精简自`@silver-formily/grid`，仅保留了必要的功能。在设计中这个Grid组件主要为`Checkbox`或者`Radio`组件提供网格布局的，而VanGrid更像是为了展示图片图标等元素设计的组件。另外，移动端表单布局更常见的是“固定列数 + 跨列”，因此这里只保留了列数、间距和跨列能力，避免把桌面端的断点、自适应宽度、节点显隐等复杂逻辑带进来。

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

| 属性名      | 类型     | 描述     | 默认值 |
| ----------- | -------- | -------- | ------ |
| `columns`   | `number` | 网格列数 | `1`    |
| `columnGap` | `number` | 列间距   | `8`    |
| `rowGap`    | `number` | 行间距   | `4`    |

### Grid.GridColumn

| 属性名     | 类型     | 描述                                               | 默认值 |
| ---------- | -------- | -------------------------------------------------- | ------ |
| `gridSpan` | `number` | 当前节点占用的列数；传 `-1` 时自动铺满当前行剩余列 | `1`    |

### 参考

组件封装方式延续了 `@silver-formily/element-plus` 的 `FormGrid` 使用习惯，但实现已经切换为更适合移动端的本地轻量版本。
