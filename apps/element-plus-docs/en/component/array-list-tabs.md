# ArrayListTabs

> Form container with a sidebar tab list

::: warning Note
This component is intended for Schema-based scenarios only.
:::

## Markup Schema Example

::: demo
array-list-tabs/markup-schema
:::

## Markup Schema with Tab Title Rendering

::: tip Tip
It is recommended to wrap the title field with `Editable`. When rendered as the tab title, its validation errors will not be counted as panel errors.
:::

::: demo
array-list-tabs/markup-schema-show-title-field-in-tab
:::

## API

### ArrayListTabs Props

| Prop                  | Type       | Description                                                                                                   | Default |
| --------------------- | ---------- | ------------------------------------------------------------------------------------------------------------- | ------- |
| `tabTitleField`       | ^[string]  | Required. The field name used as the tab title. When that field has a value, it is rendered as the tab title. | -       |
| `showTitleFieldInTab` | ^[boolean] | Whether to render `tabTitleField` itself inside the tab title area                                            | `false` |

### ArrayListTabs.Remove

> See [ArrayBase.Remove](./array-base.md#remove)

### ArrayListTabs.Addition

> See [ArrayBase.Addition](./array-base.md#addition)
