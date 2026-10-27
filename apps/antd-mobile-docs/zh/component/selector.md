---
mobileDemo: selector/index.tsx
---

# Selector

> `Selector` 是对 antd-mobile 选择组的 Formily 适配，支持单选和多选，字段值始终是选项值组成的数组。

## 单选与选项禁用

默认单选，初始值也需写成数组，例如 `['standard']`。通过字段 `dataSource` 提供选项，单项可设置 `disabled`。

<<< @/zh/demos/selector/basic.tsx

## 多选与描述

`multiple` 开启多选，`columns` 设置列数。也可通过组件属性 `options` 提供带描述的选项；非空字段 `dataSource` 优先于 `options`。

<<< @/zh/demos/selector/multiple.tsx

## 禁用与阅读态

字段 `disabled` 禁用整个选择组；`readPretty` 使用 `PreviewText.Selector` 展示已选标签。字段处于 `loading` 状态时显示加载指示器。原生 Selector 不支持 `readOnly`，需要阻止修改时使用 `disabled` 或阅读态。

<<< @/zh/demos/selector/status.tsx

## API

| 属性名          | 类型                                                                                           | 描述                                | 默认值  |
| --------------- | ---------------------------------------------------------------------------------------------- | ----------------------------------- | ------- |
| `value`         | `(string \| number)[]`                                                                         | 已选值，单选也是数组                | -       |
| `options`       | `{ label: ReactNode, value: string \| number, description?: ReactNode, disabled?: boolean }[]` | 选项，可由字段 `dataSource` 提供    | -       |
| `multiple`      | `boolean`                                                                                      | 是否允许多选                        | `false` |
| `columns`       | `number`                                                                                       | 列数                                | -       |
| `disabled`      | `boolean`                                                                                      | 禁用整个组件                        | `false` |
| `showCheckMark` | `boolean`                                                                                      | 显示选中角标                        | `true`  |
| `onChange`      | `(value, extend) => void`                                                                      | 选择变化，`extend.items` 为已选选项 | -       |

阅读态根据标准 `label`、`value` 字段查找标签；需要阅读态展示时应使用这两个字段。

其余配置参考 [antd-mobile Selector 官方文档](https://mobile.ant.design/zh/components/selector)。
