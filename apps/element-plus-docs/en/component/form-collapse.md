# FormCollapse

> Collapse panel, typically used in form scenarios with tight layout constraints.

::: warning Note
This component is intended for Schema-based scenarios only.
:::

## Markup Schema Title Slot Example

:::demo

../../en/demos/form-collapse/markup-schema

:::

## JSON Schema Example

:::demo

../../en/demos/form-collapse/json-schema

:::

## API

### FormCollapse

| Prop           | Type            | Description                                                        | Default |
| -------------- | --------------- | ------------------------------------------------------------------ | ------- |
| `formCollapse` | `IFormCollapse` | Model instance created by `createFormCollapse` / `useFormCollapse` | -       |

The `onChange` event is already used internally by the component and should not be overridden. For everything else, see [https://element-plus.org/en-US/component/collapse.html](https://element-plus.org/en-US/component/collapse.html)

### FormCollapse.Item

See [https://element-plus.org/en-US/component/collapse.html#collapse-slots](https://element-plus.org/en-US/component/collapse.html#collapse-slots)

### FormCollapse.createFormCollapse

```ts pure
type ActiveKey = string | number
type ActiveKeys = string | number | Array<string | number>

interface createFormCollapse {
  (defaultActiveKeys?: ActiveKeys): IFormCollpase
}

interface IFormCollapse {
  // Active key collection
  activeKeys: ActiveKeys
  // Whether the given active key exists
  hasActiveKey: (key: ActiveKey) => boolean
  // Replace the active key collection
  setActiveKeys: (keys: ActiveKeys) => void
  // Add an active key
  addActiveKey: (key: ActiveKey) => void
  // Remove an active key
  removeActiveKey: (key: ActiveKey) => void
  // Toggle an active key
  toggleActiveKey: (key: ActiveKey) => void
}
```
