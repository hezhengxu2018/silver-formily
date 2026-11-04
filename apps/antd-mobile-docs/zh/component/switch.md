---
mobileDemo: switch/index.tsx
---

# Switch

> `Switch` 是对 antd-mobile `Switch` 的 Formily 适配，字段值为布尔值。

## 基础使用

字段初始值和提交值均使用布尔值。接口采用 `0 / 1` 时，请在数据加载和提交阶段自行转换。

<<< @/zh/demos/switch/basic.tsx

## 状态与文案

支持字段禁用状态、`loading` 状态，以及 `checkedText` / `uncheckedText` 开关文案。

<<< @/zh/demos/switch/status.tsx

## 异步切换

设置 `beforeChange(checked)`，在点击时返回新的 Promise：resolve 后更新开关和表单值，返回 `false` 或 reject 时保持原值。等待期间自动显示加载状态并阻止重复点击。拒绝的 Promise 会被组件捕获，如需提示失败原因，可在回调内处理。

示例模拟 1.5 秒请求，分别展示成功与失败两种结果。点击“查看结果”可检查实际表单值。

<<< @/zh/demos/switch/async.tsx

## 搭配列表使用

将开关放入 `List` 场景，形成贴近系统设置页的布局。

<<< @/zh/demos/switch/list.tsx

Formily 字段设置 `readOnly` 时保留开关状态，并禁用交互。

## API

### 属性

| 属性名         | 类型                                                            | 描述                                                         | 默认值 |
| -------------- | --------------------------------------------------------------- | ------------------------------------------------------------ | ------ |
| `beforeChange` | ^[Function]`(checked: boolean) => Promise<boolean &#124; void>` | 切换前的异步任务；resolve 允许切换，false 或 reject 阻止切换 | -      |

其余配置参考 [Switch 官方文档](https://mobile.ant.design/zh/components/switch)。
