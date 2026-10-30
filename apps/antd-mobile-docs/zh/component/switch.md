---
mobileDemo: switch/index.tsx
---

# Switch

> `Switch` 是对 antd-mobile `Switch` 的 Formily 适配，字段值为布尔值，通过 `value → checked` 映射控制开关状态。

## 基础使用

字段初始值和提交值均使用布尔值。接口采用 `0 / 1` 时，请在数据加载和提交阶段自行转换。

<<< @/zh/demos/switch/basic.tsx

## 状态与文案

支持 `disabled`、`loading` 状态，以及 `checkedText` / `uncheckedText` 开关文案。

<<< @/zh/demos/switch/status.tsx

## 搭配列表使用

将开关放入 `List` 场景，形成贴近系统设置页的布局。

<<< @/zh/demos/switch/list.tsx

Formily 字段设置 `readOnly` 时保留开关状态，并禁用交互。

## API

### 属性

| 属性名     | 类型                                    | 描述                              | 默认值 |
| ---------- | --------------------------------------- | --------------------------------- | ------ |
| `value`    | ^[boolean]                              | 字段值，`true` 为开，`false` 为关 | -      |
| `onChange` | ^[Function]`(checked: boolean) => void` | 切换时触发                        | -      |

继承 antd-mobile `Switch` 的所有配置项（`disabled`、`loading`、`checkedText`、`uncheckedText`、`onClick` 等），请参考 [Switch 官方文档](https://mobile.ant.design/zh/components/switch)。
