---
mobileDemo: form-popup/index.tsx
---

# FormPopup 表单弹层

函数式创建带表单上下文的 antd-mobile Popup。调用方式参考 Vant 的 FormPopup，确认前自动校验，通过 Promise 获取提交结果。

## 基础表单弹层

编辑联系人姓名和电话，保存后默认返回 `form.values`。

<<< @/zh/demos/form-popup/basic.tsx

## 自定义头尾与 middleware

通过 `header` / `footer` 接管头尾区域。发布时执行异步确认中间件，保存草稿时通过 `saveDraft()` 触发动态中间件。自定义操作组件使用 `observer` 跟随 `form.submitting` 更新加载与禁用状态。

<<< @/zh/demos/form-popup/middleware.tsx

## 打开前异步加载

`forOpen` 支持返回 Promise 的中间件。执行超过 100ms 时自动展示 Loading，并阻止点击背景；完成后关闭 Loading，再展示表单。快速完成时不会闪烁，中间件失败或等待期间调用 `close()` 也会清理 Loading。

通过 `loadingText` 自定义提示文案，默认是 `'Loading...'`。下面模拟 1.5 秒的数据请求，并将结果作为表单初始值。

<<< @/zh/demos/form-popup/loading.tsx

## 提交 Loading

点击“保存”并通过校验后，`forConfirm` 模拟 2 秒的异步提交。等待期间，默认确认按钮跟随 `form.submitting` 显示 Loading，取消按钮禁用；提交完成后关闭弹层并展示提交结果。清空必填项再保存，可以观察校验失败时弹层保持打开。

请在 `forConfirm` 中 `await` 或返回提交请求的 Promise，才能让 Loading 覆盖整个请求过程。默认按钮区已处理提交状态，无需手动设置 `loading`。

<<< @/zh/demos/form-popup/submit-loading.tsx

## Picker 风格头部

将取消和确定放在头部，通过 `footer: () => null` 和局部样式隐藏默认底部区域。必填项校验失败时保持弹层打开。

<<< @/zh/demos/form-popup/picker-like.tsx

## API

```tsx
const popup = FormPopup('编辑', ({ form, resolve, reject }) => (
  <Content />
))
const values = await popup.open({ initialValues: { name: 'Silver' } })
popup.close()
```

`FormPopup(props | title, content?, dynamicMiddlewareNames?)` 返回可复用控制器，创建时不操作 DOM。内容支持 React 元素、组件或渲染函数，也可传入 `{ header, default, footer }` 渲染函数对象；各函数均收到 `{ form, resolve, reject }`。内容已包裹 `FormProvider`，可直接使用 `Field`、`SchemaField`、`useForm()`；自定义区域也可访问表单上下文。

### 弹层属性

`IFormPopupProps` 继承 [antd-mobile Popup](https://mobile.ant.design/zh/components/popup) 属性，`visible`、`children`、`forceRender`、`destroyOnClose` 由封装管理。默认底部弹出，禁止点击遮罩关闭，启用底部安全区。

| 属性                                  | 说明                                                    |
| ------------------------------------- | ------------------------------------------------------- |
| `loadingText`                         | 打开前异步加载提示文案，默认 `'Loading...'`             |
| `title`                               | 默认头部内容，支持 ReactNode                            |
| `okText` / `cancelText`               | 按钮文案，默认「确定」/「取消」                         |
| `okButtonProps` / `cancelButtonProps` | antd-mobile Button 属性；点击行为和按钮 type 由封装管理 |
| `safeArea`                            | 是否显示底部安全区，默认 true                           |

`header` 替换标题，`footer` 替换默认按钮。默认确认按钮在提交时显示 loading，取消按钮在提交时禁用。自定义按钮需自行处理 `form.submitting`。

### 控制器与中间件

- `open(props?)`：传入 core 的 `IFormProps`，每次创建新表单；活动会话中重复调用返回同一个 Promise。
- `close()` / `reject()`：取消，执行取消中间件后以 `Error('cancel')` 拒绝 Promise。调用方应捕获取消异常。
- `resolve(type?)`：校验通过后执行确认中间件；校验失败保持弹层打开，允许修改后重新提交。
- `forOpen(middleware)`：打开前处理表单参数。
- `forConfirm(middleware)`：校验后处理 Form，默认返回表单值；中间件可返回其他提交结果。
- `forCancel(middleware)`：取消时处理 Form。

中间件签名为 `(payload, next) => result`，支持异步、`next()` 和 `next(nextPayload)`。未返回值时使用默认结果。打开、确认或取消中间件抛错会拒绝 `open()` 的 Promise 并清理弹层。

```tsx
const popup = FormPopup('编辑', {
  default: () => <Content />,
  footer: ({ saveDraft }) => (
    <Button onClick={saveDraft}>保存草稿</Button>
  ),
}, ['save-draft'])
  .forOpen(props => ({ ...props, validateFirst: true }))
  .forSaveDraft(async (form, next) => {
    await saveDraft(form.values)
    return next(form)
  })
```

动态名称规范化为 camelCase（`save-draft` → `saveDraft`），生成 `forSaveDraft` 和内容回调中的 `saveDraft()`。动态动作同样先校验，完成后返回表单值；保留名称 `open`、`confirm`、`cancel`、`form`、`resolve`、`reject` 不可用。

确认或取消完成 Promise 后播放关闭动画，动画结束卸载 React root。可以立即打开新会话，旧回调不会影响新会话。打开中间件等待期间调用 `close()` 也会取消，并阻止延迟挂载。提交或取消中间件执行期间忽略重复操作。

每个弹层使用独立 React root，不继承调用位置的其他 Context；业务 Provider 请在内容中显式包裹。
