# FormPath

> Path utility class providing path parsing, matching, and manipulation

## Description

`FormPath` is an alias for the `Path` class from `@silver-formily/path`. It provides powerful path pattern matching and manipulation — the foundation of the form field addressing system.

## Path Pattern Syntax

| Pattern    | Description          | Example                             |
| ---------- | -------------------- | ----------------------------------- |
| `*`        | Match single segment | `user.*.name` matches `user.a.name` |
| `**`       | Match any depth      | `**.name` matches all name fields   |
| `[n]`      | Array index          | `items.[0].name`                    |
| `[n:]`     | Array from index n   | `items.[1:].name`                   |
| `[n:m]`    | Array index range    | `items.[0:2].name`                  |
| `{a,b}`    | Match alternatives   | `{username,email}`                  |
| `!pattern` | Exclude match        | `!**.email`                         |
| `alias`    | Alias match          | Requires `matchAliasGroup`          |

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

### With Query

Path patterns are most commonly used with `form.query`:

```ts
const fields = form.query('**.name').map()
const userFields = form.query('user.*').map()
const emails = form.query('**.email').map()
```
