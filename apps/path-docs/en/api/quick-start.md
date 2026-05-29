# Quick Start

The API surface of `Path` is intentionally small, but it covers a lot:

- `Path.parse`: normalize any pattern into a `Path` instance
- `Path.getIn` / `Path.setIn` / `Path.deleteIn` / `Path.existIn` / `Path.ensureIn`
- `Path.match`: compile a pattern into a reusable matcher function

## Import

```ts
import { Path } from '@silver-formily/path'
```

## Constructor

Most code uses `Path.parse(...)`, but the instance can also be created directly:

```ts
class Path {
  constructor(pattern: Pattern, base?: Pattern)
}
```

These are equivalent in capability:

```ts
const created = new Path('user.profile.name')
const parsed = Path.parse('user.profile.name')

created.toString() === parsed.toString()
```

## Pattern type

`Path` accepts a wider range of inputs than a plain path string:

```ts
type Pattern
  = | string
    | number
    | Path
    | Array<string | number>
    | RegExp
    | ReturnType<typeof Path.match>
```

That is why `Path.parse` can normalize data paths, match patterns, regular expressions, and matcher functions through the same entry.

## Core properties

`Path.parse(...)` returns a live object with structural metadata attached to it:

| Property              | Meaning                                          |
| --------------------- | ------------------------------------------------ |
| `length`              | segment count for non-match paths                |
| `entire`              | full path string or regular expression           |
| `segments`            | parsed path segments for non-match paths         |
| `isMatchPattern`      | whether this is a match pattern                  |
| `isWildMatchPattern`  | whether it contains wildcard semantics           |
| `haveRelativePattern` | whether it contains relative path syntax         |
| `haveExcludePattern`  | whether it contains exclude patterns             |
| `isRegExp`            | whether it was created from a regular expression |
| `tree`                | parsed AST                                       |
| `matchScore`          | score from the most recent match                 |

Example:

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

`parse` accepts more than plain strings:

```ts
Path.parse('user.name')
Path.parse(['user', 'name'])
Path.parse(/^[a-z]+$/)
Path.parse(Path.match('user.*'))
```

You can also inspect its flags directly:

```ts
const pattern = Path.parse('*(!user.temp)')

pattern.isMatchPattern
// true

pattern.haveExcludePattern
// true
```

## Access nested data

```ts
const values = { user: { profile: { nickname: 'silver' } } }

Path.getIn(values, 'user.profile.nickname')
// 'silver'

Path.setIn(values, 'user.profile.city', 'Shanghai')

Path.existIn(values, 'user.profile.city')
// true
```

## Matcher functions

If you want to reuse the same pattern many times, `Path.match` is more convenient:

```ts
const isUserField = Path.match('user.*')

isUserField('user.name')
// true

isUserField('settings.theme')
// false
```

## Relative paths

The second argument of `parse` is a base path for relative expressions:

```ts
const next = Path.parse('.value', 'users.0')

next.toString()
// 'users.0.value'
```

More advanced relative paths are also part of the package:

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

That is the same mechanism used by `FormPath.parse(pattern, base)` in core.
