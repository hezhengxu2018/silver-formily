# RecordScope

## 描述

向子树的 Schema 表达式注入 `$record` 与 `$index` 变量，主要用于自增列表等需要携带行数据递归渲染的场景。

## 用例

:::demo
api/components/record-scope.tsx
:::

## API

| 属性      | 说明                 | 类型                      | 默认值 |
| --------- | -------------------- | ------------------------- | ------ |
| getRecord | 返回当前行记录的函数 | ^[Function]`() => any`    | -      |
| getIndex  | 返回当前行索引的函数 | ^[Function]`() => number` | -      |
| children  | 子节点               | `React.ReactNode`         | -      |

注入的表达式变量：

| 变量      | 说明                                                           |
| --------- | -------------------------------------------------------------- |
| `$record` | `getRecord()` 的返回值，对象记录上还会挂 `$lookup` 与 `$index` |
| `$index`  | `getIndex()` 的返回值                                          |
| `$lookup` | 外层作用域的 `$record`，用于嵌套列表                           |
