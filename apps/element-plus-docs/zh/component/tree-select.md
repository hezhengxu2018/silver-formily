# Tree Select

> 树形选择器

## Markup Schema 案例

:::demo

tree-select/markup-schema

:::

## JSON Schema 案例

:::demo

tree-select/json-schema

:::

## Template 案例

:::demo

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

## 对象值与属性筛选

设置 `optionAsValue: true` 可将选项对象作为表单值；`optionValueKeys?: string[]` 仅保留指定的顶层属性。未配置时返回完整对象，空数组返回空对象，缺失属性忽略。默认 `optionAsValue` 为 `false`。

筛选只作用于表单输出，不修改 `dataSource`。请在白名单中保留选项标识（如 `value`、`nodeKey` 或 `rowKey` 对应属性），回显按标识从完整数据源读取标签。仅提供标识而不保存 label 也可以正常回显。

```ts
const componentProps = {
  optionAsValue: true,
  optionValueKeys: ['value'],
}
// dataSource: [{ value: 1, label: '选项一', extra: '业务属性' }]
// 表单值: { value: 1 }
```

:::demo

tree-select/option-value

:::
