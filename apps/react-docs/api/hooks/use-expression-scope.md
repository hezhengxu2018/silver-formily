# useExpressionScope

## 描述

读取当前子树的 Schema 表达式作用域。`createSchemaField` 与 [ExpressionScope](/api/components/expression-scope) 注入的变量都可以通过该 hook 在自定义组件中读取。

## 签名

```ts
declare function useExpressionScope(): any
```

## 用例

:::demo
api/hooks/use-expression-scope.tsx
:::

该 hook 只读取上下文，不创建模型，也不订阅模型属性。应在对应 Provider 下使用；即使部分签名未声明空值，缺少或被清理的上下文在运行时仍可能返回 null/undefined。
