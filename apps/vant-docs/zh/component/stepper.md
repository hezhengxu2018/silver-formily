---
mobileDemo: stepper/index.vue
---

# Stepper

> `Stepper` 是对 Vant 步进器组件的 Formily 适配，保持原生数值增减交互，并在 `readPretty` 模式下复用 `PreviewText.Input` 做纯文本展示。

:::tip 使用建议
步进器适合商品数量、份数、次数这类离散数值场景。需要和标题、校验信息一起展示时，建议直接搭配 `FormItem` 使用。
:::

## 基础使用

通过 `modelValue` 绑定当前数值。

<<< @/zh/demos/stepper/basic.vue

## 指定步长

通过 `step` 控制每次点击加减时的变动粒度。

<<< @/zh/demos/stepper/step.vue

## 限制范围

通过 `min` 和 `max` 约束可输入区间，到达边界后会自动禁用对应按钮。

<<< @/zh/demos/stepper/limit.vue

## 限制输入整数

通过 `integer` 限制只能输入整数。

<<< @/zh/demos/stepper/integer.vue

## 禁用状态

通过 `disabled` 禁用整个步进器。

<<< @/zh/demos/stepper/disabled.vue

## 禁止输入框编辑

通过 `disableInput` 保留加减按钮，只禁止手动输入。

<<< @/zh/demos/stepper/disable-input.vue

## 固定小数位数

通过 `decimalLength` 固定展示的小数位数。

<<< @/zh/demos/stepper/decimal-length.vue

## 自定义大小

通过 `inputWidth` 和 `buttonSize` 调整输入框和按钮尺寸。

<<< @/zh/demos/stepper/custom-size.vue

## 异步变更

通过 `beforeChange` 在值变更前做异步拦截。

<<< @/zh/demos/stepper/async-control.vue

## 圆角风格

通过 `theme="round"` 使用官方提供的圆角风格。

<<< @/zh/demos/stepper/round-theme.vue

## API

### 使用约定

- Formily 场景统一使用 `modelValue` 作为字段值，值类型与 Vant 保持一致，为 `number | string`
- `readPretty` 模式下会自动切换到 `PreviewText.Input`，空值显示占位符，非空值显示纯文本
- 为了保持 Formily 字段“空值不自动写脏”的语义，字段初始值为空时不会自动回填 Vant 内建的 `defaultValue = 1`
- 如果需要默认值，优先通过 Formily 的 `initialValue` / `initialValues` 提供；只有在明确需要组件层默认值时，再显式传入 `defaultValue`
- 仅额外处理了 `Field.disabled -> disabled` 的同步，其余行为尽量保持 Vant 原生语义
- 未单独列出的 Vant `Stepper` 官方属性和事件会继续透传

### 官方透传属性

以下属性会直接透传给 Vant `Stepper`：

| 属性名          | 类型                                                                  | 描述                                                | 默认值     |
| --------------- | --------------------------------------------------------------------- | --------------------------------------------------- | ---------- |
| `modelValue`    | `number \| string`                                                    | 当前值                                              | `-`        |
| `min`           | `number \| string`                                                    | 最小值                                              | `1`        |
| `max`           | `number \| string`                                                    | 最大值                                              | `Infinity` |
| `step`          | `number \| string`                                                    | 步长                                                | `1`        |
| `theme`         | ^[enum]`'default' \| 'round'`                                         | 主题风格                                            | 官方默认值 |
| `integer`       | `boolean`                                                             | 是否只允许整数                                      | 官方默认值 |
| `disabled`      | `boolean`                                                             | 是否禁用                                            | 官方默认值 |
| `showPlus`      | `boolean`                                                             | 是否显示增加按钮                                    | `true`     |
| `showMinus`     | `boolean`                                                             | 是否显示减少按钮                                    | `true`     |
| `showInput`     | `boolean`                                                             | 是否显示输入框                                      | `true`     |
| `longPress`     | `boolean`                                                             | 是否开启长按手势                                    | `true`     |
| `autoFixed`     | `boolean`                                                             | 失焦时是否自动修正数值                              | `true`     |
| `allowEmpty`    | `boolean`                                                             | 是否允许空值                                        | 官方默认值 |
| `inputWidth`    | `number \| string`                                                    | 输入框宽度                                          | 官方默认值 |
| `buttonSize`    | `number \| string`                                                    | 按钮尺寸                                            | 官方默认值 |
| `placeholder`   | `string`                                                              | 输入框占位内容                                      | 官方默认值 |
| `disablePlus`   | `boolean`                                                             | 是否禁用增加按钮                                    | 官方默认值 |
| `disableMinus`  | `boolean`                                                             | 是否禁用减少按钮                                    | 官方默认值 |
| `disableInput`  | `boolean`                                                             | 是否禁用输入框编辑                                  | 官方默认值 |
| `defaultValue`  | `number \| string`                                                    | 默认值；在 Formily 空字段场景下需要显式传入才会生效 | `1`        |
| `decimalLength` | `number \| string`                                                    | 固定保留的小数位数                                  | 官方默认值 |
| `name`          | `number \| string`                                                    | 标识名称                                            | `''`       |
| `beforeChange`  | ^[Function]`(value: number \| string) => boolean \| Promise<boolean>` | 变更前拦截                                          | 官方默认值 |

### Events

| 事件名              | 描述                 | 回调参数                                                                           |
| ------------------- | -------------------- | ---------------------------------------------------------------------------------- |
| `update:modelValue` | 值变化时触发         | ^[Function]`(value: number \| string) => void`                                     |
| `change`            | 值变化后触发         | ^[Function]`(value: number \| string, detail: { name: number \| string }) => void` |
| `plus`              | 点击增加按钮时触发   | ^[Function]`() => void`                                                            |
| `minus`             | 点击减少按钮时触发   | ^[Function]`() => void`                                                            |
| `overlimit`         | 点击到边界按钮时触发 | ^[Function]`(type: 'plus' \| 'minus') => void`                                     |
| `focus`             | 输入框聚焦时触发     | ^[Function]`(event: Event) => void`                                                |
| `blur`              | 输入框失焦时触发     | ^[Function]`(event: Event) => void`                                                |

### 参考

属性命名和交互能力主要参考 [Vant Stepper 官方文档（正式站）](https://vant-ui.github.io/vant/#/zh-CN/stepper)。
