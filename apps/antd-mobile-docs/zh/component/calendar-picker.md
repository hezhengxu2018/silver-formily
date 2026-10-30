---
mobileDemo: calendar-picker/index.tsx
---

# CalendarPicker

> `CalendarPicker` 是对 antd-mobile 日历选择器的 Formily 适配，支持单日和日期范围。表单值按 `format` 序列化为字符串，默认格式为 `YYYY-MM-DD`。

## 基础使用

点击表单行打开日历，点击确认后更新字段值。选择过程只更新弹层内的草稿，关闭弹层不会提交；再次打开时从当前字段值开始选择。

<<< @/zh/demos/calendar-picker/basic.tsx

## 日期范围

设置 `selectionMode="range"` 选择起止日期。字段值为两个日期字符串组成的数组，展示时以 `~` 分隔。

<<< @/zh/demos/calendar-picker/range.tsx

## 格式与日期限制

`format` 同时控制日期展示与提交格式。`min`、`max` 接收原生 `Date`，`shouldDisableDate` 可禁用指定日期；本例限制为 2026 年 10 月的工作日。

<<< @/zh/demos/calendar-picker/options.tsx

## 字段状态

禁用态不可打开弹层；只读态可打开查看，但不能修改或提交选择；阅读态仅展示格式化后的日期。空值阅读态使用 `PreviewText` 的占位配置。

<<< @/zh/demos/calendar-picker/status.tsx

## 清空

在 `FormItem` 上配置 `clearable: true`，清空后字段值为 `undefined`，不会打开弹层。Schema 写法为 `x-decorator-props: { clearable: true }`。

日历自身的 `allowClear` 控制能否再次点击已选日期取消选择；取消选择后点击确认，字段值为 `null`。它与表单项右侧的清除按钮独立。

## API

### 属性

| 属性名          | 类型                                                                             | 描述                                                           | 默认值         |
| --------------- | -------------------------------------------------------------------------------- | -------------------------------------------------------------- | -------------- |
| `selectionMode` | `'single' \| 'range'`                                                            | 单日或日期范围选择                                             | `'single'`     |
| `value`         | `string \| Date \| Dayjs \| null` 或上述日期类型组成的二元组                     | 单日模式接收单个日期，范围模式接收起止日期；表单场景由字段管理 | -              |
| `format`        | `string \| ((value: Dayjs) => string)`                                           | 日期展示和输出格式；字符串格式也用于解析输入值                 | `'YYYY-MM-DD'` |
| `placeholder`   | `ReactNode`                                                                      | 空值占位内容                                                   | `'请选择'`     |
| `disabled`      | `boolean`                                                                        | 禁止打开选择器                                                 | `false`        |
| `readOnly`      | `boolean`                                                                        | 允许查看弹层，禁止修改和提交                                   | `false`        |
| `onChange`      | `(value: string \| null) => void` 或 `(value: [string, string] \| null) => void` | 确认时触发，返回格式化后的表单值，类型随选择模式变化           | -              |
| `onConfirm`     | `(value: Date \| null) => void` 或 `(value: [Date, Date] \| null) => void`       | 确认时触发，保留上游原生日期值，类型随选择模式变化             | -              |
| `onClose`       | `() => void`                                                                     | 弹层关闭时触发                                                 | -              |

透传上游的 `min`、`max`、`weekStartsOn`、`shouldDisableDate`、`allowClear`、`renderDate`、`renderTop`、`renderBottom`、`confirmText` 和弹层样式等配置，参见 [CalendarPicker 官方文档](https://mobile.ant.design/zh/components/calendar-picker)。

`visible` 由封装内部管理，不提供 `defaultValue` 或 `children`；初始值请使用表单的 `initialValues`。`onChange` 在确认时触发，选择过程不会更新表单。

包根入口同时导出 `ICalendarPickerProps` 与 `ICalendarPickerValue`。自定义 `format` 函数时，应确保输出仍可被解析为日期，以便再次打开选择器。

## 触发内容布局

通过 FormItem 的 `wrapperWrap` 控制已选内容布局，默认 `false`：保持单行，超出字段宽度后可水平滚动。设置 `x-decorator-props: { wrapperWrap: true }` 后按字段宽度换行显示。
