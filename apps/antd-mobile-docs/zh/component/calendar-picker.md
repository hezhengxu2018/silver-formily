---
mobileDemo: calendar-picker/index.tsx
---

# CalendarPicker

> `CalendarPicker` 是对 antd-mobile 日历选择器的 Formily 适配，支持单日和日期范围。表单值按 `format` 序列化为字符串，默认格式为 `YYYY-MM-DD`。

::: tip 提示
关于 CalendarPicker 组件的右侧箭头相关逻辑请参考 FormItem 中的[箭头与清除按钮](/component/form-item#箭头与清除按钮)
:::

## 基础使用

<<< @/zh/demos/calendar-picker/basic.tsx

## 日期范围

设置 `selectionMode="range"` 选择起止日期。字段值为两个日期字符串组成的数组，展示时以 `~` 分隔。

<<< @/zh/demos/calendar-picker/range.tsx

## 格式与日期限制

`displayRender(value, props)` 自定义编辑态和阅读态的展示内容，返回 `ReactNode`，不影响表单值。与其他 picker 一致，`format` 用于日期值的序列化和解析，也决定默认展示格式。`min`、`max` 接收原生 `Date`，`shouldDisableDate` 可禁用指定日期；本例限制为 2026 年 10 月的工作日。

<<< @/zh/demos/calendar-picker/options.tsx

## 自定义展示

`displayRender(value, props)` 同时用于编辑态和阅读态。本例将日期范围展示为 `2026/10/15 至 2026/10/18`，提交值仍为两个 `YYYY-MM-DD` 字符串组成的数组。返回 `undefined` 时使用对应状态的占位内容。

<<< @/zh/demos/calendar-picker/display.tsx

## 字段状态

禁用态不可打开弹层；只读态可打开查看，但不能修改或提交选择；阅读态仅展示格式化后的日期。空值阅读态使用 `PreviewText` 的占位配置。

<<< @/zh/demos/calendar-picker/status.tsx

## API

### 属性

| 属性名          | 类型                                                                               | 描述                                                         | 默认值         |
| --------------- | ---------------------------------------------------------------------------------- | ------------------------------------------------------------ | -------------- |
| `selectionMode` | `'single' \| 'range'`                                                              | 单日或日期范围选择；封装默认启用单日选择                     | `'single'`     |
| `format`        | `string \| ((value: Dayjs) => string)`                                             | 日期值的序列化格式及默认展示格式；字符串格式也用于解析输入值 | `'YYYY-MM-DD'` |
| `displayRender` | `(value: ICalendarPickerProps['value'], props: ICalendarPickerProps) => ReactNode` | 自定义编辑态和阅读态展示，不影响提交值                       | -              |
| `placeholder`   | `ReactNode`                                                                        | 空值占位内容                                                 | `'请选择'`     |

透传上游配置，参见 [CalendarPicker 官方文档](https://mobile.ant.design/zh/components/calendar-picker)。
