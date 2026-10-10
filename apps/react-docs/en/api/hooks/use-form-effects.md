# useFormEffects

## Description

Mainly used inside custom components to inject effect logic into the current [Form](https://core.silver-formily.org/api/models/Form) instance, for implementing more complex scenario-specific components. The effects are automatically cleaned up when the component unmounts, and under StrictMode / ConcurrentMode, effect replaying does not register duplicate effects.

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
