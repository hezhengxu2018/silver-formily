---
outline: [2, 3]
---

# Path API

`Path.parse(...)` returns a real `Path` instance, not just an array of segments. This page focuses on the `Path` type itself. For syntax, matching behavior, and accessor usage, use the guide pages.

## Attributes

In addition to methods like `toString()` and `toArr()`, a `Path` instance also exposes readable structural metadata:

| Property              | Meaning                                                 |
| --------------------- | ------------------------------------------------------- |
| `length`              | Number of path segments, meaningful for non-match paths |
| `entire`              | Full path string or regular expression                  |
| `segments`            | Parsed path segments                                    |
| `isMatchPattern`      | Whether this is a match pattern                         |
| `isWildMatchPattern`  | Whether wildcard semantics are involved                 |
| `haveRelativePattern` | Whether relative-path syntax is present                 |
| `haveExcludePattern`  | Whether exclude patterns are present                    |
| `isRegExp`            | Whether it was created from a regular expression        |
| `tree`                | Parsed AST                                              |
| `matchScore`          | Score from the most recent `match`                      |

Example:

```ts
const pattern = Path.parse('*(!basic.name,versionTag)')

pattern.isMatchPattern
// true

pattern.haveExcludePattern
// true
```

## Instance methods

### toString

#### Signature

```ts
interface toString {
  (): string
}
```

Examples: [Quick Start / Path instance operations / Convert back to string or array](/en/guide/quick-start#convert-back-to-string-or-array)

### toArr

#### Signature

```ts
interface toArr {
  (): Array<string | number>
}
```

Examples: [Quick Start / Path instance operations / Convert back to string or array](/en/guide/quick-start#convert-back-to-string-or-array)

### concat

#### Signature

```ts
interface concat {
  (...args: Pattern[]): Path
}
```

Examples: [Quick Start / Path instance operations / Concatenate and slice](/en/guide/quick-start#concatenate-and-slice)

### slice

#### Signature

```ts
interface slice {
  (start?: number, end?: number): Path
}
```

Examples: [Quick Start / Path instance operations / Concatenate and slice](/en/guide/quick-start#concatenate-and-slice)

### parent

#### Signature

```ts
interface parent {
  (): Path
}
```

Examples: [Quick Start / Path instance operations / Concatenate and slice](/en/guide/quick-start#concatenate-and-slice)

### push

#### Signature

```ts
interface push {
  (...items: Pattern[]): Path
}
```

These methods look array-like, but they return a new `Path`.

Examples: [Quick Start / Path instance operations / Array-like operations](/en/guide/quick-start#array-like-operations)

### pop

#### Signature

```ts
interface pop {
  (): Path
}
```

Examples: [Quick Start / Path instance operations / Array-like operations](/en/guide/quick-start#array-like-operations)

### splice

#### Signature

```ts
interface splice {
  (
    start: number,
    deleteCount?: number,
    ...items: Array<string | number>
  ): Path
}
```

Examples: [Quick Start / Path instance operations / Array-like operations](/en/guide/quick-start#array-like-operations)

### forEach

#### Signature

```ts
interface forEach {
  (callback: (key: string | number) => any): void
}
```

Examples: [Quick Start / Path instance operations / Iterate over segments](/en/guide/quick-start#iterate-over-segments)

### map

#### Signature

```ts
interface map {
  (callback: (key: string | number) => any): any[]
}
```

Examples: [Quick Start / Path instance operations / Iterate over segments](/en/guide/quick-start#iterate-over-segments)

### reduce

#### Signature

```ts
interface reduce {
  <T>(
    callback: (buffer: T, item: string | number, index: number) => T,
    initial: T
  ): T
}
```

Examples: [Quick Start / Path instance operations / Iterate over segments](/en/guide/quick-start#iterate-over-segments)

### transform

#### Signature

```ts
interface transform {
  <T>(regexp: string | RegExp, callback: (...args: string[]) => T): T
}
```

`transform` filters matching segments and passes them to a callback.

Examples: [Matching / transform](/en/guide/matching#transform)

### includes

#### Signature

```ts
interface includes {
  (pattern: Pattern): boolean
}
```

`includes` checks whether another plain path is a prefix child-path of the current one.

Examples: [Matching / includes](/en/guide/matching#includes)

### matchAliasGroup

#### Signature

```ts
interface matchAliasGroup {
  (name: Pattern, alias: Pattern): boolean
}
```

This method is used heavily by core to compare a field name and alias against the same pattern.

Examples: [Matching / matchAliasGroup](/en/guide/matching#matchaliasgroup)

## Static methods

### match

#### Signature

```ts
interface match {
  (pattern: Pattern): (target: Pattern) => boolean
}
```

Examples: [Matching / Path.match](/en/guide/matching#path-match)

### transform

#### Signature

```ts
interface transform {
  <T>(
    pattern: Pattern,
    regexp: string | RegExp,
    callback: (...args: string[]) => T
  ): T
}
```

Examples: [Matching / transform](/en/guide/matching#transform)

### getIn

#### Signature

```ts
interface getIn {
  (source: any, pattern: Pattern): any
}
```

Examples: [Accessors / getIn](/en/guide/accessors#getin)

### setIn

#### Signature

```ts
interface setIn {
  (source: any, pattern: Pattern, value: any): any
}
```

Examples: [Accessors / setIn](/en/guide/accessors#setin)

### deleteIn

#### Signature

```ts
interface deleteIn {
  (source: any, pattern: Pattern): any
}
```

Examples: [Accessors / deleteIn](/en/guide/accessors#deletein)

### existIn

#### Signature

```ts
interface existIn {
  (source: any, pattern: Pattern, start?: number | Path): boolean
}
```

Examples: [Accessors / existIn](/en/guide/accessors#existin)

### ensureIn

#### Signature

```ts
interface ensureIn {
  (source: any, pattern: Pattern, defaultValue?: any): any
}
```

Examples: [Accessors / ensureIn](/en/guide/accessors#ensurein)

## Notes

If the current instance is itself a match pattern or regular-expression path, many array-style operations no longer have a deterministic meaning and will throw:

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

That is a useful mental model as well: plain paths behave like structured values, while match patterns behave more like compiled rules.
