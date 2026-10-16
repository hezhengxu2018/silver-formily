# useFormEffects

## Description

Mainly used inside custom components to inject effect logic into the current [Form](https://core.silver-formily.org/api/models/Form) instance, for implementing more complex scenario-specific components. The effects are automatically cleaned up when the component unmounts, and under StrictMode / ConcurrentMode, effect replaying does not register duplicate effects.

Keep the same form instance for the lifetime of a mounted `FormProvider`. To replace the entire form, remount `FormProvider` and its subtree, for example with `<FormProvider key={form.id} form={form}>`. Do not only replace the existing provider's `form` prop while reusing its subtree: `useFormEffects` registers on mount and does not rebind when that prop changes. Unmounting the old subtree cleans up its subscriptions; mounting the new subtree registers new ones.

## Signature

```ts
interface useFormEffects {
  (effects?: (form: Form) => void): void
}
```

## Usage

:::demo
api/hooks/use-form-effects.tsx
:::
