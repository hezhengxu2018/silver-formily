# useForm

## Description

Mainly used inside custom components to read the current [Form](https://core.silver-formily.org/api/models/Form) instance, for implementing effect dependencies — for example depending on the errors information of the Form — to build more complex scenario-specific components.

## Signature

```ts
import type { Form } from '@silver-formily/core'

declare function useForm<T extends object = any>(): Form<T>
```

## Usage

:::demo
api/hooks/use-form.tsx
:::

This hook reads context; it does not create a model or subscribe to observable properties. Use the corresponding provider. Although some signatures are non-nullable, missing or cleared context can return null/undefined at runtime.
