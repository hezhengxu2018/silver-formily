# PreviewText

> 阅读态组件，主要用来实现类 Input，类 DatePicker 这些组件的阅读态

## 简单用例

::: tip 示例适配说明
已移除官方例中的 TreeSelect、DatePicker、Cascader 字段；保留文本与选择项预览。
:::

:::demo
preview-text/basic.tsx
:::

## 扩展阅读态

::: tip 示例适配说明
已移除官方例中的 DatePicker / Cascader 字段；保留 connect + mapReadPretty 的扩展方式。
:::

:::demo
preview-text/custom-read-pretty.tsx
:::

## 本项目补充：零值与空值

此例用于观察当前实现的阅读态切换、零值和空值占位。

:::demo
preview-text.tsx
:::

## API

### PreviewText / PreviewText.Input / PreviewText.InputNumber

| 属性                                         | 类型                                                                      | 默认值 | 说明                                                                      |
| -------------------------------------------- | ------------------------------------------------------------------------- | ------ | ------------------------------------------------------------------------- |
| `value`                                      | `any`                                                                     | —      | null、undefined 和空字符串显示占位；0 正常展示。                          |
| `children`                                   | `ReactNode`                                                               | —      | 仅通用 PreviewText 使用；存在时优先于 value。                             |
| `prefix / suffix / addonBefore / addonAfter` | `ReactNode`                                                               | —      | Input / InputNumber 的前后缀及附加内容。                                  |
| `formatter`                                  | `(value: any, info: { userTyping: boolean; input: string }) => ReactNode` | —      | InputNumber 阅读态使用；对非空值传入原始值及 userTyping=false、input=''。 |
| `className / style`                          | `string / CSSProperties`                                                  | —      | 展示根节点配置。                                                          |

### PreviewText.Select

接收上述通用展示属性，额外支持：

| 属性           | 类型                                                   | 默认值                  | 说明                                                             |
| -------------- | ------------------------------------------------------ | ----------------------- | ---------------------------------------------------------------- |
| `options`      | `any[]`                                                | 字段 dataSource 或 `[]` | 字段 dataSource 非空时优先，否则使用 options；递归查找分组选项。 |
| `mode`         | `'multiple' \| 'tags'`                                 | —                       | 多选模式；即使只有一项也渲染 Tag。                               |
| `labelInValue` | `boolean`                                              | `false`                 | 从 value 对象读取 value 和 label。                               |
| `fieldNames`   | `{ label?: string; value?: string; options?: string }` | 原生字段名              | 选项标签、值与分组字段名。                                       |

### PreviewText.Placeholder / usePlaceholder

`<PreviewText.Placeholder value={ReactNode}>` 设置子树的空值占位，默认 `N/A`，显式 `''`、`0`、`false` 不回退。`usePlaceholder(value?)` 可直接导入，也可通过 `PreviewText.usePlaceholder` 调用。

当前导出不包含 TreeSelect、Cascader、DatePicker、DateRangePicker、TimePicker、TimeRangePicker。
