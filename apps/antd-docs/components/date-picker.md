# DatePicker 日期选择

> 用于表单中的日期选择

::: warning 注意
由于 `antd` 的升级,官方的 `DatePicker`的`onChange`事件会有两个入参。对大部分表单来说,提交给后端的值不可能是`dayjs`的实例，经过封装后现在默认触发值是字符串类型，如果需要`dayjs`作为表单的值，需设置 `valueFormat={false}`。不再支持 Moment。
:::

## 基础用法

示例展示默认字符串、独立展示与提交格式、Dayjs 模式、阅读态和重置。点击提交可在弹窗中检查字段值。

:::demo
date-picker/basic.tsx
:::

## Markup Schema 案例

:::demo
date-picker/markup-schema.tsx
:::

## JSON Schema 案例

:::demo
date-picker/json-schema.tsx
:::

## 纯 JSX 案例

:::demo
date-picker/jsx.tsx
:::

## API

| 接口          | 类型              | 说明                                                                |
| ------------- | ----------------- | ------------------------------------------------------------------- |
| `valueFormat` | `string \| false` | 字符串指定输入解析和输出格式，完整说明参考[默认值格式](#默认值格式) |

其余配置项参考[Ant Design 6 DatePicker](https://ant.design/components/date-picker-cn)；日期回调及面板属性仍使用 `Dayjs`。阅读态会默认使用`format`的格式。

### DatePicker.RangePicker

同上

#### 默认值格式

默认值格式独立于 `format`，适用于 `picker` 属性及对应静态子组件；范围和 `multiple` 对每一项使用同一格式。

| 模式       | 默认 valueFormat               |
| ---------- | ------------------------------ |
| 日期、周   | `YYYY-MM-DD`（周保存选中日期） |
| 月         | `YYYY-MM`                      |
| 年         | `YYYY`                         |
| 季度       | `YYYY-[Q]Q`                    |
| 日期带时间 | `YYYY-MM-DD HH:mm:ss`          |
| 时间       | `HH:mm:ss`                     |

`multiple` 接受和输出数组。时间选择请使用独立的 [TimePicker](./time-picker)。如果想使用 `dayjs`的实例作为onChange事件的抛出值需配置`valueFormat={false}`
