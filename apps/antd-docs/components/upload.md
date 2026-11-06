# Upload 上传

::: warning 与官方封装的差异
onChange 保留原生 UploadChangeParam，字段仅保存 fileList。不提供 textContent、serviceErrorMessage 或业务响应格式推断；使用 children、customRequest 和原生事件处理业务逻辑。
:::

Upload 用于表单中的上传，支持 Field 与 Schema 绑定。

## 基础用法

::: tip 示例适配说明
本例按 antd 6 API 编写，展示字段绑定、阅读态和重置；上传请求仅在本地模拟。
:::

:::demo
upload/basic.tsx
:::

## API

| 接口                 | 行为                                                             |
| -------------------- | ---------------------------------------------------------------- |
| 组件属性、事件及 ref | 遵循 [Ant Design 6 Upload](https://ant.design/components/upload) |
| 字段 value           | UploadFile[]                                                     |
| pattern="readPretty" | 展示当前值，不允许改变字段；空值使用 PreviewText 占位配置        |
| disabled、校验状态   | 继承字段与 FormItem 的原生反馈上下文；仅应用原生支持的能力       |

## 来源

[Alibaba Formily Upload](https://github.com/alibaba/formily/blob/d9a46442a575aa5f0fc1bd945e34d9a85d191d0e/packages/antd/docs/components/Upload.zh-CN.md)。迁移参考遵循 [MIT 许可](/licenses/formily-MIT.txt)，本页 API 与示例按当前独立封装整理。
