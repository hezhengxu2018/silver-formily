# Query 模型

> 字段查询器，支持按路径模式灵活匹配和批量操作字段

## 描述

`Query` 是表单的字段查询工具，通过 `form.query(pattern)` 获得。它支持路径模式匹配、条件过滤和批量操作。

## 获取 Query

```ts
const query = form.query('user.*.name')
```

## 方法

### take

```txt
query.take(): GeneralField | undefined
```

获取匹配的第一个字段：

```ts
const firstField = form.query('**.name').take()
```

### map

```txt
query.map<T>(mapper?: (field: GeneralField) => T): T[]
```

映射匹配的所有字段：

```ts
// 获取所有 name 字段的值
const nameValues = form.query('**.name').map(field => field.value)
```

### forEach

```txt
query.forEach(iterator: (field: GeneralField) => void): void
```

遍历所有匹配字段：

```ts
form.query('**.email').forEach((field) => {
  field.setValidator({ format: 'email' })
})
```

### reduce

```txt
query.reduce<T>(reducer: (accumulator: T, field: GeneralField) => T, initial: T): T
```

聚合操作：

```ts
const allValid = form.query('**').reduce((valid, field) => {
  return valid && field.valid
}, true)
```

### filter

```txt
query.filter(predicate: (field: GeneralField) => boolean): GeneralField[]
```

按条件过滤：

```ts
const invalidFields = form.query('**').filter(field => field.invalid)
```

### sort

```txt
query.sort(comparator: (a: GeneralField, b: GeneralField) => number): GeneralField[]
```

排序匹配字段：

```ts
const sorted = form.query('items.*').sort((a, b) => a.index - b.index)
```

## 路径模式

Query 支持 `FormPath` 的完整模式语法：

| 模式      | 示例                         | 说明         |
| --------- | ---------------------------- | ------------ |
| 精确匹配  | `form.query('username')`     | 精确匹配路径 |
| `*` 通配  | `form.query('user.*')`       | 匹配单层     |
| `**` 通配 | `form.query('**.name')`      | 匹配任意多层 |
| 排除      | `form.query('** !**.email')` | 排除匹配     |

## 用例

### 批量操作

```ts
// 将所有 name 字段设为必填
form.query('**.name').forEach((field) => {
  field.setRequired(true)
})
```

### 条件查询

```ts
// 查找所有校验失败的字段
const failed = form.query('*').filter(field => field.selfInvalid)

// 统计
console.log(`共 ${failed.length} 个字段校验失败`)
```

### 值提取

```ts
// 提取所有字段的值
const allValues = form.query('*').map(field => ({
  name: field.path,
  value: field.value,
}))
```
