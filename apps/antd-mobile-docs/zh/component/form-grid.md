---
mobileDemo: form-grid/index.tsx
---

# FormGrid

> `FormGrid` 是轻量的 CSS Grid 表单布局组件，支持固定列数、间距和跨列，不监听容器尺寸，也不依赖 `@silver-formily/grid`。

普通 HTML 节点、`FormItem` 或 Schema 生成的节点都可以参与布局。它不依赖 antd-mobile 的 `Grid.Item`，也不需要 `FormProvider`，只有绑定表单字段时才需要表单上下文。

## 基础使用

使用 `columns={2}` 创建两列布局，列宽自动均分容器可用空间。默认只有一列。

<<< @/zh/demos/form-grid/basic.tsx

## 跨列布局

使用 `FormGrid.GridColumn` 的 `gridSpan` 控制跨度，也可以直接在普通子节点上设置 `data-grid-span`。

`-1` 表示另起一行并独占整行，与 Vant 的 Grid 封装一致。正整数表示占用指定列数，当前行空间不足时自动换行；跨度应不超过 `columns`，避免 CSS Grid 创建额外的隐式列。

<<< @/zh/demos/form-grid/item.tsx

## Schema 表单

将布局节点声明为 `type: 'void'`，避免为布局增加一层表单数据。`FormItem` 自身支持 `gridSpan`，在 `x-decorator-props` 中配置即可，无需再包裹 `GridColumn`。

移动端多列表单推荐搭配 `FormLayout layout="vertical"`，避免水平标签挤占输入空间。示例同时展示如何继承 `FormLayout` 的网格间距。

<<< @/zh/demos/form-grid/schema.tsx

## API

### FormGrid

| 属性名      | 类型                  | 描述                                               | 默认值               |
| ----------- | --------------------- | -------------------------------------------------- | -------------------- |
| `columns`   | `number`              | 固定列数，四舍五入且至少为 1；非有限值回退为 1     | `1`                  |
| `columnGap` | `number`              | 列间距（px），优先于 FormLayout 的 `gridColumnGap` | `8`                  |
| `rowGap`    | `number`              | 行间距（px），优先于 FormLayout 的 `gridRowGap`    | `4`                  |
| `className` | `string`              | 容器类名                                           | -                    |
| `style`     | `React.CSSProperties` | 容器样式，列模板和间距由上述属性决定               | -                    |
| `prefixCls` | `string`              | 自定义样式前缀，需自行提供布局及跨度样式           | `'adm-formily-grid'` |

未显式设置间距时继承 FormLayout 的配置；负数或非有限间距回退为默认值，支持零间距。

从旧版迁移：固定列数改用 `columns`，移除 `minColumns`、`maxColumns`、列宽、断点、自动适配和折叠等布局引擎选项，以及 `shouldVisible`、`onDigest`、`onInitialized` 回调。节点显示由 React 条件渲染或字段的 `visible` / `display` 控制。`gridSpan={-1}` 从填满剩余列调整为独占整行。

### FormGrid.GridColumn

也可以从 `@silver-formily/antd-mobile` 单独导入 `GridColumn`。

| 属性名      | 类型                  | 描述                                | 默认值 |
| ----------- | --------------------- | ----------------------------------- | ------ |
| `gridSpan`  | `number`              | 占用列数，使用正整数；`-1` 独占整行 | `1`    |
| `className` | `string`              | 网格项类名                          | -      |
| `style`     | `React.CSSProperties` | 网格项样式                          | -      |

### 使用约定

- 布局以容器的直接 DOM 子节点为网格项；额外的包装节点会作为一个整体参与布局。
- `GridColumn` 渲染为 `div`，需要放在 `FormGrid` 内参与布局。
- `FormItem` 的 `gridSpan`、`GridColumn` 的 `gridSpan` 和普通节点的 `data-grid-span` 使用相同的跨度规则。
- 普通节点及 FormItem 的 `data-grid-span` 支持 1–24 和 -1；GridColumn 通过内联样式支持任意正整数跨度。
- 子节点增删、跨度和列数变化由浏览器的 CSS Grid 自动排版，无需 DOM 观察器。
- `useGridSpan`、`useGridColumn` 为已废弃的兼容方法，不用于新代码。
