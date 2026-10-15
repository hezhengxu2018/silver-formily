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

## API

### 属性

| 属性名        | 类型                                                                         | 描述                             | 默认值       |
| ------------- | ---------------------------------------------------------------------------- | -------------------------------- | ------------ |
| `options`     | ^[Array]`(string \| { label: string, value: string, disabled?: boolean })[]` | 选项（与字段 dataSource 二选一） | -            |
| `layout`      | ^[enum]`'vertical' \| 'horizontal'`                                          | 选项排列方向                     | `'vertical'` |
| `layoutBlock` | ^[boolean]                                                                   | 横向排列时是否占满整行           | `false`      |

### 实例方法

| 方法名  | 说明           |
| ------- | -------------- |
| `Group` | 多选选项组组件 |

继承 antd-mobile `Checkbox` 的所有配置项，请参考 [Checkbox 官方文档](https://mobile.ant.design/zh/components/checkbox)。
