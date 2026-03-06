# useFieldSchema

## Description

Read the schema associated with the current field. Works inside `SchemaField` or `RecursionField` subtrees.

::: tip Schema Protocol
This page only covers how `@silver-formily/vue` reads the current field schema. For the full `Schema`, `ISchema`, and protocol field reference, see the [rebuilt JSON Schema docs](https://json-schema.silver-formily.org/en/). The local bridge page remains available at [Schema](/en/api/shared/schema).
:::

## Signature

```ts
interface useFieldSchema {
  (): Ref<Schema>
}
```

See [Schema](/en/api/shared/schema) for the local bridge page, or go straight to the [rebuilt JSON Schema docs](https://json-schema.silver-formily.org/en/) for the full API.

## Example

::: demo
api/hooks/use-field-schema
:::
