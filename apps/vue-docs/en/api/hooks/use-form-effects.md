# useFormEffects

## Description

Inject side effects into the current [Form](https://core.silver-formily.org/en/api/models/Form) instance from within a custom component. Handy for scenario-specific logic that subscribes to form events.

## Signature

```ts
interface useFormEffects {
  (form: Form): void
}
```

## Example

::: demo
api/hooks/use-form-effects
:::
