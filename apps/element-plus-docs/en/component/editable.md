# Editable

> Partial editor for form areas with tighter space requirements.
>
> Editable is essentially a FormItem variant, so it is usually placed on the decorator side.

::: warning Note
In `readPretty` mode, Formily validation cannot be triggered directly. Because of that, this component library does not use the official `mapReadPretty` for read-pretty mappings. Instead, it uses an internally modified version that additionally reads `readPretty` from `Field.data`. When that value is `true`, the component still renders in read-pretty mode. This simulated read-pretty mode does not block Formily validation. If you build custom components that need to work with `Editable`, import `mapReadPretty` from `@silver-formily/element-plus/__builtins__`; otherwise read-pretty rendering will not work correctly.
:::

::: tip Tip
Starting from [`@formily/core` v2.3.3](https://github.com/alibaba/formily/releases/tag/v2.3.3), validation-trigger states can be configured. If you use version `2.3.3` or above, you can use that capability together with the built-in `mapReadPretty` and still keep validation enabled.
:::

::: tip Tip
When Editable switches modes, it no longer changes `Field.pattern`. Instead, it updates `readPretty` on `Field.data`, for the reasons explained above.
:::

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
