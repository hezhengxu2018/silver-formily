# useExpressionScope

## Description

Reads the Schema expression scope of the current subtree. Variables injected by `createSchemaField` and [ExpressionScope](/en/api/components/expression-scope) can all be read in custom components via this hook.

## Signature

```ts
declare function useExpressionScope(): any
```

## Usage

:::demo
api/hooks/use-expression-scope.tsx
:::

This hook reads context; it does not create a model or subscribe to observable properties. Use the corresponding provider. Although some signatures are non-nullable, missing or cleared context can return null/undefined at runtime.
