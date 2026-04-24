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

属性、插槽、事件主要参考 [Vant Checkbox 官方文档](https://vant-ui.github.io/vant/#/zh-CN/checkbox)。

### Checkbox.Group 扩展属性

| 属性名          | 类型                       | 描述                                   | 默认值 |
| --------------- | -------------------------- | -------------------------------------- | ------ |
| `options`       | `CheckboxOption[]`         | 选项列表，通常由 `dataSource` 自动映射 | `[]`   |
| `labelPosition` | ^[enum]`'left' \| 'right'` | 统一控制选项文字相对图标的位置         | `-`    |
| `labelDisabled` | `boolean`                  | 是否禁用点击文字切换                   | `-`    |

### CheckboxOption

属性、插槽、事件主要参考 [Vant Checkbox 官方文档](https://vant-ui.github.io/vant/#/zh-CN/checkbox)。
