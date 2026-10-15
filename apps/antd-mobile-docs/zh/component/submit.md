---
mobileDemo: submit/index.tsx
---

# Submit

> `Submit` 是提交按钮，基于 antd-mobile `Button` 实现。点击时自动触发整表校验，校验通过后回调 `onSubmit` 并拿到表单值。

## 基础使用

<<< @/zh/demos/submit/basic.tsx

## 异步提交

`onSubmit` 返回 Promise 时按钮自动进入 loading 状态（也可通过 `loading` 属性手动控制）。

<<< @/zh/demos/submit/loading.tsx

## 校验反馈

`onSubmitFailed` 在校验失败时回调，可在此给出轻提示。

<<< @/zh/demos/submit/validate.tsx

## API

### 属性

| 属性名            | 类型                                              | 描述                                   | 默认值 |
| ----------------- | ------------------------------------------------- | -------------------------------------- | ------ |
| `onSubmit`        | ^[Function]`(values: any) => any`                 | 校验通过后的提交回调                   | -      |
| `onSubmitSuccess` | ^[Function]`(payload: any) => void`               | 提交成功回调                           | -      |
| `onSubmitFailed`  | ^[Function]`(feedbacks: IFormFeedback[]) => void` | 校验失败回调                           | -      |
| `onClick`         | ^[Function]`(e: MouseEvent) => any`               | 点击回调，返回 `false` 可阻止提交      | -      |
| `loading`         | ^[boolean]                                        | 手动控制加载态，缺省时跟随表单提交状态 | -      |

继承 antd-mobile `Button` 的所有配置项（`color`、`size`、`block`、`disabled` 等），默认 `color="primary"` 与 `block`，请参考 [Button 官方文档](https://mobile.ant.design/zh/components/button)。
