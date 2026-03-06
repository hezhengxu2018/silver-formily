# useFieldSchema

## 描述

主要在自定义组件中读取当前字段的 Schema 信息，该 hook 只能用在 SchemaField 或者 RecursionField 的子树中使用

::: tip Schema 协议说明
本页只说明 `@silver-formily/vue` 中如何读取当前字段的 Schema。`Schema`、`ISchema` 和各类协议字段的完整文档请查看 [JSON Schema 重建文档站](https://json-schema.silver-formily.org/)。当前站内的桥接入口见 [Schema](/api/shared/schema)。
:::

## 签名

```ts
interface useFieldSchema {
  (): Ref<Schema>
}
```

`Schema` 类型桥接说明见 [Schema](/api/shared/schema)，完整 API 请查看 [JSON Schema 重建文档站](https://json-schema.silver-formily.org/)。

## 用例

::: demo
api/hooks/use-field-schema
:::
