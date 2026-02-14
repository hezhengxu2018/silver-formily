---
aside: true
outline: [2, 3]
---

# SchemaField

## Description

`SchemaField` parses a [JSON Schema](/en/api/shared/schema) tree and renders it declaratively. You can work with two styles: **MarkupSchema**, which organizes fields by Vue components for readability, and **JSON Schema**, which feeds the raw schema object.

::: tip
You never import `SchemaField` directly. Call `createSchemaField` to obtain the renderer suite—both the markup flavoured helpers and the JSON-Schema renderer come from the returned object.
:::

### Function Signature

```ts
interface createSchemaField {
  (props: ISchemaFieldFactoryProps): ComposeSchemaField
}
```

#### Parameters

```ts
import type { Component } from 'vue'

interface ISchemaFieldFactoryProps {
  components?: Record<string, Component>
  scope?: string | number // inject variables for schema expressions
}
```

#### Return Value

```ts
import type { Component } from 'vue'

interface ComposeSchemaField {
  SchemaField: Component<ISchemaFieldProps>
  SchemaMarkupField: Component<ISchema>
  SchemaStringField: Component<Omit<ISchema, 'type'>>
  SchemaObjectField: Component<Omit<ISchema, 'type'>>
  SchemaArrayField: Component<Omit<ISchema, 'type'>>
  SchemaBooleanField: Component<Omit<ISchema, 'type'>>
  SchemaDateField: Component<Omit<ISchema, 'type'>>
  SchemaDateTimeField: Component<Omit<ISchema, 'type'>>
  SchemaVoidField: Component<Omit<ISchema, 'type'>>
  SchemaNumberField: Component<Omit<ISchema, 'type'>>
}
```

## MarkupSchema

### Example

::: demo
api/components/schema-field
:::

## JSON Schema

`SchemaField` can render a form directly from a [JSON Schema](/en/api/shared/schema) object.

::: demo
api/components/schema-field-with-schema
:::

## API

`SchemaField` extends the `Field` props, so you inherit everything from [Field’s API](/en/api/components/field#field-props) plus the following additions:

| Prop   | Description                                      | Type                                     | Default |
| ------ | ------------------------------------------------ | ---------------------------------------- | ------- |
| schema | Schema node to render                            | [ISchema](/en/api/shared/schema#ischema) | —       |
| scope  | Extra variables injected into schema expressions | ^[object]`Record<string, unknown>`       | —       |
