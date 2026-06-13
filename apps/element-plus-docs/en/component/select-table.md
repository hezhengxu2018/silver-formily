# Select Table

> Table-based picker component

::: warning Note
`rowKey` is required. Unlike Element Plus, only string values are supported for now; function values are not. Tree selection is also not supported at the moment.
:::

::: tip Tip
When `mode` is `single`, `value` is a single value. When `mode` is `multiple`, `value` is an array.
:::

## Markup Schema Multiple Selection Example

:::demo

select-table/markup-schema-multiple

:::

## Markup Schema Multiple Selection Slot Example

> Multiple selection combined with slots.

:::demo

select-table/markup-schema-multiple-slot

:::

## JSON Schema Multiple Selection Example

:::demo

select-table/json-schema-multiple

:::

## JSON Schema Single Selection Example

> Single selection, returning the whole row and hiding the alert toolbar.

:::demo

select-table/json-schema-single

:::

## Template Single Selection Example

> Single selection, returning only the selected key.

:::demo

select-table/template-single

:::

## Template Multiple Selection Example

> Multiple selection, returning the whole row and using slots.

:::demo

select-table/template-multiple-slot

:::

## Template Disable Selection Example

This example shows how to disable further selection after more than two rows have been checked.

In real-world projects, you may still choose to hide the select-all checkbox with CSS, but using validation feedback is usually the clearer and more maintainable way to guide users.

:::demo

select-table/template-multiple-selectable

:::

## API

### SelectTable Props

| Prop                        | Description                                                                                                                                | Type                                                                                   | Default      |
| --------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------ | -------------------------------------------------------------------------------------- | ------------ |
| `mode`                      | Selection mode                                                                                                                             | ^[enum]`'multiple' \| 'single'`                                                        | `multiple`   |
| `columns`                   | Table column configuration. See the [official documentation](https://element-plus.org/en-US/component/table.html#table-column-attributes). | ^[array]`See official docs for structure`                                              | `[]`         |
| `optionAsValue`             | Whether the selected value should be the whole row                                                                                         | ^[boolean]                                                                             | `false`      |
| `rowKey`                    | Required unique field name for each row, corresponding to the Element Plus table prop                                                      | ^[string]                                                                              | `-`          |
| `clickRowToSelect`          | Whether clicking a whole row triggers selection. Disable this if you need custom click handlers inside the table.                          | ^[boolean]                                                                             | `true`       |
| `showAlertToolbar`          | Whether to show the selection alert toolbar                                                                                                | ^[boolean]                                                                             | `true`       |
| `selectable` ^(1.0.0)       | Return value controls whether the current row can be checked                                                                               | ^[Function]`(row: Record<string, any>, index: number, field: GeneralField) => boolean` | `() => true` |
| `ignoreSelectable` ^(1.0.0) | Whether to ignore `selectable` restrictions in certain cases                                                                               | ^[boolean]                                                                             | `true`       |

::: tip Tip
`onSelect`, `onSelectAll`, and `onRowClick` are already used internally and should not be overridden. For other props and events, see the [official documentation](https://element-plus.org/en-US/component/table.html#table-attributes). For example, you can still configure table height or striping, but avoid configurations that go against the Formily contract, such as driving table data through `ElTable.data` instead of Formily `dataSource`.
:::

::: tip Tip
In Element Plus, the `selectable` function belongs to the selection column. In Select Table, it has been lifted to the Select Table component itself, and it receives an additional third argument: the current `field`. If needed, you can use Query syntax to read values from the entire form.
Likewise, `ignoreSelectable`, which acts as the third argument in Element Plus selection logic, is now exposed as a standalone Select Table prop.
:::

### Slots

| Slot      | Description                                                                                                                                                                              |
| --------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `default` | Custom column content. In most cases this is used together with `ElTableColumn`. See the [official documentation](https://element-plus.org/en-US/component/table.html#table-column-api). |
