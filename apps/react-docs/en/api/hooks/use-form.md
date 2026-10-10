# useForm

## Description

Mainly used inside custom components to read the current [Form](https://core.silver-formily.org/api/models/Form) instance, for implementing effect dependencies — for example depending on the errors information of the Form — to build more complex scenario-specific components.

## Signature

```ts
interface useForm<T extends object = any> {
  (): Form<T>
}
```

## Usage

:::demo
api/hooks/use-form.tsx
:::
