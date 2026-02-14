---
aside: true
outline: [2, 3]
---

# RecursionField

## Description

`RecursionField` is the low-level renderer that walks a [JSON Schema](/en/api/shared/schema) tree and renders each node recursively. It powers `SchemaField`, but you can also import it directly when building custom components that need recursive rendering.

## Basic Recursion

Read a schema object from component props and hand it to `RecursionField` to render it.

::: demo
api/components/recursion-field
:::

## Recursive Lists

Combine [useField](/en/api/hooks/use-field) and [useFieldSchema](/en/api/hooks/use-field-schema) to fetch the current field instance plus its schema before delegating to `RecursionField`.

::: demo
api/components/recursion-field-with-component
:::

## API

| Prop                 | Description                                                 | Type                                                      | Default            |
| -------------------- | ----------------------------------------------------------- | --------------------------------------------------------- | ------------------ |
| schema               | Schema node to render                                       | [ISchema](/en/api/shared/schema)                          | —                  |
| name                 | Field name to mount. Often derived from `basePath`.         | `string`                                                  | `schema.name`      |
| basePath             | Base path for resolving `name`.                             | [FormPathPattern](#formpathpattern)                       | Current field path |
| onlyRenderProperties | Render only `properties` children, skip the current node.   | `boolean`                                                 | `false`            |
| onlyRenderSelf       | Render the current node only, do not recurse into children. | `boolean`                                                 | `false`            |
| mapProperties        | Mapper run before rendering each property.                  | ^[Function]`(schema: Schema, name: SchemaKey) => Schema`  | —                  |
| filterProperties     | Filter function; return `false` to skip a node.             | ^[Function]`(schema: Schema, name: SchemaKey) => boolean` | —                  |

#### FormPathPattern

```ts
type FormPathPattern = string | number | Array<string | number> | RegExp
```
