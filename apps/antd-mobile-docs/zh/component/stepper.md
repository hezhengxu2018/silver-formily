---
mobileDemo: stepper/index.tsx
---

# Stepper

> 主要用于数值输入的表单控件

## 基础使用

通过字段初始值设置数量，使用 `min` 和 `max` 限制范围。

<<< @/zh/demos/stepper/basic.tsx

## 步长与精度

`step` 控制每次增减的幅度，`digits` 控制小数位数。

`formatter` 和 `parser` 直接使用原生步进器的展示格式化与输入解析能力，格式化后的展示文本不会写入字段值。使用 `stringMode` 可以通过字符串保存高精度小数，避免浮点精度丢失。

<<< @/zh/demos/stepper/precision.tsx

## 状态控制

<<< @/zh/demos/stepper/status.tsx

## API

参考 [antd-mobile Stepper 官方文档](https://mobile.ant.design/zh/components/stepper)。
