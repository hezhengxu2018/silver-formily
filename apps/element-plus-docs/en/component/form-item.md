# FormItem

> A redesigned FormItem component. Compared with Element Plus FormItem, it supports more capabilities while remaining purely presentational, so it does not manage form state and is lighter and easier to customize.

This component has been refactored, so please refer to the updated documentation. Features inherited from Ant Design but not implemented by Element Plus have been removed. This package is primarily a Formily wrapper for Element Plus, so it should not try to align its design language with Ant Design. However, the original Formily layout configuration style is still preserved.

1. The `inset` prop has been removed.
2. The `bordered` prop has been removed.
3. Native Vue-inherited attributes such as `class` and `style` have been removed from the explicit API list.
4. Features implemented by Ant Design rather than Formily have been removed.

::: warning Note
Because this component mostly follows the styling and interactions of Element Plus FormItem, the previous shallow wrapper around `ElFormItem` has been removed.
:::

::: tip Tip
Starting from `2.1.0`, the Vue wrapper has been upgraded to `@silver-formily/vue@2.2.1`. This means you can use `decoratorContent` to insert content into FormItem. Although this is not an official Formily implementation and does not use Formily reactivity, it should be sufficient in most cases. See the example in the [`@silver-formily/vue` documentation](https://vue.silver-formily.org/questions/#%E5%A6%82%E4%BD%95%E5%90%91%E8%A3%85%E9%A5%B0%E5%99%A8%E4%BC%A0%E9%80%92%E6%8F%92%E6%A7%BD) for details.
:::

## Common Props Example

:::demo

../../en/demos/form-item/common

:::

## Size Control Example

:::demo

../../en/demos/form-item/size

:::

## API

### FormItem Attributes

| Prop             | Type                                                                                          | Description                                                                            | Default   |
| ---------------- | --------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------- | --------- |
| `label`          | `string` \| `VNode`                                                                           | Label                                                                                  | -         |
| `for`            | `string`                                                                                      | Associated form control id/name                                                        | -         |
| `tooltip`        | `string` \| `VNode`                                                                           | Question-mark tooltip content                                                          | -         |
| `addonBefore`    | `string` \| `VNode`                                                                           | Prefix addon content                                                                   | -         |
| `addonAfter`     | `string` \| `VNode`                                                                           | Suffix addon content                                                                   | -         |
| `extra`          | `string` \| `VNode`                                                                           | Extra description text                                                                 | -         |
| `feedbackText`   | `string`                                                                                      | Feedback text                                                                          | -         |
| `feedbackStatus` | ^[enum]`'error' \| 'warning' \| 'success' \| 'pending'`                                       | Feedback status                                                                        | -         |
| `asterisk`       | `boolean`                                                                                     | Whether to show an asterisk                                                            | -         |
| `colon`          | `boolean`                                                                                     | Whether to show a colon                                                                | `true`    |
| `labelAlign`     | ^[enum]`'right' \| 'left'`                                                                    | Label text alignment                                                                   | -         |
| `wrapperAlign`   | ^[enum]`'right' \| 'left'`                                                                    | Content text alignment                                                                 | -         |
| `labelWrap`      | `boolean`                                                                                     | Whether label text wraps. Overflow text is ellipsized and shown in a tooltip on hover. | `false`   |
| `labelWidth`     | `number`                                                                                      | Fixed label width                                                                      | -         |
| `wrapperWidth`   | `number`                                                                                      | Fixed content width                                                                    | -         |
| `labelCol`       | `number`                                                                                      | Label columns in a 24-column grid. Together with `wrapperCol`, the total should be 24. | -         |
| `wrapperCol`     | `number`                                                                                      | Content columns in a 24-column grid. Together with `labelCol`, the total should be 24. | -         |
| `fullness`       | `boolean`                                                                                     | Whether content fills available width                                                  | `false`   |
| `size`           | ^[enum]`'small' \| 'default' \| 'large'`                                                      | Size                                                                                   | `default` |
| `layout`         | ^[enum]`'vertical' \| 'horizontal' \| 'inline' \| ('vertical' \| 'horizontal' \| 'inline')[]` | Layout mode                                                                            | -         |
| `feedbackLayout` | ^[enum]`'loose' \| 'terse' \| 'popover'`                                                      | Feedback layout                                                                        | `'loose'` |
| `tooltipLayout`  | ^[enum]`'icon' \| 'text'`                                                                     | Tooltip layout                                                                         | -         |

### FormItem.BaseItem

A pure presentational component with the same props as FormItem. It does not bridge state with Formily Core and is mainly useful when you need FormItem styling/layout capabilities without connecting to Field state.
