# 匹配能力

匹配能力是 Formily 在字段联动、effects、query 中大量依赖的部分。理解这一节之后，再回去看 `core` 里的 `matchAliasGroup` 会更顺。

## 交互示例

下面这个 playground 适合直接比较 `match`、`Path.match`、`matchAliasGroup` 和 `includes` 的差异：

::: demo
api/matching/alias-playground
:::

## match

`Path#match` 的两边并不要求都是普通路径。通常有两种用法：

```ts
Path.parse('a.b.c').match('*')
// true

Path.parse('*').match('a.b.c')
// true

Path.parse('aa.1.cc').match('aa.*.cc')
// true
```

当双方都是 match pattern 时会直接报错，因为这不是一个明确的匹配方向。

```ts
Path.parse('*').match('aa.*.cc')
// throw Error
```

## Path.match

如果你要复用 matcher，静态方法会更自然：

```ts
const isTarget = Path.match('aa.*(!bb,cc)')

isTarget('aa.dd')
// true

isTarget('aa.bb')
// false
```

如果你只需要编译一次 matcher 再多次复用，这种写法会比反复 `parse(...).match(...)` 更自然。

## transform

`transform` 常用来从路径里提取索引或标识，再拼出新的路径：

```ts
Path.parse('aa.1.cc').transform(/\d+/, index => `aa.${Number(index) + 1}.cc`)
// 'aa.2.cc'
```

静态方法也支持相同的能力：

```ts
Path.transform('aa.0.bb', /\d+/, index => `aa.${Number(index) + 1}.bb`)
// 'aa.1.bb'
```

## matchScore

每次匹配后，`Path` 实例会更新 `matchScore`。在多数场景下你不需要直接操作它，但 `matchAliasGroup` 会用它来比较包含排除模式时的匹配优先级。

## matchAliasGroup

这是 `core` 中非常关键的一个方法。它用同一 pattern 同时匹配 name 和 alias，并根据是否带排除模式决定最终结果。

```ts
const pattern = Path.parse('aa.*(!bb)')

pattern.matchAliasGroup('kk.mm.aa.cc', 'aa.cc')
// true

pattern.matchAliasGroup('kk.mm.aa.bb', 'aa.bb')
// false
```

基础场景下，它也可以理解成“同一个 pattern 同时比对真实 name 和 alias”：

```ts
Path.parse('aa.bb.cc').matchAliasGroup('aa.bb.cc', 'aa.cc')
// true
```

带排除模式时，返回值会更依赖 `matchScore`：

```ts
const excludePattern = Path.parse('aa.bb.*(11,22,33).*(!aa,bb,cc)')

excludePattern.matchAliasGroup('aa.bb.11.mm', 'aa.cc.dd.bb.11.mm')
// true
```

## includes

`includes` 适合判断一个普通路径是否以前缀形式包含另一个普通路径：

```ts
Path.parse('a.b').includes('a.b')
// true

Path.parse('a.b').includes('a.c')
// false

Path.parse('a.b').includes('a.b.c')
// false
```

如果把 match pattern 传给普通路径，或者反过来，都可能抛错。它不是 `match` 的替代品，而是一个更严格的前缀判断。
