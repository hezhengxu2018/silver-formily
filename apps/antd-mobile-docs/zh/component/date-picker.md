---
mobileDemo: date-picker/index.tsx
---

# DatePicker

> `DatePicker` 是对 antd-mobile `DatePicker` 的 Formily 适配，值为字符串（按 `format` 序列化），日期能力基于 dayjs。

## 基础使用

<<< @/zh/demos/date-picker/basic.tsx

## 精度控制

`picker` 指定 `year` / `month` 精度，`showTime` 开启日期时间选择；`format` 会根据精度自动推导，也可以显式覆盖。

<<< @/zh/demos/date-picker/precision.tsx

## 周与季度 ^(new)

`picker` 额外支持 `week`（周）与 `quarter`（季度）精度，值格式自动匹配（如 `2024-W09`、`2024-Q1`）。周使用 ISO 周年与周数（`GGGG-[W]WW`），与选择器的周列保持一致。

<<< @/zh/demos/date-picker/week-quarter.tsx

## 清空

清空能力统一由 FormItem 提供：设置 `decorator={[FormItem, { clearable: true }]}`，或在 Schema 中配置 `x-decorator-props: { clearable: true }`。有值时右侧箭头切换为清除按钮，清空后字段值为 `undefined`，恢复箭头且不会打开选择器。组件本身不提供 `clearable` 属性。

## API

### 属性

| 属性名        | 类型                                                                                                    | 描述                                    | 默认值   |
| ------------- | ------------------------------------------------------------------------------------------------------- | --------------------------------------- | -------- |
| `picker`      | ^[enum]`'date' \| 'week' \| 'month' \| 'quarter' \| 'year'`                                             | 选择精度，`week` / `quarter` 为扩展精度 | `'date'` |
| `format`      | ^[string \| Function]`string \| ((value: Dayjs) => string) \| (string \| ((value: Dayjs) => string))[]` | 值的序列化格式，缺省时按精度自动推导    | -        |
| `showTime`    | ^[boolean]                                                                                              | 是否包含时间选择                        | `false`  |
| `placeholder` | ^[string]                                                                                               | 占位提示文案                            | -        |

继承 antd-mobile `DatePicker` 的所有配置项（`precision`、`min`、`max`、`filter`、`renderLabel` 等），请参考 [DatePicker 官方文档](https://mobile.ant.design/zh/components/date-picker)。
