---
aside: true
outline: [2, 3]
---

# SchemaField

## 描述

SchemaField 组件是专门用于解析 [JSON Schema](https://json-schema.silver-formily.org/) 动态渲染表单的组件。

SchemaField 有两种使用方式，一种是MarkupSchema，一种是JSONSchema。MarkupSchema的渲染将不同类型的 Field 做了分类，在可读性上更好；JSONSchema直接渲染JSON-Schema，更贴近底层实现。

::: tip 提示
没有直接可以引用的SchemaField组件，无论是MarkupSchema还是JSONSchema都需要调用`createSchemaField`来获取组件。与 `@formily/react` 不同，`createSchemaField` 只返回一个 `SchemaField` 组件，Markup 子组件以静态属性的形式挂载在它上面（如 `SchemaField.String`）。
:::

::: tip Schema 协议说明
本页只说明 `@silver-formily/react` 如何消费 Schema。`Schema`、`ISchema`、`x-reactions`、`x-component-props` 等完整协议请查看 [JSON Schema 文档](https://json-schema.silver-formily.org/)。
:::

### 函数定义

```ts
interface createSchemaField {
  (props: ISchemaFieldFactoryProps): SchemaField
}
```

### 函数入参

```ts
interface ISchemaFieldReactFactoryOptions {
  components?: {
    [key: string]: JSXComponent // 组件列表
  }
  scope?: any // 全局作用域，用于实现协议表达式变量注入
}
```

### 函数返回

返回的 `SchemaField` 本身是 JSON-Schema 渲染组件，同时以静态属性挂载了一组 MarkupSchema 渲染组件：

```ts
interface SchemaField {
  (props: ISchemaFieldProps): React.ReactNode

  Markup: React.ComponentType<ISchemaMarkupFieldProps> // MarkupSchema 渲染组件
  String: React.ComponentType<ISchemaTypeFieldProps> // MarkupSchema 渲染组件
  Object: React.ComponentType<ISchemaTypeFieldProps> // MarkupSchema 渲染组件
  Array: React.ComponentType<ISchemaTypeFieldProps> // MarkupSchema 渲染组件
  Boolean: React.ComponentType<ISchemaTypeFieldProps> // MarkupSchema 渲染组件
  Date: React.ComponentType<ISchemaTypeFieldProps> // MarkupSchema 渲染组件
  DateTime: React.ComponentType<ISchemaTypeFieldProps> // MarkupSchema 渲染组件
  Void: React.ComponentType<ISchemaTypeFieldProps> // MarkupSchema 渲染组件
  Number: React.ComponentType<ISchemaTypeFieldProps> // MarkupSchema 渲染组件
}
```

## MarkupSchema

### 用例

:::demo
api/components/schema-field.tsx
:::

## JSON Schema

SchemaField 支持直接传入 [JSON Schema](https://json-schema.silver-formily.org/) 对象渲染表单。

:::demo
api/components/schema-field-with-schema.tsx
:::

## API

SchemaField 的类型继承自 Field，因此大部分属性可以参考[Field组件的API](/api/components/field.html#api)

SchemaField 额外支持以下属性：

| 属性       | 说明                       | 类型                                                                | 默认值 |
| ---------- | -------------------------- | ------------------------------------------------------------------- | ------ |
| schema     | 字段schema                 | [ISchema](https://json-schema.silver-formily.org/api/types#ischema) | -      |
| components | 局部组件列表，会与全局合并 | ^[object]`Record<string, JSXComponent>`                             | -      |
| scope      | 向 Schema 表达式注入变量   | ^[object]`Record<string, unknown>`                                  | -      |
