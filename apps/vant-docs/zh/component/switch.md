---
mobileDemo: switch/index.vue
---

# Switch

> `Switch` 是对 Vant 开关组件的 Formily 适配。

## 基础使用

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

## 异步控制 ^(new)

如果需要先确认、再真正写回字段值，可以直接使用 `beforeChange`。它会在切换前触发；当返回 `false`、返回值解析为 `false`，或 Promise 被 reject 时，都会阻止这次切换。异步 Promise 等待期间，组件会自动展示 loading，省掉手动维护一套临时状态。

<<< @/zh/demos/switch/async-control.vue

## 搭配单元格使用

可以像官方示例一样将开关放进 `Cell` 的右侧区域使用。

<<< @/zh/demos/switch/cell.vue

## API

### 扩展属性

| 属性名         | 类型                                                                                                                             | 描述                                                                                    | 默认值 |
| -------------- | -------------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------- | ------ |
| `beforeChange` | ^[Function]`(value: unknown, context: { currentValue?: unknown; field?: Field }) => boolean \| Promise<boolean \| void> \| void` | 切换前钩子。显式返回 `false`、Promise resolve 为 `false` 或 Promise reject 时会阻止切换 | `-`    |

### 属性

继承官方组件的所有配置项，请参考 [Vant Switch 官方文档](https://vant-ui.github.io/vant/#/zh-CN/switch)

### Events

移除了语义重复的 `change` 事件

### Slots

支持所有官方组件的插槽
