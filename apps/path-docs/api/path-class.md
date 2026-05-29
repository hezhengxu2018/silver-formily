# Path 实例方法

`Path.parse(...)` 返回的是一个真正的 `Path` 实例，而不是简单的 segments 数组。除了访问器和匹配，它本身也有一批实用方法。

## 基础信息

```ts
const path = Path.parse('a.b.c')

path.toString()
// 'a.b.c'

path.toArr()
// ['a', 'b', 'c']

path.length
// 3
```

## 属性总览

除了 `toString()`、`toArr()` 这类方法，`Path` 本身还带着一组可以直接读取的属性：

| 属性                  | 说明                                 |
| --------------------- | ------------------------------------ |
| `length`              | 路径片段数量，仅对非匹配型路径有意义 |
| `entire`              | 完整路径字符串或正则                 |
| `segments`            | 路径片段数组                         |
| `isMatchPattern`      | 是否为匹配路径                       |
| `isWildMatchPattern`  | 是否带通配匹配语义                   |
| `haveRelativePattern` | 是否包含相对路径语法                 |
| `haveExcludePattern`  | 是否带排除模式                       |
| `isRegExp`            | 是否由正则构造                       |
| `tree`                | 解析后的 AST                         |
| `matchScore`          | 最近一次 `match` 的得分              |

例如：

```ts
const pattern = Path.parse('*(!basic.name,versionTag)')

pattern.isMatchPattern
// true

pattern.haveExcludePattern
// true
```

## toString 与 toArr

官方 Formily 文档里常写 `toArray()`，而当前 `@silver-formily/path` 暴露的方法名是 `toArr()`：

```ts
Path.parse('aa.bb.cc').toString()
// 'aa.bb.cc'

Path.parse('aa.bb.cc').toArr()
// ['aa', 'bb', 'cc']

Path.parse('aa.bb.*').toArr()
// []
```

这一点是当前站点文档需要明确区分的，不然会和老的 `FormPath` 心智混淆。

## 拼接与裁剪

```ts
const path = Path.parse('a.b.c')

path.concat('d.e').toString()
// 'a.b.c.d.e'

path.slice(0, 2).toString()
// 'a.b'

path.parent().toString()
// 'a.b'

path.pop().toString()
// 'a.b'
```

## 可变式语义，但返回新对象

这些方法虽然名字看起来像数组原型，但都返回新的 `Path`：

```ts
const path = Path.parse('a.b.c')

path.push('d').toString()
// 'a.b.c.d'

path.splice(0, 1).toString()
// 'b.c'
```

## 遍历 segments

```ts
const path = Path.parse('a.b.c')

path.map(segment => segment)
// ['a', 'b', 'c']

path.reduce((buf, segment) => buf + segment, '')
// 'abc'
```

## transform

`transform` 会从 segments 中挑出符合正则的部分，再交给回调：

```ts
Path.parse('a.b.c').transform(/[ab]/, (...segments) => segments)
// ['a', 'b']
```

静态版本同样存在：

```ts
Path.transform('a.b.c', /[a-z]/, (...segments) => segments)
// ['a', 'b', 'c']
```

## includes

`includes` 用于判断另一个普通路径是否是当前路径的前缀子路径：

```ts
Path.parse('aa.bb.cc').includes('aa.bb')
// true

Path.parse('aa.bb.cc').includes('cc.bb')
// false
```

## matchAliasGroup

这是 `core` 里大量依赖的方法，用同一个 pattern 同时比较 name 和 alias：

```ts
Path.parse('aa.*(!bb)').matchAliasGroup('kk.mm.aa.cc', 'aa.cc')
// true

Path.parse('aa.*(!bb)').matchAliasGroup('kk.mm.aa.bb', 'aa.bb')
// false
```

## 静态辅助方法

如果你不想先手动 `parse()` 成实例，也可以直接用静态方法：

```ts
Path.match('user.*')('user.name')
// true

Path.getIn({ user: { name: 'silver' } }, 'user.name')
// 'silver'

Path.setIn({}, 'user.name', 'silver')
Path.deleteIn({ user: { name: 'silver' } }, 'user.name')
Path.existIn({ user: { name: 'silver' } }, 'user.name')
Path.ensureIn({}, 'user.name', 'guest')
```

## 何时会抛错

如果当前实例本身是 match pattern 或正则路径，那么很多“数组式操作”都不再有确定语义，因此会抛错：

- `concat`
- `slice`
- `pop`
- `splice`
- `forEach`
- `map`
- `reduce`
- `transform`

典型例子：

```ts
const wildcard = Path.parse('*')

wildcard.concat('a')
// throw Error
```

这是一个值得在业务侧保留的心智模型：普通路径可以当作结构化对象操作，match pattern 则更像“编译后的规则”。
