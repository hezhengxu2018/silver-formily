---
mobileDemo: switch/index.vue
---

# Switch

> `Switch` 是对 Vant 开关组件的 Formily 适配，保留原生切换能力，并补上 `readPretty` 阅读态。

:::tip 使用建议
开关字段通常用于布尔状态或双值状态切换，建议直接搭配 `FormItem` 使用，便于和其他表单组件保持一致的标题、校验与阅读态体验。
:::

## 基础使用

通过 `modelValue` 绑定当前开关值。

<<< @/zh/demos/switch/basic.vue

## 自定义开关值

通过 `activeValue` 和 `inactiveValue` 将开关值映射为任意业务值。

<<< @/zh/demos/switch/custom-value.vue

## 禁用状态

通过 `disabled` 禁用开关交互。

<<< @/zh/demos/switch/disabled.vue

## 加载状态

在 Formily 场景中，也可以通过字段的 `loading` 状态驱动开关展示加载态；加载态下同样不可点击。

<<< @/zh/demos/switch/loading.vue

## 自定义大小

通过 `size` 调整开关尺寸。

<<< @/zh/demos/switch/custom-size.vue

## 自定义颜色

通过 `activeColor` 和 `inactiveColor` 调整开关的开关状态颜色。

<<< @/zh/demos/switch/custom-color.vue

## 自定义按钮

通过 `node` 插槽自定义按钮内容。

<<< @/zh/demos/switch/custom-node.vue

## 异步控制

如果需要先确认、再真正写回字段值，可以直接使用 `beforeChange`。它会在切换前触发；当返回 `false`、返回值解析为 `false`，或 Promise 被 reject 时，都会阻止这次切换。异步 Promise 等待期间，组件会自动展示 loading，省掉手动维护一套临时状态。

<<< @/zh/demos/switch/async-control.vue

## 搭配单元格使用

可以像官方示例一样将开关放进 `Cell` 的右侧区域使用。

<<< @/zh/demos/switch/cell.vue

## API

### 使用约定

- Formily 场景统一使用 `modelValue` 作为字段值，默认是 `boolean`
- `readPretty` 模式下会自动切换到 `PreviewText.Switch`，只有字段值精确匹配 `activeValue` / `inactiveValue` 时才显示开关，否则显示占位符，避免把非法值误显示为“关闭”
- `beforeChange` 会在真正触发 `update:modelValue` / `change` 之前执行，适合做确认弹窗、权限校验、异步请求前置判断
- 未单独列出的 Vant `Switch` 官方属性和事件会继续透传

### 扩展属性

| 属性名         | 类型                                                                                                                             | 描述                                                                                    | 默认值 |
| -------------- | -------------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------- | ------ |
| `beforeChange` | ^[Function]`(value: unknown, context: { currentValue?: unknown; field?: Field }) => boolean \| Promise<boolean \| void> \| void` | 切换前钩子。显式返回 `false`、Promise resolve 为 `false` 或 Promise reject 时会阻止切换 | `-`    |

### 官方透传属性

以下属性会直接透传给 Vant `Switch`：

| 属性名          | 类型               | 描述           | 默认值     |
| --------------- | ------------------ | -------------- | ---------- |
| `size`          | `number \| string` | 开关尺寸       | 官方默认值 |
| `loading`       | `boolean`          | 是否显示加载中 | 官方默认值 |
| `disabled`      | `boolean`          | 是否禁用       | 官方默认值 |
| `activeColor`   | `string`           | 打开时的背景色 | 官方默认值 |
| `inactiveColor` | `string`           | 关闭时的背景色 | 官方默认值 |
| `activeValue`   | `unknown`          | 打开时对应的值 | `true`     |
| `inactiveValue` | `unknown`          | 关闭时对应的值 | `false`    |

### Events

| 事件名              | 描述                 | 回调参数                              |
| ------------------- | -------------------- | ------------------------------------- |
| `update:modelValue` | 开关值变化时触发     | ^[Function]`(value: unknown) => void` |
| `change`            | 开关值确认变更后触发 | ^[Function]`(value: unknown) => void` |

### Slots

| 插槽名       | 描述               | 插槽参数 |
| ------------ | ------------------ | -------- |
| `node`       | 自定义按钮内容     | `-`      |
| `background` | 自定义开关背景内容 | `-`      |

### 参考

基础属性主要参考 [Vant Switch 官方文档（正式站）](https://vant-ui.github.io/vant/#/zh-CN/switch)，`beforeChange` 的命名和“切换前拦截”语义参考了 [Element Plus Switch](https://element-plus.org/en-US/component/switch.html)。
