---
mobileDemo: upload/index.vue
---

# Upload

> `Upload` 基于 Vant `Uploader` 做了一层 Formily 适配，延续了 `element-plus` 版本里“`fileList/dataSource` 负责展示，`formatValue` 负责最终字段值”的设计。

:::tip 设计重点

- 编辑态里展示给用户看的文件列表，统一走 `fileList`，并映射到字段 `dataSource`
- 表单真正提交的值，统一走 `formatValue(fileList)` 的返回结果
- 配置 `action` 或 `httpRequest` 时，会进入自动上传模式；字段值会等上传成功后再同步，避免把未完成文件直接提交出去
  :::

## 基础使用

不传 `action` / `httpRequest` 时，组件只负责选文件和维护文件列表，适合跟随整个表单一起提交二进制数据的场景。

<<< @/zh/demos/upload/basic.vue

## 自动上传

配置 `action` 或 `httpRequest` 后，组件会在 `afterRead` 后自动把文件状态切到 `uploading`，成功后写回 `url / response / status`。

当前文档站示例使用 Cloudflare Pages Functions 提供空上传接口：`POST /mock/upload`（仅解析请求并返回 mock URL，不落盘文件）。

本地联调时如果希望请求已部署环境，可设置 `VITE_UPLOAD_API_BASE`（例如 `https://your-docs-domain.com`），示例会自动改为请求 `${VITE_UPLOAD_API_BASE}/mock/upload`。

<<< @/zh/demos/upload/async-upload.vue

## 阅读态

`readPretty` 模式下会切到 `PreviewText.Upload`，常见的文件名、URL 数组和对象数组都能直接展示。

<<< @/zh/demos/upload/read-pretty.vue

## API

### 使用约定

- `fileList` 会映射为字段 `dataSource`
- 字段 `value` 由 `formatValue(fileList)` 单向计算得出，不会反向推导出 `fileList`
- 如果需要“编辑态回显”，除了字段值本身，还需要同时准备 `dataSource/fileList`
- 当 `maxCount = 1` 且未显式传 `reupload` 时，组件会默认打开 `reupload`，更贴近单文件替换场景

### 扩展属性

| 属性名            | 类型                                                                           | 描述                                         | 默认值                                  |
| ----------------- | ------------------------------------------------------------------------------ | -------------------------------------------- | --------------------------------------- |
| `textContent`     | `string`                                                                       | 默认上传按钮文案，会透传为 `uploadText`      | `''`                                    |
| `formatValue`     | ^[Function]`(fileList?: UploadFileListItem[]) => any`                          | 把文件列表转换成字段最终值                   | `fileList => fileList`                  |
| `fileList`        | `UploadFileListItem[]`                                                         | 当前文件列表，对应字段 `dataSource`          | `[]`                                    |
| `errorAdaptor`    | ^[Function]`(error?: Error) => string`                                         | 上传失败时的错误文案适配器                   | `error => error?.message ?? '上传失败'` |
| `action`          | `string`                                                                       | 自动上传地址；为空或 `'#'` 时不会自动请求    | `''`                                    |
| `method`          | `string`                                                                       | 自动上传请求方法                             | `'POST'`                                |
| `data`            | `Record<string, any> \| FormData \| ^[Function]`(file, item) => data`          | 自动上传时附带的额外表单数据                 | `-`                                     |
| `headers`         | `HeadersInit \| ^[Function]`(file, item) => headers`                           | 自动上传请求头                               | `-`                                     |
| `withCredentials` | `boolean`                                                                      | 是否携带凭证                                 | `false`                                 |
| `httpRequest`     | ^[Function]`(options: UploadRequestOptions) => Promise<any> \| any`            | 自定义上传实现；返回值会写到 `file.response` | `-`                                     |
| `responseAdaptor` | ^[Function]`(response, item) => string \| Partial<UploadFileListItem> \| void` | 自定义把上传响应映射回文件项                 | `-`                                     |

其余属性可以参考[Vant Uploader 官方文档](https://vant-ui.github.io/vant/#/zh-CN/uploader)

### 字段注入

可以通过字段实例拿到内部 `Uploader` 引用：

```ts
const uploaderRef = fieldRef.value?.invoke('getUploaderRef')

uploaderRef?.value?.chooseFile()
uploaderRef?.value?.reuploadFile(0)
uploaderRef?.value?.closeImagePreview()
```

### 官方透传属性与事件

除上面的扩展属性外，其余属性、插槽和事件都继续遵循 Vant `Uploader` 语义，例如 `accept`、`maxCount`、`previewImage`、`oversize`、`delete`、`clickPreview` 等。
