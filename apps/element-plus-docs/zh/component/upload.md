# Upload

> 上传组件，Upload组件经过了重构，虽然总体上与之前总体是兼容的，但是添加了很多的默认行为。具体参见API部分。

上传组件的类型可以分为两个种：一种是仅提供选择文件的功能，文件数据会在用户点击提交时随表单的From对象一起上传给后端；另一种是在提交表单之前先上传至后端（大部分情况下是提前上传至OSS），在提交表单时不提交文件的二进制信息而是获取桶内对应文件的url或者其他可以获取已上传文件的字符串。本组件对这两种行为做了不同的处理。当组件的`action`属性为`'#'`且没有配置`httpRequest`属性时会将属性当做第一种情况处理，onChange事件会在`fileList`的`status`改变时触发。当用户配置了两者中的任意一项时会当做第二种情况处理，onChange事件会在请求完成（即`fileList`中有任意一项的`response`属性发生改变）时触发。

**显示给用户看的文件列表与表单最后提交的值是分离的、是单向的**，即当`fileList`（`dataSource`）改变时会触发onChange事件（修改`Field`的`value`），但是当`value`改变时不会修改`dataSource`，这是因为大部分情况下这种改动都是单向的：用户添加删除选择的文件时从`fileList`中获取对应的`value`。只有一种情况下是例外的即表单信息的反显:在处理反显时除了需要设置`Field`的`value`外还需要自己组装组件的`fileList`（`dataSource`），具体需要将`fileList`组装到什么程度可以根据业务需要自己决定。

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

1. 现在组件的`fileList`属性现在会映射为`Field`的`dataSource`属性，而不是之前的`value`属性，当`dataSource`（即`fileList`）改变时会触发onChange事件，`value`会经过`formatValue`函数处理。

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

`onChange`事件与`onUpdate:fileList`事件被占用，请勿使用。其余属性与事件请参考 [https://cn.element-plus.org/zh-CN/component/upload.html](https://cn.element-plus.org/zh-CN/component/upload.html)

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
