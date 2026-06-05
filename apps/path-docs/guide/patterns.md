# 模式语法

`@silver-formily/path` 的强项不是普通点路径，而是它把“路径模式”也统一放进了同一套系统里。

## 交互示例

这个 playground 会把当前 pattern 的解析结果、flags 和匹配结果直接展示出来，适合试验 `*`、`**`、`~`、group 和相对路径：

::: demo
api/patterns/lab
:::

## 普通路径

```ts
Path.parse('user.profile.nickname')
Path.parse(['user', 'profile', 'nickname'])
```

这是最常见的数据操作路径，主要用于 `getIn` / `setIn` / `deleteIn`。

## 下标路径

数组下标既可以写成点路径，也可以写成中括号：

```ts
const target = { array: [] }

Path.setIn(target, 'array.0.aa', '000')
Path.setIn(target, 'array[1].aa', '111')

Path.getIn(target, 'array.0.aa')
// '000'

Path.getIn(target, 'array.1.aa')
// '111'
```

## 解构表达式

解构表达式会作为路径中的一个普通节点存在，但在数据读写时会触发“拆开 / 重组”的行为：

```ts
const target = {}

Path.setIn(target, 'parent.[aa,bb]', [11, 22])
// { parent: { aa: 11, bb: 22 } }

Path.getIn(target, 'parent.[aa,bb]')
// [11, 22]

Path.parse('parent.[aa,bb]').toString()
// 'parent.[aa,bb]'
```

这类语法很适合前后端结构不一致时的投影映射。

## 单层通配 `*`

`*` 表示匹配一层：

```ts
Path.parse('user.*').match('user.name')
// true

Path.parse('user.*').match('user.profile.name')
// false
```

## 可选深层通配 `**`

`**` 表示“从这里开始，后面可以有零层到多层”：

```ts
Path.parse('aa.**').match(['aa'])
// true

Path.parse('aa.**').match(['aa', 'bb', 'cc'])
// true
```

## expand `~`

`~` 用来表达前缀扩展匹配：

```ts
Path.parse('xxx.eee~').match('xxx.eee')
// true

Path.parse('t.0.value~').match(['t', 0, 'value_list'])
// true
```

这在 Formily 的字段别名、数组子字段扩展里很常见。

## 相对表达式

当你传了 base path 时，pattern 可以写成相对形式：

```ts
Path.parse('.value', 'users.0').toString()
// 'users.0.value'
```

更复杂的相对路径在数组邻居计算里尤其常见：

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

这里可以记住三条规则：

1. 一个点表示当前路径。
2. `n` 个点表示向前回退 `n - 1` 步。
3. 中括号中的 `+` / `-` 表达式可以基于当前数组下标做偏移计算。

## 全匹配

全匹配就是单独一个 `*`，表示匹配所有路径：

```ts
Path.parse('*').match('aa')
// true

Path.parse('*').match('aa.bb')
// true
```

## 局部匹配

把 `*` 放到某个具体节点上，就是“只匹配当前位置的任意一层”：

```ts
Path.parse('aa.*.cc').match('aa.bb.cc')
// true

Path.parse('aa.*.cc').match('aa.kk.cc')
// true
```

## group

group 语法允许你把多个候选路径合并到一个 pattern 中：

```ts
Path.parse('*(aa,bb,cc)').match('bb')
// true

Path.parse('*(phases.*.type,phases.*.steps.*.type)').match('phases.0.steps.1.type')
// true

Path.parse('aa.*(bb,kk,dd,ee.*(oo,gg).gg).cc').match('aa.ee.oo.gg.cc')
// true
```

## 排除模式

在 group 里加 `!` 可以表达排除：

```ts
Path.parse('*(!aaa)').match('ggg')
// true

Path.parse('*(!aaa)').match('aaa')
// false

Path.parse('*(!basic.name,versionTag)').match('basic.id')
// true
```

排除模式常见于“通配大部分字段，但排除少数敏感路径”的场景。

## 正则路径

正则也属于合法 pattern：

```ts
Path.parse(/^\d+$/).match('212')
// true

Path.parse(/^\d+$/).match('212dd')
// false
```

## 范围匹配

范围匹配主要服务于数组索引：

```ts
Path.parse('aa.*[1:2].bb').match('aa.1.bb')
// true

Path.parse('aa.*[1:2].bb').match('aa.3.bb')
// false

Path.parse('aa.*[1:].bb').match('aa.3.bb')
// true

Path.parse('aa.*[:100].bb').match('aa.1000.bb')
// false
```

`x` 或 `y` 留空时表示开区间。

## 转义匹配

如果路径节点本身包含语法关键字，可以用反斜杠或 `[[...]]` 转义：

```ts
Path.parse('aa.\\,\\*\\{\\}\\.\\(\\).bb').match('aa.\\,\\*\\{\\}\\.\\(\\).bb')
// true

Path.parse('aa.[[,*{}.()]].bb').match('aa.[[,*{}.()]].bb')
// true
```

## 解构匹配

带解构表达式的路径在匹配时可以直接按原样匹配，无需额外转义：

```ts
Path.parse('target.[aa,bb]').match('target.[aa,bb]')
// true
```
