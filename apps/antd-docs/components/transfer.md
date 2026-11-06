# Transfer 穿梭框

::: warning 与官方封装的差异
dataSource 使用原生 key/title 数据，不自动将 value/label 重命名。
:::

Transfer 用于表单中的穿梭框，支持 Field 与 Schema 绑定。

## 基础用法

::: tip 示例适配说明
本例按 antd 6 API 编写，展示字段绑定、阅读态和重置。
:::

:::demo
transfer/basic.tsx
:::

## API

| 接口                 | 行为                                                                 |
| -------------------- | -------------------------------------------------------------------- |
| 组件属性、事件及 ref | 遵循 [Ant Design 6 Transfer](https://ant.design/components/transfer) |
| 字段 value           | 原生 targetKeys 数组                                                 |
| pattern="readPretty" | 展示当前值，不允许改变字段；空值使用 PreviewText 占位配置            |
| disabled、校验状态   | 继承字段与 FormItem 的原生反馈上下文；仅应用原生支持的能力           |

非空字段 `dataSource` 优先，否则使用显式原生数据源属性。选项值 `0`、标签空字符串和自定义字段名保留原生语义。

## 来源

[Alibaba Formily Transfer](https://github.com/alibaba/formily/blob/d9a46442a575aa5f0fc1bd945e34d9a85d191d0e/packages/antd/docs/components/Transfer.zh-CN.md)。迁移参考遵循 [MIT 许可](/licenses/formily-MIT.txt)，本页 API 与示例按当前独立封装整理。
