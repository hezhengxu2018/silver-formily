# PickerSelect

> Popup-based select box

## Template Dialog Table Picker Example

:::demo

../../en/demos/picker-select/template-dialog-table

:::

## Returning Full Option Values ^(5.2.0)

With `optionAsValue` enabled, `PickerSelect` submits the `raw` records while the internal select still uses `value` for display.

:::demo

../../en/demos/picker-select/template-option-as-value

:::

- When `optionAsValue` is enabled, `Field.value` contains the option's `raw` object while the internal select still uses the option's `value` for display. Returned options should provide `raw` in full-value mode.
- Use `valueKey` when the raw record's identifier is not `id`.

## API

See [https://element-plus.org/en-US/component/select.html](https://element-plus.org/en-US/component/select.html)

### Extended Props

| Prop                   | Type                                                                                                                                                                                                                                      | Description                                                                                                                         | Default |
| ---------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------- | ------- |
| `options`              | `PickerSelectOption[]`                                                                                                                                                                                                                    | Candidate option list. In most cases, prefer injecting it through `dataSource`.                                                     | `[]`    |
| `openPicker`           | ^[Function]`(ctx: { field?: Field, dataSource: PickerSelectOption[], multiple: boolean }) => Promise<PickerSelectOption \| PickerSelectOption[] \| null \| undefined> \| PickerSelectOption \| PickerSelectOption[] \| null \| undefined` | Picker function triggered when the selector is clicked. Usually returns the option or options returned by `FormDialog(...).open()`. | -       |
| `cacheSelectedOptions` | `boolean`                                                                                                                                                                                                                                 | Whether to cache options returned by `openPicker` so labels can be displayed before `dataSource` catches up.                        | `true`  |
| `optionAsValue`        | `boolean`                                                                                                                                                                                                                                 | Whether to use the option's `raw` object as the field value instead of `value`.                                                     | `false` |
| `valueKey`             | `string`                                                                                                                                                                                                                                  | The field in `raw` used to recover the internal display value in full-value mode.                                                   | `'id'`  |

::: tip Tip

- `openPicker` returns a [PickerSelectOption](#pickerselectoption) object instead of the raw `Field` value.
- When `cacheSelectedOptions` is enabled, those option objects are cached and `Field.value` is taken from their `value` field. When disabled, you need to load the corresponding `dataSource` yourself, for example when an initial value exists before the dialog is opened.
- When the current field value cannot be matched in `dataSource`, the component falls back to displaying the raw `value`.
  :::

### PickerSelectOption

```ts
interface PickerSelectOption {
  label: string
  value: any
  disabled?: boolean
  // Extend with other business fields. The component does not read them internally.
}
```

### Slots

The component inherits the common display slots from `ElSelect`. The first version mainly keeps the original behavior of `prefix`, `empty`, `tag`, `loading`, and `label`, without adding extra scope protocol.
