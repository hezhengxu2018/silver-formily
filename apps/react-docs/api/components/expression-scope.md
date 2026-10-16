---
order: 8
---

# ExpressionScope

## 描述

用于自定义组件内部给 json-schema 表达式传递局部作用域

## 用例

:::demo
api/components/expression-scope.tsx
:::

## API

| 属性     | 说明              | 类型              | 默认值 |
| -------- | ----------------- | ----------------- | ------ |
| value    | 注入的 scope 的值 | `any`             | -      |
| children | 子节点            | `React.ReactNode` | -      |

`value` 与 `children` 均可选；作用域与父级惰性合并，同名时局部值优先。
