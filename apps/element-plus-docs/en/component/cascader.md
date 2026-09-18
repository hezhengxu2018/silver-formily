# Cascader

> Cascader

## Markup Schema Example

:::demo

../../en/demos/cascader/markup-schema

:::

## JSON Schema Example

:::demo

../../en/demos/cascader/json-schema

:::

## Template Example

:::demo

../../en/demos/cascader/template

:::

## API

See [https://element-plus.org/en-US/component/cascader.html](https://element-plus.org/en-US/component/cascader.html)

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

With `emitPath=true`, values are paths of objects (nested arrays for multiple selection). With `emitPath=false`, values are node objects (arrays for multiple selection).

:::demo

cascader/option-value

:::
