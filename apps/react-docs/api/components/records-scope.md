# RecordsScope

## 描述

标准作用域注入组件，向子树的 Schema 表达式注入以下内置变量：

- `$records` 当前记录列表数据

通常与 [RecordScope](/api/components/record-scope) 搭配使用：RecordsScope 为整张列表提供数据源，RecordScope 在渲染每一行时注入当前行记录。

## 使用约定

任何自增列表扩展组件，内部都应该使用 RecordsScope，用于传递记录作用域变量。

## 用例

:::demo
api/components/records-scope.tsx
:::

## API

| 属性       | 说明                   | 类型                     | 默认值 |
| ---------- | ---------------------- | ------------------------ | ------ |
| getRecords | 返回当前记录集合的函数 | ^[Function]`() => any[]` | -      |
| children   | 子节点                 | `React.ReactNode`        | -      |
