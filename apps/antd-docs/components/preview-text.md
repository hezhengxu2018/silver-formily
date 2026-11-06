# PreviewText

> 阅读态组件，主要用来实现类 Input，类 DatePicker 这些组件的阅读态

::: warning 特别说明：与官方实现的差异

- 提供通用文本、Input、Select、NumberPicker、Boolean、Password、Slider、DatePicker、DateRangePicker、TimePicker、TimeRangePicker、TreeSelect、Cascader、Transfer、Upload、Placeholder 和 usePlaceholder。日期值使用 Dayjs，密码始终遮蔽。

- 占位提供器允许显式空字符串、0、false，官方会回退到 N/A；通用 PreviewText 现在允许 children 优先于 value。

- Select 用 === 匹配选项，字符串 '1' 不再匹配数字 1；保留空字符串 / 0 标签，递归查找分组选项；多选只有一项也显示 Tag，部分缺失标签场景会显示原始值。

- NumberPicker 的 formatter 接收原始值，空值跳过 formatter。展示根节点改成 inline-flex span，间距、换行和最小高度不等同于原来的 div / Space。

:::

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

### PreviewText / PreviewText.Input / PreviewText.NumberPicker

| 属性                                         | 类型                                                                      | 默认值 | 说明                                                                       |
| -------------------------------------------- | ------------------------------------------------------------------------- | ------ | -------------------------------------------------------------------------- |
| `value`                                      | `any`                                                                     | —      | null、undefined 和空字符串显示占位；0 正常展示。                           |
| `children`                                   | `ReactNode`                                                               | —      | 仅通用 PreviewText 使用；存在时优先于 value。                              |
| `prefix / suffix / addonBefore / addonAfter` | `ReactNode`                                                               | —      | Input / NumberPicker 的前后缀及附加内容。                                  |
| `formatter`                                  | `(value: any, info: { userTyping: boolean; input: string }) => ReactNode` | —      | NumberPicker 阅读态使用；对非空值传入原始值及 userTyping=false、input=''。 |
| `className / style`                          | `string / CSSProperties`                                                  | —      | 展示根节点配置。                                                           |

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

## 文档来源

介绍与原例来自 [Alibaba Formily PreviewText 中文文档](https://github.com/alibaba/formily/blob/d9a46442a575aa5f0fc1bd945e34d9a85d191d0e/packages/antd/docs/components/PreviewText.zh-CN.md)，遵循 [MIT 许可](/licenses/formily-MIT.txt)。依赖命名、Ant Design 6 兼容处理与未迁移组件裁剪见 [来源与示例适配](/guide/sources)。本页 API 按当前源码整理。
