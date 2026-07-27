# QueryFormItem

> 基于 `QueryForm` 的装饰器组件，用于按条件请求并更新当前字段的 `dataSource`。

## SelectTable + 分页

:::demo

query-form-item/markup-schema

:vueFiles="['query-form-item/markup-schema.vue', 'query-form-item/mock-user-request.ts']"

:::

## Tree + 轻量模式（无分页）

:::demo

query-form-item/light-with-tree

:::

## 注册自定义组件（Segmented）

:::demo

query-form-item/custom-components-segmented

:vueFiles="['query-form-item/custom-components-segmented.vue', 'query-form-item/mock-user-request.ts']"

:::

## 通过外部传入 Form 设置初始值

:::warning 注意
在Decorator中如果需要传入form需要使用函数返回的写法，这是因为Decorator中的props会经过toJS处理，会引起组件循环渲染。具体写法见下。
:::

:::demo

query-form-item/external-form-initial-values

:::

## Transfer + 条件变化清空已选值

:::demo

query-form-item/transfer-clear-on-data-change

:vueFiles="['query-form-item/transfer-clear-on-data-change.vue', 'query-form-item/mock-user-request.ts']"

:::

## 通过 decorator-content 注入 selected-list 到 extra

:::demo

query-form-item/extra-slot-selected-list

:vueFiles="['query-form-item/extra-slot-selected-list.vue', 'query-form-item/mock-user-request.ts']"

:::

## API

### QueryFormItem Props

基本继承了所有 FormItem 的配置项。为了避免校验失败时报错的样式影响到内部的QueryForm，组件修改了FormItem的class名，因此可能会出现部分配置项不生效的情况。下面的这些配置项是 QueryFormItem 独有的。

| 属性名              | 说明                                         | 类型                                                                                                                       | 默认值                        |
| ------------------- | -------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------- | ----------------------------- |
| `mode`              | 查询模式                                     | ^[enum]`'default' \| 'light'`                                                                                              | `'default'`                   |
| `request`           | 查询函数，参见 [Request 约定](#request-约定) | ^[Function]`(params: Record<string, any> & Partial<QueryFormItemPagination>) => Promise<QueryFormItemRequestResultObject>` | -                             |
| `clearOnDataChange` | 查询成功后是否清空当前字段值                 | `boolean`                                                                                                                  | `false`                       |
| `querySchema`       | 等价于`queryFormProps.schema`                | ^[object]`ISchema`                                                                                                         | -                             |
| `queryFormProps`    | 查询表单配置                                 | ^[object]`QueryFormItemQueryProps`                                                                                         | 参考QueryForm默认值           |
| `pagination`        | 是否启用分页                                 | `boolean`                                                                                                                  | `true`                        |
| `paginationProps`   | 分页配置，透传给 `ElPagination`              | 参考Element-plus 官方文档                                                                                                  | 略                            |
| `paginationMap`     | 分页参数映射（用于请求入参键名）             | ^[object]`QueryFormItemPaginationMap`                                                                                      | [分页参数映射](#分页参数映射) |
| `immediate`         | 挂载后是否立即执行一次查询                   | `boolean`                                                                                                                  | `true`                        |

### 事件

| 属性名           | 类型                                                               | 描述                                                                                             | 默认值 |
| ---------------- | ------------------------------------------------------------------ | ------------------------------------------------------------------------------------------------ | ------ |
| `requestSuccess` | ^[Function]`(payload: QueryFormItemRequestSuccessPayload) => void` | 查询成功后触发，参数见 [QueryFormItemRequestSuccessPayload](#queryformitemrequestsuccesspayload) | -      |
| `requestFailed`  | ^[Function]`(error: any) => void`                                  | 查询失败后触发                                                                                   | -      |

#### QueryFormItemRequestSuccessPayload

`requestSuccess` 在请求成功且 `result.success` 为 `true` 后触发，其 `payload` 包含以下字段：

| 属性名       | 类型                                                            | 说明                                                            |
| ------------ | --------------------------------------------------------------- | --------------------------------------------------------------- |
| `values`     | ^[object]`Record<string, any>`                                  | QueryForm 收集的查询值，不包含分页参数                          |
| `pagination` | ^[object]`{ current: number; pageSize: number }` \| `undefined` | 当前页码和每页条数；禁用分页时为 `undefined`                    |
| `dataSource` | ^[array]`any[]`                                                 | `result.data`，同时会同步到当前字段的 `dataSource`              |
| `total`      | `number` \| `undefined`                                         | 数据总数；当 `result.total` 未返回时，使用 `result.data.length` |
| `result`     | ^[object]`{ data: any[]; success: boolean; total?: number }`    | `request` 返回的原始结果；其中 `total` 不会被上面的回退值覆盖   |

### Request 约定

如果启用分页，那么request的入参除了QueryForm中获取的值之外还会额外传入 `current` 与 `pageSize`。可以通过`paginationMap`参数配置映射。

`request` 必须返回以下格式（参考 ProTable）：

```ts
interface QueryResult {
  data: any[]
  success: boolean
  total?: number
}
```

- `success` 必须为 `true` 才会解析 `data` 到字段 `dataSource`。
- `total` 不传时默认使用 `data.length`，分页场景建议显式返回。

### 分页参数映射

默认分页参数键名为 `current` 和 `pageSize`。如果后端需要其他键名，可通过 `paginationMap` 配置：

```ts
const props = {
  paginationMap: {
    current: 'pageNum',
    pageSize: 'pageSize',
  },
}
```

## SelectedList API

`QueryFormItemSelectedList` 用于展示当前字段已经勾选的项，通常通过 `decoratorContent.extra` 注入到 `QueryFormItem` 的 `extra` 区域。组件会自动读取当前字段值，并内置清空全部选择、移除单项选择的交互。

### SelectedList Props

| 属性名               | 说明                                                          | 类型                                                         | 默认值               |
| -------------------- | ------------------------------------------------------------- | ------------------------------------------------------------ | -------------------- |
| `itemText`           | 必填，用于决定每一项显示的文字内容                            | ^[Function]`(item: QueryFormItemSelectedListItem) => string` | -                    |
| `width`              | 列表宽度                                                      | `number`                                                     | `200`                |
| `selectionText`      | 已选数量文案；传入字符串时可使用 `{count}` 作为已选数量占位符 | `string \| ((count: number) => string)`                      | 根据当前语言自动生成 |
| `clearSelectionText` | 清空全部选择的操作文案                                        | `string`                                                     | 根据当前语言自动生成 |

### QueryFormItemSelectedListItem

`itemText` 接收的参数结构如下：

| 属性名     | 说明                                                           | 类型                                          |
| ---------- | -------------------------------------------------------------- | --------------------------------------------- |
| `value`    | 当前项的值；当能根据 `rowKey` 解析到记录时，优先为记录的键值   | `any`                                         |
| `rawValue` | 字段值中原始保存的当前项                                       | `any`                                         |
| `record`   | 从 `dataSource` 中匹配到的完整记录；`optionAsValue` 时为原始项 | ^[object]`Record<string, any>` \| `undefined` |
| `index`    | 当前项在字段值数组中的原始下标                                 | `number`                                      |
