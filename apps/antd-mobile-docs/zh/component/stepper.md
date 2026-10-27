---
mobileDemo: stepper/index.tsx
---

# Stepper

> `Stepper` 是对 antd-mobile 步进器的 Formily 适配，默认绑定数字字段，阅读态使用 `PreviewText.Input` 展示。

## 基础使用

通过字段初始值设置数量，使用 `min` 和 `max` 限制范围。

<<< @/zh/demos/stepper/basic.tsx

## 步长与精度

`step` 控制每次增减的幅度，`digits` 控制小数位数。

`formatter` 和 `parser` 直接使用原生步进器的展示格式化与输入解析能力，格式化后的展示文本不会写入字段值。使用 `stringMode` 可以通过字符串保存高精度小数，避免浮点精度丢失。

<<< @/zh/demos/stepper/precision.tsx

## 状态控制

字段 `disabled` 禁用整个步进器；`inputReadOnly` 仅禁止键盘输入，加减按钮仍可操作；`readPretty` 展示字段文本。原生步进器没有禁止所有操作的 `readOnly` 属性，需要禁止修改时使用 `disabled`。

<<< @/zh/demos/stepper/status.tsx

## API

| 属性名          | 类型                              | 描述                                | 默认值  |
| --------------- | --------------------------------- | ----------------------------------- | ------- |
| `value`         | `number`                          | 字段当前值                          | -       |
| `min` / `max`   | `number`                          | 数值范围                            | -       |
| `step`          | `number`                          | 每次增减幅度                        | `1`     |
| `digits`        | `number`                          | 小数位数                            | -       |
| `allowEmpty`    | `boolean`                         | 允许为空，启用后字段值可能为 `null` | `false` |
| `inputReadOnly` | `boolean`                         | 仅输入框只读                        | `false` |
| `disabled`      | `boolean`                         | 禁用整个组件                        | `false` |
| `onChange`      | `(value: number \| null) => void` | 值变化回调                          | -       |

`Stepper` 的 `stringMode` 开启后，值及相关范围、步长参数使用字符串。

### 格式化与高精度

| 属性名       | 类型                         | 描述                   | 默认值  |
| ------------ | ---------------------------- | ---------------------- | ------- |
| `formatter`  | `(value?: number) => string` | 格式化输入框展示文本   | -       |
| `parser`     | `(text: string) => number`   | 将输入文本解析为数值   | -       |
| `stringMode` | `boolean`                    | 使用字符串保存高精度值 | `false` |

字符串模式下，`formatter` 与 `parser` 的值类型也相应变为 `string`。小数位数统一使用 `digits`。

其余配置参考 [antd-mobile Stepper 官方文档](https://mobile.ant.design/zh/components/stepper)。
