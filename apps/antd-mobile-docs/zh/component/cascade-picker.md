---
mobileDemo: cascade-picker/index.tsx
---

# CascadePicker

> `CascadePicker` 是 antd-mobile 级联选择器的 Formily 适配。

::: tip 提示
关于 CascadePicker 组件的右侧箭头相关逻辑请参考 FormItem 中的[箭头与清除按钮](/component/form-item#箭头与清除按钮)
:::

## 基础使用

<<< @/zh/demos/cascade-picker/basic.tsx

## 禁用、只读与预览

`displayRender` 用于编辑态和预览态。

::: tip 提示
`displayRender` 是所有Picker类型组件通用的配置项。
:::

<<< @/zh/demos/cascade-picker/patterns.tsx

## API

| 属性                  | 说明                                                 | 默认值             |
| --------------------- | ---------------------------------------------------- | ------------------ |
| `options`             | 树形选项数组；字段 `dataSource` 映射到此属性         | `[]`               |
| `value`               | 当前路径值数组，按层级排列                           | `[]`               |
| `onChange`            | `(value, extend) => void`，确认时写回                | -                  |
| `placeholder`         | ReactNode，空值时的提示                              | `请选择`           |
| `disabled`            | 禁止打开和写回                                       | `false`            |
| `readOnly`            | 可打开查看，但不能修改或清空                         | `false`            |
| `displayRender`       | `(labels, selectedOptions) => ReactNode`，自定义展示 | 标签以 `/` 分隔    |
| `className` / `style` | 字段外壳样式                                         | -                  |
| `aria-label`          | 触发按钮名称                                         | Field 的字符串标题 |

其余原生配置与事件直接透传，，不支持 `defaultValue`、`visible` 或 `children`。原生接口参考 [antd-mobile CascadePicker 文档](https://mobile.ant.design/zh/components/cascade-picker)。
