---
aside: true
outline: [2, 3]
---

# RecursionField

## 描述

递归渲染组件，主要基于 [JSON Schema 文档](https://json-schema.silver-formily.org/) 做递归渲染，它是 [SchemaField](/api/components/schema-field) 组件内部的核心渲染组件，当然，它是可以独立于 SchemaField 单独使用的，我们使用的时候主要是在自定义组件中使用，用于实现具有递归渲染能力的自定义组件

::: tip Schema 协议说明
本页只说明 `@silver-formily/react` 如何递归消费 Schema。`Schema`、`ISchema`、属性协议和联动协议的完整定义请查看 [JSON Schema 文档](https://json-schema.silver-formily.org/)。
:::

## 简易递归

可以从组件属性中读取独立的 schema 对象，传给 RecursionField 渲染。自定义组件中配合 `onlyRenderProperties` 可以只渲染 schema 的 properties 部分。

:::demo
api/components/recursion-field.tsx
:::

## 自增列表递归

使用[useField](/api/hooks/use-field)和[useFieldSchema](/api/hooks/use-field-schema)来获取当前字段上下文中的字段实例和字段 schema

:::demo
api/components/recursion-field-with-component.tsx
:::

## API

| 属性                 | 说明                                                          | 类型                                                                | 默认值        |
| -------------------- | ------------------------------------------------------------- | ------------------------------------------------------------------- | ------------- |
| schema               | 要渲染的 Schema 对象                                          | [ISchema](https://json-schema.silver-formily.org/api/types#ischema) | —             |
| name                 | 渲染时挂载的字段名称，常配合 `basePath` 推导路径              | `string`                                                            | `schema.name` |
| basePath             | 计算 `name` 的基路径                                          | [FormPathPattern](#FormPathPattern)                                 | 当前字段路径  |
| propsRecursion       | 递归渲染子节点时是否透传 `mapProperties` / `filterProperties` | `boolean`                                                           | `false`       |
| onlyRenderProperties | 仅渲染子节点 `properties`，不渲染当前节点                     | `boolean`                                                           | `false`       |
| onlyRenderSelf       | 仅渲染当前节点，不自动递归子节点                              | `boolean`                                                           | `false`       |
| mapProperties        | 属性映射函数，可在渲染前改写 schema                           | ^[Function]`(schema: Schema, name: SchemaKey) => Schema`            | —             |
| filterProperties     | 属性过滤函数，返回 `false` 的节点不会渲染                     | ^[Function]`(schema: Schema, name: SchemaKey) => boolean`           | —             |

### FormPathPattern

```ts
type FormPathPattern = string | number | Array<string | number> | RegExp
```
