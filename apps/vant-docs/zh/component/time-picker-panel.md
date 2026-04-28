---
mobileDemo: time-picker-panel/index.vue
---

# TimePickerPanel

> `TimePickerPanel` 是非弹出框模式的时间滚轮字段组件，复用 `TimePicker` 的字符串时间解析和格式化能力。

:::tip 提示

- `TimePickerPanel` 会直接渲染 Vant `TimePicker`，不包含触发输入框和 Popup；滚轮变化只维护临时选择，点击确认后才会写回字段值。
- 字段值统一保存为字符串，例如 `'09:30'`、`'09:30:15'`。

:::

## 基础使用

<<< @/zh/demos/time-picker-panel/basic.vue

## API

### 使用约定

- 内部会先按 `value-format` 解析字段值，再转换成 Vant `TimePicker` 需要的滚轮数组
- 如果未显式传 `value-format`，会按 `columnsType` 推导默认格式，例如 `['hour', 'minute'] -> 'HH:mm'`
- `minTime` / `maxTime` 仍遵循官方格式，固定使用 `HH:mm:ss`
- 默认显示工具栏；滚轮变化不会立即写回，点击确认后才会触发 `update:modelValue`
- `readonly` / `disabled` 会让内部滚轮进入只读态

### Props

| 属性名        | 类型             | 描述                                      | 默认值               |
| ------------- | ---------------- | ----------------------------------------- | -------------------- |
| `modelValue`  | `string \| null` | 当前字段值                                | `-`                  |
| `columnsType` | `string[]`       | 选项类型，可选 `hour`、`minute`、`second` | `['hour', 'minute']` |
| `format`      | `string`         | 展示格式，主要用于解析展示相关配置        | 与字段值一致         |
| `valueFormat` | `string`         | 字段值格式，对应模板里的 `value-format`   | `HH:mm`              |
| `minTime`     | `string`         | 可选最小时间，格式为 `HH:mm:ss`           | `-`                  |
| `maxTime`     | `string`         | 可选最大时间，格式为 `HH:mm:ss`           | `-`                  |
| `readonly`    | `boolean`        | 只读态                                    | `false`              |
| `disabled`    | `boolean`        | 禁用态                                    | `false`              |
| `showToolbar` | `boolean`        | 是否显示顶部工具栏                        | `true`               |

### 官方 TimePicker Props

除上述补充能力外，其他属性和插槽均可参考[Vant TimePicker 官方文档](https://vant-ui.github.io/vant/#/zh-CN/time-picker)。

### Events

| 事件名              | 描述                 | 回调参数                                     |
| ------------------- | -------------------- | -------------------------------------------- |
| `update:modelValue` | 点击确认后同步字段值 | ^[Function]`(value: string \| null) => void` |
| `confirm`           | 点击确认后触发       | ^[Function]`(value: string \| null) => void` |
| `cancel`            | 点击取消后触发       | `-`                                          |
