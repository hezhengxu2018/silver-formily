---
mobileDemo: time-picker/index.vue
---

# TimePicker

> `TimePicker` 是基于 Vant 官方 `TimePicker` 做的 Formily 字段封装。

:::tip 提示

- 字段值统一保存为字符串，例如 `'09:30'`、`'09:30:15'`
- `format` 控制字段展示格式，`value-format` 控制实际写回字段的字符串格式
- `TimePicker` 内部复用 `TimePickerPanel` 作为弹层内容；如需直接展示滚轮面板，可使用 `TimePickerPanel`
- 关闭弹层时会回滚未确认的临时选择，只有点击确认按钮才会写回字段值

:::

## 基础用法

<<< @/zh/demos/time-picker/basic.vue

## 选项类型

<<< @/zh/demos/time-picker/columns-type.vue

## 时间范围

<<< @/zh/demos/time-picker/time-range.vue

## 整体时间范围

<<< @/zh/demos/time-picker/overall-range.vue

## 格式化选项

<<< @/zh/demos/time-picker/formatter.vue

## 过滤选项

<<< @/zh/demos/time-picker/filter.vue

## 高级用法

<<< @/zh/demos/time-picker/advanced.vue

## API

### 使用约定

- 内部会先按 `value-format` 解析字段值，再转换成 Vant `TimePicker` 需要的滚轮数组
- 如果未显式传 `value-format`，会按 `columnsType` 推导默认格式，例如 `['hour', 'minute'] -> 'HH:mm'`
- 如果未显式传 `format`，字段展示会默认复用 `value-format`
- `minTime` / `maxTime` 仍遵循官方格式，固定使用 `HH:mm:ss`
- 默认情况下，readonly / disabled 仍允许打开弹层，内部 Picker 会进入只读态；传入 disableTriggerWhenInactive 后，会在触发区层面阻止打开弹层。

### 封装补充 Props

| 属性名                       | 类型                                            | 描述                                      | 默认值                 |
| ---------------------------- | ----------------------------------------------- | ----------------------------------------- | ---------------------- |
| `modelValue`                 | `string \| null`                                | 当前字段值                                | `-`                    |
| `format`                     | `string`                                        | 字段展示格式                              | 与 `value-format` 一致 |
| `valueFormat`                | `string`                                        | 字段值格式，对应模板里的 `value-format`   | `HH:mm`                |
| `placeholder`                | `string`                                        | 未选择时的展示文案                        | `'请选择时间'`         |
| `popupProps`                 | `TimePickerPopupProps`                          | 传给内部 Popup 的配置                     | `-`                    |
| `disableTriggerWhenInactive` | `boolean`                                       | 非可编辑态时是否直接禁用触发区            | `false`                |
| `displayFormatter`           | ^[Function]`(value, selectedOptions) => string` | 自定义字段展示区文案，优先级高于 `format` | `-`                    |
| `readonly`                   | `boolean`                                       | 只读态，默认允许打开只读弹层              | `false`                |
| `disabled`                   | `boolean`                                       | 禁用态，默认允许打开只读弹层              | `false`                |
| `separator`                  | `string`                                        | 默认格式推导时使用的分隔符                | `':'`                  |

其他属性和插槽可以直接参考[Vant TimePicker 官方文档](https://vant-ui.github.io/vant/#/zh-CN/time-picker)

### Popup Props

参考[createPopup](/component/create-popup)

### Events

| 事件名              | 描述                     | 回调参数                                     |
| ------------------- | ------------------------ | -------------------------------------------- |
| `update:modelValue` | 点击确认后同步字段值     | ^[Function]`(value: string \| null) => void` |
| `opened`            | 弹层打开且动画结束后触发 | `-`                                          |
| `closed`            | 弹层关闭且动画结束后触发 | `-`                                          |
