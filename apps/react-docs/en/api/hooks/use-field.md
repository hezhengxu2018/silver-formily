# useField

## Description

Mainly used inside custom components to read the current field attributes and manipulate the field state. It can be used anywhere in the subtree of any Field component. Note that what you get is a [GeneralField](https://core.silver-formily.org/api/models/Field#generalfield); if you need to handle different types of fields, use the [Type Checker](https://core.silver-formily.org/api/entry/form-checker).

::: warning
Note: to use useField inside a custom component and react to field model changes, the custom component must be wrapped with [observer](/en/api/shared/observer).
:::

## Signature

```ts
interface useField<T = GeneralField> {
  (): T
}
```

Unlike the Vue version, the React version returns the field instance itself, not a Ref.

## Usage

:::demo
api/hooks/use-field.tsx
:::
