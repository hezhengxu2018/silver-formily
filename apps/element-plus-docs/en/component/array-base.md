# ArrayBase

> Base array component for array controls. It cannot be used on its own.

For convenience, these capabilities are already integrated into all Array-controlled components and are used as `ArrayCards.Addition`, `ArrayCards.MoveUp`, and so on. Because these controls must be used together with other components in Schema mode, and not every Array component supports every ArrayBase control, there is no standalone export.

For the same reason, this section does not provide standalone code demos. Please refer to examples in the actual components that use these helpers.

## SortHandle

> Drag handle

See [https://element-plus.org/en-US/component/button.html](https://element-plus.org/en-US/component/button.html)

## Addition

> Add button

### Extended Props

| Prop           | Type                  | Description | Default  |
| -------------- | --------------------- | ----------- | -------- |
| `title`        | `string`              | Text        | -        |
| `method`       | `'push' \| 'unshift'` | Add method  | `'push'` |
| `defaultValue` | `any`                 | Default     | -        |

For the rest, see [https://element-plus.org/en-US/component/button.html](https://element-plus.org/en-US/component/button.html).

::: warning Note
Array controls have a known issue: after setting `initialValue`, removing an item and adding it again restores the original `initialValue`. You can work around this by setting `defaultValue` on the Addition component. There is currently no official fix. See the [issue](https://github.com/alibaba/formily/issues/4235).
:::

::: tip Tip
The `title` prop can reuse the title mapped on the Field model, so setting `title` on the Field also works here.
:::

## Remove

> Remove button

| Prop    | Type     | Description | Default |
| ------- | -------- | ----------- | ------- |
| `title` | `string` | Text        | -       |

For the rest, see [https://element-plus.org/en-US/component/button.html](https://element-plus.org/en-US/component/button.html).

::: tip Tip
The `title` prop can reuse the title mapped on the Field model, so setting `title` on the Field also works here.
:::

## MoveDown

> Move-down button

| Prop    | Type     | Description | Default |
| ------- | -------- | ----------- | ------- |
| `title` | `string` | Text        | -       |

For the rest, see [https://element-plus.org/en-US/component/button.html](https://element-plus.org/en-US/component/button.html).

::: tip Tip
The `title` prop can reuse the title mapped on the Field model, so setting `title` on the Field also works here.
:::

## MoveUp

> Move-up button

| Prop    | Type     | Description | Default |
| ------- | -------- | ----------- | ------- |
| `title` | `string` | Text        | -       |

For the rest, see [https://element-plus.org/en-US/component/button.html](https://element-plus.org/en-US/component/button.html).

::: tip Tip
The `title` prop can reuse the title mapped on the Field model, so setting `title` on the Field also works here.
:::

## Index

> Index renderer

No props

## useIndex

> Hook for reading the index of the current rendered row

## useRecord

> Hook for reading the current rendered record
