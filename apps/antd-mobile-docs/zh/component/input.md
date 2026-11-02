---
mobileDemo: input/index.tsx
---

# Input

> `Input` 是对 antd-mobile `Input` 的 Formily 适配，值为字符串；阅读态下自动切换为 `PreviewText.Input`。

## 基础使用

<<< @/zh/demos/input/basic.tsx

## 多行输入

使用 `Input.TextArea` 渲染多行文本，支持字数统计与自适应高度。

<<< @/zh/demos/input/textarea.tsx

## 状态控制

`clearable` 提供一键清空；`readOnly` 与 `disabled` 分别控制只读和禁用状态。

::: tip 提示
和Picker类型的`clearable`不一样，这里的`clearable`是`antd-mobile`的配置项，Input组件应避免使用 FormItem 的`clearable`配置项。
:::

<<< @/zh/demos/input/status.tsx

## API

继承 antd-mobile `Input` 的所有配置项（`type`、`placeholder`、`clearable`、`maxLength` 等），请参考 [Input 官方文档](https://mobile.ant.design/zh/components/input)；`Input.TextArea` 参考 [TextArea 官方文档](https://mobile.ant.design/zh/components/text-area)。
