# Radio

> Radio

::: warning Note
You should always use `Radio.Group` instead of `Radio`. This package does not wrap `Radio` itself and simply exposes the raw `ElRadio` component. In newer Element Plus versions, the `value` prop on `ElRadio` conflicts with the Field binding contract. Making that compatible would require extra wrapping and complexity, and in form scenarios there is rarely a meaningful case for using a standalone radio item directly.
:::

::: tip Tip
This component includes compatibility handling for older `element-plus` versions. No matter which version you use, objects in `dataSource` should include both `label` and `value` when you are not using slots. For older versions, slot rendering still needs the `label` prop to act as the `value`.
:::

## Markup Schema Example

:::demo

../../en/demos/radio/markup-schema

:::

## JSON Schema Example

:::demo

../../en/demos/radio/json-schema

:::

## Template Example

:::demo

../../en/demos/radio/template

:::

## API

See [https://element-plus.org/en-US/component/radio.html](https://element-plus.org/en-US/component/radio.html)

### Extended Props

| Prop         | Type                           | Description | Default     |
| ------------ | ------------------------------ | ----------- | ----------- |
| `optionType` | ^[enum]`'default' \| 'button'` | Style type  | `'default'` |

## Radio Slot

| Slot     | Description                                             | Type                  |
| -------- | ------------------------------------------------------- | --------------------- |
| `option` | Scoped slot for customizing how each option is rendered | ^[object]`{ option }` |
