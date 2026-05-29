# Path Instance Methods

`Path.parse(...)` returns a real `Path` instance, not just an array of segments. Besides accessors and matching, the instance itself has a useful set of methods.

## Basics

```ts
const path = Path.parse('a.b.c')

path.toString()
// 'a.b.c'

path.toArr()
// ['a', 'b', 'c']

path.length
// 3
```

## Property overview

In addition to methods like `toString()` and `toArr()`, a `Path` instance exposes a set of readable properties:

| Property              | Meaning                                                 |
| --------------------- | ------------------------------------------------------- |
| `length`              | number of path segments, meaningful for non-match paths |
| `entire`              | full path string or regular expression                  |
| `segments`            | parsed path segments                                    |
| `isMatchPattern`      | whether this is a match path                            |
| `isWildMatchPattern`  | whether wildcard semantics are involved                 |
| `haveRelativePattern` | whether relative-path syntax is present                 |
| `haveExcludePattern`  | whether exclude patterns are present                    |
| `isRegExp`            | whether it was created from a regular expression        |
| `tree`                | parsed AST                                              |
| `matchScore`          | score from the most recent `match`                      |

Example:

```ts
const pattern = Path.parse('*(!basic.name,versionTag)')

pattern.isMatchPattern
// true

pattern.haveExcludePattern
// true
```

## toString and toArr

Older Formily docs often refer to `toArray()`, but the current `@silver-formily/path` API exposes `toArr()`:

```ts
Path.parse('aa.bb.cc').toString()
// 'aa.bb.cc'

Path.parse('aa.bb.cc').toArr()
// ['aa', 'bb', 'cc']

Path.parse('aa.bb.*').toArr()
// []
```

That naming difference is worth documenting explicitly so the current package docs stay aligned with the actual implementation.

## Concatenation and slicing

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

## Array-like names, immutable results

These methods look array-like, but they return new `Path` objects:

```ts
const path = Path.parse('a.b.c')

path.push('d').toString()
// 'a.b.c.d'

path.splice(0, 1).toString()
// 'b.c'
```

## Iterating segments

```ts
const path = Path.parse('a.b.c')

path.map(segment => segment)
// ['a', 'b', 'c']

path.reduce((buf, segment) => buf + segment, '')
// 'abc'
```

## transform

`transform` filters segments by a regular expression and passes them to a callback:

```ts
Path.parse('a.b.c').transform(/[ab]/, (...segments) => segments)
// ['a', 'b']
```

There is also a static version:

```ts
Path.transform('a.b.c', /[a-z]/, (...segments) => segments)
// ['a', 'b', 'c']
```

## includes

`includes` checks whether another plain path is a prefix child-path of the current one:

```ts
Path.parse('aa.bb.cc').includes('aa.bb')
// true

Path.parse('aa.bb.cc').includes('cc.bb')
// false
```

## matchAliasGroup

This is the method used heavily by core to compare a field name and its alias against the same pattern:

```ts
Path.parse('aa.*(!bb)').matchAliasGroup('kk.mm.aa.cc', 'aa.cc')
// true

Path.parse('aa.*(!bb)').matchAliasGroup('kk.mm.aa.bb', 'aa.bb')
// false
```

## Static helpers

If you do not want to parse into an instance first, the package also exposes static helpers:

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

## When methods throw

If the current instance is itself a match pattern or regular expression path, many array-style operations no longer have a deterministic meaning and will throw:

- `concat`
- `slice`
- `pop`
- `splice`
- `forEach`
- `map`
- `reduce`
- `transform`

Example:

```ts
const wildcard = Path.parse('*')

wildcard.concat('a')
// throw Error
```

That is a useful mental model in business code as well: plain paths behave like structured values, while match patterns behave like compiled rules.
