---
mobileDemo: check-list/index.tsx
---

# CheckList

> `CheckList` 是对 antd-mobile 可勾选列表的 Formily 适配，支持单选和多选，字段值始终为数组。

## 基础单选

通过字段 `dataSource` 提供选项。默认单选，初始值使用数组；选项可单独设置 `disabled`。

<<< @/zh/demos/check-list/basic.tsx

## 多选与只读

设置 `multiple` 开启多选，也可以通过 `options` 直接传入字符串选项。非空的字段 `dataSource` 优先于 `options`。字段支持 `disabled` 和 `readOnly`；阅读态保留列表外观，并以禁用状态展示。

<<< @/zh/demos/check-list/multiple.tsx

## 自定义列表项

没有数据源和 `options` 时，可通过 `CheckList.Item` 自定义标题、描述等内容。存在非空数据源时优先渲染数据源选项。

<<< @/zh/demos/check-list/children.tsx

## API

| 属性名     | 类型                                                                 | 描述                             | 默认值  |
| ---------- | -------------------------------------------------------------------- | -------------------------------- | ------- |
| `value`    | `(string \| number)[]`                                               | 已选值，单选也是数组             | -       |
| `options`  | `string[] \| { label: string, value: string, disabled?: boolean }[]` | 选项，可由字段 `dataSource` 提供 | -       |
| `multiple` | `boolean`                                                            | 是否多选                         | `false` |
| `disabled` | `boolean`                                                            | 禁用整个列表                     | `false` |
| `readOnly` | `boolean`                                                            | 整个列表只读                     | `false` |
| `onChange` | `(value: (string \| number)[]) => void`                              | 选择变化回调                     | -       |
| `children` | `ReactNode`                                                          | 自定义列表项                     | -       |

`CheckList.Item` 透传原生列表项组件，可配置 `value`、`disabled`、`readOnly`、`description` 等。封装类型中虽保留 `layout` 和 `layoutBlock`，当前实现没有将其用于排列布局，不建议使用。

其余配置参考 [antd-mobile CheckList 官方文档](https://mobile.ant.design/zh/components/check-list)。
