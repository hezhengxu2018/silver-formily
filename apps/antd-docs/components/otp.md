# OTP 一次性密码输入

::: warning 字段更新时机
沿用 Ant Design 的原生事件：仅填满所有输入格时，`onChange` 才会更新字段。未填满或删除部分内容时触发 `onInput(string[])`，字段仍保留上次完整值；需要逐次输入校验时请自行处理此事件。阅读态与 Password 一致，固定显示遮蔽字符。
:::

独立导出的 `OTP` 封装 Ant Design 的 `Input.OTP`，支持 Field 与 Schema 绑定；Schema 注册 `OTP` 后使用 `x-component: 'OTP'`。

## 基础用法

:::demo
otp/basic.tsx
:::

## API

| 接口                                    | 行为                                                                          |
| --------------------------------------- | ----------------------------------------------------------------------------- |
| 组件属性、事件及 ref                    | 遵循 [Ant Design Input.OTP](https://ant.design/components/input-cn/#inputotp) |
| `value / onChange`                      | 字符串值；填满时更新字段，保留原生回调                                        |
| `onInput`                               | 每次输入变化时收到 `string[]`                                                 |
| `length / mask / formatter / separator` | 原生输入格数量、遮蔽、格式化和分隔符                                          |
| `pattern="readPretty"`                  | 使用 `PreviewText.Password`，空值使用 PreviewText 占位配置                    |
| `disabled / status / size / variant`    | 沿用字段与 FormItem 的原生上下文，支持显式覆盖                                |
| `ref`                                   | 保留原生 OTP ref，可调用 `focus()` 与 `blur()`                                |

## 来源

本组件为本项目扩展，API 与示例依据 Ant Design 6 的 Input.OTP 编写。
