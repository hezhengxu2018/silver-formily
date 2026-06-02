# Query Model

> Field query utility supporting flexible path pattern matching and batch operations

## Description

`Query` is a field query tool obtained via `form.query(pattern)`. It supports path pattern matching, conditional filtering, and batch operations.

## Getting a Query

```ts
const query = form.query('user.*.name')
```

## Methods

### take

```txt
query.take(): GeneralField | undefined
```

Returns the first matching field:

```ts
const firstField = form.query('**.name').take()
```

### map

```txt
query.map<T>(mapper?: (field: GeneralField) => T): T[]
```

Maps all matching fields:

```ts
const nameValues = form.query('**.name').map(field => field.value)
```

### forEach

```txt
query.forEach(iterator: (field: GeneralField) => void): void
```

Iterates over all matching fields:

```ts
form.query('**.email').forEach((field) => {
  field.setValidator({ format: 'email' })
})
```

### reduce

```txt
query.reduce<T>(reducer: (acc: T, field: GeneralField) => T, initial: T): T
```

Aggregates over matches:

```ts
const allValid = form.query('**').reduce((valid, field) => {
  return valid && field.valid
}, true)
```

### filter

```txt
query.filter(predicate: (field: GeneralField) => boolean): GeneralField[]
```

Filters by condition:

```ts
const invalidFields = form.query('**').filter(field => field.invalid)
```

### sort

```txt
query.sort(comparator: (a: GeneralField, b: GeneralField) => number): GeneralField[]
```

Sorts matching fields:

```ts
const sorted = form.query('items.*').sort((a, b) => a.index - b.index)
```

## Path Patterns

| Pattern       | Example                      | Description      |
| ------------- | ---------------------------- | ---------------- |
| Exact         | `form.query('username')`     | Exact path match |
| `*` wildcard  | `form.query('user.*')`       | Single segment   |
| `**` wildcard | `form.query('**.name')`      | Any depth        |
| Exclusion     | `form.query('** !**.email')` | Exclude match    |

## Examples

```ts
// Bulk set required
form.query('**.name').forEach(f => f.setRequired(true))

// Find invalid fields
const failed = form.query('*').filter(f => f.selfInvalid)

// Extract values
const allValues = form.query('*').map(f => ({
  name: f.path,
  value: f.value
}))
```
