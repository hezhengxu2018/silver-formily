# Segmented

> Segmented control

## Markup Schema Example

:::demo

../../en/demos/segmented/markup-schema

:::

## JSON Schema Example

:::demo

../../en/demos/segmented/json-schema

:::

## Template Example

:::demo

../../en/demos/segmented/template

:::

## API

See [https://element-plus.org/en-US/component/segmented.html](https://element-plus.org/en-US/component/segmented.html)

### Extended Props

| Prop      | Type                                                                | Description                                                              | Default |
| --------- | ------------------------------------------------------------------- | ------------------------------------------------------------------------ | ------- |
| `options` | ^[array]`Array<Record<string, any> \| string \| number \| boolean>` | Option config array. In most cases, prefer configuring via `dataSource`. | `[]`    |

## Segmented Slot

| Slot      | Description                               | Type                |
| --------- | ----------------------------------------- | ------------------- |
| `default` | Scoped slot for customizing option render | ^[object]`{ item }` |
