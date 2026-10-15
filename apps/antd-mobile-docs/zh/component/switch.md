---
mobileDemo: switch/index.tsx
---

# Switch

> `Switch` 是对 antd-mobile `Switch` 的 Formily 适配，值为布尔值（数字 `1 / 0` 会被自动映射为开 / 关）。

## 基础使用

<<< @/zh/demos/switch/basic.tsx

## 状态与文案

支持 `disabled`、`loading` 状态，以及 `checkedText` / `uncheckedText` 开关文案。

<<< @/zh/demos/switch/status.tsx

## 搭配列表使用

将开关放入 `List` 场景，形成贴近系统设置页的布局。

<<< @/zh/demos/switch/list.tsx

## API

### 属性

| 属性名     | 类型                                    | 描述                             | 默认值 |
| ---------- | --------------------------------------- | -------------------------------- | ------ |
| `value`    | ^[boolean \| number]                    | 字段值，数字会被映射为布尔开关值 | -      |
| `onChange` | ^[Function]`(checked: boolean) => void` | 切换时触发                       | -      |

继承 antd-mobile `Switch` 的所有配置项（`disabled`、`loading`、`checkedText`、`uncheckedText`、`onClick` 等），请参考 [Switch 官方文档](https://mobile.ant.design/zh/components/switch)。
