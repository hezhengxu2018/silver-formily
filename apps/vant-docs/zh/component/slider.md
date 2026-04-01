---
mobileDemo: slider/index.vue
---

# Slider

> `Slider` 是对 Vant 滑块组件的 Formily 适配，保留原生滑动交互，同时补上 `readPretty` 阅读态和 `readOnly` 命名兼容。

:::tip 使用建议
单值场景适合表示进度、音量、亮度等连续数值；区间场景建议开启 `range`，直接绑定 `[min, max]` 结构。
:::

## 基础使用

通过 `modelValue` 绑定当前滑块值。

<<< @/zh/demos/slider/basic.vue

## 双滑块

设置 `range` 后，字段值会切换为 `[number, number]`。

<<< @/zh/demos/slider/range.vue

## 指定选择范围

通过 `min` 和 `max` 可以约束滑块的可选区间。

<<< @/zh/demos/slider/custom-range.vue

## 禁用

通过 `disabled` 禁用滑块交互。

<<< @/zh/demos/slider/disabled.vue

## 指定步长

通过 `step` 控制每次变动的粒度。

<<< @/zh/demos/slider/step.vue

## 自定义样式

通过 `barHeight`、`activeColor` 等属性调整滑块外观。

<<< @/zh/demos/slider/custom-style.vue

## 自定义按钮

通过 `button` 插槽自定义滑块按钮内容。

<<< @/zh/demos/slider/custom-button.vue

## 垂直方向

设置 `vertical` 属性后，滑块会按父元素高度垂直展示。

<<< @/zh/demos/slider/vertical.vue

## 只读状态

这是 Formily 封装额外补充的示例，支持 `readonly` 和 `readOnly` 两种命名。

<<< @/zh/demos/slider/readonly.vue

## API

### 使用约定

- Formily 场景统一使用 `modelValue` 作为字段值，类型为 `number | [number, number]`
- `readPretty` 模式下会自动切换到 `PreviewText.Slider`，空值显示占位符，非空值显示只读滑块
- `readOnly` 会自动映射到 Vant 原生 `readonly`，便于和仓库内其他组件保持同一套命名习惯
- `disabled`、`readonly`、`readOnly` 都会阻止继续调整滑块
- 未单独列出的 Vant `Slider` 官方属性和事件会继续透传

### 扩展属性

| 属性名       | 类型                         | 描述                              | 默认值 |
| ------------ | ---------------------------- | --------------------------------- | ------ |
| `modelValue` | `number \| [number, number]` | Formily 字段值                    | `-`    |
| `readOnly`   | `boolean`                    | 兼容命名，会自动映射到 `readonly` | `-`    |

### 官方透传属性

以下属性会直接透传给 Vant `Slider`：

| 属性名          | 类型               | 描述           | 默认值     |
| --------------- | ------------------ | -------------- | ---------- |
| `min`           | `number \| string` | 最小值         | `0`        |
| `max`           | `number \| string` | 最大值         | `100`      |
| `step`          | `number \| string` | 步长           | `1`        |
| `range`         | `boolean`          | 是否为范围选择 | 官方默认值 |
| `reverse`       | `boolean`          | 是否反向选择   | 官方默认值 |
| `readonly`      | `boolean`          | 是否只读       | 官方默认值 |
| `disabled`      | `boolean`          | 是否禁用       | 官方默认值 |
| `vertical`      | `boolean`          | 是否垂直展示   | 官方默认值 |
| `barHeight`     | `number \| string` | 轨道粗细       | 官方默认值 |
| `buttonSize`    | `number \| string` | 按钮尺寸       | 官方默认值 |
| `activeColor`   | `string`           | 已选轨道颜色   | 官方默认值 |
| `inactiveColor` | `string`           | 未选轨道颜色   | 官方默认值 |

### Events

| 事件名              | 描述             | 回调参数                                                 |
| ------------------- | ---------------- | -------------------------------------------------------- |
| `update:modelValue` | 滑块值变化时触发 | ^[Function]`(value: number \| [number, number]) => void` |
| `change`            | 松手后的变更事件 | ^[Function]`(value: number \| [number, number]) => void` |
| `dragStart`         | 开始拖动时触发   | ^[Function]`(event: TouchEvent) => void`                 |
| `dragEnd`           | 结束拖动时触发   | ^[Function]`(event: TouchEvent) => void`                 |

### Slots

| 插槽名         | 描述                           | 插槽参数                                                            |
| -------------- | ------------------------------ | ------------------------------------------------------------------- |
| `button`       | 自定义滑块按钮                 | ^[Object]`{ value: number, dragging: boolean }`                     |
| `left-button`  | 双滑块模式下自定义左侧滑块按钮 | ^[Object]`{ value: number, dragging: boolean, dragIndex?: number }` |
| `right-button` | 双滑块模式下自定义右侧滑块按钮 | ^[Object]`{ value: number, dragging: boolean, dragIndex?: number }` |

### 参考

属性命名和交互能力主要参考 [Vant Slider 官方文档（正式站）](https://vant-ui.github.io/vant/#/zh-CN/slider)。
