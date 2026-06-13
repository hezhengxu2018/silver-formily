# Autocomplete

> Autocomplete input

## Markup Schema Example

:::demo

autocomplete/markup-schema-basic

:::

## Markup Schema Remote Search Example

:::demo

autocomplete/markup-schema-remote

:::

## Template Scoped Slot Example

:::demo

autocomplete/template-scope

:::

## Template Slot Example

:::demo

autocomplete/template-slots

:::

## Get Instance

Used to access the `ElAutocomplete` instance so you can call methods such as `focus` and `blur`. The type stays aligned with Element Plus.

```ts
const autocompleteRef = fieldRef.value?.invoke('getElAutocompleteRef')
```

## API

See [https://element-plus.org/en-US/component/autocomplete.html](https://element-plus.org/en-US/component/autocomplete.html)

### Extended Props

| Prop      | Type               | Description                                                                                                                            | Default |
| --------- | ------------------ | -------------------------------------------------------------------------------------------------------------------------------------- | ------- |
| `options` | ^[array]`object[]` | Option config array, equivalent to `dataSource`. When `fetchSuggestions` is not explicitly provided, it is converted into suggestions. | `[]`    |

- When `fetchSuggestions` is not provided, the component automatically performs local fuzzy filtering based on `dataSource / options`.
- When you customize `fetchSuggestions(query, cb, field)`, the third `field` argument exposes the current Formily field instance. You can manually assign `field.loading` to reflect loading state, though this is usually only needed when you want semantic loading feedback or need to access values from other fields through `field`.

For example:

```ts
function remoteFetch(query: string, cb: (data: Option[]) => void, field?: Field) {
  field && (field.loading = true)
  apiRequest(query).finally((resp) => {
    cb(resp.data)
    field && (field.loading = false)
  })
}
```

### Slots

The component inherits every slot from Element Plus `ElAutocomplete`. The `default`, `header`, and `footer` slots additionally inject the Formily `field` reference so suggestion items can access form state.

| Slot      | Description                                  | Type                       |
| --------- | -------------------------------------------- | -------------------------- |
| `default` | Custom suggestion item content               | ^[object]`{ item, field }` |
| `header`  | Content at the top of the dropdown list      | ^[object]`{ field }`       |
| `footer`  | Content at the bottom of the dropdown list   | ^[object]`{ field }`       |
| `loading` | Custom loading content                       | --                         |
| `prefix`  | Content before the input                     | --                         |
| `suffix`  | Content after the input                      | --                         |
| `prepend` | Prepended content, displayed before `prefix` | --                         |
| `append`  | Appended content, displayed after `suffix`   | --                         |
