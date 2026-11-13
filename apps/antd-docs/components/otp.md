# OTP 一次性密码输入

> Antd 的 `Input.OTP` 的封装

::: warning 注意
Ant Design 的 `onChange` 仅在全部输入框填满时触发。本组件通过 `onInput` 将各输入框的内容合并为字符串并同步字段值，确保输入不完整或删除字符时也能触发字段校验。`onChange` 保留为完整输入回调，不重复写入字段。
:::

## Markup Schema 案例

通过 `SchemaField.String` 绑定验证码，使用 `length` 设置输入框数量，并通过字段校验要求输入 6 位数字。`length` 本身不等同于完整性校验。

:::demo
otp/markup-schema.tsx
:::

## JSON Schema 案例

使用 `x-component-props` 配置 OTP，通过 `required` 和 `x-validator` 定义校验规则。

:::demo
otp/json-schema.tsx
:::

## 纯 JSX 案例

直接通过 `Field` 的 `component` 和 `validator` 配置控件与校验。可先输入完整验证码，再删除一位，观察校验反馈；提交成功后结果输出到控制台。

:::demo
otp/jsx.tsx
:::

## 基础用法

展示掩码输入、阅读态切换和重置。`mask` 只影响显示，不改变字段中的字符串值。

:::demo
otp/basic.tsx
:::

## 输入格式化

使用 `formatter` 将字母转为大写，或过滤非数字字符；数字示例同时使用 `inputMode="numeric"` 提示数字键盘。

:::demo
otp/formatter.tsx
:::

## 长度、外观与掩码

展示禁用、八位输入、填充外观和自定义掩码。

:::demo
otp/appearance.tsx
:::

## 自定义分隔符

`separator` 支持 React 节点或函数，函数参数为输入框的下标，可按指定位置分组。分隔符不写入字段值。

:::demo
otp/separator.tsx
:::

## 银行卡号输入

以固定 16 位卡号为例，每四位添加分隔符。可输入或粘贴 `1234 5678 9012 3456`，空格等非数字字符会被过滤，字段值仍是连续的数字字符串。窄屏下可横向滚动。

本例只校验 16 位数字格式，不验证卡号真实性；其他长度的卡号需调整 `length` 和校验规则。

:::demo
otp/bank-card.tsx
:::

## API

参考[Ant Design Input.OTP](https://ant.design/components/input-cn/#inputotp)
