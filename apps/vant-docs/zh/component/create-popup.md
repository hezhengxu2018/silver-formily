---
mobileDemo: create-popup/index.vue
---

# createPopup

> `createPopup` 是一个轻量的 Vant `Popup` 工厂函数。它不会创建表单，不会注入 middleware，也不会把内部 `update:modelValue` 暴露给外部；外部只会拿到组件 `confirm(payload)` 或 `finish(payload)` 的返回值。

## 最小自定义组件

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

### 使用约定

- `createPopup` 只负责挂载 `Popup`、接管 `confirm / finish / cancel / close` 链路，并把成功事件 payload 直接作为 `Promise` 的 `resolve` 值
- 它不会创建 `form`，也不会像 `FormPopup` 一样提供默认头部、底部和 middleware
- 第三个参数 `slots` 会直接作为组件插槽透传，适合插入 `title`、`default` 等 slot 内容
- `open(componentProps)` 可以传入每次打开时的组件 props，包括初始 `modelValue`
- 会话中的 `update:modelValue` 只在内部维护，不会回调给外部；外部只能拿到 `open()` 返回 Promise 的结果
- 部分 `popupProps` 与 `componentProps` 字段属于内部保留值；即使传入，也会在运行时被 `createPopup` 覆盖
- 若用户取消、点击遮罩关闭或 popup 主动关闭，则统一 `reject(new Error('cancel'))`
- 当前版本适合包装“成功事件名为 `confirm` 或 `finish`，且 payload 就是最终结果”的组件

### 构造参数

| 参数名       | 类型                   | 说明                     |
| ------------ | ---------------------- | ------------------------ |
| `popupProps` | `Partial<PopupProps>`  | Popup 壳层配置           |
| `component`  | `Component`            | 要包进 popup 的 Vue 组件 |
| `slots`      | `Record<string, Slot>` | 透传给组件的插槽对象     |

### 返回值

- `popup.open(componentProps?) => Promise<TResult>`：组件触发 `confirm(payload)` 或 `finish(payload)` 时返回 `payload`

### 内部保留值

以下键会被 `createPopup` 内部接管。可以传入，但运行时会被内部实现覆盖，不会按外部值生效。

#### `popupProps` 中会被覆盖的键

- `show`
- `onClosed`
- `onUpdate:show`

#### `open(componentProps)` 中会被覆盖的键

- `onConfirm`
- `onFinish`
- `onCancel`
- `onUpdate:modelValue`

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

- `createPopup`：只包 popup 壳层，返回 `confirm(payload)` 或 `finish(payload)`
- `FormPopup`：会创建 `form`、提供默认按钮区，并支持 middleware 与动态动作链路

### 参考

- [Vant Popup 官方文档（正式站）](https://vant-ui.github.io/vant/#/zh-CN/popup)
