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

<<< @/zh/demos/input/status.tsx

## API

### 属性

| 属性名     | 类型                                 | 描述                               | 默认值 |
| ---------- | ------------------------------------ | ---------------------------------- | ------ |
| `value`    | ^[string]                            | 输入值（无效值统一兜底为空字符串） | -      |
| `onChange` | ^[Function]`(value: string) => void` | 值变化时触发                       | -      |

### 实例方法

| 方法名     | 说明             |
| ---------- | ---------------- |
| `TextArea` | 多行文本输入组件 |

继承 antd-mobile `Input` 的所有配置项（`type`、`placeholder`、`clearable`、`maxLength` 等），请参考 [Input 官方文档](https://mobile.ant.design/zh/components/input)；`Input.TextArea` 参考 [TextArea 官方文档](https://mobile.ant.design/zh/components/text-area)。
