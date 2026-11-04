---
mobileDemo: date-picker/index.tsx
---

# DatePicker

> `DatePicker` 是对 antd-mobile `DatePicker` 的 Formily 适配，值为字符串（按 `format` 序列化），日期能力基于 dayjs。

::: tip 提示
关于 DatePicker 组件的右侧箭头相关逻辑请参考 FormItem 中的[箭头与清除按钮](/component/form-item#箭头与清除按钮)
:::

## 基础使用

<<< @/zh/demos/date-picker/basic.tsx

## 精度控制

`picker` 指定 `year` / `month` 精度，`showTime` 开启日期时间选择；`format` 会根据精度自动推导，也可以显式覆盖。

<<< @/zh/demos/date-picker/precision.tsx

## 周与季度

`picker` 额外支持 `week`（周）与 `quarter`（季度）精度，值格式自动匹配（如 `2024-W09`、`2024-Q1`）。周使用 ISO 周年与周数（`GGGG-[W]WW`），与选择器的周列保持一致。

<<< @/zh/demos/date-picker/week-quarter.tsx

## 自定义展示

`displayRender(value, props)` 自定义编辑态和阅读态的展示内容，返回 `ReactNode`，与其他 picker 保持一致。回调接收原始字段值，不影响提交值；`format` 继续控制日期序列化、解析及默认展示格式。

本例将日期展示为 `2026/10/15`，编辑态和阅读态使用同一个渲染函数。点击提交可查看仍为 `YYYY-MM-DD` 格式的字段值。

<<< @/zh/demos/date-picker/display.tsx

## API

### 属性

| 属性名          | 类型                                                                       | 描述                                    | 默认值   |
| --------------- | -------------------------------------------------------------------------- | --------------------------------------- | -------- |
| `picker`        | ^[enum]`'date' \| 'week' \| 'month' \| 'quarter' \| 'year'`                | 选择精度，`week` / `quarter` 为扩展精度 | `'date'` |
| `format`        | ^[string \| Function]`string \| ((value: Dayjs) => string)`                | 值的序列化格式，缺省时按精度自动推导    | -        |
| `displayRender` | `(value: IDatePickerProps['value'], props: IDatePickerProps) => ReactNode` | 自定义编辑态和阅读态展示，不影响提交值  | -        |
| `showTime`      | ^[boolean]                                                                 | 是否包含时间选择                        | `false`  |
| `placeholder`   | ^[string]                                                                  | 占位提示文案                            | -        |

其余配置参考 [DatePicker 官方文档](https://mobile.ant.design/zh/components/date-picker)。
