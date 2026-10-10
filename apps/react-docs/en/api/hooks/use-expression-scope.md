# useExpressionScope

## Description

Reads the Schema expression scope of the current subtree. Variables injected by `createSchemaField` and [ExpressionScope](/en/api/components/expression-scope) can all be read in custom components via this hook.

## Signature

```ts
interface useExpressionScope {
  (): Record<string, any>
}
```

## Usage

:::demo
api/hooks/use-expression-scope.tsx
:::
