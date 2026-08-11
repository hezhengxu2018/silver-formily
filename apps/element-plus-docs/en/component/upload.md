# Upload

> Upload component. It has been refactored to stay broadly compatible with the previous version while adding many default behaviors. See the API section for details.

Upload behavior can be divided into two broad categories.

The first only provides file selection. File binaries are uploaded to the backend together with the Formily `Form` values when the user submits the form.

The second uploads files before the form is submitted, which is the more common case in practice, such as uploading to OSS in advance. In this mode, form submission does not send file binaries directly. Instead, it submits strings such as URLs or other backend identifiers that reference the uploaded files.

The upload behavior itself is controlled by Element Plus Upload props such as `action` and `httpRequest`.

**The file list shown to the user and the final value submitted by the form are intentionally separated and converted in one direction only.** When ElUpload's file list changes, the component synchronizes the latest list to `Field.dataSource`, transforms it with `formatValue`, and emits `update:modelValue` to update `Field.value`. Changes to `Field.value` do not update `Field.dataSource` in the opposite direction.

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

1. The component maps `fileList` to `Field.dataSource` instead of `Field.value`. When `dataSource` changes, it produces the form value with `formatValue` and updates `Field.value` through `update:modelValue`.
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

`onChange` and `onUpdate:fileList` are consumed internally and are not forwarded. Do not use them directly. For all other props and events, see [https://element-plus.org/en-US/component/upload.html](https://element-plus.org/en-US/component/upload.html)

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
