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

## Object values and property selection

Set `optionAsValue: true` to submit option objects. The optional `optionValueKeys?: string[]` strictly selects top-level properties. Omit it to return complete objects; an empty array returns an empty object, and missing properties are ignored. `optionAsValue` defaults to `false`.

Projection affects only the submitted value, never `dataSource`. Include the identity property (`value`, or the configured `nodeKey` / `rowKey`) in the allowlist. Labels are resolved from the complete data source, so the form value does not need a label.

```ts
const componentProps = {
  optionAsValue: true,
  optionValueKeys: ['value'],
}
// dataSource: [{ value: 1, label: 'One', extra: 'Business data' }]
// Form value: { value: 1 }
```
