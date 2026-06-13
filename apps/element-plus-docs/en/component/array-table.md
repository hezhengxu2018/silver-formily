# ArrayTable

> Table component for incrementally managed rows. It is especially well suited to large data sets. After the refactor, ArrayTable performance improved significantly, and large tables no longer lag during input.

::: warning Note
This component is intended for Schema-based scenarios only, and it only supports arrays of objects.
:::

::: tip Tip
To display validation feedback on pagination, this component includes a fork of the Element Plus pagination component from version `2.9.11`. Unless there is a special reason, that built-in pagination component will not be updated further, so its props should be treated as matching that version. Internal functions are still imported from `peerDependencies`, so localization continues to inherit from Element Plus. If you need to change the default language, wrap it with `ElConfigProvider`.
:::

One known limitation remains: validation does not run for rows that have not been rendered yet. Formily only validates registered Fields, so unregistered Fields cannot participate in validation. Registering 100,000 Fields up front would cause severe page lag. In practice, the best workaround is to avoid examples or features that insert a huge amount of data all at once. If data is always added through the "add item" button, every Field will be registered correctly.

## Markup Schema Example

:::demo

array-table/markup-schema

:::

## Markup Schema with Pagination Disabled Example

:::demo

array-table/markup-schema-pagination-false

:::

## Markup Schema Draggable Example

:::demo

array-table/markup-schema-draggable

:::

## JSON Schema Example

:::demo

array-table/json-schema

:::

## JSON Schema Pagination Configuration Example

:::demo

array-table/json-schema-pagination

:::

## Effects Linkage Example

:::demo

array-table/effects-markup-schema

:::

## JSON Schema Linkage Example

:::demo

array-table/effects-json-schema

:::

## API

### ArrayTable

> Table component

See [https://element-plus.org/en-US/component/table.html](https://element-plus.org/en-US/component/table.html)

#### Extended Props

| Prop              | Type                                | Description                  | Default                                                           |
| ----------------- | ----------------------------------- | ---------------------------- | ----------------------------------------------------------------- |
| `pagination`      | `boolean`                           | Whether to enable pagination | `true`                                                            |
| `paginationProps` | ^[object]`See Pagination component` | Pagination component props   | `{ background: true, layout: "total, sizes, prev, pager, next" }` |

### ArrayTable.Column

> Table column

See [https://element-plus.org/en-US/component/table.html](https://element-plus.org/en-US/component/table.html)

#### Extended Props

| Prop       | Type      | Description                 | Default |
| ---------- | --------- | --------------------------- | ------- |
| `asterisk` | `boolean` | Whether to show an asterisk | `true`  |

::: tip Tip

1. ArrayTableColumn automatically checks whether its internal FormItem is required and adds a red asterisk to the table header. If you do not want the asterisk, override it with the `asterisk` prop.
2. ArrayTableColumn only forwards props. It does not support slots.
   :::

### ArrayTable.SortHandle

> See ArrayBase.SortHandle

### ArrayTable.Addition

> See ArrayBase.Addition

### ArrayTable.Remove

> See [ArrayBase.Remove](./array-base.md#remove)

### ArrayTable.MoveDown

> See [ArrayBase.MoveDown](./array-base.md#movedown)

### ArrayTable.MoveUp

> See [ArrayBase.MoveUp](./array-base.md#moveup)

### ArrayTable.Index

> See [ArrayBase.Index](./array-base.md#index)

### ArrayTable.useIndex

> See [ArrayBase.useIndex](./array-base.md#useindex)

### ArrayTable.useRecord

> See [ArrayBase.useRecord](./array-base.md#userecord)
