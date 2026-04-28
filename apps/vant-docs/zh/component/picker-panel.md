---
mobileDemo: picker-panel/index.vue
---

# PickerPanel

> `PickerPanel` 是非弹出框模式的选项滚轮字段组件，复用 `Picker` 的选项归一化和值形态适配能力。

:::tip 提示

- `PickerPanel` 会直接渲染 Vant `Picker`，不包含触发输入框和 Popup；滚轮变化只维护临时选择，点击确认后才会写回字段值。
- `Field` 上的 `dataSource` 会自动映射到 `columns`。

:::

## 基础使用

<<< @/zh/demos/picker-panel/basic.vue

## API

### 使用约定

- 单列字段值是 `string | number | null`，多列 / 级联字段值是 `Array<string | number> | null`
- 支持 `{ label, value }`、`{ label, name }` 的选项形态，同时兼容官方 `PickerOption` 字段
- 默认显示工具栏；滚轮变化不会立即写回，点击确认后才会触发 `update:modelValue`
- `readonly` / `disabled` 会让内部滚轮进入只读态

### 补充 Props

| 属性名              | 类型                                                  | 描述                             | 默认值     |
| ------------------- | ----------------------------------------------------- | -------------------------------- | ---------- |
| `modelValue`        | `string \| number \| Array<string \| number> \| null` | 当前字段值                       | `-`        |
| `columns`           | `PickerColumn \| PickerColumn[]`                      | 选项列，通常由 `dataSource` 提供 | `[]`       |
| `columnsFieldNames` | ^[object]`{ text, value, children }`                  | 自定义字段名映射                 | 官方默认值 |
| `readonly`          | `boolean`                                             | 只读态                           | `false`    |
| `disabled`          | `boolean`                                             | 禁用态                           | `false`    |
| `showToolbar`       | `boolean`                                             | 是否显示顶部工具栏               | `true`     |

### 官方 Picker Props

除上述补充能力外，Picker 选项结构、滚轮交互和已透传的官方属性 / 插槽可参考 [Vant Picker 官方文档](https://vant-ui.github.io/vant/#/zh-CN/picker)。

### Events

| 事件名              | 描述                 | 回调参数                                                                          |
| ------------------- | -------------------- | --------------------------------------------------------------------------------- |
| `update:modelValue` | 点击确认后同步字段值 | ^[Function]`(value: string \| number \| Array<string \| number> \| null) => void` |
| `confirm`           | 点击确认后触发       | ^[Function]`(value: string \| number \| Array<string \| number> \| null) => void` |
| `cancel`            | 点击取消后触发       | `-`                                                                               |
