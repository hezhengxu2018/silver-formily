# ObjectField

> ObjectField model returned by [createObjectField](/en/api/models/Form#createobjectfield).

Since ObjectField inherits from [Field](/en/api/models/Field), most APIs are covered by the Field model. This document only covers the extended methods.

## Methods

### addProperty

#### Description

Adds a property to the object and triggers `onInput`.

#### Signature

```ts
interface addProperty {
  (key: string, value: any): Promise<void>
}
```

### removeProperty

#### Description

Removes a property from the object and triggers `onInput`.

#### Signature

```ts
interface removeProperty {
  (key: string): Promise<void>
}
```

### existProperty

#### Description

Checks whether a property exists.

#### Signature

```ts
interface existProperty {
  (key: string): boolean
}
```

## Types

### IObjectFieldState

Main properties follow [IFieldState](/en/api/models/Field#ifieldstate), with the `value` type required to be an object.

```ts
type IObjectFieldState = IFieldState<any, any, any, Record<string, any>>
```
