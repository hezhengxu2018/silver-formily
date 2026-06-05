# Accessors

The goal of the accessor APIs is simple: safely work with deeply nested data without manually checking every intermediate level.

## Interactive demo

Use this playground to edit JSON, the pattern, and write values directly while observing the result of `getIn`, `existIn`, `setIn`, `deleteIn`, and `ensureIn`.

::: demo
api/accessors/playground
:::

## getIn

```ts
const values = {
  user: {
    profile: {
      nickname: 'silver',
    },
  },
}

Path.getIn(values, 'user.profile.nickname')
// 'silver'

Path.getIn(values, 'user.profile.missing')
// undefined
```

If you already have a `Path` instance, the instance method is equally natural:

```ts
const profileName = Path.parse('user.profile.nickname')

profileName.getIn(values)
// 'silver'
```

## setIn

`setIn` creates missing intermediate layers when needed:

```ts
const values = {}

Path.setIn(values, 'user.profile.nickname', 'silver')

// {
//   user: {
//     profile: {
//       nickname: 'silver'
//     }
//   }
// }
```

If the next segment is numeric, it creates an array:

```ts
const values = {}

Path.setIn(values, 'users.0.name', 'silver')

// { users: [{ name: 'silver' }] }
```

The instance form works the same way:

```ts
const profileName = Path.parse('user.profile.nickname')
const values = {}

profileName.setIn(values, 'silver')

profileName.getIn(values)
// 'silver'
```

## existIn

`existIn` checks whether the property really exists, not whether its value is truthy:

```ts
Path.existIn({ a: { b: { c: 0 } } }, 'a.b.c')
// true

Path.existIn({ a: { b: {} } }, 'a.b.c')
// false
```

It also accepts an offset path for base-aware checks:

```ts
Path.existIn({ a: [{}] }, 'b.a.0', Path.parse('b'))
// true
```

If your code already caches a path object, the instance form is more direct:

```ts
Path.parse('a.b.c').existIn({ a: { b: { c: 0 } } })
// true

Path.parse('a.b.c').existIn({})
// false
```

## deleteIn

```ts
const values = { user: { profile: { nickname: 'silver', city: 'Shanghai' } } }

Path.deleteIn(values, 'user.profile.city')

// { user: { profile: { nickname: 'silver' } } }
```

The instance method mutates the original object and returns that same reference:

```ts
const path = Path.parse('user.profile.city')
const values = { user: { profile: { city: 'Shanghai' } } }

path.deleteIn(values)

path.getIn(values)
// undefined
```

## ensureIn

`ensureIn` means “return the current value, or write and return the default value if it is missing”:

```ts
const values = {}

Path.ensureIn(values, 'user.profile.nickname', 'guest')
// 'guest'

Path.ensureIn(values, 'user.profile.nickname', 'other')
// 'guest'
```

The instance form works well with reused `Path` objects:

```ts
const path = Path.parse('user.profile.nickname')
const values = {}

path.ensureIn(values, 'guest')
// 'guest'

path.ensureIn(values, 'other')
// 'guest'
```

## Group and destructor examples

This is where path is more expressive than most nested access helpers. You can read or write multiple keys in one expression:

```ts
Path.setIn({}, 'a.b.c.{aaa,bbb}', { aaa: 123, bbb: 321 })
// { a: { b: { c: { aaa: 123, bbb: 321 } } } }

Path.getIn(
  { a: { b: { c: { aaa: 123, bbb: 321 } } } },
  'a.b.c.{aaa,bbb}',
)
// { aaa: 123, bbb: 321 }
```

Array destructuring style works too:

```ts
Path.setIn({}, 'a.b.c.[aaa,bbb]', [123, 321])
// { a: { b: { c: { aaa: 123, bbb: 321 } } } }
```

Object destructuring and nested projection work as well:

```ts
const values = {}

Path.setIn(values, 'user.address.{city,zip}', {
  city: 'Shanghai',
  zip: '200000',
})

Path.getIn(values, 'user.address.{city,zip}')
// { city: 'Shanghai', zip: '200000' }
```

This syntax is especially useful for schemas, field mapping, batch renaming, and structural projection.
