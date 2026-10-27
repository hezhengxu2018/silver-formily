---
mobileDemo: passcode-input/index.tsx
---

# PasscodeInput

字段值为字符串，支持 `length`、`plain`、`keyboard` 等原生属性。禁用、只读和阅读态使用静态文本，默认显示掩码；仅 `plain` 为 true 时显示原文。

## 基础使用

<<< @/zh/demos/passcode-input/basic.tsx

## 明文验证码

通过 `plain` 和 `seperated` 展示四位明文验证码。示例仅用于演示，请勿输入真实密码。

<<< @/zh/demos/passcode-input/appearance.tsx

## 字段状态

对比 `disabled`、`readOnly` 和 `readPretty` 状态。

<<< @/zh/demos/passcode-input/status.tsx

## API

公开属性类型为 `IPasscodeInputProps`。支持 Formily 字段的 `disabled`、`readOnly` 和 `readPretty` 状态。

其余属性参考 [antd-mobile PasscodeInput 官方文档](https://mobile.ant.design/zh/components/passcode-input/)。
