---
mobileDemo: slider/index.vue
---

# Slider

> `Slider` 是对 Vant 滑块组件的 Formily 适配。

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

### 扩展属性

| 属性名       | 类型                         | 描述                              | 默认值 |
| ------------ | ---------------------------- | --------------------------------- | ------ |
| `modelValue` | `number \| [number, number]` | Formily 字段值                    | `-`    |
| `readOnly`   | `boolean`                    | 兼容命名，会自动映射到 `readonly` | `-`    |

其余属性、默认值、事件、插槽可直接参考 [Vant Slider 官方文档](https://vant-ui.github.io/vant/#/zh-CN/slider)。
