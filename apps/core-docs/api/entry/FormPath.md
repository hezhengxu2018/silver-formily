# FormPath

> 表单路径工具类，提供路径解析、匹配和操作能力

## 描述

`FormPath` 是 `@silver-formily/path` 中 `Path` 类的别名导出。它提供了强大的路径模式匹配和路径操作能力，是整个表单字段寻址系统的基础。

## 签名

```ts
// FormPath 即 @silver-formily/path 的 Path 类
import { Path as FormPath } from '@silver-formily/path'
```

## 路径模式语法

| 模式       | 说明              | 示例                             |
| ---------- | ----------------- | -------------------------------- |
| `*`        | 匹配单层任意名称  | `user.*.name` 匹配 `user.a.name` |
| `**`       | 匹配任意多层      | `**.name` 匹配所有 name 字段     |
| `[n]`      | 匹配数组索引      | `items.[0].name`                 |
| `[n:]`     | 匹配数组从 n 开始 | `items.[1:].name`                |
| `[n:m]`    | 匹配数组索引区间  | `items.[0:2].name`               |
| `{a,b}`    | 匹配多个选项      | `{username,email}`               |
| `!pattern` | 排除匹配          | `!**.email`                      |
| `alias`    | 别名匹配          | 需配合 `matchAliasGroup`         |

## 用例

### 路径解析

```ts
import { FormPath } from '@silver-formily/core'

const path = FormPath.parse('user.profile.name')
console.log(path.segments) // ['user', 'profile', 'name']
```

### 模式匹配

```ts
// 字段是否匹配指定模式
FormPath.parse('user.*.name').match('user.profile.name') // true
FormPath.parse('user.*.name').match('settings.profile.name') // false
```

### 在 Query 中使用

路径模式最常用于 `form.query`：

```ts
// 查找所有 name 字段
const fields = form.query('**.name').map()

// 查找 user 下的所有直接子字段
const userFields = form.query('user.*').map()

// 查找所有以 email 命名的字段
const emails = form.query('**.email').map()
```
