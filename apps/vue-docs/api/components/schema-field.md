---
aside: true
outline: [2, 3]
---

# SchemaField

## 描述

SchemaField 组件是专门用于解析[JSON-Schema](/api/shared/schema)动态渲染表单的组件。

SchemaField 有两种使用方式，一种是MarkupSchema，一种是JSONSchema。MarkupSchema的渲染将不同类型的 Field 做了分类，在可读性上更好；JSONSchema直接渲染JSON-Schema，更贴近底层实现。

::: tip 提示
没有直接可以引用的SchemaField组件，无论是MarkupSchema还是JSONSchema都需要调用`createSchemaField`来获取组件，只是使用的返回结果中的组件不一样。
:::

### 函数定义

```ts
interface createSchemaField {
  (props: ISchemaFieldFactoryProps): ComposeSchemaField;
}
```

### 函数入参

```ts
import type { Component } from "vue";

interface ISchemaFieldFactoryProps {
  components?: {
    [key: string]: Component; // 组件列表
  };
  scope?: string | number; // 全局作用域，用于实现协议表达式变量注入
}
```

### 函数返回

```ts
import type { Component } from "vue";

interface ComposeSchemaField {
  SchemaField: Component<ISchemaFieldProps>; // JSON-Schema 渲染组件
  SchemaMarkupField: Component<ISchema>; // MarkupSchema 渲染组件
  SchemaStringField: Component<Omit<ISchema, "type">>; // MarkupSchema 渲染组件
  SchemaObjectField: Component<Omit<ISchema, "type">>; // MarkupSchema 渲染组件
  SchemaArrayField: Component<Omit<ISchema, "type">>; // MarkupSchema 渲染组件
  SchemaBooleanField: Component<Omit<ISchema, "type">>; // MarkupSchema 渲染组件
  SchemaDateField: Component<Omit<ISchema, "type">>; // MarkupSchema 渲染组件
  SchemaDateTimeField: Component<Omit<ISchema, "type">>; // MarkupSchema 渲染组件
  SchemaVoidField: Component<Omit<ISchema, "type">>; // MarkupSchema 渲染组件
  SchemaNumberField: Component<Omit<ISchema, "type">>; // MarkupSchema 渲染组件
}
```

## MarkupSchema

### 用例

::: demo
api/components/schema-field
:::

## JSON Schema

SchemaField 支持直接传入 [JSON-Schema](/api/shared/schema) 对象渲染表单。

::: demo
api/components/schema-field-with-schema
:::

## API

SchemaField 的类型继承自 Field，因此大部分属性可以参考[Field组件的API](/api/components/field.html#api)

SchemaField 额外支持以下属性：

| 属性   | 说明                     | 类型                                  | 默认值 |
| ------ | ------------------------ | ------------------------------------- | ------ |
| schema | 字段schema               | [ISchema](/api/shared/schema#ischema) | -      |
| scope  | 向 Schema 表达式注入变量 | ^[object]`Record<string, unknown>`    | -      |
