---
outline: [2, 3]
---

# Quick Start

`@formily/json-schema` is the protocol layer behind Formily's JSON Schema development mode. The official docs describe three approaches to building forms: `Markup Schema`, `JSON Schema`, and `JSX Components`. Both `Markup Schema` and `JSON Schema` rely on the capabilities provided by `@formily/json-schema`. `@formily/json-schema` uses a plain object to describe form structure, component mapping, and linkage logic, which makes recursive rendering possible.

In simple terms, different packages are responsible for different parts:

- `@formily/core` manages the form instance, field state, validation, and effects
- `@formily/json-schema` defines the schema protocol, expression compilation, and `Schema` class APIs
- front-end binding libraries such as `@silver-formily/vue`, `@formily/vue`, and `@formily/react` recursively render the schema into a component tree

::: tip Note
The official Formily examples use `@formily/vue`. This rewritten documentation uses `@silver-formily/vue`. There is no capability gap between them, and the APIs are broadly similar. For the detailed differences, see the related documentation at [vue.silver-formily.org](https://vue.silver-formily.org/).
:::

## Why Rewrite This

The official documentation is fairly rough in several places, leaves some behavior unexplained, and is not particularly pleasant to navigate. This documentation site is a structured rewrite of the official content, with runnable examples and better searchability.

## Installation

```bash
pnpm add @silver-formily/vue @formily/core @formily/json-schema @formily/reactive @silver-formily/reactive-vue @formily/shared
```

`@formily/json-schema` does not render UI by itself. To turn a schema into an actual Vue form, you still need `@formily/core` and `@silver-formily/vue` or another front-end binding library.

## Minimal Example

A minimal setup usually has 4 steps:

1. Create a form instance with `createForm()`
2. Register the components used in the schema with `createSchemaField()`
3. Declare a `schema` with `type`, `properties`, and `x-component`
4. Render everything with `FormProvider` and `SchemaField`

::: demo
guide/quick-start-en
:::

Key points from the example:

- `createSchemaField({ components })` defines which component names are available in `x-component`
- `schema.properties.nickname` and `schema.properties.bio` describe two fields
- `x-component-props` is passed directly to the target component
- `FormConsumer` is only used here to preview current values; in real code you can replace it with submit, validation, or linkage logic

## References

- [Formily Official: Core Concepts / JSON Schema Development Mode](https://vue.formilyjs.org/guide/concept#json-schema-%E5%BC%80%E5%8F%91%E6%A8%A1%E5%BC%8F)
