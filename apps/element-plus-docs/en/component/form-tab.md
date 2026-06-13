# FormTab

> Tabbed form

::: warning Note
This component is intended for Schema-based scenarios only.
:::

## Markup Schema Example

:::demo

form-tab/markup-schema

:::

## JSON Schema Example

:::demo

form-tab/json-schema

:::

## API

### FormTab

| Prop      | Type       | Description                               | Default |
| --------- | ---------- | ----------------------------------------- | ------- |
| `formTab` | `IFormTab` | Model instance created by `createFormTab` | -       |

For the rest, see [https://element-plus.org/en-US/component/tabs.html](https://element-plus.org/en-US/component/tabs.html)

### FormTab.TabPane

See [https://element-plus.org/en-US/component/tabs.html#tab-pane-attributes](https://element-plus.org/en-US/component/tabs.html#tab-pane-attributes)

### FormTab.createFormTab

```ts pure
type ActiveKey = string | number

interface createFormTab {
  (defaultActiveKey?: ActiveKey): IFormTab
}

interface IFormTab {
  // Active key
  activeKey: ActiveKey
  // Set the active key
  setActiveKey: (key: ActiveKey) => void
}
```
