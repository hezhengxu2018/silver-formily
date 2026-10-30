---
mobileDemo: form/index.tsx
---

# Form

`Form` 将 Formily 实例、预览占位符和自动提交统一封装，内部使用 [FormLayout](./form-layout) 展示表单内容，外层原生 `form` 接收提交事件。

## 基础使用

通过 `form` 传入 `createForm()` 创建的实例，无需再包裹 `FormProvider`。整体的封装逻辑与其他组件库封装保持一致。

<<< @/zh/demos/form/basic.tsx

## 继承外层实例

已有 `FormProvider` 时，可以省略 `form` 属性。显式传入的 `form` 优先于外层实例；两者都不存在时不渲染内容。

布局属性直接透传给内部 `FormLayout`，例如 `layout="vertical"`、`labelWidth` 和 `colon`。

<<< @/zh/demos/form/inherited.tsx

## 预览占位符

`previewTextPlaceholder` 为内部的 `PreviewText` 提供空值占位符。结合表单的 `readPretty` 模式使用时，没有值的输入框会显示该占位符。

<<< @/zh/demos/form/preview.tsx

## 提交约定

- 使用 `Form` 的 `onAutoSubmit` 时，内部 `Submit` 无需设置 `onSubmit` 或 `submit`，让按钮触发原生提交事件即可。
- 为 `Submit` 设置 `onSubmit` 后，该按钮会自行提交表单，并使用自身的成功、失败回调，不会触发 `Form.onAutoSubmit`。
- `onAutoSubmitFailed` 接收校验反馈数组；如果 `onAutoSubmit` 抛出异常或返回拒绝的 Promise，也会进入该回调，业务代码应按实际错误类型处理。
- `Form` 会阻止原生提交的默认行为和事件冒泡。不要将它嵌套在其他原生 `form` 或 `Form` 中。

## API

| 属性名                   | 类型                                  | 描述                                             | 默认值  |
| ------------------------ | ------------------------------------- | ------------------------------------------------ | ------- |
| `form`                   | `Form`（来自 `@silver-formily/core`） | 表单实例，省略时继承外层 FormProvider            | -       |
| `previewTextPlaceholder` | `React.ReactNode`                     | 预览组件的空值占位符                             | `'N/A'` |
| `onAutoSubmit`           | `(values: Form['values']) => any`     | 校验通过后执行，支持返回 Promise                 | -       |
| `onAutoSubmitFailed`     | `(error: IFormFeedback[]) => void`    | 提交失败回调，运行时也可能收到提交回调抛出的异常 | -       |
| `children`               | `React.ReactNode`                     | 表单内容                                         | -       |

其余属性继承 [FormLayout](./form-layout#api)，包括 `mode`、`className` 和 `style`，均传给内部布局容器。组件不提供原生 `form` 属性的透传。
