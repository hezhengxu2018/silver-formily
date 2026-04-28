---
mobileDemo: date-picker-panel/index.vue
---

# DatePickerPanel

> `DatePickerPanel` 是非弹出框模式的日期滚轮字段组件，复用 `DatePicker` 的字符串日期解析和格式化能力。

:::tip 提示

- `DatePickerPanel` 会直接渲染 Vant `DatePicker`，不包含触发输入框和 Popup；滚轮变化只维护临时选择，点击确认后才会写回字段值。

- 为方便业务开发，组件内部使用了 `dayjs` 对日期进行了格式化，不再传入 `Date` 对象。具体说明参考API章节。

:::

## 基础使用

<<< @/zh/demos/date-picker-panel/basic.vue

## API

### 使用约定

- `minDate` / `maxDate` 和 `modelValue` 保持一致，使用字符串并按 `value-format` 解析
- 内部会先按 `value-format` 解析字段值，再转换成 Vant `DatePicker` 需要的滚轮数组
- 如果未显式传 `value-format`，会按 `columnsType` 推导默认格式，例如 `['year', 'month'] -> 'YYYY-MM'`
- 默认显示工具栏；滚轮变化不会立即写回，点击确认后才会触发 `update:modelValue`
- `readonly` / `disabled` 会让内部滚轮进入只读态

### Props

| 属性名        | 类型             | 描述                                    | 默认值       |
| ------------- | ---------------- | --------------------------------------- | ------------ |
| `modelValue`  | `string \| null` | 当前字段值                              | `-`          |
| `format`      | `string`         | 展示格式，主要用于解析展示相关配置      | 与字段值一致 |
| `valueFormat` | `string`         | 字段值格式，对应模板里的 `value-format` | `YYYY-MM-DD` |
| `minDate`     | `string`         | 可选最小日期                            | 十年前       |
| `maxDate`     | `string`         | 可选最大日期                            | 十年后       |
| `readonly`    | `boolean`        | 只读态                                  | `false`      |
| `disabled`    | `boolean`        | 禁用态                                  | `false`      |
| `showToolbar` | `boolean`        | 是否显示顶部工具栏                      | `true`       |

### 官方 DatePicker Props

除了 `minDate` / `maxDate` 会先按字符串解析成内部需要的日期对象之外，其他属性和插槽均可参考[Vant DatePicker 官方文档](https://vant-ui.github.io/vant/#/zh-CN/date-picker)

### Events

| 事件名              | 描述                 | 回调参数                                     |
| ------------------- | -------------------- | -------------------------------------------- |
| `update:modelValue` | 点击确认后同步字段值 | ^[Function]`(value: string \| null) => void` |
| `confirm`           | 点击确认后触发       | ^[Function]`(value: string \| null) => void` |
| `cancel`            | 点击取消后触发       | `-`                                          |
