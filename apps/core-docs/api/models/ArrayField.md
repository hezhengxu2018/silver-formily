# ArrayField 模型

> 数组字段模型，管理列表项及其子字段

## 描述

`ArrayField` 是专门用于管理数组列表的字段模型。它继承 `Field` 的所有能力，并增加了数组操作（添加、删除、移动）的方法。

与普通数组不同，ArrayField 中的每个元素都可以拥有自己的子字段结构。

## 构造

```ts
const arrayField = form.createArrayField({
  name: 'items',
  value: [],
})
```

## 属性

继承 `Field` 的全部属性，不再重复列出。

## 独有方法

### 数组操作

| 方法       | 签名                              | 说明                   |
| ---------- | --------------------------------- | ---------------------- |
| `push`     | `(item?: any)`                    | 向数组末尾添加元素     |
| `pop`      | `()`                              | 移除并返回最后一个元素 |
| `insert`   | `(index, item?)`                  | 在指定位置插入元素     |
| `remove`   | `(index)`                         | 移除指定位置的元素     |
| `shift`    | `()`                              | 移除并返回第一个元素   |
| `unshift`  | `(item?)`                         | 向数组开头添加元素     |
| `move`     | `(from, to)`                      | 移动元素位置           |
| `moveUp`   | `(index)`                         | 将元素上移一位         |
| `moveDown` | `(index)`                         | 将元素下移一位         |
| `splice`   | `(start, deleteCount?, ...items)` | 通用 splice            |

## 用例

### 基本数组操作

```ts
import { createForm } from '@silver-formily/core'

const form = createForm()
const list = form.createArrayField({
  name: 'todoList',
  value: [],
})

// 添加项
list.push({ title: '任务一' })
list.push({ title: '任务二' })

// 插入项
list.insert(0, { title: '新任务' })

// 移动项
list.move(0, 1)

// 删除项
list.remove(1)

// 最终数组
console.log(list.value)
// [{ title: '任务一' }, { title: '新任务' }]
```

### 配合子字段

```ts
const form = createForm({
  values: {
    users: [
      { name: 'Alice', age: 25 },
      { name: 'Bob', age: 30 },
    ],
  },
})

const usersField = form.createArrayField({ name: 'users' })

// 添加新用户
usersField.push({ name: '', age: 0 })

// 为新用户创建子字段
const newUser = usersField.value[2]
form.createField({ name: 'users.2.name', value: 'Charlie' })
form.createField({ name: 'users.2.age', value: 28 })
```

### 批量修改

```ts
// 使用 splice 批量操作
list.splice(0, 2, { title: 'A' }, { title: 'B' })
// 等价于：移除前 2 个，插入 A 和 B
```
