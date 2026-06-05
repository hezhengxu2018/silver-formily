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

| 模式      | 说明                 | 示例                                     |
| --------- | -------------------- | ---------------------------------------- |
| `*`       | 匹配任意路径         | `*` 匹配 `user` 或 `user.name`           |
| `a.*`     | 匹配指定前缀下的路径 | `user.*` 匹配 `user.name`                |
| `**`      | 匹配任意多层         | `user.**` 匹配 `user` 或 `user.a.name`   |
| `~`       | 前缀扩展匹配         | `value~` 匹配 `value_list`               |
| `*(a,b)`  | 匹配多个候选路径     | `*(username,email)` 匹配 `email`         |
| `*(!a,b)` | 排除多个候选路径     | `*(!password,token)` 不匹配 `password`   |
| `*[n:m]`  | 匹配数组索引区间     | `items.*[0:2].name` 匹配 `items.1.name`  |
| `*[n:]`   | 匹配数组 n 之后索引  | `items.*[1:].name` 匹配 `items.2.name`   |
| `*[:m]`   | 匹配数组 m 之前索引  | `items.*[:2].name` 不匹配 `items.3.name` |
| `[[...]]` | 转义特殊字符         | `[[a.b]]` 匹配字面量路径节点 `a.b`       |
| `RegExp`  | 正则路径             | `/^user\\./` 匹配以 `user.` 开头的字符串 |

:::tip 提示
`alias` 不是一种独立的路径模式。`@silver-formily/core` 中的字段匹配会通过 `matchAliasGroup` 同时比较字段的 `address` 和 `path`，因此同一个字段可能被字段树路径或数据路径命中。
:::

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

### 别名组匹配

```ts
const pattern = FormPath.parse('username')

pattern.matchAliasGroup('layout.username', 'username') // true
```

在 `core` 的 `form.query()`、`field.match()` 和 `onFieldXxx(pattern)` 中，`name` 通常对应 `field.address`，`alias` 通常对应 `field.path`。这主要用于处理包含 `VoidField` 的结构。

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
