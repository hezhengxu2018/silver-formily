# useFieldSchema

## Description

Mainly used inside custom components to read the Schema information of the current field. This hook can only be used inside the subtree of SchemaField or RecursionField.

::: tip Schema Protocol Notes
This page only explains how to read the current field's Schema in `@silver-formily/react`. For the complete documentation of `Schema`, `ISchema` and the various protocol fields, please refer to the [JSON Schema documentation](https://json-schema.silver-formily.org/). The on-site bridge entry is at [Schema](/en/api/shared/schema).
:::

## Signature

```ts
interface useFieldSchema {
  (): Schema
}
```

See [Schema](/en/api/shared/schema) for the `Schema` type bridging notes, and the [JSON Schema](https://json-schema.silver-formily.org/) documentation for the full API.

## Usage

:::demo
api/hooks/use-field-schema.tsx
:::
