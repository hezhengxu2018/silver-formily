---
mobileDemo: create-popup/index.tsx
---

# createPopup

创建可复用的函数式弹层，通过 `prompt(props)` 打开并等待结果。确认返回业务值，取消返回 `null`，正常取消无需 `try/catch`。

## 选择主题色

<<< @/zh/demos/create-popup/basic.tsx

## 动态参数与主动关闭

每次新会话直接传入当前属性。`closeOnMaskClick: false` 禁止遮罩取消；内容仍可取消，也可调用 `close()` 主动关闭。

<<< @/zh/demos/create-popup/lifecycle.tsx

## React children

直接传入内容组件的 `children`，不需要插槽协议。

<<< @/zh/demos/create-popup/children.tsx

## API

```tsx
const popup = createPopup(Content, { position: 'bottom' })
const result = await popup.prompt({
  defaultValue: currentValue,
  onConfirm: value => console.log(value),
  onCancel: () => console.log('取消'),
  onClose: () => console.log('关闭'),
})
if (result !== null)
  setValue(result)
popup.close()
```

`createPopup(Content, options?)` 不操作 DOM。内容属性与结果类型从组件推导，也可使用 `createPopup<typeof Content, Result>(Content, options)` 显式指定。

`prompt(props)` 的业务必填属性仍为必填，另外接受可选的 `onConfirm(value)`、`onCancel()`、`onClose()` 通知回调。无业务属性时传 `{}`。回调不支持异步阻止关闭；即使回调抛错，会话仍会结束和清理，异常继续向调用方传播。

内容组件通过以下类型声明工厂注入的回调：

```ts
interface PopupContentCallbacks<TResult> {
  onConfirm: (value: Exclude<TResult, null>) => void
  onCancel: () => void
}
```

`null` 专用于取消，不作为业务确认值。通用弹层不管理业务 `value`；选择类内容推荐用 `defaultValue` 初始化自己的草稿状态。

### 行为与回调

| 操作                | 回调顺序                         | Promise 结果 |
| ------------------- | -------------------------------- | ------------ |
| 内容确认            | `onConfirm(value)` → `onClose()` | 业务值       |
| 内容取消 / 遮罩取消 | `onCancel()` → `onClose()`       | `null`       |
| 主动 `close()`      | `onClose()`                      | `null`       |
| 关闭动画结束        | `afterClose()`，随后清理挂载资源 | 已完成       |

`close()` 没有原因参数，空闲时调用无效果。工厂组合观察回调与内部逻辑，用户回调不会覆盖会话管理。

### 外层 Popup 配置

第二个参数使用 [antd-mobile Popup](https://mobile.ant.design/zh/components/popup) 配置，默认 `position: 'bottom'`、`closeOnMaskClick: true`、`safeArea: true`、`getContainer: null`。

`visible`、`children`、`onMaskClick`、外层 `onClose`、`forceRender`、`destroyOnClose` 由工厂统一管理，不开放配置。`afterShow` 和 `afterClose` 放在第二个参数中；关闭按钮或滑动关闭按取消处理。其他属性正常透传。内容属性和外层配置相互独立。

### 会话与资源

- 同一工厂在活动会话中重复调用 `prompt()`，返回同一个 Promise，忽略新属性与新回调。这与原生 `Picker.prompt` 每次创建独立弹层不同。
- 确认或取消立即完成 Promise，随后完成关闭动画。动画期间可打开新会话，旧实例不会关闭或卸载新实例。
- 每次新会话重新初始化内容；动画结束后卸载 React root 并移除宿主节点。
- 独立 React root 不会继承调用位置的 Context。需要 Formily 或其他 Provider 时，在内容组件内部显式包裹。
- 不再支持旧签名、`open`、`onFinish`、属性 getter 或 `slots`。

::: warning Picker 迁移状态
现有 Picker 封装尚未迁移，仍依赖旧接口，因此暂时不可用且会导致类型检查失败。本次仅更新 createPopup，Picker 将在后续单独重构。
:::
