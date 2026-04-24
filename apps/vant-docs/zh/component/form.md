---
mobileDemo: form/index.vue
---

# Form

> `Form` 是 Vant 端的轻量表单容器，负责承接 Formily 的提交与预览态，同时给内部 `FormItem` 提供统一的布局上下文。

:::tip 提示
这里没有直接复用 Vant 原生 `Form` 的校验流程，而是保留 Formily 作为唯一校验入口。`Form` 主要负责承接 `form.submit()` / `onAutoSubmit`，并给内部 `FormItem` 透传 `labelWidth`、`labelAlign`、`inputAlign` 等布局属性。
:::

## 基础使用

<<< @/zh/demos/form/basic.vue

## 统一标签冒号

<<< @/zh/demos/form/colon.vue

## 标签对齐

<<< @/zh/demos/form/label-align.vue

## 输入对齐

<<< @/zh/demos/form/input-align.vue

## 错误样式开关

<<< @/zh/demos/form/show-error.vue

## 错误文案开关

<<< @/zh/demos/form/show-error-message.vue

## 错误文案对齐

<<< @/zh/demos/form/error-message-align.vue

## 禁用与只读

<<< @/zh/demos/form/disabled-readonly.vue

## Formily 实例切换状态

<<< @/zh/demos/form/formily-instance.vue

## 自动滚动到错误项

<<< @/zh/demos/form/scroll-to-error.vue

## API

### Form 专属属性

| 属性名                  | 类型                                               | 描述                                            | 默认值  |
| ----------------------- | -------------------------------------------------- | ----------------------------------------------- | ------- |
| `form`                  | `Form`                                             | 显式传入 Formily form 实例                      | `-`     |
| `onAutoSubmit`          | ^[Function]`(values: Record<string, any>) => any`  | 原生 `submit` 时触发 Formily `submit` 成功      | `-`     |
| `onAutoSubmitFailed`    | ^[Function]`(error: unknown) => void`              | 原生 `submit` 时触发 Formily `submit` 失败      | `-`     |
| `scrollToError`         | `boolean`                                          | 提交失败时是否自动滚动到第一个错误项            | `false` |
| `scrollToErrorPosition` | ^[enum]`'start' \| 'center' \| 'end' \| 'nearest'` | 自动滚动时传给 `scrollIntoView` 的 `block` 位置 | `-`     |

> Formily 校验失败时的 feedbacks 类型参考 [IFormFeedback](https://core.formilyjs.org/api/models/form#iformfeedback)；如果 `onAutoSubmit` 自身抛错，则会原样传给 `onAutoSubmitFailed`。

### 继承给 FormItem 的布局属性

下列属性会作为表单级默认值透传给内部 `FormItem`，单个 `FormItem` 上显式传值时会覆盖表单级配置。对于 `disabled` 和 `readonly`，如果 `Form` 组件自身没有显式传值，还会继续回退读取传入的 Formily `form.disabled` / `form.readOnly`。

| 属性名              | 类型                                            | 描述               | 默认值  |
| ------------------- | ----------------------------------------------- | ------------------ | ------- |
| `colon`             | `boolean`                                       | 标签后是否展示冒号 | `-`     |
| `disabled`          | `boolean`                                       | 是否整体禁用       | `-`     |
| `readonly`          | `boolean`                                       | 是否整体只读       | `-`     |
| `required`          | `boolean`                                       | 是否整体展示必填态 | `-`     |
| `labelWidth`        | `number` \| `string`                            | 统一标签宽度       | `-`     |
| `labelAlign`        | ^[enum]`'left' \| 'center' \| 'right' \| 'top'` | 统一标签对齐       | `-`     |
| `inputAlign`        | ^[enum]`'left' \| 'center' \| 'right'`          | 统一输入区域对齐   | `-`     |
| `errorMessageAlign` | ^[enum]`'left' \| 'center' \| 'right' \| 'top'` | 统一错误文案对齐   | `-`     |
| `showError`         | `boolean`                                       | 是否统一展示错误态 | `false` |
| `showErrorMessage`  | `boolean`                                       | 是否展示错误文案   | `true`  |
