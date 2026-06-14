# Checkbox

> Checkbox

::: tip Tip
This component includes compatibility handling for older `element-plus` versions. No matter which version you use, objects in `dataSource` should include both `label` and `value` when you are not using slots. For older versions, slot rendering still needs the `label` prop to act as the `value`.
:::

## Markup Schema Example

:::demo

../../en/demos/checkbox/markup-schema

:::

## Markup Schema Slot Example

:::demo

../../en/demos/checkbox/markup-schema-slot

:::

## JSON Schema Example

:::demo

../../en/demos/checkbox/json-schema

:::

## Template Example

:::demo

../../en/demos/checkbox/template

:::

## API

See [https://element-plus.org/en-US/component/checkbox.html](https://element-plus.org/en-US/component/checkbox.html)

### Extended Props

| Prop         | Type                           | Description | Default     |
| ------------ | ------------------------------ | ----------- | ----------- |
| `optionType` | ^[enum]`'default' \| 'button'` | Style type  | `'default'` |

## Checkbox Slot

| Slot     | Description                                             | Type                  |
| -------- | ------------------------------------------------------- | --------------------- |
| `option` | Scoped slot for customizing how each option is rendered | ^[object]`{ option }` |
