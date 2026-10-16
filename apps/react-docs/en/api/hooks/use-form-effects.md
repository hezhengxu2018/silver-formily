# useFormEffects

## Description

Mainly used inside custom components to inject effect logic into the current [Form](https://core.silver-formily.org/api/models/Form) instance, for implementing more complex scenario-specific components. The effects are automatically cleaned up when the component unmounts, synchronous StrictMode effect replay retains the existing subscription.

Keep the same form instance for the lifetime of a mounted `FormProvider`. To replace the entire form, remount `FormProvider` and its subtree, for example with `<FormProvider key={form.id} form={form}>`. Do not only replace the existing provider's `form` prop while reusing its subtree: `useFormEffects` registers on mount and does not rebind when that prop changes. Unmounting the old subtree cleans up its subscriptions; mounting the new subtree registers new ones.

## Signature

```ts
import type { Form } from '@silver-formily/core'

declare function useFormEffects(effects?: (form: Form) => void): void
```

## Usage

:::demo
api/hooks/use-form-effects.tsx
:::

Registration runs during the initial render, before child fields are created, so it can observe `onFieldInit`. Re-rendering does not rerun registration or replace captured callbacks. Keep captured inputs stable, or remount the subscribing component when new inputs require a new subscription. Final cleanup is deferred to a microtask; resources from abandoned renders are handled by the existing garbage collector.
