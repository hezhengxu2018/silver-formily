# Upload

> 上传组件，Upload组件经过了重构，虽然总体上与之前总体是兼容的，但是添加了很多的默认行为。具体参见API部分。

上传组件的类型可以分为两种：一种是仅提供选择文件的功能，文件数据会在用户点击提交时随表单的 Form 对象一起上传给后端；另一种是在提交表单之前先上传至后端（大部分情况下是提前上传至 OSS），在提交表单时不提交文件的二进制信息，而是提交文件 URL 或其他可用于获取已上传文件的标识。具体的上传行为由 Element Plus Upload 的 `action`、`httpRequest` 等属性控制。

**显示给用户的文件列表与表单最终提交的值是分离的，并且只进行单向转换。** ElUpload 的文件列表发生变化时，组件会在内部将最新列表同步到 `Field.dataSource`，再通过 `formatValue` 转换，并触发 `update:modelValue` 更新 `Field.value`；`Field.value` 变化时不会反向修改 `Field.dataSource`。

表单数据反显是需要手动处理的例外场景：除了设置 `Field.value`，还需要根据业务需要组装并设置组件的 `fileList`（即 `Field.dataSource`）。

## Markup Schema 案例

:::demo

upload/markup-schema

:::

## JSON Schema 案例

:::demo

upload/json-schema

:::

## Template 案例

:::demo

upload/template

:::

## API

## Props

::: tip 提示

1. 组件的 `fileList` 属性映射到 `Field.dataSource`，而不是 `Field.value`。当 `dataSource`（即 `fileList`）改变时，组件会使用 `formatValue` 生成表单值，并通过 `update:modelValue` 更新 `Field.value`。

2. 在`limit`为`1`时会自动替换掉之前的文件，这部分逻辑无法覆写。

3. 如果组件的`accept`属性包含`image`字符且`fileList`中的项提供了url属性则会自动开启图片预览功能，想要禁用此功能可以配置`onPreview`为一个空函数。
   :::

| 属性名                    | 说明                                                    | 类型                                          | 默认值                                     |
| ------------------------- | ------------------------------------------------------- | --------------------------------------------- | ------------------------------------------ |
| textContent               | 上传按钮的文本内容，在不同的上传模式下显示位置不同      | `string`                                      | `''`                                       |
| errorAdaptor              | 错误信息适配器，用于自定义错误信息的展示格式            | ^[Function]`(error?: Error) => string`        | `error => error?.message`                  |
| formatValue ^(1.0.0)      | 格式化函数，用于将文件列表转换为表单最终提交的值        | ^[Function]`(fileList?: UploadFile[]) => any` | `fileList => fileList`                     |
| fileList ^(1.0.0)         | 文件列表，映射为`dataSource`,`ElUpload`的 fileList 属性 | ^[array]`UploadFile[]`                        | `[]`                                       |
| imageViewerProps ^(1.0.0) | 图片预览器的属性配置，当上传图片时可用于自定义预览行为  | ^[object]`ImageViewerProps`                   | `{ teleported: true, showProgress: true }` |

`onChange` 与 `onUpdate:fileList` 由组件内部消费，不会向外透传，请勿直接使用。其余属性与事件请参考 [https://cn.element-plus.org/zh-CN/component/upload.html](https://cn.element-plus.org/zh-CN/component/upload.html)

## 插槽 ^(1.0.0)

组件继承了`ElUpload`的所有插槽。

::: tip 提示
可以使用`textContent`属性`list-type`属性`drag`属性快速生成本来需要通过插槽实现的交互，具体请参考demo。
:::

## 获取实例 ^(1.0.0)

用于获取`ElUpload`实例,具体暴露的方法请参考`element-plus`文档。

```ts
const uploadRef: Ref<UploadInstance> = fieldRef.value.invoke('getElUploadRef')
```
