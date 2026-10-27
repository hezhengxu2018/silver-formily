---
mobileDemo: radio/index.tsx
---

# Radio

> `Radio` 是对 antd-mobile `Radio` 的 Formily 适配。单选场景使用 `Radio.Group`，字段值为选中项的字符串或数字，不是数组。

## 基础使用

通过字段的 `dataSource` 提供选项，支持初始值和表单提交。

<<< @/zh/demos/radio/basic.tsx

## 排列方向

`layout` 控制排列方向，未设置时继承 `FormLayout` 的方向，默认纵向排列。也可以通过 `options` 直接传入选项；非空的字段 `dataSource` 优先。

<<< @/zh/demos/radio/layout.tsx

## 禁用状态

选项的 `disabled` 禁用单项，字段级 `disabled` 禁用整个组。

<<< @/zh/demos/radio/disabled.tsx

## API

### Radio.Group

| 属性名        | 类型                                                                                        | 描述                               | 默认值       |
| ------------- | ------------------------------------------------------------------------------------------- | ---------------------------------- | ------------ |
| `options`     | `(string \| number \| { label: ReactNode, value: string \| number, disabled?: boolean })[]` | 选项                               | -            |
| `layout`      | `'vertical' \| 'horizontal'`                                                                | 选项排列方向                       | `'vertical'` |
| `layoutBlock` | `boolean`                                                                                   | 选项容器是否占满整行               | `false`      |
| `children`    | `ReactNode`                                                                                 | 自定义选项，提供时优先于数据源渲染 | -            |

继承 antd-mobile `Radio.Group` 的 `value`、`defaultValue`、`onChange` 和 `disabled` 属性。

### Radio

单独使用时将字段 `value` 映射到 `checked`，字段值为布尔值，标签通过 `children` 传入。在 `Radio.Group` 内自定义选项时，每个 `Radio` 的 `value` 表示选项值，选中状态由组控制。

其余属性参考 [antd-mobile Radio 官方文档](https://mobile.ant.design/zh/components/radio)。
