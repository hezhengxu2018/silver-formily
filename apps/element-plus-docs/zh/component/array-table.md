# ArrayTable

> 自增表格，对于数据量超大的场景比较适合使用该组件，重构后的 ArrayTable 组件性能大幅提升，大数量时输入时也不会有卡顿。

::: warning 注意
该组件只适用于 Schema 场景，且只能是对象数组。
:::

::: tip 提示
由于需要给分页添加错误提示，本组件内置的分页组件fork了`2.9.11`版本的element-plus的分页组件，如果没有特殊情况内置的分页组件将不再更新，配置项属性请以该版本的为准，组件内部的函数还是从`peerDependencies`中获取,所以语言可以正常的从element-plus中继承。需要修改默认语言请使用`el-config-provider`组件进行包裹。
:::

目前有一个已知的问题是表格校验时不会校验尚未渲染过的行，因为Formily只会校验注册过的Field，对于未注册的Field无法触发校验。如果直接注册10w条Field又会导致页面卡顿。解决这个问题的最佳方案应该是不提供例子中的一次性添加大量数据的按钮，保证所有的数据都是通过`添加条目`按钮添加的就能保证所有的Field都是经过注册的。

## Markup Schema 案例

:::demo

array-table/markup-schema

:::

## Markup Schema 关闭分页案例

:::demo

array-table/markup-schema-pagination-false

:::

## Markup Schema 可拖拽案例

:::demo

array-table/markup-schema-draggable

:::

## JSON Schema 案例

:::demo

array-table/json-schema

:::

## JSON Schema 修改分页配置案例

:::demo

array-table/json-schema-pagination

:::

## Effects 联动案例

:::demo

array-table/effects-markup-schema

:::

## JSON Schema 联动案例

:::demo

array-table/effects-json-schema

:::

## API

### ArrayTable

> 表格组件

参考 [https://cn.element-plus.org/zh-CN/component/table.html](https://cn.element-plus.org/zh-CN/component/table.html)

#### 扩展属性

| 属性名          | 类型                          | 描述         | 默认值                                                           |
| --------------- | ----------------------------- | ------------ | ---------------------------------------------------------------- |
| pagination      | boolean                       | 是否启用分页 | `true`                                                           |
| paginationProps | ^[object]`参考Pagination组件` | 分页组件属性 | `{ backgound: true, layout: "total, sizes, prev, pager, next" }` |

### ArrayTable.Column

> 表格列

参考 [https://cn.element-plus.org/zh-CN/component/table.html](https://cn.element-plus.org/zh-CN/component/table.html)

#### 扩展属性

| 属性名   | 类型    | 描述     | 默认值 |
| -------- | ------- | -------- | ------ |
| asterisk | boolean | 星号显示 | true   |

::: tip 提示

1. ArrayTableColumn 会自动检查内部的 FormItem 是否必填，并自动在表头加上红色星号。如果不希望显示，可通过 `asterisk` 属性进行覆盖。
2. AtrrayTableColumn 仅继承属性，不支持插槽。
   :::

### ArrayTable.SortHandle

> 参考ArrayBase.SortHandle

### ArrayTable.Addition

> 参考ArrayBase.Addition

### ArrayTable.Remove

> 参考[ArrayBase.Remove](./array-base.md#remove)

### ArrayTable.MoveDown

> 参考[ArrayBase.MoveDown](./array-base.md#movedown)

### ArrayTable.MoveUp

> 参考[ArrayBase.MoveUp](./array-base.md#moveup)

### ArrayTable.Index

> 参考[ArrayBase.Index](./array-base.md#index)

### ArrayTable.useIndex

> 参考[ArrayBase.useIndex](./array-base.md#useindex)

### ArrayTable.useRecord

> 参考[ArrayBase.useRecord](./array-base.md#userecord)
