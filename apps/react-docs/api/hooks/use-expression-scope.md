# useExpressionScope

## 描述

读取当前子树的 Schema 表达式作用域。`createSchemaField` 与 [ExpressionScope](/api/components/expression-scope) 注入的变量都可以通过该 hook 在自定义组件中读取。

## 签名

```ts
interface useExpressionScope {
  (): Record<string, any>
}
```

## 用例

:::demo
api/hooks/use-expression-scope.tsx
:::
