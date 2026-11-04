---
mobileDemo: rate/index.tsx
---

# Rate

> `Rate` 是对 antd-mobile `Rate` 的 Formily 适配，字段值为数字，支持半星评分和自定义外观。

## 基础使用

通过字段初始值设置评分，点击星星更新字段值。默认允许再次点击当前评分清空为 `0`。

<<< @/zh/demos/rate/basic.tsx

## 半星与自定义外观

`allowHalf` 开启半星评分，`allowClear: false` 禁止再次点击清空。通过 `count`、`character` 和 CSS 变量自定义外观。

<<< @/zh/demos/rate/appearance.tsx

## 字段状态

支持 Formily 字段的 `disabled`、`readOnly` 和 `readPretty` 状态，均以只读评分展示。antd-mobile Rate 没有原生 `disabled` 属性，封装将其映射为 `readOnly`，不额外添加置灰样式。

<<< @/zh/demos/rate/status.tsx

## API

参考 [antd-mobile Rate 官方文档](https://mobile.ant.design/zh/components/rate)。
