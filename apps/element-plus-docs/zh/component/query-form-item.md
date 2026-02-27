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

## API

### QueryFormItem Props

基本继承了所有 FormItem 的配置项。为了避免校验失败时报错的样式影响到内部的QueryForm，组件修改了FormItem的class名，因此可能会出现部分配置项不生效的情况。下面的这些配置项是 QueryFormItem 独有的。

| 属性名              | 说明                             | 类型                          | 默认值                        |
| ------------------- | -------------------------------- | ----------------------------- | ----------------------------- |
| `mode`              | 查询模式                         | `'default' \| 'light'`        | `'default'`                   |
| `request`           | 查询函数；                       | [Request 约定](#request-约定) | -                             |
| `clearOnDataChange` | 查询成功后是否清空当前字段值     | `boolean`                     | `false`                       |
| `querySchema`       | 等价于`queryFormProps.schema`    | `ISchema`                     | -                             |
| `queryFormProps`    | 查询表单配置                     | `QueryFormItemQueryProps`     | 参考QueryForm默认值           |
| `pagination`        | 是否启用分页                     | `boolean`                     | `true`                        |
| `paginationProps`   | 分页配置，透传给 `ElPagination`  | 参考Element-plus 官方文档     | 略                            |
| `paginationMap`     | 分页参数映射（用于请求入参键名） | `QueryFormItemPaginationMap`  | [分页参数映射](#分页参数映射) |
| `immediate`         | 挂载后是否立即执行一次查询       | `boolean`                     | `true`                        |

### 事件

| 属性名           | 类型                                                    | 描述           | 默认值 |
| ---------------- | ------------------------------------------------------- | -------------- | ------ |
| `requestSuccess` | `(payload: QueryFormItemRequestSuccessPayload) => void` | 查询成功后触发 | -      |
| `requestFailed`  | `(error: any) => void`                                  | 查询失败后触发 | -      |

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
