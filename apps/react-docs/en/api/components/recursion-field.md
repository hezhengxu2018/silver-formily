---
aside: true
outline: [2, 3]
---

# RecursionField

## Description

A recursive rendering component, mainly performing recursive rendering based on the [JSON Schema documentation](https://json-schema.silver-formily.org/). It is the core rendering component inside the [SchemaField](/en/api/components/schema-field) component. Of course, it can also be used independently of SchemaField; we mainly use it inside custom components to implement custom components with recursive rendering capabilities.

::: tip Schema Protocol Notes
This page only explains how `@silver-formily/react` recursively consumes Schemas. For the complete definitions of `Schema`, `ISchema`, the property protocol and the linkage protocol, please refer to the [JSON Schema documentation](https://json-schema.silver-formily.org/).
:::

## Simple Recursion

You can read a standalone schema object from the component attributes and pass it to RecursionField for rendering. Inside a custom component, `onlyRenderProperties` renders only the `properties` of the schema.

:::demo
api/components/recursion-field.tsx
:::

## Self-incrementing List Recursion

Use [useField](/en/api/hooks/use-field) and [useFieldSchema](/en/api/hooks/use-field-schema) to obtain the field instance and the field schema from the current field context.

:::demo
api/components/recursion-field-with-component.tsx
:::

## API

| Attribute            | Description                                                                                         | Type                                                                | Default            |
| -------------------- | --------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------- | ------------------ |
| schema               | The Schema object to render                                                                         | [ISchema](https://json-schema.silver-formily.org/api/types#ischema) | —                  |
| name                 | Field name used when mounting during rendering, often combined with `basePath` to resolve the path  | `string`                                                            | `schema.name`      |
| basePath             | Base path for resolving `name`                                                                      | [FormPathPattern](#FormPathPattern)                                 | current field path |
| propsRecursion       | Whether to pass `mapProperties` / `filterProperties` through when recursively rendering child nodes | `boolean`                                                           | `false`            |
| onlyRenderProperties | Only render the child nodes' `properties`, without rendering the current node                       | `boolean`                                                           | `false`            |
| onlyRenderSelf       | Only render the current node, without automatically recursing into child nodes                      | `boolean`                                                           | `false`            |
| mapProperties        | Property mapping function, can rewrite the schema before rendering                                  | ^[Function]`(schema: Schema, name: SchemaKey) => Schema`            | —                  |
| filterProperties     | Property filter function; nodes for which it returns `false` are not rendered                       | ^[Function]`(schema: Schema, name: SchemaKey) => boolean`           | —                  |

### FormPathPattern

```ts
type FormPathPattern = string | number | Array<string | number> | RegExp
```
