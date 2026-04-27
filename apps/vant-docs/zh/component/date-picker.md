---
mobileDemo: date-picker/index.vue
---

# DatePicker

> `DatePicker` 是基于 Vant 官方 `DatePicker` 做的 Formily 字段封装。

:::tip 提示
为方便业务开发，组件内部使用了 `dayjs` 对日期进行了格式化，不再传入 `Date` 对象。具体说明参考API章节。
:::

## 基础使用

<<< @/zh/demos/date-picker/basic.vue

## 自定义列类型

<<< @/zh/demos/date-picker/columns-type.vue

## format 与 value-format

<<< @/zh/demos/date-picker/display-format.vue

## 自定义弹出位置

<<< @/zh/demos/date-picker/popup-position.vue

## API

### 使用约定

- `minDate` / `maxDate` 和 `modelValue` 保持一致，使用字符串并按 `value-format` 解析
- 内部会先按 `value-format` 解析字段值，再转换成 Vant `DatePicker` 需要的滚轮数组
- 如果未显式传 `value-format`，会按 `columnsType` 推导默认格式，例如 `['year', 'month'] -> 'YYYY-MM'`
- 如果未显式传 `format`，字段展示会默认复用 `value-format`
- 默认情况下，readonly / disabled 仍允许打开弹层，内部 Picker 会进入只读态；传入 `disableTriggerWhenInactive` 后，会在触发区层面阻止打开弹层。

### 封装补充 Props

| 属性名                       | 类型                                            | 描述                                      | 默认值                 |
| ---------------------------- | ----------------------------------------------- | ----------------------------------------- | ---------------------- |
| `modelValue`                 | `string \| null`                                | 当前字段值                                | `-`                    |
| `format`                     | `string`                                        | 字段展示格式                              | 与 `value-format` 一致 |
| `valueFormat`                | `string`                                        | 字段值格式，对应模板里的 `value-format`   | `YYYY-MM-DD`           |
| `placeholder`                | `string`                                        | 未选择时的展示文案                        | `'请选择日期'`         |
| `popupProps`                 | `DatePickerPopupProps`                          | 传给内部 Popup 的配置                     | `-`                    |
| `disableTriggerWhenInactive` | `boolean`                                       | 非可编辑态时是否直接禁用触发区            | `false`                |
| `displayFormatter`           | ^[Function]`(value, selectedOptions) => string` | 自定义字段展示区文案，优先级高于 `format` | `-`                    |
| `readonly`                   | `boolean`                                       | 只读态，默认允许打开只读弹层              | `false`                |
| `disabled`                   | `boolean`                                       | 禁用态，默认允许打开只读弹层              | `false`                |

### 官方 DatePicker Props

除了 `minDate` / `maxDate` 会先按字符串解析成内部需要的日期对象之外，其他的属性和插槽均可参考[Vant DatePicker 官方文档](https://vant-ui.github.io/vant/#/zh-CN/date-picker)

### Popup Props

参考[createPopup](/component/create-popup)

### Events

| 事件名              | 描述                 | 回调参数                                     |
| ------------------- | -------------------- | -------------------------------------------- |
| `update:modelValue` | 点击确认后同步字段值 | ^[Function]`(value: string \| null) => void` |
| `opened`            | 弹层打开后触发       | `-`                                          |
| `closed`            | 弹层关闭后触发       | `-`                                          |
