# mapReadPretty

## Description

When a third-party component has no dedicated read-only view, wrap it with `mapReadPretty` to provide a presenter used by `readPretty` fields.

## Signature

```ts
interface mapReadPretty {
  (component: Vue.Component): Vue.Component
}
```

## Example

::: demo
api/shared/map-read-pretty
:::
