# Tree

> Tree picker

::: warning Note
Lazy loading is not supported at the moment. Supporting it would require the backend to return not only child nodes, but also the checked / half-checked / unchecked status for every descendant node at the same time, which would add a significant burden to the backend. It also conflicts with several `valueType` modes. For example, when `valueType` is `child` or `path`, checking a partially loaded node would require the frontend to query every descendant before submission in order to keep the final value correct. Rehydration is also more complex, because the backend would need extra APIs to provide state for nodes that were not loaded at selection time.
:::

::: warning Note
Please make sure your initial value is correct. The `valueType` used for rehydration must match the `valueType` used for submission.
:::

## Template Example

::: demo

tree/template

:::

## Template Initial Value Example

::: demo

tree/template-initial-value

:::

## Template Option Initial Value Example

::: demo

tree/template-option-initial-value

:::

## Additional Template State Examples

::: demo

tree/template-others

:::

## API

### Extended Props

| Prop                 | Type                                            | Description                                                                                     | Default |
| -------------------- | ----------------------------------------------- | ----------------------------------------------------------------------------------------------- | ------- |
| `nodeKey`            | `string`                                        | Required unique key for each node                                                               | -       |
| `valueType`          | ^[enum]`'all' \| 'parent' \| 'child' \| 'path'` | Output value type. Only effective when `checkStrictly` is `false`                               | `'all'` |
| `includeHalfChecked` | `boolean`                                       | Whether to include half-checked nodes. Only effective when `valueType` is `'all'`               | `false` |
| `optionAsValue`      | `boolean`                                       | Whether to use the whole node option as the selected value. Invalid when `valueType` is `path`. | `false` |
| `optionFormatter`    | `(node: TreeNode) => TreeNode`                  | Option formatting function. Only effective when `optionAsValue` is `true`                       | -       |
| `height`             | `number`                                        | Height prop forwarded to `ElScrollbar`                                                          | -       |
| `maxHeight`          | `number`                                        | maxHeight prop forwarded to `ElScrollbar`                                                       | -       |

For the rest, see [https://element-plus.org/en-US/component/tree.html](https://element-plus.org/en-US/component/tree.html)

::: warning Note

1. The component reserves some props and events. Avoid using `default-checked-keys`, `show-checkbox`, and the `check` event directly.
2. Only `height` and `max-height` are forwarded to `ElScrollbar`. Do not attach other ElScrollbar props or event listeners here.
   :::

## Get Instance

Used to access the `ElTree` instance. For exposed methods, see the Element Plus documentation. The node-filtering demo shows the usage pattern.

```ts
const treeRef: Ref<TreeInstance> = fieldRef.value.invoke('getTreeRef')
```

## Slots

All slots from the original component are supported, and each slot additionally receives the `field` value in its slot scope for easier access.
