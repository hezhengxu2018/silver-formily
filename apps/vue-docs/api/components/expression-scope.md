---
order: 8
---

# ExpressionScope

## 描述

用于自定义组件内部给 json-schema 表达式传递局部作用域

## 用例

::: demo
api/components/expression-scope
:::

## API

| 属性  | 说明              | 类型                  | 默认值 |
| ----- | ----------------- | --------------------- | ------ |
| value | 注入的 scope 的值 | `Record<string, any>` | -      |
