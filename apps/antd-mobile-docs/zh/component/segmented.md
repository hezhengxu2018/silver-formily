---
mobileDemo: segmented/index.tsx
---

# Segmented

字段值为字符串或数字。通过 `options` 或字段 `dataSource` 配置选项；支持原始值和带 label、value 的对象。只读映射为禁用交互，阅读态显示所选标签。

## 基础使用

<<< @/zh/demos/segmented/basic.tsx

## 数据源与禁用选项

使用字段 `dataSource` 配置数字值及标签，“企业”选项不可选择。

<<< @/zh/demos/segmented/appearance.tsx

## 字段状态

对比 `disabled`、`readOnly` 和 `readPretty` 状态。

<<< @/zh/demos/segmented/status.tsx

## API

公开属性类型为 `ISegmentedProps`。支持 Formily 字段的 `disabled`、`readOnly` 和 `readPretty` 状态。

其余属性参考 [antd-mobile Segmented 官方文档](https://mobile.ant.design/zh/components/segmented/)。
