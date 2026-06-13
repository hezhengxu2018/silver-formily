# QueryFormItem

> A decorator component built on `QueryForm` that requests and updates the current field's `dataSource` based on conditions.

## SelectTable with Pagination Example

:::demo

query-form-item/markup-schema

:vueFiles="['query-form-item/markup-schema.vue', 'query-form-item/mock-user-request.ts']"

:::

## Tree with Light Mode and No Pagination Example

:::demo

query-form-item/light-with-tree

:::

## Custom Component Registration Example (Segmented)

:::demo

query-form-item/custom-components-segmented

:vueFiles="['query-form-item/custom-components-segmented.vue', 'query-form-item/mock-user-request.ts']"

:::

## External Form Initial Values Example

::: warning Note
If you need to pass `form` inside the decorator, use a function that returns the props object. That is because props inside decorators go through `toJS`, which would otherwise cause repeated component re-renders. See the example below for the exact pattern.
:::

:::demo

query-form-item/external-form-initial-values

:::

## Transfer with Clearing on Condition Changes Example

:::demo

query-form-item/transfer-clear-on-data-change

:vueFiles="['query-form-item/transfer-clear-on-data-change.vue', 'query-form-item/mock-user-request.ts']"

:::

## API

### QueryFormItem Props

The component inherits most FormItem props. To avoid validation-error styles from breaking the internal QueryForm layout, it changes the FormItem class name, so a few FormItem-related props may not behave exactly the same. The following are QueryFormItem-specific props.

| Prop                | Description                                                       | Type                                  | Default                                                       |
| ------------------- | ----------------------------------------------------------------- | ------------------------------------- | ------------------------------------------------------------- |
| `mode`              | Query mode                                                        | `'default' \| 'light'`                | `'default'`                                                   |
| `request`           | Query function                                                    | [Request Contract](#request-contract) | -                                                             |
| `clearOnDataChange` | Whether to clear the current field value after a successful query | `boolean`                             | `false`                                                       |
| `querySchema`       | Equivalent to `queryFormProps.schema`                             | `ISchema`                             | -                                                             |
| `queryFormProps`    | Query form configuration                                          | `QueryFormItemQueryProps`             | See QueryForm defaults                                        |
| `pagination`        | Whether to enable pagination                                      | `boolean`                             | `true`                                                        |
| `paginationProps`   | Pagination props forwarded to `ElPagination`                      | See Element Plus documentation        | -                                                             |
| `paginationMap`     | Pagination key mapping used when building request params          | `QueryFormItemPaginationMap`          | [Pagination Parameter Mapping](#pagination-parameter-mapping) |
| `immediate`         | Whether to run the query immediately after mount                  | `boolean`                             | `true`                                                        |

### Events

| Prop             | Type                                                    | Description                        | Default |
| ---------------- | ------------------------------------------------------- | ---------------------------------- | ------- |
| `requestSuccess` | `(payload: QueryFormItemRequestSuccessPayload) => void` | Triggered after a successful query | -       |
| `requestFailed`  | `(error: any) => void`                                  | Triggered when the query fails     | -       |

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
