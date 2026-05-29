# Matching

Matching is the part of path that Formily core relies on heavily for effects, queries, and alias resolution.

## Interactive demo

This playground lets you compare `match`, `Path.match`, `matchAliasGroup`, and `includes` side by side.

::: demo
api/matching/alias-playground
:::

## match

Both sides do not have to be plain paths. Two common forms are:

```ts
Path.parse('a.b.c').match('*')
// true

Path.parse('*').match('a.b.c')
// true

Path.parse('aa.1.cc').match('aa.*.cc')
// true
```

If both sides are match patterns, path throws because the matching direction is ambiguous.

```ts
Path.parse('*').match('aa.*.cc')
// throw Error
```

## Path.match

If you want to reuse the same matcher, the static helper is more ergonomic:

```ts
const isTarget = Path.match('aa.*(!bb,cc)')

isTarget('aa.dd')
// true

isTarget('aa.bb')
// false
```

If you want to compile once and reuse many times, this is usually cleaner than repeatedly calling `parse(...).match(...)`.

## transform

`transform` is useful when you want to extract an index or identifier from a path and build a new one:

```ts
Path.parse('aa.1.cc').transform(/\d+/, index => `aa.${Number(index) + 1}.cc`)
// 'aa.2.cc'
```

The static helper supports the same flow:

```ts
Path.transform('aa.0.bb', /\d+/, index => `aa.${Number(index) + 1}.bb`)
// 'aa.1.bb'
```

## matchScore

After each match, a `Path` instance updates its `matchScore`. You usually do not use it directly, but `matchAliasGroup` uses it to resolve cases involving exclude patterns.

## matchAliasGroup

This method is especially important in core. It evaluates both the field name and the alias against the same pattern.

```ts
const pattern = Path.parse('aa.*(!bb)')

pattern.matchAliasGroup('kk.mm.aa.cc', 'aa.cc')
// true

pattern.matchAliasGroup('kk.mm.aa.bb', 'aa.bb')
// false
```

In the simplest case, you can read it as “match the real name and alias against the same pattern”:

```ts
Path.parse('aa.bb.cc').matchAliasGroup('aa.bb.cc', 'aa.cc')
// true
```

When exclude patterns are involved, the result depends more on `matchScore`:

```ts
const excludePattern = Path.parse('aa.bb.*(11,22,33).*(!aa,bb,cc)')

excludePattern.matchAliasGroup('aa.bb.11.mm', 'aa.cc.dd.bb.11.mm')
// true
```

## includes

`includes` is stricter than `match`. It checks whether one plain path contains another as a prefix:

```ts
Path.parse('a.b').includes('a.b')
// true

Path.parse('a.b').includes('a.c')
// false

Path.parse('a.b').includes('a.b.c')
// false
```

If either side is a match pattern in the wrong position, it may throw. `includes` is a prefix check, not a generic matcher.
