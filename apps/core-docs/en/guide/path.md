# Path System

The path system is the key connection between the Formily field tree and form data. Form field creation, Query field lookup, Field parent-child relationships, and deep read/write on `values` all rely on the same set of path semantics.

:::tip
Most of the capabilities in this chapter depend on [`@silver-formily/path`](https://path.silver-formily.org/en/). This page mainly explains how `@silver-formily/core` works together with `@silver-formily/path`. For the complete feature set, please refer to the path documentation.
:::

## address and path

Every field has two paths:

| Path      | Meaning                                                                         |
| --------- | ------------------------------------------------------------------------------- |
| `address` | The absolute position of the field in the model tree, including all field nodes |
| `path`    | The data read/write path, which skips parent `VoidField` nodes                  |

`VoidField` is a UI container and does not participate in form data. So it appears in `address`, but it does not appear in the `path` of child data fields.

<ThemeImage
  light="/architecture/path.png"
  dark="/architecture/path.dark.png"
  alt="Formily path system"
/>

```ts
form.createVoidField({ name: 'layout' })

const field = form.createField({
  name: 'layout.username',
  value: '',
})

console.log(field.address) // 'layout.username'
console.log(field.path) // 'username'

field.value = 'silver'

console.log(form.values) // { username: 'silver' }
```

In other words, Address always represents the node's absolute path, while Path skips the node path of `VoidField`. But for a `VoidField` itself, its Path retains its own path position.

So whether it is a Field or a VoidField, it has both an Address and a Path. When using `query` to find fields, you can search by either Address rules or Path rules. For example, `query("b.c")` can find field `c`, and `query("a.b.c")` can also find field `c`.

## Field Query

`form.query()` looks up fields by path expression, matching both `address` and the `path` of data fields.

```ts
form.query('layout.username').take()
form.query('username').take()
form.query('users.*.name').map()
form.query('**.email').forEach((field) => {
  field.disabled = true
})
```

Common wildcard semantics:

| Expression     | Meaning                                                       |
| -------------- | ------------------------------------------------------------- |
| `*`            | Match a single path level                                     |
| `**`           | Match any path depth                                          |
| `a.b`          | Exactly match the specified path                              |
| `users.*.name` | Match `name` fields inside array items or dynamic child nodes |

For the full matching capability, refer to the [Pattern Syntax](https://path.silver-formily.org/en/guide/patterns) chapter in the `@silver-formily/path` documentation.

### Alias Group Matching

In `@silver-formily/core`, field matching does not compare only one path. APIs such as `form.query()`, `field.match()`, and `onFieldXxx(pattern)` use the same pattern to match both `field.address` and `field.path`.

Under the hood, this is implemented through `FormPath.parse(pattern).matchAliasGroup(field.address, field.path)`. Here, `alias` is not an extra path syntax. It means the same field can be matched by both its "field tree path" and its "data path".

```ts
form.createVoidField({ name: 'layout' })
form.createField({ name: 'layout.username' })

// Matches address: layout.username
form.query('layout.username').take()

// Matches path: username
form.query('username').take()
```

Therefore, in structures containing `VoidField`, you can look up a field either by its full field tree position or by its final data path. For lower-level behavior, refer to [`matchAliasGroup`](https://path.silver-formily.org/en/api/path-class#matchaliasgroup).

## Field Relationships

The parent-child relationship between fields is also expressed through the path system:

```ts
field.parent // Parent field
field.form // Owning Form
field.address // Absolute field tree path
field.path // Data read/write path
```

In linkage scenarios, it is also common to look up other fields from the current field:

```ts
field.query('.target').take()
field.query('..parentField').take()
field.form.query('**.email').take()
```

## Data Read/Write

Form deep-path read/write methods use the same `FormPath` semantics:

```ts
form.setValuesIn('profile.name', 'Silver')

const name = form.getValuesIn('profile.name')

form.deleteValuesIn('profile.name')
```

`field.value` is a convenience read/write wrapper based on the field `path`:

```ts
const field = form.createField({
  name: 'profile.name',
})

field.value = 'Silver'

console.log(form.values.profile.name) // 'Silver'
```

## Relationship With Other Modules

- Form creates, queries, and batch-operates fields through paths
- Field reads and writes `form.values` through `path`
- The validation system aggregates field feedback through paths
- The linkage system locates dependent and target fields through paths

For more complete path expression capabilities, refer to [FormPath API](/en/api/entry/FormPath) and [Query API](/en/api/models/Query).
