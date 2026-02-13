---
order: 8
---

# ExpressionScope

## Description

Injects a local scope for schema expressions defined inside JSON Schema blocks.

## Usage

::: demo
api/components/expression-scope
:::

## API

| Prop  | Description                                      | Type                  | Default |
| ----- | ------------------------------------------------ | --------------------- | ------- |
| value | Object injected into the schema expression scope | `Record<string, any>` | —       |
