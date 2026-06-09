---
order: 2
---

# ArrayField

The ArrayField model returned by [createArrayField](/en/api/models/Form#createarrayfield).

Since ArrayField inherits from the [Field](/en/api/models/Field) model, most APIs can be referenced from the Field model. This document only explains the extended methods.

## Methods

<Alert>

The following methods not only update array data but also transpose child field state. If you do not want automatic state transposition, use `setValue` to overwrite values directly.

</Alert>

### push

#### Description

Appends elements to the end of the array and triggers `onInput`.

#### Signature

```ts
interface push {
  (...items: any[]): Promise<void>
}
```

### pop

#### Description

Removes the last element of the array and triggers `onInput`.

#### Signature

```ts
interface pop {
  (): Promise<void> | void
}
```

### insert

#### Description

Inserts elements into the array and triggers `onInput`.

#### Signature

```ts
interface insert {
  (index: number, ...items: any[]): Promise<void>
}
```

### remove

#### Description

Removes an element from the array and triggers `onInput`.

#### Signature

```ts
interface remove {
  (index: number): Promise<void> | void
}
```

### shift

#### Description

Removes the first element of the array and triggers `onInput`.

#### Signature

```ts
interface shift {
  (): Promise<void> | void
}
```

### unshift

#### Description

Prepends elements to the beginning of the array and triggers `onInput`.

#### Signature

```ts
interface unshift {
  (...items: any[]): Promise<void>
}
```

### move

#### Description

Moves an array element and triggers `onInput`.

#### Signature

```ts
interface move {
  (fromIndex: number, toIndex: number): Promise<void> | void
}
```

### moveUp

#### Description

Moves an array element up and triggers `onInput`.

#### Signature

```ts
interface moveUp {
  (index: number): Promise<void> | void
}
```

### moveDown

#### Description

Moves an array element down and triggers `onInput`.

#### Signature

```ts
interface moveDown {
  (index: number): Promise<void> | void
}
```

## Types

### IArrayFieldState

Main properties follow [IFieldState](/en/api/models/Field#ifieldstate), with the `value` type required to be an array.

```ts
type IArrayFieldState = IFieldState<any, any, any, any[]>
```
