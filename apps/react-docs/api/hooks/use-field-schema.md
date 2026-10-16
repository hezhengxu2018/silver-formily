# useFieldSchema

## 描述

主要在自定义组件中读取当前字段的 Schema 信息，该 hook 只能用在 SchemaField 或者 RecursionField 的子树中使用

::: tip Schema 协议说明
本页只说明 `@silver-formily/react` 中如何读取当前字段的 Schema。`Schema`、`ISchema` 和各类协议字段的完整文档请查看 [JSON Schema 文档](https://json-schema.silver-formily.org/)。当前站内的桥接入口见 [Schema](/api/shared/schema)。
:::

## 签名

```ts
import type { Schema } from '@silver-formily/json-schema'

declare function useFieldSchema(): Schema
```

`Schema` 类型桥接说明见 [Schema](/api/shared/schema)，完整 API 请查看 [JSON Schema](https://json-schema.silver-formily.org/)。

## 用例

:::demo
api/hooks/use-field-schema.tsx
:::

该 hook 只读取上下文，不创建模型，也不订阅模型属性。应在对应 Provider 下使用；即使部分签名未声明空值，缺少或被清理的上下文在运行时仍可能返回 null/undefined。
