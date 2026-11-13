# TimePicker 时间选择

::: warning 与原生 antd 及旧版本的差异
默认字段值改为字符串，`format` 只控制展示；`valueFormat` 独立控制字段值格式。依赖本包此前 Dayjs 提交值或回调首参的代码需设置 `valueFormat={false}`。不支持 Moment。
:::

TimePicker 用于表单中的时间选择，支持 Field 与 Schema 绑定。

## 基础用法

示例展示默认字符串、独立展示与提交格式、Dayjs 模式、阅读态和重置。点击提交可在控制台检查字段值。

:::demo
time-picker/basic.tsx
:::

## API

| 接口                           | 行为                                                                                                      |
| ------------------------------ | --------------------------------------------------------------------------------------------------------- |
| `valueFormat`                  | `string \| false`；字符串指定输入解析和输出格式，`false` 保留原生 Dayjs 协议；默认格式见下文              |
| `format`                       | 原生展示格式，支持字符串、数组、函数及 mask 配置；阅读态使用首个格式                                      |
| `value` / `defaultValue`       | 默认接受字符串，也兼容 Dayjs 初始值；范围为包含两个值的元组，允许 `null` 端点                             |
| `onChange(value, dateStrings)` | 首参按 `valueFormat` 转换，第二参数保留 antd 的展示字符串；字段保存首参                                   |
| 其他属性、事件及 ref           | 遵循 [Ant Design 6 TimePicker](https://ant.design/components/time-picker)；日期回调及面板属性仍使用 Dayjs |
| `pattern="readPretty"`         | 按 `format` 展示，空值使用 PreviewText 占位配置，不修改字段                                               |
| disabled、校验状态             | 继承字段与 FormItem 的原生反馈上下文                                                                      |

## 默认值格式

`TimePicker` 与 `TimePicker.RangePicker` 默认使用 `HH:mm:ss`。`use12Hours`、展示 `format` 均不改变该默认值；例如显示 `02:15 pm` 时，字段仍保存 `14:15:00`。设置 `valueFormat="HH:mm"` 可以仅保存时和分。

## 输入、清空与迁移

字符串按 `valueFormat` 严格解析，不依赖浏览器日期解析。空字符串视为空值；非法字符串显示为空，但不会自动改写字段。选择清空时输出 `null`，范围保留空端点。格式解析使用 Dayjs 的 `customParseFormat`。

字符串模式兼容 Dayjs 初始值，但只在用户选择后转换成字符串；初始化、重置、阅读态切换不会改写原始字段。需要从初始化到提交始终保持字符串时，请使用字符串初始值。

保留原生 Dayjs 行为：在 Field 的组件属性或 Schema 的 `x-component-props` 中设置 `valueFormat: false`。此时 `value`、`defaultValue` 和 `onChange` 首参均使用 Dayjs；`disabledDate`、`onCalendarChange` 等回调在所有模式下都保持原生日期类型。

## Schema 配置

```tsx
const schema = {
  type: 'object',
  properties: {
    value: {
      'type': 'string',
      'x-component': 'TimePicker',
      'x-component-props': {
        format: 'hh:mm a',
        valueFormat: 'HH:mm:ss',
      },
    },
  },
}
```

展示格式与字段格式不同，例如时间显示 `02:15 pm`，字段保存 `14:15:00`。`onChange` 的第二参数仍反映展示格式，不作为提交格式使用。
