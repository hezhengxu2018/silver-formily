# Upload

> Upload component. It has been refactored to stay broadly compatible with the previous version while adding many default behaviors. See the API section for details.

Upload behavior can be divided into two broad categories.

The first only provides file selection. File binaries are uploaded to the backend together with the Formily `Form` values when the user submits the form.

The second uploads files before the form is submitted, which is the more common case in practice, such as uploading to OSS in advance. In this mode, form submission does not send file binaries directly. Instead, it submits strings such as URLs or other backend identifiers that reference the uploaded files.

This component handles those two flows differently. When `action` is `'#'` and `httpRequest` is not configured, it is treated as the first mode. In that case, `onChange` is triggered when the `status` of items in `fileList` changes.

When either `action` or `httpRequest` is configured, it is treated as the second mode. In that case, `onChange` is triggered after the request completes, which means when the `response` field of any item in `fileList` changes.

**The file list shown to the user and the final value submitted by the form are intentionally separated and flow in one direction only.** When `fileList` (`dataSource`) changes, `onChange` is triggered to update `Field.value`. But when `value` changes, `dataSource` is not updated automatically. That design matches most business cases: users add or remove files from `fileList`, and the final submitted `value` is derived from it.

The main exception is form rehydration. When restoring existing data, setting `Field.value` is not enough. You also need to construct the component's `fileList` (`dataSource`) yourself. How much detail you include in that `fileList` depends on your actual business needs.

## Markup Schema Example

:::demo

../../en/demos/upload/markup-schema

:::

## JSON Schema Example

:::demo

../../en/demos/upload/json-schema

:::

## Template Example

:::demo

../../en/demos/upload/template

:::

## API

## Props

::: tip Tip

1. The component now maps `fileList` to `Field.dataSource` instead of `Field.value`. When `dataSource` changes, it triggers `onChange`, and `value` is produced through `formatValue`.
2. When `limit` is `1`, the previous file is automatically replaced. This behavior is built in and cannot be overridden.
3. If `accept` contains the string `image` and an item in `fileList` provides a `url`, image preview is enabled automatically. If you want to disable that behavior, set `onPreview` to an empty function.

:::

| Prop                        | Description                                                                                | Type                                          | Default                                    |
| --------------------------- | ------------------------------------------------------------------------------------------ | --------------------------------------------- | ------------------------------------------ |
| `textContent`               | Text displayed on the upload button. Placement varies by upload mode.                      | `string`                                      | `''`                                       |
| `errorAdaptor`              | Error adapter used to customize how error messages are shown                               | ^[Function]`(error?: Error) => string`        | `error => error?.message`                  |
| `formatValue` ^(1.0.0)      | Formatter that converts the file list into the final value submitted by the form           | ^[Function]`(fileList?: UploadFile[]) => any` | `fileList => fileList`                     |
| `fileList` ^(1.0.0)         | File list, mapped to `dataSource` and forwarded to `ElUpload.fileList`                     | ^[array]`UploadFile[]`                        | `[]`                                       |
| `imageViewerProps` ^(1.0.0) | Props for the image viewer, used to customize image preview behavior when uploading images | ^[object]`ImageViewerProps`                   | `{ teleported: true, showProgress: true }` |

`onChange` and `onUpdate:fileList` are reserved and should not be used directly. For all other props and events, see [https://element-plus.org/en-US/component/upload.html](https://element-plus.org/en-US/component/upload.html)

## Slots ^(1.0.0)

The component inherits every slot from `ElUpload`.

::: tip Tip
You can use `textContent`, `list-type`, and `drag` to generate interactions that would otherwise require slots. See the demos for concrete examples.
:::

## Get Instance Example ^(1.0.0)

Used to access the `ElUpload` instance. For exposed methods, see the Element Plus documentation.

```ts
const uploadRef: Ref<UploadInstance> = fieldRef.value.invoke('getElUploadRef')
```
