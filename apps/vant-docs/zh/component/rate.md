---
mobileDemo: rate/index.vue
---

# Rate

> `Rate` 是对 Vant 评分组件的 Formily 适配，保留原生评分交互，同时补上 `readPretty` 阅读态和 `readOnly` 命名兼容。

:::tip 使用建议
评分字段通常建议直接搭配 `FormItem` 使用，这样标题、校验信息和阅读态展示会和其他输入组件保持一致。
:::

## 基础使用

通过 `modelValue` 绑定当前评分值。

<<< @/zh/demos/rate/basic.vue

## 自定义图标

通过 `icon` 设置选中图标，`voidIcon` 设置未选中图标。

<<< @/zh/demos/rate/custom-icon.vue

## 自定义样式

通过 `size`、`color`、`voidColor` 等属性调整评分组件样式。

<<< @/zh/demos/rate/custom-style.vue

## 半星

设置 `allowHalf` 后可以选中半星。

<<< @/zh/demos/rate/allow-half.vue

## 自定义数量

通过 `count` 设置评分总数。

<<< @/zh/demos/rate/custom-count.vue

## 可清空

设置 `clearable` 后，再次点击相同的值可以将评分重置为 `0`。

<<< @/zh/demos/rate/clearable.vue

## 禁用状态

通过 `disabled` 禁用评分。

<<< @/zh/demos/rate/disabled.vue

## 只读状态

通过 `readonly` 将评分设置为只读。

<<< @/zh/demos/rate/readonly.vue

## 只读状态显示小数

设置 `readonly` 和 `allowHalf` 后，评分组件可以展示任意小数结果。

<<< @/zh/demos/rate/readonly-decimal.vue

## API

### 使用约定

- Formily 场景统一使用 `modelValue` 作为字段值，通常为 `number`
- `readPretty` 模式下会自动切换到 `PreviewText.Rate`，空值显示占位符，非空值显示只读评分
- `readOnly` 会自动映射到 Vant 原生 `readonly`，便于和仓库内其他组件保持同一套命名习惯
- `disabled`、`readonly`、`readOnly` 都会阻止继续评分
- 未单独列出的 Vant `Rate` 官方属性和事件会继续透传

### 扩展属性

| 属性名       | 类型      | 描述                              | 默认值 |
| ------------ | --------- | --------------------------------- | ------ |
| `modelValue` | `number`  | Formily 字段值                    | `-`    |
| `readOnly`   | `boolean` | 兼容命名，会自动映射到 `readonly` | `-`    |

### 官方透传属性

以下属性会直接透传给 Vant `Rate`：

| 属性名          | 类型               | 描述                 | 默认值     |
| --------------- | ------------------ | -------------------- | ---------- |
| `count`         | `number \| string` | 图标总数             | `5`        |
| `allowHalf`     | `boolean`          | 是否允许半选         | 官方默认值 |
| `clearable`     | `boolean`          | 是否允许再次点击清空 | 官方默认值 |
| `readonly`      | `boolean`          | 是否只读             | 官方默认值 |
| `disabled`      | `boolean`          | 是否禁用             | 官方默认值 |
| `size`          | `number \| string` | 图标大小             | 官方默认值 |
| `gutter`        | `number \| string` | 图标间距             | 官方默认值 |
| `icon`          | `string`           | 选中时的图标名称     | 官方默认值 |
| `voidIcon`      | `string`           | 未选中时的图标名称   | 官方默认值 |
| `color`         | `string`           | 选中时的颜色         | 官方默认值 |
| `voidColor`     | `string`           | 未选中时的颜色       | 官方默认值 |
| `disabledColor` | `string`           | 禁用时的颜色         | 官方默认值 |
| `iconPrefix`    | `string`           | 图标类名前缀         | 官方默认值 |
| `touchable`     | `boolean`          | 是否支持滑动选择     | 官方默认值 |

### Events

| 事件名              | 描述              | 回调参数                             |
| ------------------- | ----------------- | ------------------------------------ |
| `update:modelValue` | 评分值变化时触发  | ^[Function]`(value: number) => void` |
| `change`            | Vant 原生变更事件 | ^[Function]`(value: number) => void` |

### 参考

属性命名和交互能力主要参考 [Vant Rate 官方文档（正式站）](https://vant-ui.github.io/vant/#/zh-CN/rate)。
