# PreviewText

> Read-pretty components used to render display mode for components such as Input and DatePicker.

::: warning Note

1. This component has been refactored, and `PreviewText.Placeholder` / `PreviewText.usePlaceholder` have been removed.
2. `PreviewText` is now a renderless configuration component and no longer provides preview rendering directly.
3. Placeholders no longer support VNodes.
   :::

## Basic Example

:::demo

preview-text/base

:::

## Extended Example

::: tip Tip
As long as a component's PreviewText uses Input internally, you can use the `formatter` prop to format its read-pretty output, even if the original component itself does not expose that prop, such as `Slider`.
:::

:::demo

preview-text/extend

:::

## Custom Configuration Example

:::demo

preview-text/preview-config

:::

### Template Usage

Template usage can either wrap several `Field` components directly with `PreviewText`, or use `VoidField` to reuse a whole group of configuration at once. This lets you override `placeholder`, `textProps`, `tagProps`, and `spaceProps` together, while also toggling read-pretty mode through button interactions.

You can also add custom `class` or `style` attributes. They are inherited normally and can be used to override styles.

:::demo

preview-text/preview-config-template-direct

:::

#### Wrap Directly with PreviewText

:::demo

preview-text/preview-config-template

:::

## API

### PreviewText.Input

See [https://element-plus.org/en-US/component/input.html](https://element-plus.org/en-US/component/input.html)

### PreviewText.Select

See [https://element-plus.org/en-US/component/select.html](https://element-plus.org/en-US/component/select.html)

### PreviewText.Cascader

See [https://element-plus.org/en-US/component/cascader.html](https://element-plus.org/en-US/component/cascader.html)

### PreviewText.DatePicker

See [https://element-plus.org/en-US/component/date-picker.html](https://element-plus.org/en-US/component/date-picker.html)

### PreviewText.TimePicker

See [https://element-plus.org/en-US/component/time-picker.html](https://element-plus.org/en-US/component/time-picker.html)

### PreviewText.Rate

See [https://element-plus.org/en-US/component/rate.html](https://element-plus.org/en-US/component/rate.html)

### PreviewText

| Prop          | Type                  | Description         | Default                                      |
| ------------- | --------------------- | ------------------- | -------------------------------------------- |
| `placeholder` | `string`              | Default placeholder | `N/A`                                        |
| `tagProps`    | ^[object]`TagProps`   | Props for `ElTag`   | ^[object]`{ type: 'info', effect: 'light' }` |
| `spaceProps`  | ^[object]`SpaceProps` | Props for `ElSpace` | -                                            |
| `textProps`   | ^[object]`TextProps`  | Props for `ElText`  | -                                            |
