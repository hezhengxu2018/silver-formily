# Editable

> Partial editor for form areas with tighter space requirements.
>
> Editable is essentially a FormItem variant, so it is usually placed on the decorator side.

## Markup Schema Example

:::demo

../../en/demos/editable/markup-schema

:::

## JSON Schema Example

> Use the `editProps` prop to control size and other props in edit mode.

:::demo

../../en/demos/editable/json-schema

:::

## Template Example

:::demo

../../en/demos/editable/template

:::

## Template Validation Example

:::demo

../../en/demos/editable/template-validator

:::

## API

### Editable

> Inline editing

See [/en/component/form-item.html#api](./form-item.html#api)

| Prop        | Description                            | Type                          | Default |
| ----------- | -------------------------------------- | ----------------------------- | ------- |
| `editProps` | Extra props applied while in edit mode | ^[object]`See FormItem props` | `null`  |

### Editable.Popover

> Popover editing

See [/en/component/form-item.html#api](./form-item.html#api)

See [https://element-plus.org/en-US/component/popover.html](https://element-plus.org/en-US/component/popover.html)

Editable.Popover supports all props from both FormItem and ElPopover. There should be no conflicts between them; if one does appear, FormItem props currently take precedence. Slots from the two components are not supported for now.
