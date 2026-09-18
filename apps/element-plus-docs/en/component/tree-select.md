# Tree Select

> Tree select

## Markup Schema Example

:::demo

tree-select/markup-schema

:::

## JSON Schema Example

:::demo

tree-select/json-schema

:::

## Template Example

:::demo

tree-select/template

:::

## API

See [https://element-plus.org/en-US/component/tree-select.html](https://element-plus.org/en-US/component/tree-select.html)

## Get Instance

Used to access the `ElTreeSelect` instance. For exposed methods, see the Element Plus documentation. The node-filtering demo shows the usage pattern. This is mainly used to control tree expansion and selection.

```ts
const treeSelectRef: Ref<TreeSelectInstance> = fieldRef.value.invoke('getTreeSelectRef')
```

## Slots

All slots from the original component are supported, and each slot additionally receives the `field` value in its slot scope for easier access.

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

:::demo

tree-select/option-value

:::
