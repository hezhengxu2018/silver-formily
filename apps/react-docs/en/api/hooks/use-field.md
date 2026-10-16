# useField

## Description

Mainly used inside custom components to read the current field attributes and manipulate the field state. It can be used anywhere in the subtree of any Field component. Note that what you get is a [GeneralField](https://core.silver-formily.org/api/models/Field#generalfield); if you need to handle different types of fields, use the [Type Checker](https://core.silver-formily.org/api/entry/FormChecker).

::: warning
Note: to use useField inside a custom component and react to field model changes, the custom component must be wrapped with [observer](/en/api/shared/observer).
:::

## Signature

```ts
import type { GeneralField } from '@silver-formily/core'

declare function useField<T = GeneralField>(): T
```

Unlike the Vue version, the React version returns the field instance itself, not a Ref.

## Usage

:::demo
api/hooks/use-field.tsx
:::

This hook reads context; it does not create a model or subscribe to observable properties. Use the corresponding provider. Although some signatures are non-nullable, missing or cleared context can return null/undefined at runtime.
