# Tree Select

> 树形选择器

## Markup Schema 案例

::: demo

tree-select/markup-schema

:::

## JSON Schema 案例

::: demo

tree-select/json-schema

:::

## Template 案例

::: demo

tree-select/template

:::

## API

参考 [https://cn.element-plus.org/zh-CN/component/tree-select.html](https://cn.element-plus.org/zh-CN/component/tree-select.html)

## 获取实例

用于获取`ElTreeSelect`实例,具体暴露的方法请参考`element-plus`文档。使用方式请参考节点过滤的demo。主要用来操作Tree的展开与选中。

```ts
const treeSelectRef: Ref<TreeSelectInstance> = fieldRef.value.invoke('getTreeSelectRef')
```

## 插槽

支持原有组件所有插槽，所有插槽在原有基础上额外添加了 field 作用域插槽的值方便做访问。
