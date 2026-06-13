# Tree Select

> Tree select

## Markup Schema Example

::: demo

tree-select/markup-schema

:::

## JSON Schema Example

::: demo

tree-select/json-schema

:::

## Template Example

::: demo

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
