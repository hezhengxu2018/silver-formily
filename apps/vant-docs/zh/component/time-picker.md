---
mobileDemo: time-picker/index.vue
---

# TimePicker

> `TimePicker` 是基于 `TimePickerPanel` 做的弹出层封装，大部分配置项可直接参考 `TimePickerPanel`。

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
- 触发区交互状态跟随 `Field` 的 `disabled` / `readOnly` / `readPretty`，不会透传到内部 TimePickerPanel。

### 补充 Props

| 属性名             | 类型                                            | 描述                                      | 默认值         |
| ------------------ | ----------------------------------------------- | ----------------------------------------- | -------------- |
| `placeholder`      | `string`                                        | 未选择时的展示文案                        | `'请选择时间'` |
| `popupProps`       | `TimePickerPopupProps`                          | 传给内部 Popup 的配置                     | `{}`           |
| `displayFormatter` | ^[Function]`(value, selectedOptions) => string` | 自定义字段展示区文案，优先级高于 `format` | `-`            |

时间面板相关属性和插槽可以直接参考 [TimePickerPanel](/component/time-picker-panel)，例如 `modelValue`、`columnsType`、`format`、`valueFormat`、`minTime`、`maxTime` 等。

### Popup Props

参考[createPopup](/component/create-popup)

### Events

| 事件名              | 描述                     | 回调参数                                     |
| ------------------- | ------------------------ | -------------------------------------------- |
| `update:modelValue` | 点击确认后同步字段值     | ^[Function]`(value: string \| null) => void` |
| `opened`            | 弹层打开且动画结束后触发 | `-`                                          |
| `closed`            | 弹层关闭且动画结束后触发 | `-`                                          |
