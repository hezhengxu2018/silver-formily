---
aside: true
outline: [2, 3]
---

# SchemaField

## Description

The SchemaField component is dedicated to parsing [JSON Schema](https://json-schema.silver-formily.org/) and dynamically rendering forms.

There are two ways to use SchemaField: MarkupSchema and JSONSchema. MarkupSchema rendering categorizes the different types of Field, which makes it more readable; JSONSchema renders JSON Schema directly, staying closer to the underlying implementation.

::: tip
There is no directly importable SchemaField component; both MarkupSchema and JSONSchema require calling `createSchemaField` to obtain the component. Unlike `@formily/react`, `createSchemaField` returns only a single `SchemaField` component, with the Markup sub-components attached to it as static properties (e.g. `SchemaField.String`).
:::

::: tip Schema Protocol Notes
This page only explains how `@silver-formily/react` consumes Schemas. For the complete `Schema`, `ISchema`, `x-reactions`, `x-component-props` and other protocols, please refer to the [JSON Schema documentation](https://json-schema.silver-formily.org/).
:::

### Function Definition

```ts
interface createSchemaField {
  (props: ISchemaFieldFactoryProps): SchemaField
}
```

### Function Parameters

```ts
interface ISchemaFieldReactFactoryOptions {
  components?: {
    [key: string]: JSXComponent // Component list
  }
  scope?: any // Global scope, used for variable injection into protocol expressions
}
```

### Function Return Value

The returned `SchemaField` is itself the JSON-Schema rendering component, and it also has a set of MarkupSchema rendering components attached as static properties:

```ts
interface SchemaField {
  (props: ISchemaFieldProps): React.ReactNode

  Markup: React.ComponentType<ISchemaMarkupFieldProps> // MarkupSchema rendering component
  String: React.ComponentType<ISchemaTypeFieldProps> // MarkupSchema rendering component
  Object: React.ComponentType<ISchemaTypeFieldProps> // MarkupSchema rendering component
  Array: React.ComponentType<ISchemaTypeFieldProps> // MarkupSchema rendering component
  Boolean: React.ComponentType<ISchemaTypeFieldProps> // MarkupSchema rendering component
  Date: React.ComponentType<ISchemaTypeFieldProps> // MarkupSchema rendering component
  DateTime: React.ComponentType<ISchemaTypeFieldProps> // MarkupSchema rendering component
  Void: React.ComponentType<ISchemaTypeFieldProps> // MarkupSchema rendering component
  Number: React.ComponentType<ISchemaTypeFieldProps> // MarkupSchema rendering component
}
```

## MarkupSchema

### Usage

:::demo
api/components/schema-field.tsx
:::

## JSON Schema

SchemaField supports passing a [JSON Schema](https://json-schema.silver-formily.org/) object directly to render a form.

:::demo
api/components/schema-field-with-schema.tsx
:::

## API

SchemaField's types inherit from Field, so most attributes can be found in the [Field component API](/en/api/components/field.html#api)

SchemaField additionally supports the following attributes:

| Attribute  | Description                                      | Type                                                                | Default |
| ---------- | ------------------------------------------------ | ------------------------------------------------------------------- | ------- |
| schema     | Field schema                                     | [ISchema](https://json-schema.silver-formily.org/api/types#ischema) | -       |
| components | Local component list, merged with the global one | ^[object]`Record<string, JSXComponent>`                             | -       |
| scope      | Injects variables into Schema expressions        | ^[object]`Record<string, unknown>`                                  | -       |
