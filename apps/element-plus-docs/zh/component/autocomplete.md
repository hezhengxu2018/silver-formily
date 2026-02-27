# Autocomplete

> 自动完成输入框

## Markup Schema 基础用法

:::demo

autocomplete/markup-schema-basic

:::

## Markup Schema 远程搜索

:::demo

autocomplete/markup-schema-remote

:::

## Template 作用域插槽

:::demo

autocomplete/template-scope

:::

## Template 插槽拓展

:::demo

autocomplete/template-slots

:::

## 获取实例

用于获取 `ElAutocomplete` 实例，方便调用 `focus`/`blur` 等方法，类型与 Element Plus 保持一致。

```ts
const autocompleteRef = fieldRef.value?.invoke('getElAutocompleteRef')
```

## API

参考 [https://cn.element-plus.org/zh-CN/component/autocomplete.html](https://cn.element-plus.org/zh-CN/component/autocomplete.html)

### 扩展属性

| 属性名  | 类型               | 描述                                                                                    | 默认值 |
| ------- | ------------------ | --------------------------------------------------------------------------------------- | ------ |
| options | ^[array]`object[]` | 选项配置数组，等价于 `dataSource`，在未显式提供 `fetchSuggestions` 时会自动转为建议列表 | []     |

- 组件会在没有 `fetchSuggestions` 时，基于 `dataSource / options` 自动实现本地模糊过滤。
- 当你自定义 `fetchSuggestions(query, cb, field)` 时，第三个 `field` 参数会暴露当前 Formily 字段实例，你需要手动赋值 `field.loading` 来标明field的状态（从语义化角度考虑是有意义的，大部分时候没有这个必要）,更多时候是通过field访问表单的其他Field的值。

例如：

```ts
function remoteFetch(query: string, cb: (data: Option[]) => void, field?: Field) {
  field && (field.loading = true)
  apiRequest(query).finally((resp) => {
    cb(resp.data)
    field && (field.loading = false)
  })
}
```

### 插槽

组件继承了 Element Plus `ElAutocomplete` 的全部插槽。其中`default`、`header`、`footer` 插槽额外注入了 Formily `field` 引用，便于在建议项里访问表单态。

| 插槽名  | 描述                               | 类型                       |
| ------- | ---------------------------------- | -------------------------- |
| default | 自定义输入建议内容                 | ^[object]`{ item, field }` |
| header  | 下拉列表顶部内容                   | ^[object]`{ field }`       |
| footer  | 下拉列表底部内容                   | ^[object]`{ field }`       |
| loading | 自定义加载状态内容                 | --                         |
| prefix  | 输入框头部内容                     | --                         |
| suffix  | 输入框尾部内容                     | --                         |
| prepend | 输入框前置内容（位于 prefix 之前） | --                         |
| append  | 输入框后置内容（位于 suffix 之后） | --                         |
