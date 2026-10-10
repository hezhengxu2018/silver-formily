# RecordScope

## 描述

标准作用域注入组件，向子树的 Schema 表达式注入以下内置变量：

- `$record` 当前记录数据
- `$record.$lookup` 当前记录的父级记录，可以一直往上查找
- `$record.$index` 当前记录的索引
- `$index` 当前记录索引，等同于 `$record.$index`，考虑到记录数据如果不是对象，则需要独立读取
- `$lookup` 当前记录的父级记录，等同于 `$record.$lookup`，考虑到记录数据如果不是对象，则需要独立读取

主要用于自增列表、表格等需要携带行数据递归渲染的场景，通常与 [RecordsScope](/api/components/records-scope) 搭配使用。

## 使用约定

任何自增列表扩展组件，内部都应该使用 RecordScope，用于传递记录作用域变量。

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
