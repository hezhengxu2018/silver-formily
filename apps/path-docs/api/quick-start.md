# 快速开始

`Path` 的入口 API 很少，但覆盖面很广。最常用的是下面几组：

- `Path.parse`：把任意 pattern 规范化成 `Path` 实例
- `Path.getIn` / `Path.setIn` / `Path.deleteIn` / `Path.existIn` / `Path.ensureIn`
- `Path.match`：把 pattern 编译成 matcher 函数

:::tip 提示
这是一个 `formily` 框架内部使用的依赖，对普通用户来说只要熟悉[Pattern 语法](/api/patterns)即可。
:::

## 导入

```ts
import { Path } from '@silver-formily/path'
```

## 构造函数

虽然大多数场景会直接用 `Path.parse(...)`，但底层实例本身也可以直接创建：

```ts
class Path {
  constructor(pattern: Pattern, base?: Pattern)
}
```

这两种写法在能力上是等价的：

```ts
const created = new Path('user.profile.name')
const parsed = Path.parse('user.profile.name')

created.toString() === parsed.toString()
```

## Pattern 类型

`Path` 接受的 pattern 范围比普通路径字符串更大：

```ts
type Pattern
  = | string
    | number
    | Path
    | Array<string | number>
    | RegExp
    | ReturnType<typeof Path.match>
```

这也是为什么 `Path.parse` 同时能处理数据路径、匹配路径、正则和 matcher 函数。

## 核心属性

`Path.parse(...)` 返回的不只是一个工具对象，它本身也暴露了当前路径的结构信息：

| 属性                  | 说明                        |
| --------------------- | --------------------------- |
| `length`              | 非匹配型路径的 segment 数量 |
| `entire`              | 完整路径字符串或正则对象    |
| `segments`            | 非匹配型路径的分段数组      |
| `isMatchPattern`      | 是否为匹配型路径            |
| `isWildMatchPattern`  | 是否包含通配匹配语义        |
| `haveRelativePattern` | 是否带相对路径语义          |
| `haveExcludePattern`  | 是否包含排除模式            |
| `isRegExp`            | 是否由正则构造              |
| `tree`                | 解析后的 AST                |
| `matchScore`          | 最近一次匹配得到的分值      |

例如：

```ts
const path = Path.parse('user.profile.name')

path.entire
// 'user.profile.name'

path.segments
// ['user', 'profile', 'name']

path.length
// 3
```

## parse

```ts
const path = Path.parse('user.profile.nickname')

path.toString()
// 'user.profile.nickname'

path.toArr()
// ['user', 'profile', 'nickname']
```

`parse` 支持的输入并不只是一段字符串：

```ts
Path.parse('user.name')
Path.parse(['user', 'name'])
Path.parse(/^[a-z]+$/)
Path.parse(Path.match('user.*'))
```

如果你需要保留原始对象特征，也可以直接读这些 flags：

```ts
const pattern = Path.parse('*(!user.temp)')

pattern.isMatchPattern
// true

pattern.haveExcludePattern
// true
```

## 访问对象

```ts
const values = { user: { profile: { nickname: 'silver' } } }

Path.getIn(values, 'user.profile.nickname')
// 'silver'

Path.setIn(values, 'user.profile.city', 'Shanghai')

Path.existIn(values, 'user.profile.city')
// true
```

## matcher 函数

如果你要把某个 pattern 重复用于多个路径，`Path.match` 会更顺手：

```ts
const isUserField = Path.match('user.*')

isUserField('user.name')
// true

isUserField('settings.theme')
// false
```

## 相对路径

`parse` 的第二个参数可以传入 base path，用来解析相对表达式：

```ts
const next = Path.parse('.value', 'users.0')

next.toString()
// 'users.0.value'
```

再复杂一点的相对路径也属于 `path` 的能力范围：

```ts
Path.parse('.dd', 'aa.bb.cc').toString()
// 'aa.bb.dd'

Path.parse('..[].dd', 'aa.1.cc').toString()
// 'aa.1.dd'

Path.parse('..[+].dd', 'aa.1.cc').toString()
// 'aa.2.dd'

Path.parse('..[+10].dd', 'aa.1.cc').toString()
// 'aa.11.dd'
```

如果你在 `core` 里看过 `FormPath.parse(pattern, base)`，本质上就是这里的能力。
