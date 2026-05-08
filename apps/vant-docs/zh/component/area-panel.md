---
mobileDemo: area-panel/index.vue
---

# AreaPanel

> 为了统一封装风格而独立的组件，大部分情况下应该配合 `PickerGroup` 使用，独立的弹出式封装请参考 `Area`。

:::tip 提示
`AreaPanel` 不包含触发输入框和 Popup；滚轮变化只维护临时选择，点击确认后才会写回字段值。
:::

## 基础使用

<<< @/zh/demos/area-panel/basic.vue

## API

### 使用约定

- `areaList` 与 Vant 官方 `Area` 保持一致，可以直接传入 `@vant/area-data` 的 `areaList`
- `dataSource` 会自动映射为 `areaList`
- 默认显示工具栏；滚轮变化不会立即写回，点击确认后才会触发 `update:modelValue`
- `readonly` / `disabled` 会让内部滚轮进入只读态

### Props

| 属性名               | 类型             | 描述                         | 默认值  |
| -------------------- | ---------------- | ---------------------------- | ------- |
| `modelValue`         | `string \| null` | 当前区域编码                 | `-`     |
| `areaList`           | `AreaList`       | 省市区数据                   | `{}`    |
| `columnsNum`         | `number`         | 显示列数，可选 `1`、`2`、`3` | `3`     |
| `columnsPlaceholder` | `string[]`       | 列占位提示                   | `[]`    |
| `readonly`           | `boolean`        | 只读态                       | `false` |
| `disabled`           | `boolean`        | 禁用态                       | `false` |
| `showToolbar`        | `boolean`        | 是否显示顶部工具栏           | `true`  |

除上述补充能力外，其他属性和插槽均可参考[Vant Area 官方文档](https://vant-ui.github.io/vant/#/zh-CN/area)。
