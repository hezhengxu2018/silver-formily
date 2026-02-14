# useFieldSchema

## Description

Read the schema associated with the current field. Works inside `SchemaField` or `RecursionField` subtrees.

## Signature

```ts
interface useFieldSchema {
  (): Ref<Schema>
}
```

See [Schema](/en/api/shared/schema) for the schema shape.

## Example

::: demo
api/hooks/use-field-schema
:::
