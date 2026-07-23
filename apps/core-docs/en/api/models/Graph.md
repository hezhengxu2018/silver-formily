---
order: 6
---

# Graph

::: warning Internal Model
`Graph` is intended primarily for internal framework use and is almost never instantiated or called directly in application code. Unless you are developing a low-level extension, prefer Form's public APIs.
:::

`Graph` is the field-graph snapshot manager used internally by Form. In most cases, use [Form.getFormGraph](/en/api/models/Form#getformgraph) and [Form.setFormGraph](/en/api/models/Form#setformgraph) instead of constructing it directly.

## Constructor

```ts
interface GraphConstructor {
  new(form: Form): Graph
}
```

## Property

| Property | Description                  | Type   |
| -------- | ---------------------------- | ------ |
| form     | The associated Form instance | `Form` |

## getGraph

Returns a state snapshot of the Form and all registered fields. The empty-string key `''` stores Form state; all other keys use each field's absolute `address`.

```ts
interface getGraph {
  (): IFormGraph
}
```

## setGraph

Restores a field-graph snapshot. Existing fields receive state updates. Missing fields are created as Field, ArrayField, ObjectField, or VoidField according to the snapshot's `displayName`.

```ts
interface setGraph {
  (graph: IFormGraph): void
}
```

:::tip
`setGraph()` only applies entries present in the snapshot. It does not remove current fields that are absent from the snapshot. If you clear the graph first, account for the `forceClear` data-removal semantics of [clearFormGraph](/en/api/models/Form#clearformgraph).
:::
