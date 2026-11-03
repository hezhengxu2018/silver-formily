# NumberPicker

> 数字输入框

::: warning 特别说明：与官方实现的差异

- 编辑态增加了 FormItem 上下文中的 ID、尺寸、状态与 variant 适配，输入行为使用 Ant Design 6 InputNumber。

- 阅读态 formatter 接收原始 number / string，而官方先执行 String(value)；null、undefined 和空字符串会直接显示占位，不再传给 formatter。

- 数值 0 保留展示，高精度 stringMode 保留字符串。阅读态容器、前后缀间距和换行方式与官方 Space 实现不同。

:::

## Markup Schema 案例

:::demo
number-picker/markup-schema.tsx
:::

## JSON Schema 案例

:::demo
number-picker/json-schema.tsx
:::

## 纯 JSX 案例

:::demo
number-picker/jsx.tsx
:::

## API

编辑态基于 Ant Design 6 的 [InputNumber](https://ant.design/components/input-number-cn/)。当前封装接收其 props，并额外提供字段映射与阅读态。

| 属性                           | 类型                                  | 默认值           | 说明                                                            |
| ------------------------------ | ------------------------------------- | ---------------- | --------------------------------------------------------------- |
| `value / onChange`             | `number \| string \| null / 对应回调` | 由字段传入       | 使用原生数值变更语义，清空通常返回 null。                       |
| `min / max / step / precision` | `InputNumberProps 对应类型`           | 原生默认值       | 范围、步长和精度。                                              |
| `stringMode`                   | `boolean`                             | `false`          | 高精度字符串模式，不强制转换为 number。                         |
| `formatter / parser`           | `InputNumberProps 对应类型`           | —                | 编辑态遵循 InputNumber；阅读态 formatter 的差异见上方特别说明。 |
| `prefix / suffix / controls`   | `InputNumberProps 对应类型`           | 原生默认值       | 前后缀和增减按钮。                                              |
| `size / status / variant`      | `InputNumberProps 对应类型`           | 继承表单项       | 显式控件属性优先。                                              |
| `id / ref`                     | `string / InputNumber ref`            | 自动关联标签 / — | 访问输入与 focus 等方法。                                       |

字段 `pattern='readPretty'` 时映射到 `PreviewText.NumberPicker`。

## 文档来源

介绍与原例来自 [Alibaba Formily NumberPicker 中文文档](https://github.com/alibaba/formily/blob/d9a46442a575aa5f0fc1bd945e34d9a85d191d0e/packages/antd/docs/components/NumberPicker.zh-CN.md)，遵循 [MIT 许可](/licenses/formily-MIT.txt)。依赖命名、Ant Design 6 兼容处理与未迁移组件裁剪见 [来源与示例适配](/guide/sources)。本页 API 按当前源码整理。
