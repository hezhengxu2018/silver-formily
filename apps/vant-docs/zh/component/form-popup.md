---
mobileDemo: form-popup/index.vue
---

# FormPopup

> `FormPopup` 基于 Vant `Popup` 组件补齐 `createForm`、`FormProvider`、默认按钮区和提交态处理，让移动端也能用接近 `FormDialog` / `FormDrawer` 的心智打开一整个表单。

## 基础表单弹层

<<< @/zh/demos/form-popup/basic.vue

## 作用域插槽与 middleware

<<< @/zh/demos/form-popup/middleware.vue

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
  .forSaveDraft(form => ({ type: 'draft', values: form.values }))
  .open({
    values: initialValues,
  })
```

### 使用约定

- `FormPopup` 打开时会基于 `open()` 参数创建新的 `form` 实例
- 默认确认结果是 `toJS(form.values)`；如果 `forConfirm` 或动态 middleware 返回非 `undefined`，则以 middleware 返回值为准
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

| 属性名              | 类型                   | 说明                 | 默认值   |
| ------------------- | ---------------------- | -------------------- | -------- |
| `title`             | `string`               | 默认头部标题         | `-`      |
| `cancelText`        | `string`               | 默认取消按钮文案     | `'取消'` |
| `okText`            | `string`               | 默认确认按钮文案     | `'确定'` |
| `cancelButtonProps` | `Partial<ButtonProps>` | 默认取消按钮属性透传 | `-`      |
| `okButtonProps`     | `Partial<ButtonProps>` | 默认确认按钮属性透传 | `-`      |

### 作用域插槽参数

- `form`: `Form<TValues>`，当前表单实例
- `resolve`: `(type?: string) => void`，提交当前表单并进入确认链路
- `reject`: `() => void`，取消并进入 cancel 链路
- `saveDraft` 等：`() => void`，传入 `dynamicMiddlewareNames` 后自动注入的动态动作

### 实例方法

- `open`: `(props?: IFormProps<TValues>) => Promise<any>`，打开弹层并创建表单
- `close`: `() => void`，从外部关闭弹层，行为等同于取消
- `forOpen`: `(middleware) => popup`，打开前调整 `createForm` 参数
- `forConfirm`: `(middleware) => popup`，改写默认确认返回值
- `forCancel`: `(middleware) => popup`，处理取消链路副作用
- `forXxx`: `(middleware) => popup`，处理 `saveDraft()` 等动态动作命中的链路

### 默认 Popup 配置

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

### 参考

- [Vant Popup 官方文档（正式站）](https://vant-ui.github.io/vant/#/zh-CN/popup)
