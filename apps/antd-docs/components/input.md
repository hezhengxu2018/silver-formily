# Input

> 文本输入框

::: warning 特别说明：与官方实现的差异

- Input / TextArea 通过上下文自动关联标签并继承本包 FormItem 的 status、variant；Input 还继承 size。TextArea 包装层不传递 size 属性，显式控件属性优先。

- Input 的加载 suffix 使用稳定 span，与官方这一主链路一致。额外包装层没有完整复制原生 Input 的静态成员，当前只明确提供 Input.TextArea；Input.Search 请直接从 antd 使用；密码表单字段使用本包独立的 Password 组件。

- 编辑态 props 以 Ant Design 6 为准；阅读态由本页的 PreviewText.Input 实现，DOM、占位和间距的差异见其文档。

:::

## Markup Schema 案例

:::demo
input/markup-schema.tsx
:::

## JSON Schema 案例

:::demo
input/json-schema.tsx
:::

## 纯 JSX 案例

:::demo
input/jsx.tsx
:::

## API

编辑态基于 Ant Design 6 的 [Input](https://ant.design/components/input-cn/)。当前封装接收其 props，并额外提供字段映射与阅读态。

| 属性                                         | 类型                                         | 默认值                  | 说明                                                                   |
| -------------------------------------------- | -------------------------------------------- | ----------------------- | ---------------------------------------------------------------------- |
| `value / onChange`                           | `InputProps 对应类型`                        | 由字段传入              | 普通文本值 / 变更事件。                                                |
| `placeholder / allowClear / prefix / suffix` | `InputProps 对应类型`                        | —                       | 占位、清空和前后缀；字段 loading / validating 时 suffix 显示加载图标。 |
| `size`                                       | `'small' \| 'medium' \| 'middle' \| 'large'` | 继承表单项              | 显式设置优先于 FormItem 上下文；middle 为原生兼容值。                  |
| `status`                                     | `'error' \| 'warning' \| ''`                 | 继承表单项              | 控件反馈状态。                                                         |
| `variant`                                    | `InputProps['variant']`                      | 继承表单项 / 原生默认值 | outlined、borderless、filled、underlined 等 Ant Design 6 变体。        |
| `id / ref`                                   | `string / Ref<InputRef>`                     | 自动关联标签 / —        | 显式 ID 优先；ref 访问输入与 focus 等方法。                            |

### Input.TextArea

接收 Ant Design 6 `TextAreaProps`，包括 `rows`、`autoSize`、`showCount`、`maxLength`、`status`、`variant`、`value`、`onChange` 和 textarea ref。自动关联标签并支持阅读态；包装层不会向 textarea 传入 size 属性。

字段 `pattern='readPretty'` 时映射到 `PreviewText.Input`；`readOnly` / `disabled` 仍使用编辑控件。

## 文档来源

介绍与原例来自 [Alibaba Formily Input 中文文档](https://github.com/alibaba/formily/blob/d9a46442a575aa5f0fc1bd945e34d9a85d191d0e/packages/antd/docs/components/Input.zh-CN.md)，遵循 [MIT 许可](/licenses/formily-MIT.txt)。依赖命名、Ant Design 6 兼容处理与未迁移组件裁剪见 [来源与示例适配](/guide/sources)。本页 API 按当前源码整理。
