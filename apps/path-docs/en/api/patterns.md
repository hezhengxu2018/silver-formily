# Pattern Syntax

The real strength of `@silver-formily/path` is not plain dot paths. It is the fact that path patterns and access paths share the same abstraction.

## Interactive demo

This playground shows the parsed segments, flags, and match result for the current pattern. It is useful for experimenting with `*`, `**`, `~`, groups, and relative paths.

::: demo
api/patterns/lab
:::

## Plain paths

```ts
Path.parse('user.profile.nickname')
Path.parse(['user', 'profile', 'nickname'])
```

This is the most common data-path form and is mainly used for `getIn` / `setIn` / `deleteIn`.

## Indexed paths

Array indices can be written either with dot notation or bracket notation:

```ts
const target = { array: [] }

Path.setIn(target, 'array.0.aa', '000')
Path.setIn(target, 'array[1].aa', '111')

Path.getIn(target, 'array.0.aa')
// '000'

Path.getIn(target, 'array.1.aa')
// '111'
```

## Destructuring expressions

Destructuring expressions behave like a normal path segment, but they trigger split/rebuild semantics during data operations:

```ts
const target = {}

Path.setIn(target, 'parent.[aa,bb]', [11, 22])
// { parent: { aa: 11, bb: 22 } }

Path.getIn(target, 'parent.[aa,bb]')
// [11, 22]

Path.parse('parent.[aa,bb]').toString()
// 'parent.[aa,bb]'
```

This is especially useful when your frontend and backend structures do not align one to one.

## Single-level wildcard `*`

`*` matches exactly one segment:

```ts
Path.parse('user.*').match('user.name')
// true

Path.parse('user.*').match('user.profile.name')
// false
```

## Optional deep wildcard `**`

`**` means “zero or more segments from here”:

```ts
Path.parse('aa.**').match(['aa'])
// true

Path.parse('aa.**').match(['aa', 'bb', 'cc'])
// true
```

## Expand `~`

`~` enables prefix expansion matching:

```ts
Path.parse('xxx.eee~').match('xxx.eee')
// true

Path.parse('t.0.value~').match(['t', 0, 'value_list'])
// true
```

This is especially useful for Formily field aliases and expanded child paths.

## Relative expressions

With a base path, a pattern can be relative:

```ts
Path.parse('.value', 'users.0').toString()
// 'users.0.value'
```

More advanced relative expressions are especially useful for neighboring array items:

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

Three practical rules:

1. One dot means the current path.
2. `n` dots mean “go back `n - 1` steps”.
3. `+` and `-` expressions inside brackets offset the current array index.

## Global match

A standalone `*` means “match every path”:

```ts
Path.parse('*').match('aa')
// true

Path.parse('*').match('aa.bb')
// true
```

## Partial match

Placing `*` at a concrete position means “match any single segment here”:

```ts
Path.parse('aa.*.cc').match('aa.bb.cc')
// true

Path.parse('aa.*.cc').match('aa.kk.cc')
// true
```

## Groups

Group syntax lets one pattern cover multiple candidates:

```ts
Path.parse('*(aa,bb,cc)').match('bb')
// true

Path.parse('*(phases.*.type,phases.*.steps.*.type)').match('phases.0.steps.1.type')
// true

Path.parse('aa.*(bb,kk,dd,ee.*(oo,gg).gg).cc').match('aa.ee.oo.gg.cc')
// true
```

## Exclude patterns

Use `!` inside a group to express exclusions:

```ts
Path.parse('*(!aaa)').match('ggg')
// true

Path.parse('*(!aaa)').match('aaa')
// false

Path.parse('*(!basic.name,versionTag)').match('basic.id')
// true
```

Exclude patterns are especially useful when you want to broadly match most fields but skip a few special branches.

## Regular expression patterns

Regular expressions are also valid patterns:

```ts
Path.parse(/^\d+$/).match('212')
// true

Path.parse(/^\d+$/).match('212dd')
// false
```

## Range matching

Range matching is mostly for array indices:

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

Leaving `x` or `y` empty makes it an open interval.

## Escaped matching

If a path segment itself contains syntax keywords, you can escape it with backslashes or `[[...]]`:

```ts
Path.parse('aa.\\,\\*\\{\\}\\.\\(\\).bb').match('aa.\\,\\*\\{\\}\\.\\(\\).bb')
// true

Path.parse('aa.[[,*{}.()]].bb').match('aa.[[,*{}.()]].bb')
// true
```

## Destructuring match

If the path contains a destructuring expression, you can match it directly without extra escaping:

```ts
Path.parse('target.[aa,bb]').match('target.[aa,bb]')
// true
```
