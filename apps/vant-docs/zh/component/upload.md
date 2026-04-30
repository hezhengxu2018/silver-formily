---
mobileDemo: upload/index.vue
---

# Upload

> `Upload` 基于 Vant `Uploader` 做了一层 Formily 适配。上传行为遵循 Vant 语义：在 `afterRead` 中自行处理请求和文件状态。

:::tip 设计重点

- 编辑态里展示给用户看的文件列表，统一走 `fileList`，并映射到字段 `dataSource`
- 表单真正提交的值，统一走 `formatValue(fileList)` 的返回结果
- `Upload` 不内置 `action/httpRequest` 请求层；上传、失败文案、响应映射都建议在 Vant 的 `afterRead` 回调里完成
  :::

## 基础使用

组件负责选文件和维护文件列表，适合跟随整个表单一起提交二进制数据的场景。

<<< @/zh/demos/upload/basic.vue

## 自动上传

在 `afterRead` 中自行发起请求，并按 Vant 的文件项格式写回 `status / message / url`。

当前文档站示例使用 Cloudflare Pages Functions 提供空上传接口：`POST /mock/upload`（仅解析请求并返回 mock URL，不落盘文件）。

<<< @/zh/demos/upload/async-upload.vue

## 阅读态

`readPretty` 模式下会切到 `PreviewText.Upload`，常见的文件名、URL 数组和对象数组都能直接展示。

<<< @/zh/demos/upload/read-pretty.vue

## API

### 使用约定

- `fileList` 会映射为字段 `dataSource`
- 字段 `value` 由 `formatValue(fileList)` 单向计算得出，不会反向推导出 `fileList`
- 当 `maxCount = 1` 且未显式传 `reupload` 时，组件会默认打开 `reupload`，更贴近单文件替换场景

### 扩展属性

| 属性名        | 类型                                                                               | 描述                                              | 默认值                 |
| ------------- | ---------------------------------------------------------------------------------- | ------------------------------------------------- | ---------------------- |
| `modelValue`  | `any`                                                                              | 字段最终值，由 `formatValue(fileList)` 单向生成   | `-`                    |
| `formatValue` | ^[Function]`(fileList?: UploadFileListItem[]) => any`                              | 把文件列表转换成字段最终值                        | `fileList => fileList` |
| `fileList`    | `UploadFileListItem[]`                                                             | 当前文件列表，对应字段 `dataSource`，用于预览展示 | `[]`                   |
| `previewFile` | ^[Function]`(file: UploadFileListItem, context: UploadPreviewFileContext) => void` | 阅读态下点击预览项时的自定义打开逻辑              | `-`                    |

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

除上面的扩展属性外，其余属性、插槽和事件都继续遵循 Vant `Uploader` 语义，例如 `accept`、`maxCount`、`uploadText`、`afterRead`、`beforeRead`、`previewImage`、`oversize`、`delete`、`clickPreview` 等。
