# FormPath

> Path utility class providing path parsing, matching, and manipulation

## Description

`FormPath` is an alias for the `Path` class from `@silver-formily/path`. It provides powerful path pattern matching and manipulation — the foundation of the form field addressing system.

## Path Pattern Syntax

| Pattern   | Description                  | Example                                            |
| --------- | ---------------------------- | -------------------------------------------------- |
| `*`       | Match any path               | `*` matches `user` or `user.name`                  |
| `a.*`     | Match paths under a prefix   | `user.*` matches `user.name`                       |
| `**`      | Match zero or more levels    | `user.**` matches `user` or `user.a.name`          |
| `~`       | Prefix expansion match       | `value~` matches `value_list`                      |
| `*(a,b)`  | Match alternative paths      | `*(username,email)` matches `email`                |
| `*(!a,b)` | Exclude alternative paths    | `*(!password,token)` excludes `password`           |
| `*[n:m]`  | Match an array index range   | `items.*[0:2].name` matches `items.1.name`         |
| `*[n:]`   | Match array indexes after n  | `items.*[1:].name` matches `items.2.name`          |
| `*[:m]`   | Match array indexes before m | `items.*[:2].name` does not match `items.3.name`   |
| `[[...]]` | Escape special characters    | `[[a.b]]` matches the literal segment `a.b`        |
| `RegExp`  | Regular expression path      | `/^user\\./` matches strings starting with `user.` |

:::tip
`alias` is not a standalone path pattern. In `@silver-formily/core`, field matching uses `matchAliasGroup` to compare both `field.address` and `field.path`, so a field can be matched by either its field-tree path or its data path.
:::

## Usage

### Path Parsing

```ts
import { FormPath } from '@silver-formily/core'

const path = FormPath.parse('user.profile.name')
console.log(path.segments) // ['user', 'profile', 'name']
```

### Pattern Matching

```ts
FormPath.parse('user.*.name').match('user.profile.name') // true
FormPath.parse('user.*.name').match('settings.profile.name') // false
```

### Alias Group Matching

```ts
const pattern = FormPath.parse('username')

pattern.matchAliasGroup('layout.username', 'username') // true
```

In core APIs such as `form.query()`, `field.match()`, and `onFieldXxx(pattern)`, `name` usually maps to `field.address`, while `alias` usually maps to `field.path`. This mainly exists for structures that contain `VoidField`.

### With Query

Path patterns are most commonly used with `form.query`:

```ts
const fields = form.query('**.name').map()
const userFields = form.query('user.*').map()
const emails = form.query('**.email').map()
```
