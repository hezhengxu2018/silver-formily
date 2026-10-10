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

| Attribute | Description                 | Type                  | Default |
| --------- | --------------------------- | --------------------- | ------- |
| value     | Value of the injected scope | `Record<string, any>` | -       |
| children  | Child nodes                 | `React.ReactNode`     | -       |
