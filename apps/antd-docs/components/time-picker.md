# TimePicker 时间选择

> 用于表单中的时间选择。

::: warning 注意
由于 `antd` 的升级,官方的 `TimePicker`的`onChange`事件会有两个入参。对大部分表单来说,提交给后端的值不可能是`dayjs`的实例，经过封装后现在默认触发值是字符串类型，如果需要`dayjs`作为表单的值，需设置 `valueFormat={false}`。不再支持 Moment。
:::

## 基础用法

示例展示默认字符串、独立展示与提交格式、Dayjs 模式、阅读态和重置。点击提交可在弹窗中检查字段值。

:::demo
time-picker/basic.tsx
:::

## Markup Schema 案例

:::demo
time-picker/markup-schema.tsx
:::

## JSON Schema 案例

:::demo
time-picker/json-schema.tsx
:::

## 纯 JSX 案例

:::demo
time-picker/jsx.tsx
:::

## API

| 接口          | 类型              | 说明                                                                |
| ------------- | ----------------- | ------------------------------------------------------------------- |
| `valueFormat` | `string \| false` | 字符串指定输入解析和输出格式，完整说明参考[默认值格式](#默认值格式) |

其余配置项参考[Ant Design 6 TimePicker](https://ant.design/components/time-picker-cn)；日期回调及面板属性仍使用 `Dayjs`。阅读态会默认使用`format`的格式。

### TimePicker.RangePicker

同上

#### 默认值格式

`TimePicker` 与 `TimePicker.RangePicker` 默认使用 `HH:mm:ss`。`use12Hours`、展示 `format` 均不改变该默认值；例如显示 `02:15 pm` 时，字段仍保存 `14:15:00`。设置 `valueFormat="HH:mm"` 可以仅保存时和分。
