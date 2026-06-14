# FormLayout

> Block-level layout controller for groups of fields. It lets you easily control the layout mode of every FormItem wrapped by FormLayout.

::: tip Tip
This component has been refactored, so please refer to the updated documentation. Features inherited from Ant Design but not implemented by Element Plus have been removed. This package is primarily a Formily wrapper for Element Plus, so it should not try to align its design language with Ant Design. However, the original Formily layout configuration style is still preserved.

1. The `inset` prop has been removed.
2. The `bordered` prop has been removed.
3. `gridColumnGap` and `gridRowGap` have been removed and should now be handled by grid layout components.
4. `spaceGap` has been removed and should now be handled with the `Space` component.
5. `hideRequiredAsterisk`, `statusIcon`, and `requireAsteriskPosition` have been added from Element Plus Form.
   :::

::: warning Note
Functionally, FormLayout now replaces the Element Plus Form component in many cases, so it includes a `tag` prop whose default value is `form`. According to HTML semantics, forms should be wrapped in a `form` element. If you only need layout behavior, override it explicitly.
:::

## Markup Schema Example

:::demo

../../en/demos/form-layout/markup-schema

:::

## JSON Schema Example

:::demo

../../en/demos/form-layout/json-schema

:::

## Template Example

:::demo

../../en/demos/form-layout/template

:::

## Template Grid Layout Example

:::demo

../../en/demos/form-layout/template-grid

:::

## API

| Prop                      | Description                                    | Type                                                                                          | Default        |
| ------------------------- | ---------------------------------------------- | --------------------------------------------------------------------------------------------- | -------------- |
| `tag`                     | Container tag used to provide layout context   | ^[string] \| ^[VueComponent]                                                                  | `'form'`       |
| `colon`                   | Whether to show a colon                        | ^[boolean]                                                                                    | `true`         |
| `labelAlign`              | Label content alignment                        | ^[enum]`'right' \| 'left' \| ('right' \| 'left')[]`                                           | -              |
| `wrapperAlign`            | Input/content area alignment                   | ^[enum]`'right' \| 'left' \| ('right' \| 'left')[]`                                           | -              |
| `labelWrap`               | Whether label text wraps                       | ^[boolean]                                                                                    | `false`        |
| `labelWidth`              | Label width in px                              | ^[number]                                                                                     | -              |
| `wrapperWidth`            | Content width in px                            | ^[number]                                                                                     | -              |
| `labelCol`                | Label width in 24-column layout                | ^[number] \| ^[array]`number[]`                                                               | -              |
| `wrapperCol`              | Content width in 24-column layout              | ^[number] \| ^[array]`number[]`                                                               | -              |
| `fullness`                | Whether the content area fills available width | ^[boolean]                                                                                    | `false`        |
| `size`                    | Component size                                 | ^[enum]`'small' \| 'default' \| 'large'`                                                      | `'default'`    |
| `layout`                  | Layout mode                                    | ^[enum]`'vertical' \| 'horizontal' \| 'inline' \| ('vertical' \| 'horizontal' \| 'inline')[]` | `'horizontal'` |
| `feedbackLayout`          | Feedback layout                                | ^[enum]`'loose' \| 'terse' \| 'popover'`                                                      | -              |
| `tooltipLayout`           | Tooltip layout                                 | ^[enum]`'icon' \| 'text'`                                                                     | `'icon'`       |
| `breakpoints`             | Container breakpoints                          | ^[array]`number[]`                                                                            | -              |
| `shallow`                 | Whether context is passed shallowly            | ^[boolean]                                                                                    | `true`         |
| `hideRequiredAsterisk`    | Hide required asterisk                         | ^[boolean]                                                                                    | -              |
| `statusIcon`              | Show status icon                               | ^[boolean]                                                                                    | -              |
| `requireAsteriskPosition` | Position of the required asterisk              | ^[enum]`'left' \| 'right'`                                                                    | -              |
