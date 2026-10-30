---
mobileDemo: checkbox/index.tsx
---

# Checkbox

> `Checkbox` 是对 antd-mobile `Checkbox` 的 Formily 适配。多选场景使用 `Checkbox.Group`，通过字段的 `dataSource`（或 `options` 属性）提供选项，值为勾选项组成的数组。

## 基础使用

<<< @/zh/demos/checkbox/basic.tsx

## 排列方向

`layout` 控制选项排列方向；也可以不经 `dataSource`，直接通过 `options` 传入选项。

<<< @/zh/demos/checkbox/layout.tsx

## 禁用状态

`dataSource` 中的选项可单独设置 `disabled`；字段级 `disabled` 会禁用整个选项组。

<<< @/zh/demos/checkbox/disabled.tsx

Formily 字段设置 `readOnly` 时保留选中值，并禁用交互；组组件会同时禁用所有选项。

## API

### Checkbox.Group 属性

| 属性名        | 类型                                                                                                | 描述                             | 默认值       |
| ------------- | --------------------------------------------------------------------------------------------------- | -------------------------------- | ------------ |
| `options`     | ^[Array]`(string \| number \| { label: ReactNode, value: string \| number, disabled?: boolean })[]` | 选项（与字段 dataSource 二选一） | -            |
| `layout`      | ^[enum]`'vertical' \| 'horizontal'`                                                                 | 选项排列方向                     | `'vertical'` |
| `layoutBlock` | ^[boolean]                                                                                          | 横向排列时是否占满整行           | `false`      |

### 独立 Checkbox

独立使用绑定布尔字段，将字段 `value` 映射到 `checked`，标签可通过 `children` 传入，未传入时使用字段标题。选项数据源仅由 `Checkbox.Group` 处理。

`Checkbox.Group` 也支持直接传入多个 `Checkbox` 子项，此时子项的 `value` 表示字符串或数字选项值；子项优先于数据源渲染，不再根据子节点类型自动猜测渲染模式。

### 实例方法

| 方法名  | 说明           |
| ------- | -------------- |
| `Group` | 多选选项组组件 |

继承 antd-mobile `Checkbox` 的所有配置项，请参考 [Checkbox 官方文档](https://mobile.ant.design/zh/components/checkbox)。
