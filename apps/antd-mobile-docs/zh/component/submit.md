---
mobileDemo: submit/index.tsx
---

# Submit

> `Submit` 是提交按钮，基于 antd-mobile `Button` 实现。传入 `onSubmit` 时，点击触发整表校验，校验通过后回调并拿到表单值；未传时使用原生表单提交。

## 基础使用

<<< @/zh/demos/submit/basic.tsx

## 异步提交

`onSubmit` 返回 Promise 时按钮自动进入 loading 状态；也可通过 `loading={true}` 开启加载态。实际加载状态为 `form.submitting || loading`，加载期间禁用按钮，`loading={false}` 不会关闭表单正在提交的状态。

<<< @/zh/demos/submit/loading.tsx

## 校验反馈

`onSubmitFailed` 在校验失败时回调，可在此给出轻提示。

<<< @/zh/demos/submit/validate.tsx

## API

### 属性

| 属性名            | 类型                                              | 描述                              | 默认值 |
| ----------------- | ------------------------------------------------- | --------------------------------- | ------ |
| `onSubmit`        | ^[Function]`(values: any) => any`                 | 校验通过后的提交回调              | -      |
| `onSubmitSuccess` | ^[Function]`(payload: any) => void`               | 提交成功回调                      | -      |
| `onSubmitFailed`  | ^[Function]`(feedbacks: IFormFeedback[]) => void` | 校验失败回调                      | -      |
| `onClick`         | ^[Function]`(e: MouseEvent) => any`               | 点击回调，返回 `false` 可阻止提交 | -      |
| `loading`         | ^[boolean]                                        | 与表单提交状态合并，加载期间禁用  | -      |

继承 antd-mobile `Button` 的外观配置项，请参考 [Button 官方文档](https://mobile.ant.design/zh/components/button)。
