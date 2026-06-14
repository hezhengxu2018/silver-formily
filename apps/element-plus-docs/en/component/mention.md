# Mention

> Rich mention input for quickly @-mentioning members or topics in long text.

## Markup Schema Example

:::demo

../../en/demos/mention/markup-schema-basic

:::

## Advanced Markup Schema Example

:::demo

../../en/demos/mention/markup-schema-advanced

:::

## Template Slot Example

:::demo

../../en/demos/mention/template-slots

:::

## API

See [https://element-plus.org/en-US/component/mention.html](https://element-plus.org/en-US/component/mention.html)

- The component fully forwards Element Plus Mention props and events. You can manage dropdown data through `dataSource` or `options`, and combine `whole`, `checkIsWhole`, `prefix`, and similar capabilities to control mention behavior.
- The `props` prop maps custom field names, so when a remote API returns keys such as `id` or `nickname`, you do not need to transform them manually.
- `onSearch(pattern, prefix, field)` is called after a trigger character is typed. The third argument injects the current Formily `field`, which is useful for toggling loading state and updating `options` during remote search.

### Slots

| Slot      | Description                                                                     | Type                              |
| --------- | ------------------------------------------------------------------------------- | --------------------------------- |
| `prefix`  | Content before the input                                                        | --                                |
| `suffix`  | Content after the input                                                         | --                                |
| `prepend` | Prepended content, shown before `prefix`                                        | --                                |
| `append`  | Appended content, shown after `suffix`                                          | --                                |
| `header`  | Dropdown header slot, with injected `field`                                     | ^[object]`{ field }`              |
| `footer`  | Dropdown footer slot, with injected `field`                                     | ^[object]`{ field }`              |
| `label`   | Custom option renderer with injected `field`, in addition to `item` and `index` | ^[object]`{ item, index, field }` |
| `loading` | Custom loading content                                                          | --                                |
