---
mobileDemo: create-popup/index.vue
---

# createPopup

> `createPopup` 是一个轻量的 Vant `Popup` 工厂函数。

`createPopup` 函数是当前封装库内所有弹出式选择器的统一抽象，和 `FormPopup` 不同，他返回的是一个值，而不是一个表单，没有 `formily` 相关的逻辑。但是使用的心智（函数入参的设计）还是靠近 `FormPopup` 的。

这里选择将这个函数暴露出来是因为自定义封装的业务组件也有很高的概率需要使用弹出层，在封装自定义组件时只要 `emit` 了 `confirm` 或者 `finish` 事件（因为 Vant 的组件有这两种）就能很方便的将弹出式组件接入表单。用户可以不用再关心显示隐藏的值绑定以及 `modelValue` 的值绑定，只需要关心这个函数返回的 `Promise` 的 `resolve` 的值即可。若用户取消、点击遮罩关闭或 popup 主动关闭，则统一 `reject(new Error('cancel'))`。

从当前版本开始，`open` 不只支持传静态 props 对象，也支持传 `reactive`、`ref`、`computed` 或 getter。弹层打开期间，如果外部 props source 发生变化，`createPopup` 会自动把最新 props 同步给当前内容组件；同时，当前会话里通过 `update:modelValue` 产生的临时值会被保留，不会被后续的外部 source 更新直接冲掉。

::: warning 注意
open方法的入参。有些props或者事件是内部保留的，无法修改或覆盖：`show`、`onUpdate:show`、`onConfirm`、`onFinish`、`onCancel`、`onUpdate:modelValue`
:::

## 最小自定义组件

下面的示例会复用同一个内容组件，分别演示 `closeOnClickOverlay`、`style.height` 和 `lockScroll` 这些 `Popup` 壳层参数的传入方式。

<<< @/zh/demos/create-popup/basic.vue

## 包装官方 Picker

<<< @/zh/demos/create-popup/picker.vue

## 包装官方 DatePicker

<<< @/zh/demos/create-popup/date-picker.vue

## API

### createPopup

```ts
const popup = createPopup<TComponent, TResult>(
  popupProps,
  component,
  slots,
)

const result = await popup.open(componentProps)
```

### 构造参数

| 参数名       | 类型                   | 说明                     |
| ------------ | ---------------------- | ------------------------ |
| `popupProps` | `Partial<PopupProps>`  | Popup 壳层配置           |
| `component`  | `Component`            | 要包进 popup 的 Vue 组件 |
| `slots`      | `Record<string, Slot>` | 透传给组件的插槽对象     |

### 返回值

- `popup.open(componentProps?) => Promise<TResult>`：打开弹层，`componentProps` 支持静态对象、`reactive`、`ref`、`computed` 或 getter
- `popup.close(reason?)`：主动关闭当前弹层，默认以 `Error('cancel')` 作为 reject 原因

### Props Source

`open` 的入参支持以下几种形式：

- 静态对象：适合一次性打开、不需要会话内同步外部状态的场景
- `reactive` / `ref` / `computed` / getter：适合弹层打开后，`options`、`loading`、`title` 等仍可能继续变化的场景

如果内容组件会在会话中通过 `emit('update:modelValue', value)` 更新临时值，`createPopup` 会把这部分值视为“会话态”，优先保留当前用户操作结果，再叠加外部最新 props source。

### 默认 Popup 配置

| 属性名                | 默认值     |
| --------------------- | ---------- |
| `position`            | `'bottom'` |
| `round`               | `true`     |
| `overlay`             | `true`     |
| `lockScroll`          | `true`     |
| `lazyRender`          | `true`     |
| `closeOnPopstate`     | `true`     |
| `closeOnClickOverlay` | `true`     |
| `safeAreaInsetBottom` | `true`     |

### 与 FormPopup 的区别

- `createPopup`：只是一层简单的函数式封装，监听 `confirm(payload)` 或 `finish(payload)` 事件的载荷。一般用在表单项的封装上。
- `FormPopup`：会创建 `form`、提供默认按钮区，并支持 middleware 与动态动作链路。

### 参考

- [Vant Popup 官方文档](https://vant-ui.github.io/vant/#/zh-CN/popup)
