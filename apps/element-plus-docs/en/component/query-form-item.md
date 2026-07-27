# QueryFormItem

> A decorator component built on `QueryForm` that requests and updates the current field's `dataSource` based on conditions.

## SelectTable with Pagination Example

:::demo

query-form-item/markup-schema

:vueFiles="['../../en/demos/query-form-item/markup-schema.vue', '../../en/demos/query-form-item/mock-user-request.ts']"

:::

## Tree with Light Mode and No Pagination Example

:::demo

../../en/demos/query-form-item/light-with-tree

:::

## Custom Component Registration Example (Segmented)

:::demo

query-form-item/custom-components-segmented

:vueFiles="['../../en/demos/query-form-item/custom-components-segmented.vue', '../../en/demos/query-form-item/mock-user-request.ts']"

:::

## External Form Initial Values Example

::: warning Note
If you need to pass `form` inside the decorator, use a function that returns the props object. That is because props inside decorators go through `toJS`, which would otherwise cause repeated component re-renders. See the example below for the exact pattern.
:::

:::demo

../../en/demos/query-form-item/external-form-initial-values

:::

## Transfer with Clearing on Condition Changes Example

:::demo

query-form-item/transfer-clear-on-data-change

:vueFiles="['../../en/demos/query-form-item/transfer-clear-on-data-change.vue', '../../en/demos/query-form-item/mock-user-request.ts']"

:::

## Inject selected-list into extra with decorator-content Example

:::demo

query-form-item/extra-slot-selected-list

:vueFiles="['../../en/demos/query-form-item/extra-slot-selected-list.vue', '../../en/demos/query-form-item/mock-user-request.ts']"

:::

## API

### QueryFormItem Props

The component inherits most FormItem props. To avoid validation-error styles from breaking the internal QueryForm layout, it changes the FormItem class name, so a few FormItem-related props may not behave exactly the same. The following are QueryFormItem-specific props.

| Prop                | Description                                                       | Type                                                                                                                       | Default                                                       |
| ------------------- | ----------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------- |
| `mode`              | Query mode                                                        | ^[enum]`'default' \| 'light'`                                                                                              | `'default'`                                                   |
| `request`           | Query function. See [Request Contract](#request-contract).        | ^[Function]`(params: Record<string, any> & Partial<QueryFormItemPagination>) => Promise<QueryFormItemRequestResultObject>` | -                                                             |
| `clearOnDataChange` | Whether to clear the current field value after a successful query | `boolean`                                                                                                                  | `false`                                                       |
| `querySchema`       | Equivalent to `queryFormProps.schema`                             | ^[object]`ISchema`                                                                                                         | -                                                             |
| `queryFormProps`    | Query form configuration                                          | ^[object]`QueryFormItemQueryProps`                                                                                         | See QueryForm defaults                                        |
| `pagination`        | Whether to enable pagination                                      | `boolean`                                                                                                                  | `true`                                                        |
| `paginationProps`   | Pagination props forwarded to `ElPagination`                      | See Element Plus documentation                                                                                             | -                                                             |
| `paginationMap`     | Pagination key mapping used when building request params          | ^[object]`QueryFormItemPaginationMap`                                                                                      | [Pagination Parameter Mapping](#pagination-parameter-mapping) |
| `immediate`         | Whether to run the query immediately after mount                  | `boolean`                                                                                                                  | `true`                                                        |

### Events

| Prop             | Type                                                               | Description                                                                                                        | Default |
| ---------------- | ------------------------------------------------------------------ | ------------------------------------------------------------------------------------------------------------------ | ------- |
| `requestSuccess` | ^[Function]`(payload: QueryFormItemRequestSuccessPayload) => void` | Triggered after a successful query. See [QueryFormItemRequestSuccessPayload](#queryformitemrequestsuccesspayload). | -       |
| `requestFailed`  | ^[Function]`(error: any) => void`                                  | Triggered when the query fails                                                                                     | -       |

#### QueryFormItemRequestSuccessPayload

`requestSuccess` is emitted after the request succeeds with `result.success` set to `true`. Its `payload` contains:

| Prop         | Type                                                            | Description                                                                                     |
| ------------ | --------------------------------------------------------------- | ----------------------------------------------------------------------------------------------- |
| `values`     | ^[object]`Record<string, any>`                                  | Query values collected by QueryForm, excluding pagination parameters                            |
| `pagination` | ^[object]`{ current: number; pageSize: number }` \| `undefined` | Current page and page size; `undefined` when pagination is disabled                             |
| `dataSource` | ^[array]`any[]`                                                 | The value of `result.data`, also synchronized to the current field's `dataSource`               |
| `total`      | `number` \| `undefined`                                         | Total item count; falls back to `result.data.length` when `result.total` is omitted             |
| `result`     | ^[object]`{ data: any[]; success: boolean; total?: number }`    | Original value returned by `request`; its `total` is not replaced with the fallback shown above |

### Request Contract

When pagination is enabled, the request function receives `current` and `pageSize` in addition to values collected from QueryForm. You can remap those keys through `paginationMap`.

`request` must return data in the following shape, similar to ProTable:

```ts
interface QueryResult {
  data: any[]
  success: boolean
  total?: number
}
```

- `success` must be `true` before `data` is written into the field `dataSource`.
- When `total` is omitted, `data.length` is used by default. In paginated scenarios, returning `total` explicitly is recommended.

### Pagination Parameter Mapping

The default pagination keys are `current` and `pageSize`. If your backend expects different names, configure them through `paginationMap`:

```ts
const props = {
  paginationMap: {
    current: 'pageNum',
    pageSize: 'pageSize',
  },
}
```

## SelectedList API

`QueryFormItemSelectedList` displays the items selected by the current field. It is usually injected into the `extra` area of `QueryFormItem` through `decoratorContent.extra`. The component reads the current field value automatically and includes interactions for clearing all selections and removing a single selected item.

### SelectedList Props

| Prop                 | Description                                                                        | Type                                                         | Default                           |
| -------------------- | ---------------------------------------------------------------------------------- | ------------------------------------------------------------ | --------------------------------- |
| `itemText`           | Required. Returns the display text for each selected item                          | ^[Function]`(item: QueryFormItemSelectedListItem) => string` | -                                 |
| `width`              | List width                                                                         | `number`                                                     | `200`                             |
| `selectionText`      | Selected-count text. When a string is provided, `{count}` is replaced by the count | `string \| ((count: number) => string)`                      | Generated from the current locale |
| `clearSelectionText` | Text for the clear-all action                                                      | `string`                                                     | Generated from the current locale |

### QueryFormItemSelectedListItem

`itemText` receives the following item shape:

| Prop       | Description                                                                                  | Type                                          |
| ---------- | -------------------------------------------------------------------------------------------- | --------------------------------------------- |
| `value`    | Current item value. When a record can be resolved by `rowKey`, this is the record key value  | `any`                                         |
| `rawValue` | Original item stored in the field value                                                      | `any`                                         |
| `record`   | Full record matched from `dataSource`; when `optionAsValue` is enabled, this is the raw item | ^[object]`Record<string, any>` \| `undefined` |
| `index`    | Original index of the item in the field value array                                          | `number`                                      |
