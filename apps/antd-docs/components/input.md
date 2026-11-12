# Input

> 文本输入框

::: tip 提示

没有提供 `Input.Search` 的封装，一般来说这不属于表单的范畴。密码或一次性密码请参考 `Password` 与 `OTP` 文档。

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
