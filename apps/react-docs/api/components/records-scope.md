# RecordsScope

## 描述

向子树的 Schema 表达式注入 `$records` 变量，通常与 [RecordScope](/api/components/record-scope) 搭配使用，为整张列表提供数据源。

## 用例

:::demo
api/components/records-scope.tsx
:::

## API

| 属性       | 说明                   | 类型                     | 默认值 |
| ---------- | ---------------------- | ------------------------ | ------ |
| getRecords | 返回当前记录集合的函数 | ^[Function]`() => any[]` | -      |
| children   | 子节点                 | `React.ReactNode`        | -      |

注入的表达式变量：

| 变量       | 说明                                     |
| ---------- | ---------------------------------------- |
| `$records` | `getRecords()` 的返回值，未提供时为 `[]` |
