---
order: 6
---

# FormProvider

## Description

The entry component, used to distribute the form context down to the field components. It is responsible for the communication of the entire form state, acting as a communication hub.

Keep the same form instance for the lifetime of a mounted `FormProvider`. To replace the entire form, remount `FormProvider` and its subtree, for example with `<FormProvider key={form.id} form={form}>`. Do not only replace the existing provider's `form` prop while reusing its subtree: `useFormEffects` registers on mount and does not rebind when that prop changes. Unmounting the old subtree cleans up its subscriptions; mounting the new subtree registers new ones.

## Usage

:::demo
api/components/form-provider.tsx
:::

## API

| Attribute | Description                                                  | Type                                                    | Default |
| --------- | ------------------------------------------------------------ | ------------------------------------------------------- | ------- |
| form      | Form instance, the return value of the `createForm` function | [Form](https://core.silver-formily.org/api/models/Form) | -       |

`form` is required and `children?: React.ReactNode` is optional. This component supplies context and lifecycle handling; it does not render an HTML `<form>` or add submit/reset handlers. Mount a form UI component separately when needed.
