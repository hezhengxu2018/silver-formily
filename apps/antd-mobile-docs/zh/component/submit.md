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

继承 antd-mobile `Button` 的外观配置项（`color`、`size`、`block`、`disabled` 等），默认 `color="primary"`、`block`、`shape="rectangular"`，未传 children 时显示“提交”，请参考 [Button 官方文档](https://mobile.ant.design/zh/components/button)。

### 按钮形状

`shape` 支持 `'default' | 'rounded' | 'rectangular'`，缺省为 `rectangular`（直角）。`shape="rounded"` 开启圆角；`shape="default"` 使用 antd-mobile 普通按钮的小圆角。

在 FormButtonGroup 内，**按钮组显式设置的 shape 优先于 Submit 自身 shape**。按钮组未设置时才采用 Submit 的配置，最后回退到直角。例如 `<FormButtonGroup shape="rounded"><Submit shape="rectangular" /></FormButtonGroup>` 中的提交按钮仍为圆角。

### 提交策略

- `onSubmit` 存在：原生类型为 `button`，调用 Formily `form.submit(onSubmit)`，成功结果传给 `onSubmitSuccess`，校验失败或提交异常传给 `onSubmitFailed`。未提供失败回调时记录错误。
- `onSubmit` 不存在且 `submit` 为 `false`（默认）：原生类型为 `submit`，由外部 HTML form 处理；单独的 FormProvider 不会创建原生 form。
- `submit={true}` 且没有 `onSubmit`：原生类型为 `button`，只执行点击回调，不触发提交。
- `onClick` 返回 `false` 或调用 `event.preventDefault()`，均阻止提交。异步点击回调不能通过最终返回 false 取消浏览器默认行为，请同步调用 `preventDefault()`。
- `ref` 对应 antd-mobile `ButtonRef`，可通过 `ref.current.nativeElement` 访问原生按钮。
