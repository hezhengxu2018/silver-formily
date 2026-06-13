# FormButtonGroup

> Form button group layout component

## Markup Schema Example

:::demo

form-button-group/markup-schema

:::

## Markup Schema Sticky Example

:::demo

form-button-group/markup-schema-sticky

:::

## Template Sticky Centered Example

:::demo

form-button-group/template-sticky-center

:::

## API

### FormButtonGroup

| Prop            | Description                       | Type                               | Default  |
| --------------- | --------------------------------- | ---------------------------------- | -------- |
| `gutter`        | Spacing between buttons           | `number`                           | `8`      |
| `align`         | Alignment                         | ^[enum]`'left'\|'center'\|'right'` | `'left'` |
| `alignFormItem` | Align with FormItem               | `boolean`                          | `false`  |
| `inline`        | Inline mode without extra padding | `boolean`                          | `false`  |

### FormButtonGroup.Sticky

See [https://element-plus.org/en-US/component/affix.html](https://element-plus.org/en-US/component/affix.html)

The default `position` is changed to `bottom`, and the default `target` becomes the container that hosts the form. That means you should wrap it with `Form` or `FormLayout`; otherwise, provide the target DOM element manually.
