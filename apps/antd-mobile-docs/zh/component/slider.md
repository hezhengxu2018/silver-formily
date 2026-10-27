---
mobileDemo: slider/index.tsx
---

# Slider

字段值为数字，开启 `range` 后为 `[number, number]`。支持 `min`、`max`、`step`、`marks` 等原生属性。只读映射为禁用交互，阅读态显示数字或范围。

## 基础使用

<<< @/zh/demos/slider/basic.tsx

## 范围与刻度

拖动两个滑块设置范围，支持步长、刻度与标记。

<<< @/zh/demos/slider/appearance.tsx

## 字段状态

对比 `disabled`、`readOnly` 和 `readPretty` 状态。

<<< @/zh/demos/slider/status.tsx

## API

公开属性类型为 `ISliderProps`。支持 Formily 字段的 `disabled`、`readOnly` 和 `readPretty` 状态。

其余属性参考 [antd-mobile Slider 官方文档](https://mobile.ant.design/zh/components/slider/)。
