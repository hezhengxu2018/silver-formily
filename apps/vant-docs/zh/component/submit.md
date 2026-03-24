---
mobileDemo: submit/index.vue
---

# Submit

> `Submit` 是和 Formily 表单状态打通的 Vant 提交按钮，支持原生 `submit`、手动 `form.submit`、提交中 loading、成功/失败回调。

**使用约定**

- 不传 `onSubmit` 时，`Submit` 会渲染成原生 `type="submit"` 按钮，直接走上层 `Form` 的 `onAutoSubmit`
- 传入 `onSubmit` 后，`Submit` 会改为主动调用 `form.submit(onSubmit)`，同时自动跟随 `form.submitting` 展示 loading 和 disabled
- 默认会渲染为 `primary`、`round`、`block` 按钮，默认文案为 `提交`

## 基础提交

<<< @/zh/demos/submit/basic.vue

## 加载态

<<< @/zh/demos/submit/loading.vue

## API

### Submit 专属属性

其余按钮属性主要继承自 [Vant Button 官方文档（正式站）](https://vant-ui.github.io/vant/#/zh-CN/button)。

| 属性名            | 类型                                                                                               | 描述                                                 | 默认值  |
| ----------------- | -------------------------------------------------------------------------------------------------- | ---------------------------------------------------- | ------- |
| `onClick`         | `(event: MouseEvent) => void \| boolean`                                                           | 点击事件，返回 `false` 时会阻止手动提交或原生提交    | `-`     |
| `onSubmit`        | `(values: any) => Promise<any> \| any`                                                             | 主动调用 `form.submit` 的提交回调                    | `-`     |
| `onSubmitSuccess` | `(payload: any) => void`                                                                           | `onSubmit` 成功后的回调                              | `-`     |
| `onSubmitFailed`  | `(feedbacks: [IFormFeedback](https://core.formilyjs.org/api/models/form#iformfeedback)[]) => void` | `onSubmit` 校验或提交流程失败后的回调                | `-`     |
| `submit`          | `boolean`                                                                                          | 是否强制切换为手动提交模式；开启后会渲染成普通按钮态 | `false` |

### 与 Form 的配合方式

- `Form + Submit`：走原生 submit，适合统一把提交逻辑放在 `Form onAutoSubmit`
- `Form + Submit onSubmit`：由 `Submit` 自己触发 `form.submit`，适合按钮级定制成功/失败行为
- `loading`：可手动传入，也会自动叠加 `form.submitting`
- `type` / `round` / `block`：都可以显式覆盖默认值
