---
order: 8
---

# ExpressionScope

## Description

Used to pass a local scope to json-schema expressions inside custom components.

## Usage

:::demo
api/components/expression-scope.tsx
:::

## API

| Attribute | Description                 | Type              | Default |
| --------- | --------------------------- | ----------------- | ------- |
| value     | Value of the injected scope | `any`             | -       |
| children  | Child nodes                 | `React.ReactNode` | -       |

`value` and `children` are optional. The scope is lazily merged with the parent scope; local values override matching parent keys.
