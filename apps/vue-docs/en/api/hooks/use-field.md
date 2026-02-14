# useField

## Description

Access the current [GeneralField](https://core.formilyjs.org/api/models/field#generalfield) instance inside custom components so you can read props or mutate field state. Available anywhere within a `Field` subtree.

::: warning
Wrap your component with [observer](/en/api/shared/observer) if it should react to field state changes.
:::

## Signature

```ts
interface useField {
  (): Ref<Field>
}
```

## Example

::: demo
api/hooks/use-field
:::
