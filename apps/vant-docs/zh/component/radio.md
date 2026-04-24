---
mobileDemo: radio/index.vue
---

# Radio

> `Radio.Group` 是面向 Formily 单值字段的 Vant 单选框组封装，延续 `dataSource + option slot + readPretty` 这套现有组件习惯。

:::warning 使用建议
表单场景优先使用 `Radio.Group`，`dataSource` / `options` 统一使用 `{ label, value }` 对象数组。
:::

- 如果要复刻 Vant 官方“搭配单元格组件使用”的布局，可以给 `Radio.Group` 传默认插槽，内部直接放原始 `Radio` 子节点
- 如果要做宫格/卡片式选择器，也可以给 `Radio.Group` 传默认插槽，在内部配合 `Grid` 组织布局

## 基础使用

<<< @/zh/demos/radio/basic.vue

## 排列方向与样式

其中纵向示例改成了 `CellGroup + Cell + Radio` 组合，视觉上会比纯纵向堆叠更适合移动端列表场景。

<<< @/zh/demos/radio/direction.vue

## 搭配单元格组件使用

<<< @/zh/demos/radio/cell.vue

## 配合 Grid 做宫格布局

当选项更像“卡片入口”而不是普通文案时，可以给 `Radio.Group` 传默认插槽，再在内部用 `Grid + Radio` 自己组织布局。

<<< @/zh/demos/radio/grid.vue

## 自定义选项内容

<<< @/zh/demos/radio/slot.vue

## 允许再次点击取消

当某个字段本身允许“不选任何项”时，可以给 `Radio.Group` 打开 `cancelable`，让用户再次点击当前已选项时直接清空值。

<<< @/zh/demos/radio/cancelable.vue

## 禁用状态

<<< @/zh/demos/radio/status.vue

## API

### Radio.Group 扩展属性

| 属性名          | 类型                       | 描述                                   | 默认值  |
| --------------- | -------------------------- | -------------------------------------- | ------- |
| `options`       | `RadioOption[]`            | 选项列表，通常由 `dataSource` 自动映射 | `[]`    |
| `cancelable`    | `boolean`                  | 是否允许再次点击已选项时取消选中       | `false` |
| `labelPosition` | ^[enum]`'left' \| 'right'` | 统一控制选项文字相对图标的位置         | `-`     |
| `labelDisabled` | `boolean`                  | 是否禁用点击文字切换                   | `-`     |

API、插槽、事件参考 [Vant Radio 官方文档（正式站）](https://vant-ui.github.io/vant/#/zh-CN/radio)

### RadioOption

对象选项除了 `label` / `value` 之外，也支持透传 Vant 单个 `Radio` 的常见属性：

| 属性名          | 类型                       | 描述                     | 默认值 |
| --------------- | -------------------------- | ------------------------ | ------ |
| `label`         | `any`                      | 选项文案                 | `-`    |
| `value`         | `unknown`                  | 选项值                   | `-`    |
| `disabled`      | `boolean`                  | 单个选项禁用             | `-`    |
| `shape`         | ^[enum]`'round' \| 'dot'`  | 单个选项图标形状         | `-`    |
| `iconSize`      | `number \| string`         | 单个选项图标大小         | `-`    |
| `checkedColor`  | `string`                   | 单个选项选中颜色         | `-`    |
| `labelPosition` | ^[enum]`'left' \| 'right'` | 单个选项文案位置         | `-`    |
| `labelDisabled` | `boolean`                  | 单个选项是否禁用点击文案 | `-`    |
