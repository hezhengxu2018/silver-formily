---
mobileDemo: checkbox/index.vue
---

# Checkbox

> `Checkbox` 适合布尔值字段，`Checkbox.Group` 适合多选数组字段，整体延续 `dataSource + option slot + readPretty` 这套现有 Vant 封装习惯。

:::tip 提示
本组件的封装的dataSource，统一使用 `{ label, value }` 格式的对象数组
:::

## 单个复选框

<<< @/zh/demos/checkbox/single.vue

## 基础多选

<<< @/zh/demos/checkbox/basic.vue

## 排列方式与最多选择数量

<<< @/zh/demos/checkbox/max.vue

## 搭配单元格组件使用

<<< @/zh/demos/checkbox/cell.vue

## 自定义选项内容

<<< @/zh/demos/checkbox/slot.vue

## 禁用状态

<<< @/zh/demos/checkbox/status.vue

## API

### Checkbox 官方透传属性

单个 `Checkbox` 的属性、插槽、事件直接参考 [Vant Checkbox 官方文档](https://vant-ui.github.io/vant/#/zh-CN/checkbox)。

`Checkbox.Group` 透传的官方分组属性也直接参考同一页里的 Group API。

### Checkbox.Group 扩展属性

| 属性名          | 类型                       | 描述                                   | 默认值 |
| --------------- | -------------------------- | -------------------------------------- | ------ |
| `options`       | `CheckboxOption[]`         | 选项列表，通常由 `dataSource` 自动映射 | `[]`   |
| `labelPosition` | ^[enum]`'left' \| 'right'` | 统一控制选项文字相对图标的位置         | `-`    |
| `labelDisabled` | `boolean`                  | 是否禁用点击文字切换                   | `-`    |

### CheckboxOption

统一使用 `{ label, value }` 格式来描述选项。

除 `label` / `value` 之外，`CheckboxOption` 支持直接透传 Vant 单个 `Checkbox` 可用属性，具体请直接参考 [Vant Checkbox 官方文档](https://vant-ui.github.io/vant/#/zh-CN/checkbox)。

额外说明：

- 通过 `option` 作用域插槽自定义渲染时，可以继续在选项对象上挂 `description`、`tag` 这类业务字段。
- 这类额外业务字段会保留在插槽参数 `option` 上，但不会透传到内部 `VanCheckbox` DOM。
