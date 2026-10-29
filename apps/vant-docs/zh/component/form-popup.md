---
mobileDemo: form-popup/index.vue
---

# FormPopup

> `FormPopup` 基于 Vant `Popup` 组件补齐 `createForm`、`FormProvider`、默认按钮区和提交态处理，让移动端也能用接近 `FormDialog` / `FormDrawer` 的心智打开一整个表单。

## 基础表单弹层

<<< @/zh/demos/form-popup/basic.vue

## 作用域插槽与 middleware

<<< @/zh/demos/form-popup/middleware.vue

## 打开前异步加载

`forOpen` 支持返回 Promise 的中间件。执行超过 100ms 时自动展示 Loading，并阻止点击背景；完成后关闭 Loading，再展示表单。快速完成时不会闪烁，中间件失败或等待期间调用 `close()` 也会清理 Loading。

通过 `loadingText` 自定义提示文案，默认是 `'Loading...'`。下面模拟 1.5 秒的数据请求，并将结果作为表单初始值。

<<< @/zh/demos/form-popup/loading.vue

## 提交 Loading

点击“保存”并通过校验后，`forConfirm` 模拟 2 秒的异步提交。等待期间，默认确认按钮跟随 `form.submitting` 显示 Loading，取消按钮禁用；提交完成后关闭弹层并展示提交结果。清空必填项再保存，可以观察校验失败时弹层保持打开。

请在 `forConfirm` 中 `await` 或返回提交请求的 Promise，才能让 Loading 覆盖整个请求过程。默认按钮区已处理提交状态，无需手动设置 `loading`。

<<< @/zh/demos/form-popup/submit-loading.vue

## Picker 风格头部

<<< @/zh/demos/form-popup/picker-like.vue

## API

### FormPopup

```ts
const popup = FormPopup<TValues, ['save-draft']>(
  popupProps,
  {
    header: ({ form, resolve, reject }) => VNode,
    default: ({ form, resolve, reject }) => VNode,
    footer: ({ form, resolve, reject, saveDraft }) => VNode,
  },
  ['save-draft'] as const,
)

const result = await popup
  .forOpen(formProps => formProps)
  .forConfirm(form => form.values)
  .forCancel(form => form)
  .forSaveDraft(async (form) => {
    await saveDraft(form.values)
  })
  .open({
    values: initialValues,
  })
```

### 使用约定

- `FormPopup` 打开时会基于 `open()` 参数创建新的 `form` 实例
- 默认确认结果是 `toJS(form.values)`；如果 `forConfirm` 返回非 `undefined`，则以 middleware 返回值为准
- 动态 middleware 命中后会返回当前 `toJS(form.values)`，与 Element Plus 封装保持一致
- 传入 `dynamicMiddlewareNames` 后，会在作用域插槽参数上额外注入同名 camelCase 方法，例如 `saveDraft()`
- 默认底部会渲染“取消 / 确定”按钮，并让确定按钮跟随 `form.submitting` 自动进入 loading
- 默认 `closeOnClickOverlay` 是 `false`，避免移动端误触导致表单内容丢失

### 构造参数

| 参数名                   | 类型                       | 说明                                                      |
| ------------------------ | -------------------------- | --------------------------------------------------------- |
| `popupProps`             | `FormPopupProps \| string` | 传字符串时会自动映射成 `{ title }`                        |
| `content`                | `Component \| slots`       | 表单内容；支持 `header` / `default` / `footer` 作用域插槽 |
| `dynamicMiddlewareNames` | `readonly string[]`        | 动态链路名称，例如 `['save-draft'] as const`              |

### FormPopupProps 补充属性

除了官方 `Popup` 属性外，`FormPopup` 还固定支持以下壳层配置：

| 属性名              | 类型                   | 说明                   | 默认值         |
| ------------------- | ---------------------- | ---------------------- | -------------- |
| `loadingText`       | `string`               | 打开前异步加载提示文案 | `'Loading...'` |
| `title`             | `string`               | 默认头部标题           | `-`            |
| `cancelText`        | `string`               | 默认取消按钮文案       | `'取消'`       |
| `okText`            | `string`               | 默认确认按钮文案       | `'确定'`       |
| `cancelButtonProps` | `Partial<ButtonProps>` | 默认取消按钮属性透传   | `-`            |
| `okButtonProps`     | `Partial<ButtonProps>` | 默认确认按钮属性透传   | `-`            |

#### FormPopupProps 默认值

| 属性名                | 默认值     |
| --------------------- | ---------- |
| `position`            | `'bottom'` |
| `round`               | `true`     |
| `overlay`             | `true`     |
| `lockScroll`          | `true`     |
| `lazyRender`          | `true`     |
| `closeOnPopstate`     | `true`     |
| `closeOnClickOverlay` | `false`    |
| `safeAreaInsetBottom` | `true`     |

其余配置项可参考 [Vant Popup 官方文档](https://vant-ui.github.io/vant/#/zh-CN/popup)

### 作用域插槽参数

| 参数名         | 类型                      | 说明                                               |
| -------------- | ------------------------- | -------------------------------------------------- |
| `form`         | `Form<TValues>`           | 当前表单实例                                       |
| `resolve`      | `(type?: string) => void` | 提交当前表单并进入确认链路                         |
| `reject`       | `() => void`              | 取消并进入 cancel 链路                             |
| `saveDraft` 等 | `() => void`              | 传入 `dynamicMiddlewareNames` 后自动注入的动态动作 |

### 实例方法

| 方法名       | 类型                                            | 说明                                    |
| ------------ | ----------------------------------------------- | --------------------------------------- |
| `open`       | `(props?: IFormProps<TValues>) => Promise<any>` | 打开弹层并创建表单                      |
| `close`      | `() => void`                                    | 从外部关闭弹层，行为等同于取消          |
| `forOpen`    | `(middleware) => popup`                         | 打开前调整 `createForm` 参数            |
| `forConfirm` | `(middleware) => popup`                         | 改写默认确认返回值                      |
| `forCancel`  | `(middleware) => popup`                         | 处理取消链路副作用                      |
| `forXxx`     | `(middleware) => popup`                         | 处理 `saveDraft()` 等动态动作命中的链路 |
