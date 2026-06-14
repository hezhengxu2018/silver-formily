# Select

> Select component

## Markup Schema with Synchronous Data Source Example

:::demo

../../en/demos/select/markup-schema-sync

:::

## Markup Schema with Async Search Example

:::demo

../../en/demos/select/markup-schema-async-search

:::

## Markup Schema with Async Linked Data Source Example

:::demo

../../en/demos/select/markup-schema-async

:::

## Markup Schema OptionGroup Example

:::demo

../../en/demos/select/markup-schema-option-group

:::

## JSON Schema with Synchronous Data Source Example

:::demo

../../en/demos/select/json-schema-sync

:::

## JSON Schema with Async Linked Data Source Example

:::demo

../../en/demos/select/json-schema-async

:::

## Template with Synchronous Data Source Example

:::demo

../../en/demos/select/template-sync

:::

## Template with Async Linked Data Source Example

:::demo

../../en/demos/select/template-async

:::

## Template Scoped Slot Example

:::demo

../../en/demos/select/scope-slot

:::

## Template Header Slot Example

:::demo

../../en/demos/select/template-slot-header

:::

## API

See [https://element-plus.org/en-US/component/select.html](https://element-plus.org/en-US/component/select.html)

### Extended Props

| Prop      | Type                                                                                     | Description                                                              | Default |
| --------- | ---------------------------------------------------------------------------------------- | ------------------------------------------------------------------------ | ------- |
| `options` | [SelectOptionProps](https://element-plus.org/en-US/component/select.html#option-api)`[]` | Option config array. In most cases, prefer configuring via `dataSource`. | `[]`    |

::: tip Tip

1. If an item inside `options` also has an `options` array, it is rendered as an OptionGroup. The first-level object is treated as props for `ElOptionGroup`. See the demo for details.
2. If `valueKey` is not provided, `label` is used as the iteration key, so make sure it is unique.
   :::

### Slots

::: tip Tip

1. The component inherits every slot from `ElSelect`. Pay attention to the Element Plus version you are using.
2. The `header`, `footer`, and `tag` slots additionally receive `field` in their scope. Other slots are unchanged.
3. The component currently cannot use the default slot of `OptionGroup`.
   :::

| Slot      | Description                              | Type                        |
| --------- | ---------------------------------------- | --------------------------- |
| `header`  | Select dropdown header slot              | ^[object]`{ field }`        |
| `footer`  | Select dropdown footer slot              | ^[object]`{ field }`        |
| `prefix`  | Select prefix slot                       | --                          |
| `empty`   | Slot displayed when there are no options | --                          |
| `tag`     | Custom tag content                       | ^[object]`{ field }`        |
| `loading` | Custom loading content                   | --                          |
| `label`   | Custom label content                     | ^[object]`{ label, value }` |
