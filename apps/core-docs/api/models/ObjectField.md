# ObjectField 模型

> 对象字段模型，管理嵌套对象结构及其子字段

## 描述

`ObjectField` 是用于管理嵌套对象结构的字段模型。与 `Field` 不同，`ObjectField` 通常作为容器使用，其下的具体属性由 `Field` 实例管理。

## 构造

```ts
const objectField = form.createObjectField({
  name: 'profile',
  value: {},
})
```

## 属性

继承 `Field` 的全部属性。ObjectField 的特性体现在它能**聚合**子字段的校验状态：

```ts
// profile 是一个 ObjectField
// profile.name 和 profile.age 是其子字段

// ObjectField.valid 会汇总所有子字段的 valid
// ObjectField.errors 会包含所有子字段的 errors
```

## 用例

### 基本嵌套结构

```ts
import { createForm } from '@silver-formily/core'

const form = createForm({
  values: {
    profile: {
      name: 'Silver',
      age: 25,
    },
  },
})

// 创建对象字段
const profile = form.createObjectField({ name: 'profile' })

// 创建对象下的子字段
const nameField = form.createField({
  name: 'profile.name',
  value: 'Silver',
})

const ageField = form.createField({
  name: 'profile.age',
  value: 25,
})

// profile 的值即为嵌套对象
console.log(profile.value) // { name: 'Silver', age: 25 }
```

### 聚合校验

```ts
// 校验子字段
nameField.setValidator({ required: true })
ageField.setValidator({ min: 18 })

// 子字段校验失败会影响 ObjectField 的校验状态
await form.validate()
console.log(profile.valid) // 汇总所有子字段
console.log(profile.errors) // 包含所有子字段的错误
console.log(profile.selfErrors) // 仅自身的错误（ObjectField 通常没有自身错误）
```

### 与 ArrayField 组合

```ts
const form = createForm({
  values: {
    users: [
      { profile: { name: 'Alice', age: 25 } },
      { profile: { name: 'Bob', age: 30 } },
    ],
  },
})

const user0Profile = form.createObjectField({
  name: 'users.0.profile',
})
```

### 设置嵌套值

```ts
// 通过 Form API 操作深层值
form.setValuesIn('profile.name', 'NewName')

// 通过 ObjectField 直接赋值
profile.setValue({ name: 'NewName', age: 26 })
```
