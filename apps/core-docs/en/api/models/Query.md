---
order: 5
---

# Query

The Query object returned by calling the `query` method on a [Form](/en/api/models/Form#query) or [Field](/en/api/models/Field#query) instance.

## Methods

### take

#### Description

Extracts the first result from the query result set.

Note: the corresponding node must exist in order to read.

#### Signature

```ts
interface take {
  (): GeneralField | undefined
  <Result>(getter: (field: GeneralField, address: FormPath) => Result): Result | undefined
}
```

### map

#### Description

Iterates over and maps the query result set.

Note: the corresponding node must exist in order to iterate.

#### Signature

```ts
interface map {
  (): GeneralField[]
  <Result>(
    mapper?: (field: GeneralField, address: FormPath) => Result
  ): Result[]
}
```

### forEach

#### Description

Iterates over the query result set.

Note: the corresponding node must exist in order to iterate.

#### Signature

```ts
interface forEach {
  <Result>(eacher: (field: GeneralField, address: FormPath) => Result): void
}
```

### reduce

#### Description

Performs a reduce operation on the query result set.

Note: the corresponding node must exist in order to iterate.

#### Signature

```ts
interface reduce {
  <Result>(
    reducer: (value: Result, field: GeneralField, address: FormPath) => Result,
    initial?: Result
  ): Result
}
```

### get

#### Description

Finds the first result from the query result set and reads its property.

Note: the corresponding node must exist in order to read.

#### Signature

```ts
interface get {
  <K extends keyof IGeneralFieldState>(key: K): IGeneralFieldState[K] | undefined
}
```

### getIn

#### Description

Finds the first result from the query result set and reads its property, supporting [FormPathPattern](https://path.silver-formily.org/api/path-class#formpathpattern) path syntax.

Note: the corresponding node must exist in order to read.

#### Signature

```ts
interface getIn {
  (pattern?: FormPathPattern): any
}
```

### value

#### Description

Queries the value at the specified path, not limited to Field nodes.

#### Signature

```ts
interface value {
  (): any
}
```

### initialValue

#### Description

Queries the initial value at the specified path, not limited to Field nodes.

#### Signature

```ts
interface initialValue {
  (): any
}
```
