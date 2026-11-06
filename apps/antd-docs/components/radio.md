# Radio 单选框

::: warning 与官方封装的差异
属性、事件和 ref 遵循 antd 6；Formily 负责字段绑定与阅读态。
:::

Radio 用于表单中的单选框，支持 Field 与 Schema 绑定。

## 基础用法

::: tip 示例适配说明
本例按 antd 6 API 编写，展示字段绑定、阅读态和重置。
:::

:::demo
radio/basic.tsx
:::

## API

| 接口                 | 行为                                                           |
| -------------------- | -------------------------------------------------------------- |
| 组件属性、事件及 ref | 遵循 [Ant Design 6 Radio](https://ant.design/components/radio) |
| 字段 value           | boolean（Group 为选项值）                                      |
| pattern="readPretty" | 展示当前值，不允许改变字段；空值使用 PreviewText 占位配置      |
| disabled、校验状态   | 继承字段与 FormItem 的原生反馈上下文；仅应用原生支持的能力     |

非空字段 `dataSource` 优先，否则使用显式原生数据源属性。选项值 `0`、标签空字符串和自定义字段名保留原生语义。

## 来源

[Alibaba Formily Radio](https://github.com/alibaba/formily/blob/d9a46442a575aa5f0fc1bd945e34d9a85d191d0e/packages/antd/docs/components/Radio.zh-CN.md)。迁移参考遵循 [MIT 许可](/licenses/formily-MIT.txt)，本页 API 与示例按当前独立封装整理。
