# Checkbox 复选框

> 复选框

## Markup Schema 案例

单个 Checkbox 绑定布尔值，Checkbox.Group 绑定选中值数组，通过 `enum` 配置选项。

::: tip 提示
多选字段应使用 `SchemaField.Array`，与实际数组值类型保持一致。
:::

:::demo
checkbox/markup-schema.tsx
:::

## JSON Schema 案例

:::demo
checkbox/json-schema.tsx
:::

## 纯 JSX 案例

通过 `Field` 的 `dataSource` 配置复选框组选项。

:::demo
checkbox/jsx.tsx
:::

## 基础用法

:::demo
checkbox/basic.tsx
:::

## API

非空字段 `dataSource` 优先，其余配置项参考[Ant Design 6 Checkbox](https://ant.design/components/checkbox)
